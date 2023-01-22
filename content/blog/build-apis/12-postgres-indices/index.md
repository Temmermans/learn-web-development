---
title: PostGres Indices
date: "2021-06-08T09:00:00.000Z"
description: Build a CRUD API using express.js and MongoDB.
course: build-apis
order: 12
---

# Indexes in PostgreSQL

This works very similarily to how it works in MongoDB so we're going to breeze over this pretty quickly.

Let's take this query:

```sql
SELECT comment_id, user_id, time, LEFT(comment, 20) FROM comments WHERE board_id = 39 ORDER BY time DESC LIMIT 40;
```

This should be a pretty common query if we're making a message board: grab all the comments for a particular board. Let's see what PostgreSQL does under the hood by adding an `EXPLAIN` in front of it.

```sql
EXPLAIN SELECT comment_id, user_id, time, LEFT(comment, 20) FROM comments WHERE board_id = 39 ORDER BY time DESC LIMIT 40;
```

This part should break your heart: `Seq Scan on comments`. This means it's looking at every comment in the table to find the answer. This is a place we'd need an index to prevent this. Let's make an index on board\_ids to speed this up.

```sql
CREATE INDEX ON comments (board_id);
EXPLAIN SELECT comment_id, user_id, time, LEFT(comment, 20) FROM comments WHERE board_id = 39 ORDER BY time DESC LIMIT 40; -- run again
```
If you're looking the EXPLAIN again, you'll see it does a `Bitmap Heap Scan` instead of a Seq Scan. Much better!

Let's do one more; all users should have a unique username. Let's ensure that with a unique index.

```sql
CREATE UNIQUE INDEX username_idx ON users (username);
INSERT INTO users (username, email, full_name, created_on) VALUES ('aaizikovj', 'lol@example.com', 'Simoné', NOW()); -- this will fail
```
-   The `username_idx` is just a name for the index. You can call it whatever you want.
-   Try inserting a duplicate username. The query will fail.
-   A pleasant byproduct is that this field is now indexed so you can easily search it.

PostgreSQL has [more types of indexes](https://www.postgresql.org/docs/13.0/indexes.html). Feel free to explore them more.