# BFS vs DFS: when should you choose each?

## Choose BFS when

- You need shortest path in an unweighted graph.
- You need nearest/minimum-step result.

## Choose DFS when

- You need exhaustive exploration, cycle detection, or topological reasoning.
- Recursion/backtracking fits naturally.

## Complexity

Both are typically `O(V + E)` for graphs, but memory usage differs:

- BFS may use more memory on wide levels.
- DFS recursion may hit stack depth limits on deep graphs.
