# 🍃 MongoDB Interview Questions

---

# 📚 PART 1 — THEORY QUESTIONS

---

## 1. MongoDB Fundamentals & Document Model ⭐⭐⭐⭐⭐

### Must Know

1. What is MongoDB and what kind of database is it (NoSQL, Document-oriented)?
2. What is BSON (Binary JSON) and how does it differ from standard JSON?
3. Relational databases (Tables/Rows/Columns) vs MongoDB (Databases/Collections/Documents).
4. What is the maximum document size limit in MongoDB (16MB) and why does this limit exist?
5. What is the `_id` field and what is an `ObjectId` (timestamp, machine ID, process ID, counter)?
6. Is MongoDB schemaless or flexible schema?
7. What are the advantages of MongoDB over traditional relational databases?

---

## 2. Schema Design: Embedding vs Referencing ⭐⭐⭐⭐⭐

### Must Know

1. What is Embedding (Denormalization)?
2. What is Referencing (Normalization)?
3. When should you Embed child data (1-to-few, data read together, atomic updates)?
4. When should you Reference child data (1-to-many, 1-to-squillions, unbounded growth, avoiding 16MB limit)?
5. What are the common MongoDB Schema Design Patterns (Subset Pattern, Bucket Pattern, Extended Reference Pattern)?
6. How do you model Many-to-Many relationships in MongoDB?

---

## 3. Indexing & The ESR (Equality, Sort, Range) Rule ⭐⭐⭐⭐⭐

### Must Know

1. What is an Index and why is it essential for query performance?
2. What is a Collection Scan (`COLLSCAN`) vs Index Scan (`IXSCAN`)?
3. How do you inspect query execution plans using `explain("executionStats")`?
4. What are the common index types (Single field, Compound, Multikey, Partial, TTL, Text, Sparse)?
5. What is the **ESR Rule** for compound indexes?
   - **[E]quality** fields first
   - **[S]ort** fields second
   - **[R]ange** fields last
6. Why does violating the ESR rule cause in-memory sorting (`SORT_KEY_GENERATOR`)?
7. What is a Covered Query and why is it the fastest type of query in MongoDB?
8. What is a Multikey Index (indexing arrays) and what are its limitations?

---

## 4. Aggregation Pipeline Framework ⭐⭐⭐⭐⭐

### Must Know

1. What is the Aggregation Pipeline in MongoDB?
2. What are the most common aggregation pipeline stages?
   - `$match` (filtering)
   - `$project` (reshaping/adding fields)
   - `$group` (aggregation & accumulators: `$sum`, `$avg`, `$min`, `$max`)
   - `$lookup` (left outer joins)
   - `$unwind` (deconstructing arrays)
   - `$sort`, `$skip`, `$limit`
3. Why should `$match` stages be placed as early as possible in the pipeline (index usage)?
4. What is the 100MB RAM memory limit per aggregation stage?
5. What does `{ allowDiskUse: true }` do and what are its performance trade-offs?

---

## 5. Replication, Consensus & High Availability ⭐⭐⭐⭐⭐

### Must Know

1. What is a Replica Set in MongoDB?
2. What is the role of the Primary node vs Secondary nodes?
3. How does automatic failover and election work when the Primary goes down (Raft/Paxos consensus)?
4. What is the **Oplog** (Operations Log) and how do secondaries sync with the Primary?
5. What is **Write Concern** (`w: 1`, `w: "majority"`, `j: true`)?
6. What is **Read Preference** (`primary`, `primaryPreferred`, `secondary`, `secondaryPreferred`, `nearest`)?
7. What is **Read Concern** (`local`, `majority`, `linearizable`, `snapshot`)?

---

## 6. Sharding & Horizontal Scaling ⭐⭐⭐⭐

### Must Know

1. Vertical scaling vs Horizontal scaling (Sharding).
2. What are the core components of a Sharded Cluster?
   - Shards (store data chunks)
   - Config Servers (store cluster metadata)
   - Mongos (query routers)
3. What is a Shard Key and why is choosing the right shard key irreversible and critical?
4. What are Range-based Sharding vs Hashed Sharding?
5. What is a Jumbo Chunk and how does poor shard key cardinality cause it?

---

## 7. ACID Transactions & Concurrency ⭐⭐⭐⭐

### Must Know

1. Are single-document operations in MongoDB atomic?
2. Does MongoDB support Multi-Document ACID Transactions? (Yes, since v4.0/4.2).
3. How do Multi-Document Transactions work using sessions?
4. What is WiredTiger's concurrency control (document-level locking and Snapshot Isolation)?
5. What are write conflicts and transient transaction errors?
6. When should you use transactions vs single-document atomic updates?

---

# 💻 PART 2 — CODING & PRACTICAL QUESTIONS

---

## 8. Aggregation Pipeline Queries ⭐⭐⭐⭐⭐

### Must Write / Solve

1. Write a pipeline to calculate total revenue, average order value, and item counts grouped by month.
2. Write a pipeline using `$lookup` to join an `orders` collection with a `users` collection.
3. Write a pipeline using `$unwind` to count the most popular tags across all blog posts.
4. Write a pipeline using `$facet` to execute multiple aggregation pipelines within a single stage (e.g. paginated results + total count).

---

## 9. Mongoose & Schema Modeling Coding ⭐⭐⭐⭐⭐

### Must Implement

1. Build a production Mongoose schema with type validation, required fields, and unique indexes.
2. Implement pre-save middleware (`pre('save')`) to hash passwords with bcrypt.
3. Implement virtual fields (`toJSON: { virtuals: true }`) and custom instance methods.
4. Configure compound indexes following the ESR rule on a Mongoose schema.

---

## 10. Transactions & CRUD Operations Coding ⭐⭐⭐⭐⭐

### Must Implement

1. Implement a bank transfer function executing an atomic multi-document transaction with session rollback.
2. Write atomic counter updates using `$inc` without race conditions.
3. Update an element inside an embedded array using positional array operators (`$`, `$[<identifier>]`).
4. Implement atomic upsert operations using `findOneAndUpdate` with `{ upsert: true }`.

---

# 🧠 PART 3 — MUST-KNOW ADVANCED TOPICS

---

## 11. The ESR Rule Visual Guide ⭐⭐⭐⭐⭐

```text
Query: db.orders.find({ status: "active", total: { $gte: 100 } }).sort({ orderDate: -1 })

❌ BAD INDEX:  { total: 1, status: 1, orderDate: -1 }  (Range first kills sort & equality)
✅ BEST INDEX: { status: 1, orderDate: -1, total: 1 }  (Equality -> Sort -> Range)
```

---

# 🏆 TOP 25 — If You Have Very Little Time

### 🔥 Theory
1. BSON vs JSON
2. Embedding vs Referencing
3. 16MB document size limit
4. Index types & Collection Scan (`COLLSCAN`) vs Index Scan (`IXSCAN`)
5. The ESR Rule for compound indexes
6. Covered queries
7. Aggregation pipeline stages (`$match`, `$group`, `$lookup`, `$unwind`)
8. 100MB aggregation memory limit & `allowDiskUse`
9. Replica set architecture (Primary, Secondaries, Oplog)
10. Write Concern (`w: majority`) & Read Concern
11. Shard keys & horizontal scaling
12. Single-document atomicity
13. Multi-document ACID transactions
14. WiredTiger document-level locking
15. TTL (Time-To-Live) indexes for session expiry

### 💻 Coding
16. Multi-stage analytics aggregation pipeline
17. Left outer join with `$lookup` and `$unwind`
18. Multi-document ACID transaction with session rollback
19. Mongoose schema with pre-save password hashing hook
20. Atomic increment update with `$inc`
21. Updating nested array item with positional operator (`$`)
22. Index creation adhering to the ESR rule
23. Faceted search query with `$facet`
24. Explain plan analysis with `explain("executionStats")`
25. Upsert pattern with `findOneAndUpdate`
