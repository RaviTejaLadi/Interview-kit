# Find the longest word.

Find the word containing the greatest number of characters.

Input: `"I love JavaScript programming"`

Output: `"programming"`

### Without built-in methods

// Track each word's length while scanning the sentence.

```
function longestWord(str) {
  let currentWord = "";
  let longest = "";

  for (let i = 0; i <= str.length; i++) {
    if (i < str.length && str[i] !== " ") {
      currentWord += str[i];
    } else {
      if (currentWord.length > longest.length) {
        longest = currentWord;
      }

      currentWord = "";
    }
  }

  return longest;
}

console.log(longestWord("I love JavaScript programming"));
// "programming"
```

Explanation:

1. Build the current word one character at a time.
2. When a space or the end of the string is reached, compare its length with the longest word.
3. Update `longest` when the current word is longer.
4. Return the longest word after scanning the sentence.

If two words have equal maximum lengths, this version returns the first one.

### With built-in methods

// Split the sentence into words and find the longest.

```
function longestWord(str) {
  return str
    .trim()
    .split(/\s+/)
    .reduce(
      (longest, word) =>
        word.length > longest.length ? word : longest,
      ""
    );
}

console.log(longestWord("I love JavaScript programming"));
// "programming"
```

Explanation:

- `trim()` removes surrounding whitespace.
- `split(/\s+/)` separates the words.
- `reduce()` compares each word with the current longest word.
- The longest word is returned.

Edge case: If the sentence is empty or contains only whitespace, the second solution returns an empty string.
