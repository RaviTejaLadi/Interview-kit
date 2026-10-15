# Reverse a string

Example: `"hello"` → `"olleh"`

Logic: Start from the last character and move backward, adding each character to a new string.

### Without built-in methods

// Reverse a string using a loop.

```
function reverseString(str) {
  let reversed = "";

  // Read characters from right to left.
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  return reversed;
}

console.log(reverseString("hello")); // "olleh"
```

Explanation:

- `str.length - 1` gives the last character's index.
- The loop moves backward using `i--`.
- Each character is appended to `reversed`.

### With built-in methods

// Reverse a string using split(), reverse(), and join().

```
function reverseString(str) {
  return str.split("").reverse().join("");
}

console.log(reverseString("hello")); // "olleh"
```

Explanation:

- `split("")` converts the string into an array.
- `reverse()` reverses the array.
- `join("")` converts the array back into a string.

Note: `reverse()` mutates the array it operates on. `split("")` also splits UTF-16 code units, so it may not correctly reverse every emoji or combined character.
