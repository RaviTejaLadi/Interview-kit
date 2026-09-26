# Why is `typeof NaN` `"number"`?

Because `NaN` is a special value within JavaScript's **IEEE-754 floating-point `Number` type**.

It doesn't mean that `NaN` is mathematically a valid number. It means that JavaScript represents it as a special value of the `number` type.

```javascript
// NaN is a special Number value.
console.log(typeof NaN); // "number"

console.log(Number.isNaN(NaN)); // true
```

Think of `NaN` as:

> **A special number value meaning "the numeric result is invalid."**
