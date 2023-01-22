---
title: SQLite Practice
date: "2021-06-08T09:00:00.000Z"
description: Build a CRUD API using express.js and SQLite to manage users. Think the authentication mechanism for your website.
course: build-apis
isExercise: true
stackBlitzUrl: https://stackblitz.com/edit/express-simple-uye3vg
order: 3
---

## SQLite - Node.JS API

Before we go to the exercise, let's do a quick rundown of the functionalities with express.js.

### ExpressJS Fundamental Concepts

#### 1\. Routing

In Express JS, Routing determines an application's response to the client's request to a specific endpoint, a URI (or path), and a specific HTTP request method.

Each route contains one or more handler functions and is executed when the route is matched.

[[info | :bulb: Theme: Following is the structure of Routing]]
| `app.METHOD(PATH, HANDLER)`

**Where**:

- The app is an express's instance.
- METHOD is an HTTP request method
- PATH is a server's path
- HANDLER is a callback function executed when the matching route is found.

You can use four HTTP methods within the request. These methods help in identifying the function made by the user. Let's learn about each HTTP method in detail:

- **GET**: The HTTP GET method helps retrieve information from the server using a given URI. The GET requests only retrieve data without causing any other effect on the data.
- **POST**: The HTTP POST request method sends data to a server or updates a resource.
- **PUT**: The HTTP PUT request method helps accept the data enclosed within the request as an alteration to the current object specified by the URL.
- **DELETE**: This method requests the server to delete a particular resource from the destination.

The following example illustrates the usage of all HTTP methods:

```js
var express = require("express")
const app = express()
app.use(ExpressJSon())

app.get("/", (req, res) => {
  res.send("Hello World!")
})
app.post("/", (req, res) => {
  res.send("Got a POST request")
})
app.put("/user", (req, res) => {
  res.send("Got a PUT request at /user")
})
app.delete("/user", (req, res) => {
  res.send("Got a DELETE request at /user")
})
```

#### 2\. Middleware

In Express, Middleware functions are the functions that have access to the response object (res) and request object (req), along with the following function in the application's request-response cycle.

The following function is a function that, when invoked, operates the Middleware succeeding the existing Middleware.

The Middleware performs the following tasks:

- Code execution
- Perform modifications to the response and request objects.
- End applications request-response cycle.
- Call the succeeding Middleware existing in the cycle.

The below image illustrates the elements of a middleware function call:

![Middleware Function Call](https://i.stack.imgur.com/gVnGL.png)

An Express application can use the following types of Middleware:

- Application-level Middleware
- Third-party Middleware
- Built-in Middleware
- Router-level Middleware

**Application-level Middleware**

You can use application-level Middleware to access an app object's instance using the app.use() and app.METHOD() functions, where METHOD is the HTTP request method that handles middleware functions like GET, POST, or PUT in lowercase.

The following examples depict a middleware function with no mount path. For every request made by the app, this function is executed.

```js
const express = require("express")
const app = express()

app.use((req, res, next) => {
  console.log("Time:", Date.now())
  next()
})
```

The below example displays a middleware function mounted on the /user/:id path.

```js
app.use("/user/:id", (req, res, next) => {
  console.log("Request Type:", req.method)
  next()
})
```

**Router-level Middleware**

This Middleware works exactly as application-level Middleware, except it is bound to an instance of Express.Router().

```js
const router = express.Router()
```

Router-level middleware is loaded using the router.use() and router.METHOD() functions.

The following is an example of Router-level Middleware:

```js
const express = require("express")
const app = express()
const router = express.Router()

// a middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
  console.log("Time:", Date.now())
  next()
})

// a middleware sub-stack shows request info for any HTTP request to the /user/:id path
router.use(
  "/user/:id",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl)
    next()
  },
  (req, res, next) => {
    console.log("Request Type:", req.method)
    next()
  }
)

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get(
  "/user/:id",
  (req, res, next) => {
    // if the user ID is 0, skip to the next router
    if (req.params.id === "0") next("route")
    // otherwise, pass control to the next middleware function in this stack
    else next()
  },
  (req, res, next) => {
    // render a regular page
    res.render("regular")
  }
)

// handler for the /user/:id path renders a special page
router.get("/user/:id", (req, res, next) => {
  console.log(req.params.id)
  res.render("special")
})

// mount the router on the app
app.use("/", router)
```

**Built-in Middleware**

Following are the built-in middleware functions of Express:

- express.static serves static assets such as images, HTML files, etc.
- ExpressJSon analyzes incoming requests with JSON payloads.
- Express.urlencoded parses inbound requests that include payloads encoded with the URL.

- **Third-party Middleware**

To give Express apps more functionalities, use third-party Middleware.

Install the Node.js module, then load it into your project at the router or application level.

```sh
$ npm install cookie-parser
```

The following example demonstrates how to install and load the cookie-parsing using Middleware:

```js
const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")

// load the cookie-parsing Middleware
app.use(cookieParser())
```

#### 3\. Template Engines

The template engine's primary function is enabling the application's status template file usage. It replaces variables with actual values in a template file and modifies the template into an HTML file transferred to the client. This approach makes designing HTML pages easier.

Mustache, Pug, and EJS are some popular template engines that work with Express. By default, the Express generator uses Jade, along with others.

This is Pug:

<iframe src="https://pugjs.org/api/getting-started.html"></iframe>

#### 4\. Error Handling

The process of catching and processing errors synchronously and asynchronously in Express is called Error Handling. By default, Express comes with support for the error handler, so you don't need to write your own to get started.

In Express, Middleware manages error handling. Compared to other middleware functions, the error handling middleware must have four arguments instead of three – err, req, res, next.

Let's see an example of how to send a response to any error -

```js
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})
```

## Exercise 💪

Let's build a CRUD API to manage users:

<iframe src="https://stackblitz.com/edit/express-simple-uye3vg?embed=1&file=index.js&view=editor"></iframe>
