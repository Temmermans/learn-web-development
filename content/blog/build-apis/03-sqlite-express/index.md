---
title: SQLite Practice
date: "2021-06-08T09:00:00.000Z"
description: Build a CRUD API using express.js and SQLite to manage users. Think the authentication mechanism for your website.
course: build-apis
isExercise: true
codeSandBoxUrl: hhttps://codesandbox.io/p/sandbox/express-databases-740866?file=%2FREADME.md
order: 4
---

## SQLite - Node.JS API

### Exercise 💪

You can find the codesandbox [here](https://codesandbox.io/p/sandbox/express-databases-740866?file=%2FREADME.md).

Let's build a CRUD API to manage users. Here are some of the most used SQLite commands with the corresponding sqlite3 functions:

| SQLite Command	       | sqlite3 npm Package Function |
| ------    | ------ |
| CREATE TABLE	       | db.run() |
| INSERT INTO	       | db.run() |
| SELECT	       | db.all() or db.each() |
| UPDATE	       | db.run() |
| DELETE	       | db.run() |
| WHERE	       | db.all() or db.each() |
| ORDER BY	       | db.all() or db.each() |
| LIMIT	       | db.all() or db.each() |
| GROUP BY	       | db.all() or db.each() |
| JOIN	       | db.all() or db.each() |
| IN	       | db.all() or db.each() |
| LIKE	       | db.all() or db.each() |
| COUNT	       | db.all() or db.each() |
| AVG	       | db.all() or db.each() |
| SUM	       | db.all() or db.each() |
| MAX	       | db.all() or db.each() |
| MIN	       | db.all() or db.each() |
| DISTINCT	       | db.all() or db.each() |
| BETWEEN	       | db.all() or db.each() |

Note that the db.all() function returns all rows as an array, while the db.each() function iterates over each row and calls a provided callback function. The db.run() function is used for SQL commands that don't return data, such as creating or modifying tables.

Both functions take a sql query as first argument. Here are some examples:

1.  Create a table:

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);
```

2.  Insert data into a table:

```sql
INSERT INTO users (name, email, password)
VALUES ('John Doe', 'john@example.com', 'password123');
```

3.  Select data from a table:

```sql
SELECT name, email FROM users;
```

4.  Update data in a table:

```sql
UPDATE users SET password = 'newpassword123' WHERE id = 1;
``` 

5.  Delete data from a table:

```sql
DELETE FROM users WHERE id = 1;
```

6.  Join two tables:

```sql
SELECT users.name, orders.order_date, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;
```

7.  Create an index:

```sql
CREATE INDEX email_index ON users (email);
```

8.  Create a view:

```sql
CREATE VIEW user_orders AS SELECT users.name, orders.order_date, orders.total FROM users INNER JOIN orders ON users.id = orders.user_id;
```