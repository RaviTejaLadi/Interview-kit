# Check if two strings are anagrams.

Two strings are anagrams if they contain the same characters with the same frequencies.

Example: `"listen"` and `"silent"` → `true`

### Without built-in methods

// Count each character in both strings.

```
function areAnagrams(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  const frequency = {};

  // Add character counts from the first string.
  for (let i = 0; i < str1.length; i++) {
    const char = str1[i];
    frequency[char] = (frequency[char] || 0) + 1;
  }

  // Subtract counts using the second string.
  for (let i = 0; i < str2.length; i++) {
    const char = str2[i];

    if (!frequency[char]) {
      return false;
    }

    frequency[char]--;
  }

  return true;
}

console.log(areAnagrams("listen", "silent")); // true
console.log(areAnagrams("hello", "world"));   // false
```

Explanation:

- Different lengths immediately mean the strings cannot be anagrams.
- The first loop counts every character.
- The second loop reduces those counts.
- A missing character or exhausted count means the strings are not anagrams.

### With built-in methods

// Sort both strings and compare their characters.

```
function areAnagrams(str1, str2) {
  const first = str1.split("").sort().join("");
  const second = str2.split("").sort().join("");

  return first === second;
}

console.log(areAnagrams("listen", "silent")); // true
console.log(areAnagrams("hello", "world"));   // false
```

Explanation: Sorting puts the characters in a consistent order. If the sorted strings match, the original strings contain the same characters.

Note: These examples are case-sensitive and treat spaces as characters.