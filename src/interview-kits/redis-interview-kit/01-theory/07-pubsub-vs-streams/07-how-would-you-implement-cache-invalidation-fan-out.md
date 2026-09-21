# How would you implement cache invalidation fan-out?

**Definition:**
On write, `DEL` local Redis and `PUBLISH invalidate user:42`. Other app instances drop in-process caches. This does not delete other Redis keys unless they subscribe and `DEL`. For multi-node Redis, invalidate the key on the shard that owns it (the writer already `DEL`s). In-process LRU is what pub/sub usually clears.

**Key points:**
- Redis is already shared — `DEL` is enough for Redis keys.
- Pub/sub is for process-local memory caches.
- Missed messages → rely on short local TTLs.
- Include a version in the payload.
- This is the standard 'how do you invalidate Node memory cache' answer.

```javascript
await redis.del(`user:${id}`);
await redis.publish('invalidate', `user:${id}`);
subscriber.on('message', (_ch, key) => localCache.delete(key));
```
