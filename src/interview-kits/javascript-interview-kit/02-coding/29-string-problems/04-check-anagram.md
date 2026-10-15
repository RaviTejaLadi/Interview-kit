# Check anagram.

Anagrams contain the same characters with the same frequencies, but the characters may appear in a different order.

Input: `"listen"`, `"silent"`

Output: `true`

### Without built-in methods

// Check whether both strings contain identical character frequencies.

```
function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;

  const frequency = {};

  for (let i = 0; i < str1.length; i++) {
    const char = str1[i];
    frequency[char] = (frequency[char] || 0) + 1;
  }

  for (let i = 0; i < str2.length; i++) {
    const char = str2[i];

    if (!frequency[char]) return false;

    frequency[char]--;
  }

  return true;
}

console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world"));   // false
```

Explanation:

1. If the string lengths differ, they cannot be anagrams.
2. Count each character in the first string.
3. Decrease the corresponding count for every character in the second string.
4. If a character is missing or its count is zero, return `false`.
5. If all characters match, return `true`.

### With built-in methods

// Sort both strings and compare their characters.

```
function isAnagram(str1, str2) {
  const first = str1.split("").sort().join("");
  const second = str2.split("").sort().join("");

  return first === second;
}

console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world"));   // false
```

Explanation:

- `split("")` converts each string into an array.
- `sort()` arranges characters alphabetically.
- `join("")` converts the arrays back into strings.
- If the sorted strings match, they are anagrams.

Interview tip: The frequency-counting approach takes (O(n)) time on average. Sorting generally takes (O(n \log n)) time.
