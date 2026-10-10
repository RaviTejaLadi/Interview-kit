# Check if a string is a palindrome.

A palindrome reads the same forward and backward.

Example: `"madam"` → `true`

### Without built-in methods

// Compare characters from both ends.

```
function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  // Stop when the pointers meet.
  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

console.log(isPalindrome("madam")); // true
console.log(isPalindrome("hello")); // false
```

Explanation:

- `left` starts at the beginning.
- `right` starts at the end.
- If the characters differ, the string is not a palindrome.
- If all pairs match, return `true`.

### With built-in methods

// Reverse the string and compare it with the original.

```
function isPalindrome(str) {
  return str === str.split("").reverse().join("");
}

console.log(isPalindrome("madam")); // true
console.log(isPalindrome("hello")); // false
```

Interview note: These examples are case-sensitive and include spaces and punctuation. For example, `"Madam"` returns `false`. You can normalize the input first if the problem asks you to ignore case and spaces.
