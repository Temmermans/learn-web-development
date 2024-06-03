---
title: Main script setup
date: "2023-10-20T09:00:00.000Z"
description: |
  Let's setup our main script and introduce some useful shorthand methods to make our code less verbose.
course: do-you-need-a-framework
order: 3
---

## #3 Main script setup

> **Let's setup our main script and introduce some useful shorthand methods to make our code less verbose.**

## Load and DOMContentLoaded events

1. **Working with the DOM:**

   - It is essential to ensure the DOM (Document Object Model) is fully loaded and ready for manipulation before attempting to interact with page elements.
   - Waiting for the 'DOMContentLoaded' event is a common practice, which ensures that the DOM is fully constructed and ready for manipulation.

```javascript
window.addEventListener("DOMContentLoaded", (event) => {
  // Your code to manipulate the DOM goes here
})
```

2. **Differences Between 'load' and 'DOMContentLoaded':**

   - The 'load' event waits for everything on the page, including stylesheets, images, and other resources, to load. Using the 'load' event might delay JavaScript execution since it waits for all resources to load.
   - 'DOMContentLoaded' triggers as soon as the DOM is ready, allowing for earlier manipulation and improving user experience.

3. **DOM Manipulation:**

   - Once the DOM is ready, elements can be manipulated by JavaScript. For instance, inner HTML of elements can be dynamically modified.
   - A demonstration is provided where the content inside a navigation element is altered after the DOM has loaded.

```javascript
window.addEventListener("DOMContentLoaded", (event) => {
  let nav = document.getElementById("nav")
  nav.innerHTML = `<h2>Hello DOM</h2><p>Sample Paragraph</p>`
})
```

4. **Use of Template Strings:**
   - Backticks are used to create template strings in JavaScript, allowing for easier creation and manipulation of string content, particularly when dealing with multi-line strings or embedding expressions.

## A bit more around event listeners

1. **addEventListener:**

   - **once Option:** An advanced feature of `addEventListener` where an event is fired once, and the handler is automatically removed afterward. Suitable for events expected to happen just once.

```javascript
button.addEventListener("click", doSomething, {
  once: true,
})
```

2. **Passive Event Listeners:**

   - Allows the page to continue processing events smoothly, particularly useful in scroll events where the browser’s default is to wait for the event handler to finish. By setting it as passive, the browser will execute the code without waiting, helping in performance.

```javascript
document.addEventListener("scroll", doSomething, {
  passive: true,
})
```

3. **removeEventListener:**

   - Important for cleaning up event listeners attached to elements that are being removed, particularly in single-page applications (SPAs). Helps in managing memory by removing unnecessary functions.

```javascript
button.removeEventListener("click", doSomething)
```

4. **Dispatching Custom Events:**

   - You can create and dispatch custom events, extending the capabilities beyond the default events. Such events can be dispatched from any element.

```javascript
const event = new Event("customEvent")
button.dispatchEvent(event)
```

5. **Managing Event Listeners in DOM Elements:**

   - When a DOM element is removed, it doesn’t necessarily remove the attached event listeners. Manual removal might be necessary, depending on whether the element will be reused.

6. **Multiple EventListeners:**

   - Multiple event listeners will execute sequentially, not in parallel, as JavaScript is single-threaded. There might be a practical limit on the number of event listeners, but it is rarely reached in real-world scenarios.

7. **EventListener Execution:**
   - Even multiple event listeners attached to the same event execute sequentially due to the single-threaded nature of JavaScript.

[![](https://mermaid.ink/img/pako:eNptkLEOwjAMRH_F8gwDjBk6wRcAWxYrddtINCm2g0CIfydAkZBgOz_dneS7Ycgto0PlU-EUeBOpFxp9AoCJxGKIEyWDg7L8wO2Zk63-4_ULP2PLpnkbHewl9j2Lfiff8mNaO9heOBSLOdVSVVawPFcCdcYyJ6CLKerAigscWUaKbf3j9uz0aAOP7NFV2XJH5WgefbpXKxXLu2sK6EwKL1By6Qd0HR21XmVqyT4jzPT-AFcUZXQ?type=png)](https://mermaid.live/edit#pako:eNptkLEOwjAMRH_F8gwDjBk6wRcAWxYrddtINCm2g0CIfydAkZBgOz_dneS7Ycgto0PlU-EUeBOpFxp9AoCJxGKIEyWDg7L8wO2Zk63-4_ULP2PLpnkbHewl9j2Lfiff8mNaO9heOBSLOdVSVVawPFcCdcYyJ6CLKerAigscWUaKbf3j9uz0aAOP7NFV2XJH5WgefbpXKxXLu2sK6EwKL1By6Qd0HR21XmVqyT4jzPT-AFcUZXQ)

## Project progress

Create app.js in the root folder and include it in the HTML as in

```js
<script src="app.js" type="module"></script>
```

Open app.js and add:

```js
const $ = () => document.querySelector.call(this, arguments)
const $$ = () =>
  document.querySelectorAll.call(this, arguments)
HTMLElement.prototype.on = (a, b, c) =>
  this.addEventListener(a, b, c)
HTMLElement.prototype.off = (a, b) =>
  this.removeEventListener(a, b)
HTMLElement.prototype.$ = (s) => this.querySelector(s)
HTMLElement.prototype.$ = (s) => this.querySelectorAll(s)
```

Play with the console using $, $$ and direct DOM APIs.

In app.js let's add the following event handler:

```js
window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is ready")
})
```
