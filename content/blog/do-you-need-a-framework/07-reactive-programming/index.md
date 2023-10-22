---
title: Reactive Programming
date: "2023-10-20T09:00:00.000Z"
description: |
  How can we make the UI update automatically when the data changes? Let's find out.
course: do-you-need-a-framework
order: 7
---

## #7 Reactive Programming

> By the end of this section, **you should have a solid understanding of javascript Proxies.**

## Reactive Programming with Proxies

- Proxies in JavaScript act as wrappers that allow the interception and modification of operations performed on objects. It’s like having an event listener for data, which reacts to changes made in the object.

### Handlers and Proxies

- Handlers are objects with special functions like ‘get’ and ‘set’. For example, a ‘get’ function can be used to retrieve and possibly modify a property's value from an object.

- Proxies, together with handlers, enable operations such as validation and adding custom behaviors or validations to object properties and methods.

### Implementing Reactivity

- With the use of proxies, reactivity is added to the application. The ‘set’ trap in proxies, for instance, detects changes made to certain properties of objects, triggering UI updates.
- Proxies help in broadcasting changes made to data, acting like event listeners for object properties, ensuring the UI remains updated.

#### Example of a Proxy with Basic Handlers

```javascript
let person = {
  name: "John",
  age: 30,
}

let handler = {
  get(target, property) {
    console.log(`Getting ${property}`)
    return target[property]
  },
  set(target, property, value) {
    console.log(`Setting ${property} to ${value}`)
    target[property] = value
  },
}

let proxyPerson = new Proxy(person, handler)

console.log(proxyPerson.name) // Output: Getting name \n John
proxyPerson.age = 31 // Output: Setting age to 31
```

#### Example of a Proxy with a Set Trap and Event Dispatching

```javascript
let store = {
  menu: [],
  cart: [],
}

let handler = {
  set(target, property, value) {
    console.log(
      `Data changed. Property modified: ${property}`,
    )
    target[property] = value

    // Dispatching a global event
    window.dispatchEvent(new Event(`${property}Changed`))
    return true
  },
}

let proxyStore = new Proxy(store, handler)

window.addEventListener("menuChanged", () => {
  console.log("Menu has been updated!")
})

proxyStore.menu.push("New Item") // This will trigger the menuChanged event
```

#### Example of a Proxy with Validation

```javascript
let handler = {
  set(target, property, value) {
    if (property === "age" && typeof value !== "number") {
      console.error("Age must be a number.")
      return false
    }
    target[property] = value
    return true
  },
}

let proxyPerson = new Proxy(person, handler)

proxyPerson.age = "thirty" // Output: Age must be a number.
```

## Project Progress

### services/Store.js

```javascript
import API from "./API.js"

const Store = {
  menu: null,
  cart: [],
}

const proxiedStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value
    if (property == "menu") {
      window.dispatchEvent(new Event("appmenuchange"))
    }
    if (property == "cart") {
      window.dispatchEvent(new Event("appcartchange"))
    }
    return true
  },
  get(target, property) {
    return target[property]
  },
})

export default proxiedStore
```

### components/MenuPage.js

```javascript
connectedCallback() {
    window.addEventListener("appmenuchange", () => {
        this.render();
    });
    this.render();
}

render() {
    if (app.store.menu) {
        this.root.querySelector("#menu").innerHTML = "";
        for (let category of app.store.menu) {
            const liCategory = document.createElement("li");
            liCategory.innerHTML = `
                <h3>${category.name}</h3>
                <ul class='category'>
                </ul>`;
            this.root.querySelector("#menu").appendChild(liCategory);

            category.products.map(product => {
    const item = document.createElement("product-item");
    item.dataset.product = JSON.stringify(product);
    liCategory.querySelector("ul").appendChild(item);
});
        }
    } else {
        this.root.querySelector("#menu").innerHTML = `Loading...`;
    }
}
```

### components/ProductItem.js

```javascript
export default class ProductItem extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const template = document.getElementById(
      "product-item-template",
    )
    const content = template.content.cloneNode(true)

    this.appendChild(content)

    const product = JSON.parse(this.dataset.product)
    this.querySelector("h4").textContent = product.name
    this.querySelector(
      "p.price",
    ).textContent = `$${product.price.toFixed(2)}`
    this.querySelector(
      "img",
    ).src = `data/images/${product.image}`
    this.querySelector("a").addEventListener(
      "click",
      (event) => {
        console.log(event.target.tagName)
        if (
          event.target.tagName.toLowerCase() == "button"
        ) {
          //TODO
        } else {
          app.router.go(`/product-${product.id}`)
        }
        event.preventDefault()
      },
    )
  }
}

customElements.define("product-item", ProductItem)
```
