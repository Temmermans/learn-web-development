---
title: Automated Testing Overview
date: "2021-06-08T09:00:00.000Z"
description: |
  Learn how testing with jest work to automate finding bugs and improve the resiliency of your code.
course: js-ecosystem
order: 3
---

There are several different types of testing that can be performed in JavaScript:

1. `Unit testing` involves testing individual units or components of code in isolation from the rest of the application. This is important because it allows you to verify that each unit of code is working correctly on its own, which makes it easier to locate and fix any issues that arise.

2. `Integration testing` involves testing how different units of code work together. This is important because it helps to ensure that the various components of the application are working together as expected.

3. `End-to-end testing` involves testing the application as a whole, simulating how a real user would interact with it. This is important because it helps to ensure that the application is functioning correctly from the user's perspective.

4. `Snapshot testing` involves taking a snapshot of the rendered component and comparing it to a previous snapshot. If the two snapshots do not match, the test will fail. This is useful for testing components that are prone to changes, such as those with complex logic or UI elements.

Here are a few examples of different types of testing in JavaScript:

Unit test example:

```js
// Function to test
function add(a, b) {
  return a + b
}

// Unit test
test("add function adds two numbers", () => {
  expect(add(2, 3)).toBe(5)
  expect(add(5, 5)).toBe(10)
  expect(add(-1, 1)).toBe(0)
})
```

Integration test example:

```js
// Function to test
function fetchUserData(id) {
  return fetch(`https://api.example.com/users/${id}`).then(
    (res) => res.json()
  )
}

// Integration test
test("fetchUserData fetches and returns data for a specific user", () => {
  return fetchUserData(123).then((data) => {
    expect(data.id).toBe(123)
    expect(data.name).toBeDefined()
    expect(data.email).toBeDefined()
  })
})
```

End-to-End testing example:

```js
// End-to-end test
describe("Login flow", () => {
  it("should allow a user to log in", () => {
    cy.visit("https://www.example.com/login")
    cy.get("input[name=email]").type("user@example.com")
    cy.get("input[name=password]").type("password")
    cy.get("button[type=submit]").click()
    cy.url().should("include", "/dashboard")
  })
})
```

Snapshot testing example:

```js
// Snapshot test
import React from "react"
import renderer from "react-test-renderer"
import MyComponent from "./MyComponent"

test("MyComponent renders correctly", () => {
  const tree = renderer.create(<MyComponent />).toJSON()
  expect(tree).toMatchSnapshot()
})
```
