---
title: Neo4j Intro
date: "2021-06-08T09:00:00.000Z"
description: Build a CRUD API using express.js and MongoDB.
course: build-apis
order: 14
---

## Neo4j browser

Let's hop into their nice portal that Neo4j provides. Open http://localhost:7474 in a browser. When asked to authenticate just choose the drop down "no authentication." If you didn't provide the no auth option on startup, the default username and password is neo4j/neo4j.

The first thing we're going to do is use a CREATE statement to make our first actor, Michael Cera. I love the movie Scott Pilgrim vs. the World so we're going to describe the actors in it here.

```sql
CREATE (Person {name:'Michael Cera', born:1988});
```
You can see we created a new node with a label of Person and two attributes: a name of Michael Cera and a birth year of 1988. CREATE (Person {name:'Michael Cera', born:1988});

Now what if we want to find that same record?

```sql
MATCH (p {name: "Michael Cera"}) RETURN p;
```

-   Now we're using a shorthand variable, `p`. We could call this anything.
-   The first part reprsents what we're querying for. We didn't specify what label it was going to be but we have. Then it would look like `MATCH (p {name: "Michael Cera"}) RETURN p;`
-   You need the return at the end or you wouldn't get anything back.

Let's create a movie and then query for it.

```sql
CREATE (m:Movie {title: 'Scott Pilgrim vs the World', released: 2010, tagline: 'An epic of epic epicness.' }) RETURN m;
```

-   This will create and return all in the same query because there's no semicolon so it's treated as one query.
-   It's easy to make big complicated queries with Cypher.

Let's now make them associated with each other so that Michael Cera acted in Scott Pilgrim vs the World.

```sql
MATCH (Michael:Person),(ScottVsWorld:Movie)
WHERE Michael.name = "Michael Cera" AND ScottVsWorld.title = "Scott Pilgrim vs the World"
CREATE (Michael)-[relationship:ACTED_IN {roles:["Scott Pilgrim"]}]->(ScottVsWorld)
RETURN relationship;
```

-   The first match says we're looking for two separate things, a Person and a Movie.
-   We then give a WHERE (there are a few ways to write queries that all work).
-   We then identify that we're going to CREATE something new.
-   This reads like ASCII art You have (node) - \[RELATIONSHIP\] -> (node). This identifies that Michael ACTED\_IN Movie. The -> identifies the direction of the relationship. We also can totally right it as (Scott Pilgrim vs the World) <- \[ACTED\_IN\] - (Michael Cera). Both work.
-   `relationship` is a variable that refers to the new relationship we just created. It's optional but I wanted to return it at the end.
-   Neo4j recommends you do CapitalCasing with label names (like Person and Movie) and that you SCREAMING\_CASE relationship types (like DIRECTED and ACTED\_IN.) I just follow their recommendations. [See here](https://neo4j.com/docs/cypher-manual/4.1/syntax/naming/).

Okay, so let's put a few more relationships to the movie in. Copy/paste this to add a few more actors, actresses, and the director. (How many good actors and actresses were in Scott Pilgrim!?)

```sql
MATCH (ScottVsWorld:Movie) WHERE ScottVsWorld.title = "Scott Pilgrim vs the World"
CREATE (Anna:Person {name:'Anna Kendrick', born:1985})
CREATE (Brie:Person {name:'Brie Larson', born:1989})
CREATE (Aubrey:Person {name:'Aubrey Plaza', born:1984})
CREATE (Mary:Person {name:'Mary Elizabeth Winstead', born:1984})
CREATE (Kieran:Person {name:'Kieran Culkin', born:1982})
CREATE (Chris:Person {name:'Chris Evans', born:1981})
CREATE (Edgar:Person {name:'Edgar Wright', born:1974})
CREATE
(Anna)-[:ACTED_IN {roles:['Stacey Pilgrim']}]->(ScottVsWorld),
(Brie)-[:ACTED_IN {roles:['Envy Adams']}]->(ScottVsWorld),
(Aubrey)-[:ACTED_IN {roles:['Julie Powers']}]->(ScottVsWorld),
(Mary)-[:ACTED_IN {roles:['Ramona Flowers']}]->(ScottVsWorld),
(Kieran)-[:ACTED_IN {roles:['Wallace Wells']}]->(ScottVsWorld),
(Chris)-[:ACTED_IN {roles:['Lucas Lee']}]->(ScottVsWorld),
(Edgar)-[:DIRECTED]->(ScottVsWorld);
```

```sql
MATCH (p:Person)-[:ACTED_IN]->(m:Movie)
WHERE p.name = "Aubrey Plaza"
RETURN m.title;
```

-   It's actually pretty easy when you see it written out. That's one of the nice parts of Cypher is that it reads well for the most part. It can start having a lot of `([{}])` which can get to be a bit much.
-   The `>` part of `->` is optional. If you omit the direction in the query it just assumes you're saying "find me a relationship here, I don't care which way the direction goes."

One thing you'll notice is that Aubrey Plaza isn't connected to any of the other people directly, just via being attached to the same movie. What if we wanted to find every person who acted in the same movie as Aubrey (in this case everyone we've added so far.)

```sql
MATCH (p:Person)-[:ACTED_IN]->(Movie)<-[:ACTED_IN]-(q:Person)
WHERE p.name = "Aubrey Plaza" AND q.name <> "Aubrey Plaza"
RETURN q.name;
```

-   There you go! We just describe out the relationship a bit further and use those variables.
-   `<>` is how you do not equals in Cypher
-   Technically Aubrey was in the movie with herself? In any case we have to say don't include her in the results if we don't want to have her.

But what if we wanted to find everyone who was younger than Aubrey that acted in the same movie?

```sql
MATCH (p:Person)-[:ACTED_IN]->(Movie)<-[:ACTED_IN]-(q:Person)
WHERE p.name = "Aubrey Plaza" AND q.born > p.born
RETURN q.name;
```

## Constraint

Just like in the other databases you can enforce uniqueness which can be helpful. Here's how you'd do that (though a bad idea in this case because there are lots of actors, actresses, and directors named the same thing as there are multiple movies called the same thing.)

```sql
CREATE CONSTRAINT ON (a:Person) ASSERT a.name IS UNIQUE;
CREATE CONSTRAINT ON (a:Movie) ASSERT a.title IS UNIQUE;
```