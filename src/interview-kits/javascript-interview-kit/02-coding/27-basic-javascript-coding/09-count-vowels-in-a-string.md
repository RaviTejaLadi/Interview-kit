# Count vowels in a string.

Vowels are `a`, `e`, `i`, `o`, and `u`.

Example: `"Hello World"` → `3`

### Without built-in methods

// Count vowels using a loop and character comparisons.

```
function countVowels(str) {
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i].toLowerCase();

    if (
      char === "a" ||
      char === "e" ||
      char === "i" ||
      char === "o" ||
      char === "u"
    ) {
      count++;
    }
  }

  return count;
}

console.log(countVowels("Hello World")); // 3
```

Explanation:

- Loop through each character.
- Convert it to lowercase so uppercase vowels are also counted.
- Increase `count` whenever the character is a vowel.

### With built-in methods

// Match vowel characters with a regular expression.

```
function countVowels(str) {
  const matches = str.match(/[aeiou]/gi);

  return matches ? matches.length : 0;
}

console.log(countVowels("Hello World")); // 3
console.log(countVowels("rhythm"));      // 0
```

Explanation:

- `[aeiou]` matches any vowel.
- `g` finds all matches.
- `i` ignores case.
- `match()` returns `null` when no vowels are found, so we return `0` in that case.
