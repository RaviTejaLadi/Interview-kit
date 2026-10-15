# Reverse words in a sentence.

Input: `"JavaScript is awesome"`

Output: `"awesome is JavaScript"`

### Without built-in methods

// Reverse word order by scanning the sentence backward.

```
function reverseWords(str) {
  let result = "";
  let word = "";

  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] !== " ") {
      word = str[i] + word;
    } else if (word !== "") {
      if (result !== "") result += " ";
      result += word;
      word = "";
    }
  }

  if (word !== "") {
    if (result !== "") result += " ";
    result += word;
  }

  return result;
}

console.log(reverseWords("JavaScript is awesome"));
// "awesome is JavaScript"
```

Explanation:

- Traverse the sentence from right to left.
- Build each word character by character.
- When you encounter a space, append the completed word to the result.
- Add the final word after the loop.

This version also avoids extra spaces in the output.

### With built-in methods

// Reverse the array of words.

```
function reverseWords(str) {
  return str.trim().split(/\s+/).reverse().join(" ");
}

console.log(reverseWords("JavaScript is awesome"));
// "awesome is JavaScript"
```

Explanation:

- `trim()` removes leading and trailing whitespace.
- `split(/\s+/)` separates words using one or more whitespace characters.
- `reverse()` reverses their order.
- `join(" ")` joins them with a single space.

Key concept: Reversing a string reverses its characters; reversing words changes the order of the words while preserving each word's spelling.
