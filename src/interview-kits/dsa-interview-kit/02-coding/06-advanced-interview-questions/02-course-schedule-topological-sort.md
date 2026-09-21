# Course Schedule (Topological Sort)

Given prerequisites as directed edges, determine whether all courses can be completed.

## Core idea

Model courses as a directed graph and detect cycle:

- If cycle exists -> cannot finish all courses
- If no cycle -> valid ordering exists

## Common solutions

1. Kahn's algorithm (BFS with in-degree)
2. DFS with recursion stack cycle detection

## Complexity

- Time: `O(V + E)`
- Space: `O(V + E)`
