# 🔴 Redis Interview Questions

# 📚 PART 1 — THEORY QUESTIONS

---

## 1. What Redis Is ⭐⭐⭐⭐⭐

1. What is Redis?
2. Why is Redis so fast?
3. Is Redis single-threaded?
4. What are common Redis use cases?
5. How does Redis clustering and replication work at a high level?
6. What should you not use Redis for?
7. How do you monitor Redis in production?

---

## 2. Strings, Hashes, Lists, Sets & Sorted Sets ⭐⭐⭐⭐⭐

1. How do Redis strings work?
2. When should you use Redis hashes?
3. How do Redis lists work?
4. How do Redis sets work?
5. How do Redis sorted sets work?
6. How do you choose among string, hash, list, set, and zset?
7. What are Redis keys naming conventions?

---

## 3. TTL ⭐⭐⭐⭐⭐

1. What is a TTL in Redis?
2. How does Redis expire keys internally?
3. What is the difference between EXPIRE and EXPIREAT?
4. Does reading a key refresh its TTL?
5. How do TTLs interact with hashes and lists?
6. How do you implement a cache entry with TTL in the client?
7. What is KEEPTTL and why does it matter?

---

## 4. Cache-Aside vs Write-Through ⭐⭐⭐⭐⭐

1. What is cache-aside (lazy loading)?
2. What is write-through caching?
3. What is write-behind (write-back)?
4. Should you update the cache or delete the key on write?
5. How do you keep cache and database consistent?
6. What is read-through caching?
7. How do you cache database query results vs objects?

---

## 5. Eviction Policies ⭐⭐⭐⭐⭐

1. What happens when Redis runs out of memory?
2. What is LRU eviction?
3. What is LFU eviction?
4. What is volatile-ttl and volatile-random?
5. How should you split Redis instances by workload?
6. What is a hot key and how do you handle it?
7. How do you capacity-plan Redis memory?

---

## 6. Persistence: RDB & AOF ⭐⭐⭐⭐⭐

1. What is RDB persistence?
2. What is AOF persistence?
3. How do you choose RDB vs AOF vs both vs none?
4. What is the fork / copy-on-write problem?
5. How does persistence interact with replication?
6. How do you restore Redis from persistence?
7. Is Redis durable enough to be a primary database?

---

## 7. Pub/Sub vs Streams ⭐⭐⭐⭐

1. How does Redis pub/sub work?
2. What are Redis Streams?
3. When do you choose pub/sub vs streams vs lists?
4. How do consumer groups handle crashes?
5. What are keyspace notifications?
6. How do you scale Redis messaging?
7. How would you implement cache invalidation fan-out?

---

## 8. Distributed Locks ⭐⭐⭐⭐⭐

1. How do you take a distributed lock in Redis?
2. Why must unlock check the token?
3. What is Redlock?
4. What is a fencing token?
5. How do you use locks for cache stampede?
6. What are lock TTL and watchdog (auto-extend) trade-offs?
7. When should you not use a Redis lock?

---

## 9. Redis vs Memcached ⭐⭐⭐⭐

1. What is Memcached?
2. How does Redis differ from Memcached?
3. When would you still pick Memcached?
4. How does eviction differ?
5. How do clustering and high availability compare?
6. Can Memcached do rate limiting and leaderboards?
7. How would you explain Redis vs Memcached in 60 seconds?

---

# 💻 PART 2 — CODING QUESTIONS

---

## 10. Rate Limiter with INCR + TTL ⭐⭐⭐⭐⭐

1. Implement a fixed-window rate limiter with INCR and EXPIRE
2. Why is INCR then EXPIRE as two commands a race?
3. Upgrade the limiter to a sliding window with a sorted set
4. Return rate-limit headers from the limiter
5. How do you rate-limit by API key and by IP together?

---

## 11. Leaderboard with Sorted Sets ⭐⭐⭐⭐⭐

1. Implement submitScore and topN with a sorted set
2. How do you get a user's rank and neighbors?
3. How do you increment a score atomically?
4. How do you expire old time-windowed leaderboards?
5. How do you scale a huge leaderboard?

---

## 12. Cache Stampede / Lock ⭐⭐⭐⭐⭐

1. What is a cache stampede (thundering herd)?
2. Implement singleflight with SET NX EX on cache miss
3. Implement stale-while-revalidate with two keys
4. Why add jitter to TTLs?
5. How do you prevent stampede when Redis is flushed?

---
