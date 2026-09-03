# What are the most common aggregation pipeline stages?

- `$match` (filtering)
   - `$project` (reshaping/adding fields)
   - `$group` (aggregation & accumulators: `$sum`, `$avg`, `$min`, `$max`)
   - `$lookup` (left outer joins)
   - `$unwind` (deconstructing arrays)
   - `$sort`, `$skip`, `$limit`
