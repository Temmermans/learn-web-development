---
title: Neo4j Queries
date: "2021-06-08T09:00:00.000Z"
description: Build a CRUD API using express.js and MongoDB.
course: build-apis
order: 15
---

## Merge Command

Merge commend is used to either create a node with labels or properties if the node does not exist in the database or select the nodes with particular conditions if the nodes are already presents in the database.

```sql
MATCH (n) WHERE EXISTS(n.Gender)
Merge (gender:Gender{Gender:n.Gender})
return gender
```

### Merge Command - ON CREATE

When creating a new node, we would like to set the properties for this node at the same time, ON CREATE clause will allows the user to set properties at creation time.

```sql
MERGE (Yuki:Person{Name:"Yuki"})
ON CREATE SET Yuki.Gender = "Female"
RETURN Yuki.Name,Yuki.Gender
```

### Merge Command - ON MATCH

When traversing from the graph database to find some nodes with some conditions, we need to set some properties to those node at the same time for updating the information regarding to this node.

```sql
Merge (person:Person)
ON MATCH SET person.Is_Person = TRUE
RETURN person.Name, person.Is_Person
```

Using merge command we could find all the node with label Person and add a new property Is\_Person to be true

### Merge Command - Relationships

```sql
MATCH (girl:Person),(boy:Person)
WHERE girl.Name = "Yuki" AND boy.Name = "mika"
MERGE (girl)-[relationship:Has_A_Boy_Friend]->(boy)
RETURN girl,boy
```

## Set Command

SET Clause is to set and remove properties of nodes. If Yuki goes to Tokyo University, we could run the following command. We could use set clause to add school properties to Yuki, and remove the Is\_Person property we have set before.

```sql
MATCH (Yuki:Person)
WHERE Yuki.Name = "Yuki"
SET Yuki.School = "Tokyo University"
SET Yuki.Is_Person = NULL
RETURN Yuki
```

We could also use SET Clause to set multiple labels for some nodes,e.g,add two labels to Yuki which are Student and Gril.

```sql
MATCH (Yuki:Person)
WHERE Yuki.Name = "Yuki"
SET Yuki:Student:Gril
RETURN Yuki
```

## DELETE command

DELETE command is to delete specific nodes or relationships between nodes. Here we will learn some of the basic usage of delete clause in CQL.

### DELETE all

```sql
MATCH (node)
DETACH DELETE node
```

DETACH is to firstly delete the relationships between the nodes that we are going to delete.

### Delete selection

It is quite similar but still notice that when deleting a node, we should delete the relationships first.

```sql
MATCH (mika:Person)
WHERE mika.Name = "mika"
DETACH DELETE mika
```