# When is a heap (priority queue) the best fit?

Use a heap when you repeatedly need the smallest/largest element while data keeps changing.

## High-frequency interview use cases

- Top K frequent elements
- Kth largest/smallest element
- Merge K sorted lists
- Scheduling and interval problems
- Dijkstra-like shortest path processing

## Complexity snapshot

- Insert: `O(log n)`
- Remove min/max: `O(log n)`
- Peek min/max: `O(1)`
