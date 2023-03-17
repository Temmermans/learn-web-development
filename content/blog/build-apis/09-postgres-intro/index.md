---
title: PostGres Intro
date: "2021-06-08T09:00:00.000Z"
description: Build a CRUD API using express.js and MongoDB.
course: build-apis
order: 10
---

## PostGres SQL

### Databases and Tables

PostgreSQL has the same concept of databases as MongoDB. This will be a group of tables that are related to similar problem-area. It'll be up to you how you choose to group these. Some apps are focused enough to all be in one database; others will need many databases. It's up to you and your data architect to figure out how to do that. In general, things that should be scaled separately (like maybe payment transactions and items in your store?)

Tables are similar to collections. This will be a group of records. It's like one Excel spreadsheet. A record is like an object in MongoDB. It's one thing in a table. One record would be a user in the users database.

Tables will have a defined schema. Like in Excel, one column will reprent one bit of information, so too will a field in a record represent one bit of information. As opposed to MongoDB, this schema has to be defined in advance and cannot be done on the fly. Altering a table's schema is a hefty operation and on big tables can literally takes hours or days to do. Forethought is a lot more important here.

This is a simple intro to this. There's a lot more to this but we'll get into as we go through our defined example.

### Our first SQL queries

The first order of business it create a new database. And we're going to do that using SQL. All SQL is fairly similar but are not necessarily drop-in compatible with each other. So while this would be similar in getting started to MySQL, it wouldn't be identical.

First thing you'll notice is I'll capitlize all the key words. This is to make reading the query easier, you can see what's a key word and what's not at a glance. And moreover it's just common to do so I stick with common best practices.

By default you connect to database "postgres" which is just a default database name. Let's make our own called `message_board`.

So go ahead and run your first query here to create a new database. **Make sure you include the `;` at the end.** While the semi-colon is optional in JS it is not in SQL! It thinks you're still going until you include that `;`.

```sql
CREATE DATABASE message_boards;
```

You should see `CREATE DATABASE` underneath that as a confirmation that it went through.

### First table

Okay, so now we have a database and we're connected to it, let's create our first table.

```sql
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR ( 25 ) UNIQUE NOT NULL,
    email VARCHAR ( 50 ) UNIQUE NOT NULL,
    full_name VARCHAR ( 100 ) NOT NULL,
    last_login TIMESTAMP,
    created_on TIMESTAMP NOT NULL
);
```

So let's break this down

-   CREATE TABLE is the command we'll use to create a new table. We're naming it the users table
-   `user_id` will be an incrementing field The first users will have a user\_if of 1, the second one will have user\_id of 2, etc. That's what the `GENERATED ALWAYS AS IDENTITY` means. It's autoincrementing. The PRIMARY KEY part means it's what the table will be indexed on which means inherently that it is indexed.
-   Previously PostgreSQL used a field type called `SERIAL` to describe the serially incrementing IDs. The `GENERATED AS ALWAYS` syntax is newer, more compliant to the generic SQL spec, and works better. Always use it over `SERIAL`.
-   Before, in MongoDB, we relied on the `_id` field to be that key field. PostgreSQL doesn't do that for you by default.
-   We created two VARCHARS which is the SQL way of saying string. The username will have a character limit of 25 and the email will have a charcter limit of 50. Each of them will be guaranteed unique (thanks to UNIQUE) and to not be omitted (thanks to NOT NULL).
-   They could still be empty strings with NOT NULL but you'd have to intentionally specify that.
-   full\_name is not unique so you could have two Sally Rogers.
-   We our last\_login field it will be the last time the user logged in. We could use this later to clean out inactive accounts. Notice this doesn't have NOT NULL so when we create a new user they can have a null login time because they haven't logged in yet.
-   Lastly we'll provide it with a date via the created\_on field so we can keep track of when a user was created.

We won't be going into too many more PostgreSQL data types but there are a lot. [See here](https://www.postgresql.org/docs/9.5/datatype.html#DATATYPE-TABLE).

### First record

Let's insert a user into our new table. This is like adding a new row into a spreadsheet.

```sql
INSERT INTO users (username, email, full_name, created_on) VALUES ('temmermans', 'lol@wajjo.com', 'Simon Temmerman', NOW());
```

-   This is how you insert a new record into a relational database.
-   The `INSERT INTO` tells the SQL engine you're going to be doing an insert, and we're doing it into `users`.
-   The `()` is where you provide the order you're going to be giving the fields to PostgreSQL in the VALUES part.
-   Notice we're not providing user\_id since PostgreSQL will provide that itself.
-   We're also not providing a `last_login` time because it's not required and in theory the user hasn't logged in yet.
-   For the created\_on, we're using a special PostgreSQL built in function called `NOW()`. This provide the current time as a parameter in that space.

### See your first record

We're about to get into more advance querying but I want you to see the fruits of your labor! Run this query to fetch every record and every field from a table

```sql
SELECT * FROM users;
```