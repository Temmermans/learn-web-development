---
title: Neo4j Indices
date: "2021-06-08T09:00:00.000Z"
description: Build a CRUD API using express.js and MongoDB.
course: build-apis
order: 16
---

Just as with PostgreSQL and MongoDB, frequently having an index becomes very important to query performance for your "hot paths" for your database querying habits.

Let's say a new facet of our app is that people can find celebrities born the same year they are. Your query would look something like this.

```sql
MATCH (p:Person) WHERE p.born = 1967 RETURN p;
```

A fairly simple query but like we've seen before, this will look at every person on the graph to examine their birth year. Imagine you had all of IMDB's database; that query could wreck a system. Let's use EXPLAIN to see why.

```sql
EXPLAIN MATCH (p:Person) WHERE p.born = 1967 RETURN p;
```

You'll see it gives you a pretty in-depth answer that it will scan all 133 persons and then narrow it down to 13. Let's throw an index on Person's born attribute.

```sql
CREATE INDEX FOR (p:Person) ON (p.born);
EXPLAIN MATCH (p:Person) WHERE p.born = 1967 RETURN p;
MATCH (p:Person) WHERE p.born = 1967 RETURN p;
```

[Neo4j has a great article on query planning](https://neo4j.com/docs/cypher-manual/4.1/query-tuning/) if you want to dig further into improving query performance.

Lastly, sometimes it's useful to see all existing indexes. Try this:

```sql
CALL db.indexes;
```