# Number of Islands

Given a grid of `'1'` (land) and `'0'` (water), count connected islands.

## Approach

Traverse the grid. When you find unvisited land, run DFS/BFS to mark the whole island visited, then increase count.

- Time: `O(rows * cols)`
- Space: `O(rows * cols)` in worst case recursion/queue

```javascript
function numIslands(grid) {
  if (!grid.length) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      if (grid[r][c] === '1') {
        count += 1;
        dfs(r, c);
      }
    }
  }

  return count;
}
```
