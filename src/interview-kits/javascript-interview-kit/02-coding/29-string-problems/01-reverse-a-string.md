# Reverse a string.

Input: `"hello"`

Output: `"olleh"`

### Without built-in methods

// Reverse a string using a loop.

```
function reverseString(str) {
  let result = "";

  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }

  return result;
}

console.log(reverseString("hello")); // "olleh"
```

Explanation:

1. Start from the last character using `str.length - 1`.
2. Move backward through the string.
3. Append each character to `result`.
4. Return the reversed string.

### With built-in methods

// Reverse a string using split(), reverse(), and join().

```
function reverseString(str) {
  return str.split("").reverse().join("");
}

console.log(reverseString("hello")); // "olleh"
```

Explanation:

- `split("")` converts the string into an array of characters.
- `reverse()` reverses the array.
- `join("")` combines the characters into a string.

Key concept: Strings are immutable in JavaScript, so these methods create and manipulate an array rather than modifying the original string.
