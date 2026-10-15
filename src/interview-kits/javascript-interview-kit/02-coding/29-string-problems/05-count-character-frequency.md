# Count character frequency.

Find how many times each character appears in a string.

Input: `"banana"`

Output: `b: 1, a: 3, n: 2`

### Without built-in methods

// Count character occurrences using an object and nested loops.

```
function characterFrequency(str) {
  const frequency = {};

  for (let i = 0; i < str.length; i++) {
    let found = false;

    for (let key in frequency) {
      if (key === str[i]) {
        frequency[key]++;
        found = true;
        break;
      }
    }

    if (!found) {
      frequency[str[i]] = 1;
    }
  }

  return frequency;
}

console.log(characterFrequency("banana"));
// { b: 1, a: 3, n: 2 }
```

Explanation:

- Visit every character.
- Check whether that character already exists in the frequency object.
- If it exists, increment its count.
- Otherwise, initialize its count to `1`.

This version avoids using methods such as `includes()`, `indexOf()`, and `Object.hasOwn()`.

### With built-in methods

// Count characters using a Map.

```
function characterFrequency(str) {
  const frequency = new Map();

  for (const char of str) {
    frequency.set(char, (frequency.get(char) || 0) + 1);
  }

  return Object.fromEntries(frequency);
}

console.log(characterFrequency("banana"));
// { b: 1, a: 3, n: 2 }
```

Explanation:

- `Map` stores characters as keys and their counts as values.
- `get()` retrieves the current count.
- `set()` updates the count.
- `Object.fromEntries()` converts the map into an object.

Interview tip: The second solution takes (O(n)) time on average and is more efficient than scanning every existing key for each character.
