# What is type coercion?

**Definition:**
**Type coercion is the conversion of a value from one data type to another.**

JavaScript can perform coercion:

* **Implicitly** — JavaScript does it automatically
* **Explicitly** — the developer does it intentionally

### Implicit coercion

```javascript
// JavaScript implicitly converts the number to a string
console.log("10" + 5); // "105"
```

Because `+` with a string performs string concatenation, `5` is converted to `"5"`.

Another example:

```javascript
// JavaScript implicitly converts the string to a number
console.log("10" - 5); // 5
```

### Explicit coercion

You can explicitly convert values:

```javascript
// Explicitly convert a string to a number
const value = Number("10");

console.log(value);        // 10
console.log(typeof value); // "number"
```

Common conversion functions include:

```javascript
// Convert values explicitly
Number("123");
String(123);
Boolean(1);
```

**Key point:** Type coercion is one of the main reasons `==` can produce results that may look surprising.