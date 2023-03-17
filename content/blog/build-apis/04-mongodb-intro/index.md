---
title: NoSQL - MongoDB Intro
date: "2021-06-08T09:00:00.000Z"
description: Build a CRUD API using express.js and MongoDB.
course: build-apis
order: 5
---

## Why choose a document based database

There are a myriad of reasons to choose each of these databases and a lot of them overlap.

With document-based databases, one of the most obvious and key advantages is that your data is totally unstructured and that's fine. With a relational database, you'll have to define the shape of your data upfront. You'll say something like this database table has three columns, name which is a string, age which is an integer. With a document-based database, you just start writing objects to the database and it will accomodate that. Some documents can have some fields and others can other ones. It's totally up to you. It can even be a bit of a problem when you misspell field names since the database will just happily accept the misspelled field name. Not that I have literally done that before.

Document-based databases feel very familiar to JavaScript developers. It's very much like taking normal JavaScript objects and throwing them in a database to retrieved later.

## MongoDB

## Databases and Collections
 
Like other databases, MongoDB has the concept of databases inside of it. A database is an overarching group of smaller collections of data. It's up to you how you want to structure your databases and collections but in general you want to keep like-things together. If you have a collection of user information and user notifications, you might consider storing those in the same database but different collections. If you have a user information collection and a collection of items for sale in your store, you might consider storing those in separate databases. Or not! There isn't a hard-and-fast rule here. Organize it how you see fit. One small consideration (don't even have to follow this either) is that if you have one large collection that gets a lot of traffic and a small collection that gets little traffic, it can be logically easier to scale those two servers separately if you put them in separate database.
 
Collections are groups of documents. A group of objects. Almost always you want each of these objects to represent one thing. If you have a `users` collection, one object should represent one user. I've seen people do things like have throw unlike things in a collection (like putting users and items-for-sale in one collection) and it does not turn out well. Use multiple collections.
 
Collections also have some fun capabilities. You can do capped collections where you can say "only have 100 items in this collection and toss out the oldest one when you get the 101st". You can also add indexes but we'll get there.
 
## Let's insert some documents
 
Inside your MongoDB console run `show dbs`. This will allow you to see all the existing databases. In order to start using one, you do `use <database name>`. Let's make our own. Run `use adoption`. If you run `db` now it'll show you're using the `adoption` database.
 
Let's make a collection called `pets`. Run `db.pets.insertOne({name: "Luna", type: "dog", breed: "Havanese", age: 8})`. Let's break this down.
 
The `db` refers to the database you chose with `use adoption`. If you want to use a different database, you just `use` something else.
 
The `pets` is the name of a collections that we're creating right now on the fly. If a collection doesn't exist, it's created instantly. If it does exist, it'll just insert into that collection. We could have called `pets` anything.
 
The `insertOne` is a function that exists on collections. As the name implies it allows you to insert one document at a time. There are a lot of ways to insert documents. Just run `db.pets.help()` to see everything available to you. Since the query language is JavaScript, the `()` are just to invoke the function.
 
The `{name: "Luna", type: "dog", breed: "Havanese", age: 8}` is the actual object being inserted into the collection. Here we're just using strings and numbers, but you can see all the available types [here](https://docs.mongodb.com/manual/reference/bson-types/).
 
Let's insert a lot of documents. Like, 10,000. Since we're querying with JavaScript, we can write some Array fanciness to generate an array of random objects. Copy and paste this into the MongoDB console.
 
 ```js
db.pets.insertMany(
Array.from({ length: 10000 }).map((_, index) => ({
  name: [
    "Luna",
    "Fido",
    "Fluffy",
    "Carina",
    "Spot",
    "Beethoven",
    "Baxter",
    "Dug",
    "Zero",
    "Santa's Little Helper",
    "Snoopy",
  ][index % 9],
  type: ["dog", "cat", "bird", "reptile"][index % 4],
  age: (index % 18) + 1,
  breed: [
    "Havanese",
    "Bichon Frise",
    "Beagle",
    "Cockatoo",
    "African Gray",
    "Tabby",
    "Iguana",
  ][index % 7],
  index: index,
})));
```