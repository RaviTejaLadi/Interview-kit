# Why is Redis so fast?

Redis is fast because of a combination of design choices.

1. In-memory storage: Data is usually accessed from RAM instead of disk.
2. Efficient data structures: Redis uses implementations optimized for common operations.
3. Low protocol overhead: Its RESP protocol is lightweight and efficient.
4. Event-driven architecture: It can process many client connections without needing one thread per connection.
5. Minimal query overhead: Many commands perform direct operations on data structures without parsing complex SQL queries or planning joins.

### Example: Database vs. Redis caching

Imagine your API retrieves a user's profile for every request.

Without caching:

Client requests profile

API server

Database query on every request

With Redis caching:

Client requests profile

API checks Redis

Cache hit

Return cached data

Cache miss

Query database

A cache hit avoids the database query, reducing response time and database load.

Important: Redis is not automatically faster for every workload. Network latency, command complexity, data size, serialization, and memory pressure also affect performance.
