# Find duplicate characters

A duplicate character appears more than once.

Example: `"programming"` → `["r", "g", "m"]`

### Without built-in methods

// Use frequency counts to identify duplicate characters.

```
function findDuplicates(str) {
  const frequency = {};
  const duplicates = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (frequency[char] === undefined) {
      frequency[char] = 1;
    } else {
      frequency[char]++;
    }
  }

  // Add each repeated character only once.
  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (frequency[char] > 1) {
      let alreadyAdded = false;

      // Check whether this duplicate was already collected.
      for (let j = 0; j < duplicates.length; j++) {
        if (duplicates[j] === char) {
          alreadyAdded = true;
          break;
        }
      }

      if (!alreadyAdded) {
        duplicates[duplicates.length] = char;
      }

      // Prevent processing this character again.
      frequency[char] = -1;
    }
  }

  return duplicates;
}

console.log(findDuplicates("programming")); // ["r", "g", "m"]
```

Explanation:

- Count the occurrences of each character.
- Look for characters with a count greater than `1`.
- Add each duplicate only once.
- Return the duplicate characters in the order of their first appearance.

### With built-in methods

// Filter characters that appear more than once.

```
function findDuplicates(str) {
  const chars = [...str];

  return [...new Set(
    chars.filter((char) =>
      chars.filter((item) => item === char).length > 1
    )
  )];
}

console.log(findDuplicates("programming")); // ["r", "g", "m"]
```

Explanation:

- `filter()` selects characters occurring multiple times.
- `Set` removes duplicate entries from the resulting array.

Gotcha: The built-in solution is easy to understand, but it is less efficient for long strings because it repeatedly scans the array.
