# 3. Indexing & The ESR (Equality, Sort, Range) Rule



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
