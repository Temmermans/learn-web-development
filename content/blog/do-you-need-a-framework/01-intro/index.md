---
title: Building an App Without a Framework
date: "2023-10-20T09:00:00.000Z"
description: |
  Learn what we will do in this course and how it might help you in your job.
course: do-you-need-a-framework
order: 1
---

## #1 Goal for this course

> By the end of this course, **We will have build a web app without the use of any javascript frameworks or build tools. Not every app needs a framework, and you should be able to reason about the fact you need one or not.**

## Why only vanilla javascript?

- Learning Vanilla JS is crucial to **comprehend what libraries or frameworks are doing under the hood**, enabling developers to adapt to new versions or extend libraries with plugins and add-ons effectively.
- Knowing Vanilla JS makes a **developer more marketable**, as it’s a skill valued by recruiters.
- Vanilla JS allows for the **creation of lightweight, performance-efficient websites and applications**, contributing to a fast user experience. It enables more control, simplicity, and flexibility in coding.
- Vanilla JS can also be mixed with libraries like React or Vue for specific parts of applications, allowing for more versatile development practices.

## Why not only vanilla javascript?

Most challenges and fears associated with using Vanilla JS are centered around:

- routing
- state management
- templating
- browser compatibility.

## A quick DOM API refresher

1. Defining the DOM and DOM API:

   - DOM (Document Object Model) is a representation of the structure of a document in memory, connecting web pages (HTML) to JavaScript.
   - DOM API is a collection of functions and properties available to manipulate the DOM structure.
   - **The DOM and the real HTML on the page are not always the same.** While loading, the DOM can be ready for manipulation (via the `DOMContentLoaded` event) but the HTML might actually not be visible on the page yet. If you are doing updates to the DOM, that doesn't mean that the HTML is immediately updated as well. **The browser shares the same thread as your js code**.
   - Browsers can implicitly add elements like <head> and <body> even if they are not explicitly stated in the HTML.
   - The first visible element found by the browser will be where the <body> starts.

<br>

2. Global Object (Window):

   - In JavaScript, the window global object represents the current global context, providing a global variable and functions attached to it.

<br>

3. Manipulating the DOM:
   - Elements in the DOM can be manipulated by JavaScript. Changes made in the DOM structure will reflect on the screen.
   - DOM elements can be accessed, modified, deleted, or new elements can be created and added.

```js
// Accessing an element
const heading = document.getElementById("heading")

// Modifying an element
heading.textContent = "New Heading Text"

// Creating and adding an element
const newElement = document.createElement("p")
newElement.textContent = "New Paragraph"
document.body.appendChild(newElement)
```

4. Event Handling:
   - JavaScript can listen to events on DOM elements and execute functions in response to those events.
   - **Types of DOM Events**: DOM elements have a list of possible events that one can listen to, such as load, click, double-click, keyboard events (key up, key down, key press), mouse events, pointer and touch events. There are also more specialized events like those related to streaming to devices like Apple TV or Google Cast. Some events are specific and suitable only for certain objects, like DOMContentLoaded and popstate, which are mainly applicable to the window object.
   - **Event Naming Conventions**: Event names are generally lowercase without word separators. There are exceptions to this naming pattern, like DOMContentLoaded, and other non-standard or platform-specific event names.
   - **Binding Functions to Events**: There are mainly two ways to bind functions to events in DOM objects - using `onevent` properties and `addEventListener`.
     - `onevent` properties are more classical and have been a part of DOM since the beginning. They involve assigning event handlers directly to properties, like `onclick` or `onload`. However, this method allows only one event handler per event, as setting a new function will overwrite the previous one.
     - `addEventListener` is a more modern approach where multiple event handlers can be attached to the same event. It allows for a separation of concerns, enabling the initialization of different aspects like databases or connections to web sockets in separate functions, possibly located in different JavaScript files.
   - For some more info about events, look [here](/course/vanilla-javascript/22-DOM-events/)

```javascript
document
  .getElementById("myButton")
  .addEventListener("click", function () {
    alert("Button Clicked!")
  })
```

5. Performance Considerations:

   - JavaScript execution competes with browser rendering due to a single main thread.
   - For smooth performance, ensure that JavaScript releases the main thread promptly to allow the browser to render updates.
   - In frameworks like React, a virtual DOM concept is used, which differs from direct DOM manipulation in vanilla JavaScript.
   - In React, changes are first made to the virtual DOM, and then efficiently updated in the actual DOM.
