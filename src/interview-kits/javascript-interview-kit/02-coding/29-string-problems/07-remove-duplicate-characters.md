# Remove duplicate characters.

Keep only the first occurrence of each character.

Input: `"programming"`

Output: `"progamin"`

### Without built-in methods

// Build a new string without adding characters that already exist.

```
function removeDuplicates(str) {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    let found = false;

    for (let j = 0; j < result.length; j++) {
      if (str[i] === result[j]) {
        found = true;
        break;
      }
    }

    if (!found) {
      result += str[i];
    }
  }

  return result;
}

console.log(removeDuplicates("programming")); // "progamin"
```

Explanation:

1. Start with an empty result.
2. Check whether the current character is already in the result.
3. Add it only if it is not present.
4. Continue until every character has been processed.

### With built-in methods

// Use Set to preserve unique characters in their original order.

```
function removeDuplicates(str) {
  return [...new Set(str)].join("");
}

console.log(removeDuplicates("programming")); // "progamin"
```

Explanation:

- `Set` stores unique values.
- Duplicate characters are automatically ignored.
- The spread operator converts the set into an array.
- `join("")` produces the final string.

Interview tip: `Set` preserves insertion order, so the first occurrence of each character remains in its original position.
