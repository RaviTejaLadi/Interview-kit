# What are common Redis use cases?

Redis is commonly used for the following purposes.

1\. Caching

Store frequently accessed database results in Redis to reduce database queries and API response times.

Example: Product details, user profiles, dashboard statistics.

2\. Session management

Store login session identifiers, expiration times, and related session data.

Example: Maintaining sessions across multiple Node.js servers.

3\. Rate limiting

Count requests over a time window to prevent clients from sending too many requests.

Example: Allowing 100 API requests per minute per user.

4\. Queues and background jobs

Coordinate tasks such as sending emails, processing files, and generating reports. Libraries such as BullMQ use Redis for job processing.

Example: Processing uploaded documents without blocking an API response.

5\. Real-time features

Use Redis Pub/Sub or Streams for event distribution, notifications, and real-time data workflows.

Example: Broadcasting notifications to connected application servers.

### Practical example: Redis caching with Node.js

Install the Redis client:

```
# Install the Redis client for Node.js
npm install redis
```

The following example assumes Redis is running locally on port `6379` and your application has a database function named `getUserFromDatabase`.

```
// cache.js — Cache user data in Redis for 60 seconds.
import { createClient } from "redis";

const redis = createClient({
  url: "redis://localhost:6379",
});

redis.on("error", (error) => {
  console.error("Redis connection error:", error);
});

await redis.connect();

export async function getUser(userId) {
  const cacheKey = `user:${userId}`;

  // 1. Check Redis first.
  const cachedUser = await redis.get(cacheKey);

  if (cachedUser !== null) {
    return JSON.parse(cachedUser);
  }

  // 2. Fall back to the database on a cache miss.
  const user = await getUserFromDatabase(userId);

  if (user === null) {
    return null;
  }

  // 3. Cache the result for 60 seconds.
  await redis.set(cacheKey, JSON.stringify(user), {
    EX: 60,
  });

  return user;
}
```

How it works:

1. The application checks Redis for `user:123`.
2. If the key exists, it returns the cached data.
3. If the key is missing, it queries the database.
4. It stores the result in Redis with a 60-second expiration.

This pattern is called cache-aside.

Production considerations: Handle Redis connection failures, validate cached data, and invalidate or refresh cached values when the underlying database record changes. The example assumes `getUserFromDatabase` is implemented elsewhere.
