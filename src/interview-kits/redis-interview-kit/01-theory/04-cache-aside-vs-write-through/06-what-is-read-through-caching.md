# What is read-through caching?

**Definition:**
A cache layer (library, sidecar, or Redis module) loads the DB on miss on behalf of the client. The app always 'reads from cache'. It is cache-aside with the miss path centralized. Write-through is the write analog. Helps keep miss logic consistent across services.

**Key points:**
- Good for many services sharing a cache client.
- Stampede control can live in one place.
- Harder to debug than explicit app code if it is a black box.
- Still need a DB.
- Similar to CDN origin-fetch for HTTP.
