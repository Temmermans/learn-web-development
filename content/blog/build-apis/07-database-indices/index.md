---
title: Database Indices
date: "2021-06-08T09:00:00.000Z"
description: Build a CRUD API using express.js and MongoDB.
course: build-apis
order: 7
---

## Database Index

### What are indexes?

_Indexes_ are a powerful tool used in the background of a database to speed up querying. Indexes power queries by providing a method to quickly lookup the requested data.

Simply put, an index is a pointer to data in a table. An index in a database is very similar to an index in the back of a book.

### Why are indexes needed?

Imagine walking into the Library of Congress and being given the task to find a specific publishing within 10 minutes. Would you be able to complete this task within the given time frame? The Library of Congress is considered the largest library in the world and it houses approximately [170 million items](https://www.loc.gov/about/fascinating-facts/#:~:text=The%20Library%20of%20Congress%20is,more%20than%20170%20million%20items.). Now, the Library of Congress is not a regular library where the public can check out books at will, but if you are like us, you know the challenge should not be too difficult. In fact, the first thing we would do is ask for access to the library’s index because indexes contain all the necessary information needed to access items quickly and efficiently.

In the same manner, a database index contains all the necessary information to access data quickly and efficiently. In today’s society, the business of data is rapidly advancing. In fact, some tech giants process several hundred petabytes (1000⁵ bytes) of data per day. Storing all of this data in a database is great, but for a data company, being able to access that data efficiently is paramount to success. Just like the Library of Congress example, one way of solving the access issue when it comes to large amounts of data is through the use of indexes. Indexes serve as lookup tables that efficiently store data for quicker retrieval.

## Indexing in MongoDB

Consider this fairly simple query:

```js
db.pets.find({ name: "Fido" });
```

Pretty simple: find all pets named Fido. However this query does a really dastardly thing: it will actually cause the database to look at **every single record** in the database. For us toying around on our computer this isn't a big deal but if you're running this a lot in production this going to be very expensive and fragile. In this case, it'd be much more helpful if there was an index to help us. Let's first see what explain can tell us.

```js
db.pets.find({ name: "Fido" }).explain("executionStats");
```

The two things to notice here are the strategy it used to do our query and how many records it looked at. In this case it looks at _every_ record in our database and it used a `COLLSCAN` strategy which is the same as a linear search aka O(n) search. Not good! Let's build an index to make this work a lot better!

### Create an Index

```js
db.pets.createIndex({ name: 1 });
db.pets.find({ name: "Fido" }).explain("executionStats");
db.pets.find({ name: "Fido" }).count();
```

Notice that it went faster. In my case the speedup was about 300%.

### Other use cases

- Compound Indices: if you query 2 or more fields frequently together
- Unique index: think for example an email address can only appear once.
- Text index: for full text searches