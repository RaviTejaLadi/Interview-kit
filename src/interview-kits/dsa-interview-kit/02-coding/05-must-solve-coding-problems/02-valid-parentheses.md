# Valid Parentheses

Given a string containing only `()[]{}`, return `true` if the input is valid.

## Approach

Use a stack for opening brackets. On every closing bracket, verify it matches the stack top.

- Time: `O(n)`
- Space: `O(n)`

```javascript
function isValid(s) {
  const pairs = new Map([
    [')', '('],
    [']', '['],
    ['}', '{'],
  ]);
  const stack = [];

  for (const ch of s) {
    if (!pairs.has(ch)) {
      stack.push(ch);
      continue;
    }

    if (stack.pop() !== pairs.get(ch)) {
      return false;
    }
  }

  return stack.length === 0;
}
```
