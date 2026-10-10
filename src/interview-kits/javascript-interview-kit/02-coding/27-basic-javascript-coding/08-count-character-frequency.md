# Count character frequency.

Character frequency tells you how many times each character occurs.

Example: `"hello"` → `{ h: 1, e: 1, l: 2, o: 1 }`

### Without built-in methods

// Count characters using an object and a loop.

```
function countFrequency(str) {
  const frequency = {};

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (frequency[char] === undefined) {
      frequency[char] = 1;
    } else {
      frequency[char]++;
    }
  }

  return frequency;
}

console.log(countFrequency("hello"));
// { h: 1, e: 1, l: 2, o: 1 }
```

Explanation:

- Visit each character.
- If the character has not been counted, initialize it to `1`.
- Otherwise, increment its count.

### With built-in methods

// Count characters using Object.groupBy-compatible logic via reduce().

```
function countFrequency(str) {
  return [...str].reduce((frequency, char) => {
    frequency[char] = (frequency[char] || 0) + 1;
    return frequency;
  }, {});
}

console.log(countFrequency("hello"));
// { h: 1, e: 1, l: 2, o: 1 }
```

Explanation:

- `[...str]` converts the string into an array of Unicode code points.
- `reduce()` builds the frequency object.
- `(frequency[char] || 0) + 1` increments the existing count or starts it at `1`.