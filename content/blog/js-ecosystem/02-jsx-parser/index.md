---
title: JSX Parser
date: "2021-06-08T09:00:00.000Z"
isExercise: true
description: |
  Let's build a simple JSX parser to dymystify how tools like webpack work.
course: js-ecosystem
codeSandBoxUrl: https://stackblitz.com/edit/node-ntrjkd?file=index.js
order: 2
---

## #1 Goal for this course

> By the end of this section, **I want you to know that webpack is not magic (although it may seem that way sometimes).**

## Build a JSX parser

```js
export function Component() {
  let myRef = null
  let name = "Fernando"
  let myClass = "open"
  return (
    <div className={myClass} ref={myRef}>
      <h1>Hello {name}!</h1>
    </div>
  )
}

console.log(Component())
```

Should become:

```js
export function Component() {
  let myRef = null
  let name = "Fernando"
  let myClass = "open"
  return React.createElement(
    "div",
    { className: myClass, ref: myRef },
    React.createElement("h1", {}, "Hello " + name + "!")
  )
}

console.log(Component())
```

🚀 Let's get going:

<iframe src="https://stackblitz.com/edit/node-ntrjkd?embed=1&file=index.js&view=editor" width="100%" height="500"></iframe>
