# 4. Aggregation Pipeline Framework

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
