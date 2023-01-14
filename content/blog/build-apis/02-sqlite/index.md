---
title: SQLite
date: "2021-06-08T09:00:00.000Z"
description: Build APIs with Node.JS - SQLite
course: build-apis
order: 2
---

## SQLite

### What is SQLite?

SQLite is a database engine. It is software that allows users to interact with a relational database. In SQLite, a database is stored in a single file — a trait that distinguishes it from other database engines. This fact allows for a great deal of accessibility: copying a database is no more complicated than copying the file that stores the data, sharing a database can mean sending an email attachment.

#### Drawbacks to SQLite

SQLite’s signature portability unfortunately makes it a poor choice when many different users are updating the table at the same time (to maintain integrity of data, only one user can write to the file at a time). It also may require some more work to ensure the security of private data due to the same features that make SQLite accessible. Furthermore, SQLite does not offer the same exact functionality as many other database systems, limiting some advanced features other relational database systems offer. Lastly, SQLite does not validate data types. Where many other database software would reject data that does not conform to a table’s schema, SQLite allows users to store data of any type into any column.

SQLite creates schemas, which constrain the type of data in each column, but it does not enforce them. The example below shows that the id column expects to store integers, the name column expects to store text, and the age column expects to store integers:

```sql
CREATE TABLE celebs (
    id INTEGER,
    name TEXT,
    age INTEGER
);
```

However, SQLite will not reject values of the wrong type. We could accidentally insert the wrong data types in the columns. Storing different data types in the same column is a bad habit that can lead to errors that are difficult to fix, so it’s important to be strict about your schema even though SQLite will not enforce it.

#### Uses for SQLite

- SQLite is used to develop embedded software for devices like televisions, cell phones, cameras, etc.
- It can manage low to medium-traffic HTTP requests. Or even pretty heavy read-only usage.
- SQLite can change files into smaller size archives with lesser metadata.
- SQLite is used as a temporary dataset to get processed with some data within an application.
- Caching: Firefix for example uses SQLite to cache user preferences.
- Beginners use SQLite for learning and training purposes, as it requires no installation and configuration.
