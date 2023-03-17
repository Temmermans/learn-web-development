---
title: Redis Intro
date: "2021-06-08T09:00:00.000Z"
description: Build a CRUD API using express.js and MongoDB.
course: build-apis
order: 19
---

# Key-Value Store

A key-value store is a very different beast than what we've been looking at so far. The first thing to realize is that very rarely will a key-value store be your primary database. It will almost always be a supplementary tool to another database that you're using. There are examples of people _just_ using a key-value store so I can be proven wrong but I'll say that's a very advance and rarer use case. You'd best know what you're doing.

Key-value stores have a few interesting characteristics of what makes them interesting. One of their biggest pluses is they tend to be very simple in terms of their APIs and capabilities. This is a feature in the sense they're easy to understand and easy to use. Due to their simple nature and simple operations, this makes them highly scalable and able to deals with extreme amounts of traffic (even more than our other databases) because they can't do complicated queries. Whereas you can send an SQL query to PostgreSQL to join multiple tables and aggregate them into fascinating insights, with a key-value store you're limited more-or-less to "write this to the database" and "read this from the database". They do a few more things but that's the gist.

I like to think of a key-value store as a giant JavaScript object. You can `store['my-key'] = 5` and then later you can come back later and ask for `store['key']` and get `5` back. Honestly that's 90% of the use right there. You store a value under a key and then later you can ask for that key back. There are a few other operations you can too and we'll get there, but that's the general idea.

## Use cases

Key-value stores are commonly used as caches. Imagine you have a very expensive PostgreSQL query that takes five seconds to run, is commonly needed by users, and rarely updates. If your app ran that five second query every single time a user needed to see that data it would bring down your servers. Since it rarely updates what we could do is only run that query once a day and then store the result in Redis. Instead of your app running the query against PostgreSQL, it would read first from the key-value store. If it found it, it would use that instead. This is an extreme example of when to use caching but it can be a very useful mechanism for increasing app performance.

Another good use case is non-essential data that is frequently used but it would be okay if it went away. A really good example of that is storing session data for users browsing your site. If your entire cache dropped every use would log out. It's not ideal but it's not the end of the world either. We'll get into in a second but you normally don't want mission critical data in one of these key-value stores.

Another good use case is analytics or telemetry. Most of these key-value stores are very good at quick arithmetic operations like increment, decrement, and other such number-modifying operations. So if you're counting page views on a high traffic site, a key-value is possibly a good place to put it.

There are plenty of other use cases and we'll do a few so you can see but keep an open mind. People do a lot of amazing things with key-value stores.

## SET and GET

```sh
SET name "Simon Temmerman"
GET name
```

## INCR DECR INCRBY DECRBY

A very common thing is wanting to do is do some quick additions or substracts on a value in the store. One of them could be that you're tracking page views. You could do something like this:

```sh
SET visits 0
INCR visits
INCR visits
INCR visits
DECR visits
```

Every time a user hits your website, you could just send a quick command to Redis to increment its store. You don't need to know right then what the count of visits is. It's enough to blindly fire off "whatever is there, add 1". I added a `DECR` at the end just so you can see how to decrement too.

What if you need to add or subtract more than just one? One case could be that you're tracking someone's score in a (American) football game and one team scores a touchdown. You could do:

```sh
SET scor
INCRBY score:seahawks 6
DECRBY score:broncos 3
```
Same idea, you just have to tell Redis by how much you want to add or subtract.

## MSET MGET

Another thing you can do is do multiple gets at a time as well as multipe sets

```sh
MSET score:seahawks 43 score:broncos 8
MGET score:seahawks score:broncos
```
You can have a lot of keys here so this is useful if you need to write or get a lot of things at once.

There is also \[pipelines\]\[pipelines\] as well as \[transactions\]\[transactions\] available to you as well if you need to batch write things. That's beyond the scope of this intro but just be aware all of these are helpers for doing multiple things at once.

## EXISTS

This is very helpful for making sure you don't duplicate anything. If you're write code you're write a code that needs to explore a maze and you want to make sure you don't revisit points on a cartesian plane. You could do something like

```sh
SET plane:0:0 visited
EXISTS plane:1:0
SET plane:1:0 visited
EXISTS plane:0:0
EXISTS plane:1:1
SET plane:1:1 visited
```
So it would check each spot on the graph if it had been there, if it had, it would try the next area until it could find somewhere it hadn't been there before. EXISTS will just give you a true or false if a key exists.

## DEL

Sometimes you need to explictly need to delete something from the cache.

```sh
SET greeting hello
EXISTS greeting
DEL greeting
EXISTS greeting
```