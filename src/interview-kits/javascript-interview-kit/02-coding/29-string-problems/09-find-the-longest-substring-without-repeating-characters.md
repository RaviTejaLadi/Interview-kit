# Find the longest substring without repeating characters.

Find the longest continuous sequence of characters in which no character appears more than once.

Input: `"abcabcbb"`

Output: `"abc"` — length `3`

A substring must contain consecutive characters. You cannot skip characters as you would when finding a subsequence.

### Without built-in methods

// Use nested loops to examine every possible substring.

```
function longestUniqueSubstring(str) {
  let longest = "";

  for (let i = 0; i < str.length; i++) {
    let current = "";

    for (let j = i; j < str.length; j++) {
      let duplicate = false;

      for (let k = 0; k < current.length; k++) {
        if (current[k] === str[j]) {
          duplicate = true;
          break;
        }
      }

      if (duplicate) break;

      current += str[j];

      if (current.length > longest.length) {
        longest = current;
      }
    }
  }

  return longest;
}

console.log(longestUniqueSubstring("abcabcbb")); // "abc"
console.log(longestUniqueSubstring("pwwkew"));   // "wke"
```

Explanation:

1. Start at each character in the string.
2. Build a substring by moving forward.
3. Before adding a character, check whether it already exists in the current substring.
4. Stop extending that substring when a duplicate appears.
5. Keep the longest valid substring found.

This is a straightforward brute-force solution. The three nested loops can take (O(n^3)) time in the worst case.

### With built-in methods

// Use Set to track characters in a sliding window.

```
function longestUniqueSubstring(str) {
  let left = 0;
  let longest = "";
  const seen = new Set();

  for (let right = 0; right < str.length; right++) {
    while (seen.has(str[right])) {
      seen.delete(str[left]);
      left++;
    }

    seen.add(str[right]);

    if (right - left + 1 > longest.length) {
      longest = str.slice(left, right + 1);
    }
  }

  return longest;
}

console.log(longestUniqueSubstring("abcabcbb")); // "abc"
console.log(longestUniqueSubstring("pwwkew"));   // "wke"
```

Explanation:

This solution uses the sliding window technique, which maintains a range of characters without duplicates.

- `left` marks the start of the current window.
- `right` expands the window one character at a time.
- `Set` tracks the characters currently in the window.
- When a duplicate appears, remove characters from the left until the duplicate is gone.
- Update the longest substring whenever the current window becomes longer.

The algorithm takes (O(n)) time on average and (O(n)) additional space.
