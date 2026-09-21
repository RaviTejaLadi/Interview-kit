# What is Redis?

**Definition:**
Redis (Remote Dictionary Server) is an in-memory data structure store used as a cache, message broker, session store, and sometimes a primary database. It keeps data in RAM for microsecond-to-millisecond latency and optionally persists to disk. Values are not just strings: lists, hashes, sets, sorted sets, streams, and more.

**Key points:**
- In-memory first; disk is for durability, not the hot path.
- Single-threaded command execution (per event loop) avoids many lock races on the data model.
- Rich types distinguish it from memcached.
- Common uses: cache, rate limits, sessions, leaderboards, pub/sub, distributed locks, queues (streams).
- Open source; Redis Ltd. and forks (Valkey) exist — know the name in interviews, focus on the data model.
