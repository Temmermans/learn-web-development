---
title: PostGres Queries
date: "2021-06-08T09:00:00.000Z"
description: Build a CRUD API using express.js and MongoDB.
course: build-apis
order: 10
---

## Querying PostgreSQL

### SELECT

Let's start with SELECT. This is how you find things in a SQL database. Let's run again the SELECT statement from our previous section and talk about it.

```sql
SELECT * FROM users;
```

This will get every field (which is what the `*` means, a.k.a. the wildcard) from the users database. This will be 1000 users.

### LIMIT

Let's select fewer users;

```sql
SELECT * FROM users LIMIT 10;
```

This will scope down to how many records you get to just 10.

### Projection

Let's just some of the columns now, not all of them

```sql
SELECT username, user_id FROM users LIMIT 15;
```

In general it's a good idea to only select the columns you need. Some of these databases can have 50+ columns. Okay we've seen basic reads.

### WHERE

Let's find specific records

```sql
SELECT username, email, user_id FROM users WHERE user_id=150;
SELECT username, email, user_id FROM users WHERE last_login IS NULL LIMIT 10;
```

The first one will give us one user whose user\_id is 150. The second one will give us 10 users that have never logged.

### AND plus date math

What if we wanted to see if they hadn't logged in and were created more than six months ago?

```sql
SELECT username, email, user_id, created_on FROM users WHERE last_login IS NULL AND created_on < NOW() - interval '6 months'  LIMIT 10;
```

-   This shows off the AND keyword where you can query multiple conditions.
-   This shows off a bit of date math too. To be honest every time I have to do date math I have to look it up but here's the scoop for this one. created\_on is a timestamp and we're comparing to `NOW()` (the current time of the server) minus the time period of six months. This will give us all users who haven't ever logged in and have had accounts for six months.

### ORDER BY

What if wanted to find the oldest accounts? Let's use a sort.

```sql
SELECT user_id, email, created_on FROM users ORDER BY created_on LIMIT 10;
```

For the newest account, just add `DESC` (you can put `ASC` above, it's just implied)

```sql
SELECT user_id, email, created_on FROM users ORDER BY created_on DESC LIMIT 10;
```

### COUNT(\*)

Wondering how many records we have in our database?

```sql
SELECT COUNT(*) FROM users;
```
This will tell you how many users we have in the database total. The `*` represents that we're just looking total rows. If we wanted to look at how many users have ever logged in (since COUNT will ignore NULL values)

```sql
SELECT COUNT(last_login) FROM users;
```
### UPDATE, RETURNING

Let's say user\_id 1 logged in. We'd need to go into their record and update their last\_login. Here's how we'd do that.

```sql
UPDATE users SET last_login = NOW() WHERE user_id = 1 RETURNING *;
```
Tools we already know! Let's say user\_id 2 choose to update their full\_name and email

```sql
UPDATE users SET full_name= 'Brian Holt', email = 'lol@example.com' WHERE user_id = 2 RETURNING *;
```

-   You just comma separate to do multiple sets.
-   Make sure you use single quotes. Double quotes cause errors.
-   RETURNING \* is optional. This is basically saying "do the update and return to me the records after they've been updated.

### DELETE

This works as you would expect based on what we've done before

```sql
DELETE FROM users WHERE user_id = 1000;
```