---
title: MongoDB Practice
date: "2021-06-08T09:00:00.000Z"
description: Build a CRUD API using express.js and MongoDB.
course: build-apis
isExercise: true
order: 9
---

You can find the codesandbox [here](https://codesandbox.io/p/sandbox/express-databases-740866?file=%2FREADME.md).

Let's build an API with mongodb and express:

Here's a table with some commonly used MongoDB commands and their corresponding functions in the Mongoose library, which is a popular Object-Document Mapping (ODM) library for Node.js that provides a more intuitive and powerful API for MongoDB:

|  MongoDB Command	|Mongoose Function |
| ----- | ---- |
|  db.createCollection()	|N/A - Mongoose does not have a corresponding  |method. Use a Mongoose schema to define a collection.
|  db.collection.insertOne()	|MyModel.create() |
|  db.collection.insertMany()	|MyModel.insertMany() |
|  db.collection.find()	|MyModel.find() |
|  db.collection.findOne()|	MyModel.findOne() |
|  db.collection.updateOne()	|MyModel.updateOne() |
|  db.collection.updateMany()	|MyModel.updateMany() |
|  db.collection.deleteOne()	|MyModel.deleteOne() |

Note that `MyModel` refers to a Mongoose model that is created by defining a schema and compiling it into a model.

Here are some examples of using Mongoose functions:

1.  Create a Mongoose model:

```javascipt
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model('User', userSchema);`
```

2.  Insert data into a collection:

```javascipt
const user = new User({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
user.save();
```

3.  Find data in a collection:

```javascipt
const users = await User.find({ name: 'John Doe' });
console.log(users);
```

4.  Update data in a collection:

```javascipt
await User.updateOne({ name: 'John Doe' }, { password: 'newpassword123' });
``` 

5.  Delete data from a collection:

```javascipt
await User.deleteOne({ name: 'John Doe' });
```