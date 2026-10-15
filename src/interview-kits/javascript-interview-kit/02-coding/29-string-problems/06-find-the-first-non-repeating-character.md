# Find the first non-repeating character.

Return the first character that appears exactly once.

Input: `"aabbcdde"`

Output: `"c"`

### Without built-in methods

// Count each character, then find the first character with count one.

```
function firstNonRepeating(str) {
  const frequency = {};

  for (let i = 0; i < str.length; i++) {
    frequency[str[i]] = (frequency[str[i]] || 0) + 1;
  }

  for (let i = 0; i < str.length; i++) {
    if (frequency[str[i]] === 1) {
      return str[i];
    }
  }

  return null;
}

console.log(firstNonRepeating("aabbcdde")); // "c"
console.log(firstNonRepeating("aabb"));     // null
```

Explanation:

1. Count the occurrences of every character.
2. Traverse the original string again.
3. Return the first character whose frequency is `1`.
4. Return `null` if no such character exists.

### With built-in methods

// Use indexOf() and lastIndexOf() to find a unique character.

```
function firstNonRepeating(str) {
  for (const char of str) {
    if (str.indexOf(char) === str.lastIndexOf(char)) {
      return char;
    }
  }

  return null;
}

console.log(firstNonRepeating("aabbcdde")); // "c"
console.log(firstNonRepeating("aabb"));     // null
```

Explanation:

- `indexOf(char)` returns the first occurrence of a character.
- `lastIndexOf(char)` returns its last occurrence.
- If both positions are equal, that character occurs only once.

Key concept: `indexOf()` and `lastIndexOf()` are convenient, but repeatedly searching a string can make this solution (O(n^2)) in the worst case.
