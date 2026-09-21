# Binary Tree Level Order Traversal

Return values of a binary tree level by level from left to right.

## Approach

Use BFS with a queue. For each level, process exactly `queue.length` nodes.

- Time: `O(n)`
- Space: `O(n)`

```javascript
function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length) {
    const levelSize = queue.length;
    const level = [];

    for (let i = 0; i < levelSize; i += 1) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}
```
