---
title: Finish Components
date: "2023-10-20T09:00:00.000Z"
description: |
  Finish up our components work for the app.
course: do-you-need-a-framework
isExercise: true
order: 8
---

## services/Menu.js

```js
export async function getProductById(id) {
  if (app.store.menu == null) {
    await loadData()
  }
  for (let c of app.store.menu) {
    for (let p of c.products) {
      if (p.id == id) {
        return p
      }
    }
  }
  return null
}
```

### components/DetailsPage.js

```js
import { getProductById } from "../services/Menu.js"

export default class DetailsPage extends HTMLElement {
  constructor() {
    super()

    this.root = this.attachShadow({ mode: "open" })

    const template = document.getElementById(
      "details-page-template",
    )
    const content = template.content.cloneNode(true)
    const styles = document.createElement("style")
    this.root.appendChild(content)
    this.root.appendChild(styles)

    async function loadCSS() {
      const request = await fetch(
        "/components/DetailsPage.css",
      )
      styles.textContent = await request.text()
    }
    loadCSS()
  }

  async renderData() {
    if (this.dataset.productId) {
      this.product = await getProductById(
        this.dataset.productId,
      )
      this.root.querySelector("h2").textContent =
        this.product.name
      this.root.querySelector(
        "img",
      ).src = `/data/images/${this.product.image}`
      this.root.querySelector(".description").textContent =
        this.product.description
      this.root.querySelector(
        ".price",
      ).textContent = `$ ${this.product.price.toFixed(
        2,
      )} ea`
      this.root
        .querySelector("button")
        .addEventListener("click", () => {
          // TODO addToCart(this.product.id);
          app.router.go("/order")
        })
    } else {
      alert("Invalid Product ID")
    }
  }

  connectedCallback() {
    this.renderData()
  }
}

customElements.define("details-page", DetailsPage)
```

### services/Order.js

```js
import { getProductById } from "./Menu.js"

export function placeOrder() {
  alert(
    "Your order will be ready under the number " +
      parseInt(Math.random() * 100),
  )
  app.store.menu = []
}

export async function addToCart(id) {
  const product = await getProductById(id)
  const results = app.store.cart.filter(
    (prodInCart) => prodInCart.product.id == id,
  )
  if (results.length == 1) {
    app.store.cart = app.store.cart.map((p) =>
      p.product.id == id
        ? { ...p, quantity: p.quantity + 1 }
        : p,
    )
  } else {
    app.store.cart = [
      ...app.store.cart,
      { product, quantity: 1 },
    ]
  }
}

export function removeFromCart(id) {
  app.store.cart = app.store.cart.filter(
    (prodInCart) => prodInCart.product.id != id,
  )
}
```

### app.js

Add the following code

```js
window.addEventListener("appcartchange", (event) => {
  const badge = document.getElementById("badge")
  const qty = app.store.cart.reduce(
    (acc, item) => acc + item.quantity,
    0,
  )
  badge.textContent = qty
  badge.hidden = qty == 0
})
```

### components/CartItem.js

```js
import { removeFromCart } from "../services/Order.js"

export default class CartItem extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const item = JSON.parse(this.dataset.item)
    this.innerHTML = "" // Clear the element

    const template = document.getElementById(
      "cart-item-template",
    )
    const content = template.content.cloneNode(true)

    this.appendChild(content)

    this.querySelector(
      ".qty",
    ).textContent = `${item.quantity}x`
    this.querySelector(".name").textContent =
      item.product.name
    this.querySelector(
      ".price",
    ).textContent = `$${item.product.price.toFixed(2)}`
    this.querySelector("a.delete-button").addEventListener(
      "click",
      (event) => {
        removeFromCart(item.product.id)
      },
    )
  }
}

customElements.define("cart-item", CartItem)
```

### components/OrderPage.js

```js
export default class OrderPage extends HTMLElement {
  #user = {
    name: "",
    phone: "",
    email: "",
  }

  constructor() {
    super()

    this.root = this.attachShadow({ mode: "open" })
    const styles = document.createElement("style")
    this.root.appendChild(styles)
    const section = document.createElement("section")
    this.root.appendChild(section)

    async function loadCSS() {
      const request = await fetch(
        "/components/OrderPage.css",
      )
      styles.textContent = await request.text()
    }
    loadCSS()
  }

  connectedCallback() {
    window.addEventListener("appcartchange", () => {
      this.render()
    })
    this.render()
  }

  render() {
    let section = this.root.querySelector("section")
    if (app.store.cart.length == 0) {
      section.innerHTML = `
          <p class="empty">Your order is empty</p>
      `
    } else {
      let html = `
          <h2>Your Order</h2>
          <ul>
          </ul>
      `
      section.innerHTML = html

      const template = document.getElementById(
        "order-form-template",
      )
      const content = template.content.cloneNode(true)
      section.appendChild(content)

      let total = 0
      for (let prodInCart of app.store.cart) {
        const item = document.createElement("cart-item")
        item.dataset.item = JSON.stringify(prodInCart)
        this.root.querySelector("ul").appendChild(item)

        total +=
          prodInCart.quantity * prodInCart.product.price
      }
      this.root.querySelector("ul").innerHTML += `
            <li>
                <p class='total'>Total</p>
                <p class='price-total'>$${total.toFixed(
                  2,
                )}</p>
            </li>                
        `
    }
    this.setFormBindings(this.root.querySelector("form"))
  }

  setFormBindings(form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault()
      alert(
        `Thanks for your order ${this.#user.name}. ${
          this.#user.email
            ? "We will be sending you the receipt over email."
            : "Ask at the counter for a receipt."
        }`,
      )
      this.#user.name = ""
      this.#user.email = ""
      this.#user.phone = ""

      // TODO: sent user and cart's details to the server
    })

    // Set double data binding
    Array.from(form.elements).forEach((element) => {
      if (element.name) {
        element.addEventListener("change", (event) => {
          this.#user[element.name] = element.value
        })
      }
    })
    this.#user = new Proxy(this.#user, {
      set(target, property, value) {
        target[property] = value
        form.elements[property].value = value
        return true
      },
    })
  }
}
```
