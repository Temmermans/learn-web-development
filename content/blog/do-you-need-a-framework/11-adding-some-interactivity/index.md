---
title: Adding some interactivity
date: "2023-10-20T09:00:00.000Z"
description: |
  A great example of interactivity is a popover. Let's build one.
course: do-you-need-a-framework
order: 11
---

## #11 Adding some interactivity

> By the end of this section, **you should see the browser can do a lot of things for you and you do not need a framework for some more complex components like a popover.**

### What is the popover API?

At its core, the Popover API provides a mechanism to display floating content, or “popovers,” above the regular webpage content. This feature is particularly useful for tooltips, context menus, and even complex dialogue sections.

### Establishing the basics: HTML integration

HTML lays the groundwork, with the popover attribute marking an element as a popover. Here's a bare-bones example:

```html
<div id="simple-popover" popover>
  This is a simple popover!
</div>
```

You can control this with a button, using the popovertarget attribute pointing to the popover’s ID.

```html
<button popovertarget="simple-popover">Toggle Popover</button>
```

Use the popovertargetaction attribute to determine the button's behavior: `hide`, `show`, or the default `toggle`.

### Utilizing popovertargetaction for explicit popover control

The popovertargetaction attribute allows us to specify whether a button should "show", "hide", or "toggle" (the default behavior) a popover. By directly manipulating this attribute in JavaScript, we can dynamically alter how user interactions affect our UI components. JavaScript controls popovers through three primary methods: `showPopover()`, `hidePopover()`, and `togglePopover()`.

1. Show, Hide, and Toggle popovers explicitly Suppose we have three buttons, each intended to either show, hide, or toggle a popover. We can set their popovertargetaction attribute accordingly.

```js
// Accessing the buttons
// Accessing the buttons
const showButton = document.getElementById('showButton');
const hideButton = document.getElementById('hideButton');
const toggleButton = document.getElementById('toggleButton');

// Assigning the popover target actions
showButton.setAttribute('popovertargetaction', 'show');
hideButton.setAttribute('popovertargetaction', 'hide');
toggleButton.setAttribute('popovertargetaction', 'toggle'); // This is actually unnecessary since "toggle" is the default value

// Defining the popover element
const popover = document.getElementById('simple-popover');

// Adding event listeners to the buttons for interaction
showButton.addEventListener('click', () => {
  popover.showPopover();  // Explicitly showing the popover
});

hideButton.addEventListener('click', () => {
  popover.hidePopover();  // Explicitly hiding the popover
});

toggleButton.addEventListener('click', () => {
  popover.togglePopover(); // Toggling the visibility of the popover
});
```

This approach gives users clear, explicit control over the popover’s visibility.

2. Dynamic interaction based on context:

In some scenarios, you might want the button’s action to change based on the application’s state. For instance, a single button could behave differently based on user input or other criteria.  

```js
const dynamicButton = document.getElementById('dynamicButton');
let forceShow = true; // This could be any condition in your app

dynamicButton.addEventListener('click', () => {
  if (forceShow) {
    dynamicButton.setAttribute('popovertargetaction', 'show');
    popover.showPopover();
  } else {
    dynamicButton.setAttribute('popovertargetaction', 'hide');
    popover.hidePopover();
  }

  forceShow = !forceShow; // toggle the condition
});
```

Here, we’ve created a dynamic context where the button’s behavior changes based on a condition, giving us a more responsive and interactive UI component.

3. Interaction feedback with event listeners

Enhance user experience by providing feedback during interaction. For example, you might change the button’s text to indicate the next action: 

```js
// Assuming 'toggleButton' is controlling the popover's visibility
toggleButton.addEventListener('click', () => {
  const currentAction = toggleButton.getAttribute('popovertargetaction');

  if (currentAction === 'show') {
    toggleButton.textContent = 'Hide Popover';
    toggleButton.setAttribute('popovertargetaction', 'hide');
  } else {
    toggleButton.textContent = 'Show Popover';
    toggleButton.setAttribute('popovertargetaction', 'show');
  }
  
  // Execute the action
  popover.togglePopover();
});
```

In this scenario, the button serves a dual purpose: it acts based on its current popovertargetaction state and provides feedback by adjusting its display text.

### Popover states: Auto vs Manual

- **Auto**: Popover can be dismissed by outside clicks or the Esc key. Ideal for non-critical, supplementary information.
- **Manual**: Dismissal requires explicit action.Best for interactive content or crucial info.

```html
<div id="autoPopover" popover="auto">Click outside or press 'Esc' to close.</div>
<div id="manualPopover" popover="manual">Close me explicitly.</div>
```

Choose “auto” for quick info, and “manual” for important interactions.

### Handling popover events

Popovers in the interactive web UI are not static; they react to user interactions and lifecycle events. The Popover API provides events like beforetoggle and toggle that are dispatched during the show/hide transitions, enabling developers to hook into these moments.

```js
const popover = document.querySelector('#simple-popover:');

// Listen for the 'beforetoggle' event
popover.addEventListener('beforetoggle', (event) => {
  console.log(`Popover is about to transition from ${event.oldState} to ${event.newState}.`);
  // You can perform operations before the popover's state changes, such as data tracking or pre-loading views.
});
```


### Dynamic popover content

Modern web applications often require content to be loaded dynamically, based on user interactions. The Popover API is designed with this in mind, allowing for content changes just before a popover is toggled.

```js
// Assume 'popover' is your popover element
popover.addEventListener('beforetoggle', async (event) => {
  if (event.newState === 'open') {
    // Fetch new content when the popover is about to open
    try {
      const response = await fetch('/api/popoverContent');
      const newContent = await response.text();

      // Update the popover's content with the fetched data
      popover.innerHTML = newContent;
    } catch (error) {
      console.error('Failed to fetch popover content:', error);
      popover.innerHTML = 'Error loading content.'; // Fallback message
    }
  }
});
```

This functionality is particularly beneficial for displaying up-to-date information, reducing initial page load times, and providing a more dynamic user experience. Whether updating user notifications or loading fresh content on each display, the Popover API’s integration with JavaScript events makes it a versatile tool in modern web development.

### Advanced positioning and styling

Popovers default to the viewport’s center, but CSS offers customization:

```css
:popover-open {
   width: 200px;
   height: 100px;
   position: fixed;
   bottom: 10px;
   right: 10px;
}
```


For backdrop effects:

```css
:popover-open::backdrop {
   background-color: rgba(0,0,0,0.5);
}
```
