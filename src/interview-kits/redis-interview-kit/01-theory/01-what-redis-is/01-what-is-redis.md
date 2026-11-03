# What is Redis?

Redis (Remote Dictionary Server) is an open-source, in-memory data structure store that can be used as a database, cache, message broker, and streaming engine.

Unlike traditional databases that commonly read data from disk, Redis primarily keeps its working data in RAM, allowing very fast access.

Redis supports several data structures:

- Strings: Store text, numbers, tokens, or serialized JSON.
- Hashes: Store objects with field-value pairs.
- Lists: Store ordered collections of values.
- Sets: Store unique values.
- Sorted sets: Store values ordered by scores.
- Streams: Store ordered event records.
- Bitmaps and HyperLogLogs: Support compact counting and analytics operations.

For example, an application might use PostgreSQL to store user information permanently and Redis to cache frequently requested user data.
