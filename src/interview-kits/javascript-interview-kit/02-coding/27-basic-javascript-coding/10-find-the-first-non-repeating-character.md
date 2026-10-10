# Find the first non-repeating character.

A non-repeating character occurs exactly once in a string.

Example: `"aabbcde"` → `"c"`

### Without built-in methods

// Count each character, then find the first character with count one.

```
function firstNonRepeating(str) {
  const frequency = {};

  // First pass: count every character.
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    frequency[char] = (frequency[char] || 0) + 1;
  }

  // Second pass: preserve the original character order.
  for (let i = 0; i < str.length; i++) {
    if (frequency[str[i]] === 1) {
      return str[i];
    }
  }

  return null;
}

console.log(firstNonRepeating("aabbcde")); // "c"
console.log(firstNonRepeating("aabb"));    // null
```

Explanation:

- The first loop calculates character frequencies.
- The second loop checks characters in their original order.
- The first character with a frequency of `1` is returned.
- If no such character exists, return `null`.

### With built-in methods

// Use find() to locate the first character that appears once.

```
function firstNonRepeating(str) {
  const chars = [...str];

  return chars.find(
    (char) => chars.filter((item) => item === char).length === 1
  ) ?? null;
}

console.log(firstNonRepeating("aabbcde")); // "c"
```

Explanation:

- `find()` returns the first character satisfying the condition.
- `filter()` collects matching characters.
- If the matching count is `1`, the character is unique.
- `?? null` provides a fallback when no character matches.

Interview tip: The first solution is more efficient: \\(O(n)\\) time on average, compared with \\(O(n^2)\\) for the second solution.