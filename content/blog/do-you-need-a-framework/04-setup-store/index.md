---
title: The global store
date: "2023-10-20T09:00:00.000Z"
description: |
  Let's setup a global store so we can share data between components.
course: do-you-need-a-framework
order: 4
---

## #4 The global store

> By the end of this section, **you should understand how frameworks are creating a store to keep track of application data.**

## Setting up Data Management

- **Creating Services Folder and Files**

  - Services folder will house API and Store services.
  - API.js: Responsible for fetching data.
  - Store.js: Responsible for storing app-wide global data such as menu and cart details.

- **Store Service**

  - A constant object containing the menu (initialized as null) and cart (initialized as an empty array).
  - The object will be exported as a default object, and its variables will be local to the file.

- **API Service**

  - Will include a property with the URL of the file to load (e.g., data/menu.json).
  - Will have a function to fetch the menu. It will use the fetch API, which returns a promise, and data will be parsed as JSON.
  - This object will also be exported as a default object.

- **Implementing Modules in JavaScript**

  - Using ES modules to keep variables local to files.
  - The script type in HTML should be changed to module to allow for importing and exporting functionalities between files.

- **Accessing the Services**

  - Services are imported into the app.js.
  - Since ES modules are used, accessing the services would mean that they are not global. However, they can be made globally accessible by attaching them to the window object under a specific name (e.g., app).

- **Loading Data**

  - A function to load data will call the fetch menu from the API and store the result in the store.
  - Another function/service can be created to manage operations related to the menu, like loading data, which makes the process more modular.

- **Structuring the Code**

  - Different patterns can be mixed in code structuring.
  - It is essential to keep code simple and easy to understand, following specific guidelines and best practices, even when adding more abstraction layers.

- **Implementing Reactivity**
  - Reactivity, or the automatic updating of the UI based on data changes, will be addressed later.
  - Currently, methods are just changed without visible effects, but this will evolve to reflect changes in the UI automatically.

## Project progress

### services/API.js

```javascript
const API = {
  // url: "https://firtman.github.io/coffeemasters/api/menu.json",
  url: "/data/menu.json",
  fetchMenu: async () => {
    const result = await fetch(API.url)
    return await result.json()
  },
}

export default API
```

### services/Store.js

```javascript
import API from "./API.js"

const Store = {
  menu: null,
  cart: [],
}

export default Store
```

Back in app.js import the two services as modules and create a global app variable.

```javascript
import Store from "./services/Store.js"
import API from "./services/API.js"

window.app = {}
app.store = Store
```

### services/Order.js

```javascript
import API from "./API.js"

export async function loadData() {
  const data = await API.fetchMenu()
  app.store.menu = data
}
```

Now import the loadData function in app.js

```javascript
import { loadData } from "./services/Menu.js"

// And finally replace the current DOMContentLoaded event handler

window.addEventListener("DOMContentLoaded", () => {
  loadData()
})
```
