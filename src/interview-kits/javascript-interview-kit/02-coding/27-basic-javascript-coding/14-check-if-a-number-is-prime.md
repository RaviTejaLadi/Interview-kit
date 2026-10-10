# Check if a number is prime.

A prime number is an integer greater than `1` that is divisible only by `1` and itself.

Examples: `2`, `3`, `5`, `7`, `11`

### Without built-in methods

// Check divisibility up to the square root using multiplication.

```
function isPrime(n) {
  if (!Number.isInteger(n) || n <= 1) {
    return false;
  }

  // Two is the only even prime number.
  if (n === 2) {
    return true;
  }

  if (n % 2 === 0) {
    return false;
  }

  // Only odd divisors need to be checked.
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

console.log(isPrime(7));  // true
console.log(isPrime(10)); // false
console.log(isPrime(1));  // false
console.log(isPrime(2));  // true
```

Explanation:

- Numbers less than or equal to `1` are not prime.
- `2` is prime, but other even numbers are not.
- Check odd divisors starting from `3`.
- Stop when `i * i > n`. If a number has a divisor greater than `1`, at least one divisor must be less than or equal to its square root.
- If no divisor is found, the number is prime.

### With built-in methods

// Use Math.sqrt() to determine the divisor search limit.

```
function isPrime(n) {
  if (!Number.isInteger(n) || n <= 1) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

console.log(isPrime(7));  // true
console.log(isPrime(10)); // false
console.log(isPrime(29)); // true
```

Explanation:

- `Math.sqrt(n)` calculates the square root.
- The loop checks divisors only up to that limit.
- If any divisor divides `n` evenly, return `false`.
- Otherwise, return `true`.

The first solution skips even divisors, so it performs fewer checks for larger numbers.
