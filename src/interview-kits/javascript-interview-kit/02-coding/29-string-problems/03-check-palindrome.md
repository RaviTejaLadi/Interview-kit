# Check palindrome.

A palindrome reads the same forward and backward.

Input: `"madam"`

Output: `true`

### Without built-in methods

// Compare characters from both ends.

```
function isPalindrome(str) {
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }

  return true;
}

console.log(isPalindrome("madam")); // true
console.log(isPalindrome("hello")); // false
```

Explanation:

1. Compare the first character with the last.
2. Compare the second character with the second-last.
3. If any pair differs, return `false`.
4. If every pair matches, return `true`.

We only need to check half of the string.

### With built-in methods

// Compare the original string with its reversed version.

```
function isPalindrome(str) {
  return str === str.split("").reverse().join("");
}

console.log(isPalindrome("madam")); // true
console.log(isPalindrome("hello")); // false
```

Note: These solutions are case-sensitive and treat spaces and punctuation as characters. For example, `"Madam"` returns `false`. To ignore case and punctuation, normalize the input first.
