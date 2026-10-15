# Type Coercion

**Type coercion** is JavaScript's process of converting a value from one type to another. It happens automatically in many operations, which is why expressions like `"5" - 2` produce `3` while `"5" + 2` produces `"52"`.

---

## 1. What is Type Coercion?

**Definition:**  
Type coercion is the automatic or explicit conversion of a value from one data type to another.

There are two types:

### Implicit coercion

JavaScript automatically converts the value.

```javascript
// JavaScript implicitly converts the string to a number.
console.log('5' - 2);
// 3
```

### Explicit conversion

You intentionally convert the value.

```javascript
// Explicitly convert the string to a number.
const value = Number('5');

console.log(value);
// 5
```

---

# 2. `==` vs `===`

## `==` — Loose Equality

**Definition:**  
`==` compares values **after performing type coercion** when necessary.

```javascript
// The string "5" is converted to the number 5.
console.log(5 == '5');
// true
```

JavaScript converts `"5"` into `5` before comparison.

---

## `===` — Strict Equality

**Definition:**  
`===` compares both **value and type** without performing the usual implicit type coercion.

```javascript
// Different types make strict equality false.
console.log(5 === '5');
// false
```

### Comparison

| Expression    |  Result | Reason              |
| ------------- | ------: | ------------------- |
| `5 == "5"`    |  `true` | Type coercion       |
| `5 === "5"`   | `false` | Different types     |
| `5 === 5`     |  `true` | Same type and value |
| `"5" === "5"` |  `true` | Same type and value |
| `true === 1`  | `false` | Boolean ≠ Number    |

### Best practice

Prefer:

```javascript
// Strict equality avoids implicit type conversion.
if (value === 5) {
  console.log('Five');
}
```

Use `==` only when you intentionally want its coercion rules.

---

# 3. String Conversion

**Definition:**  
String conversion converts a value into a string.

The most explicit approach is `String()`.

```javascript
// Convert different values explicitly to strings.
console.log(String(123));
// "123"

console.log(String(true));
// "true"

console.log(String(null));
// "null"

console.log(String(undefined));
// "undefined"
```

You can also use template literals:

```javascript
// Template literals convert the value to a string.
const age = 25;

console.log(`Age: ${age}`);
// "Age: 25"
```

---

# 4. Number Conversion

**Definition:**  
Number conversion converts a value into a number.

Use `Number()` for explicit conversion.

```javascript
// Convert strings into numbers.
console.log(Number('42'));
// 42

console.log(Number('3.14'));
// 3.14

console.log(Number('hello'));
// NaN
```

Some important conversions:

```javascript
// Demonstrate common Number() conversion rules.
console.log(Number('')); // 0
console.log(Number('   ')); // 0
console.log(Number(true)); // 1
console.log(Number(false)); // 0
console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN
```

### Important

`Number("hello")` cannot produce a valid number, so the result is `NaN`.

---

# 5. Boolean Conversion

**Definition:**  
Boolean conversion converts a value into either `true` or `false`.

Use `Boolean()` explicitly.

```javascript
// Convert different values to Boolean.
console.log(Boolean(1));
// true

console.log(Boolean(0));
// false

console.log(Boolean('hello'));
// true

console.log(Boolean(''));
// false
```

JavaScript also performs Boolean coercion automatically in conditions.

```javascript
// The empty string is converted to false in the condition.
const username = '';

if (username) {
  console.log('Username exists');
} else {
  console.log('Username is empty');
}

// Username is empty
```

---

# 6. The `+` Operator

The `+` operator is special because it can perform either:

1. Numeric addition
2. String concatenation

If one operand becomes a string during the operation, `+` performs concatenation.

```javascript
// A string causes + to perform string concatenation.
console.log('5' + 2);
// "52"
```

Compare:

```javascript
// Numbers are added mathematically.
console.log(5 + 2);
// 7
```

```javascript
// The number is converted to a string before concatenation.
console.log(5 + '2');
// "52"
```

```javascript
// Both operands are strings, so concatenation occurs.
console.log('5' + '2');
// "52"
```

### Important interview example

```javascript
// Evaluate each + expression according to operand types.
console.log(1 + 2 + '3');
// "33"
```

Why?

```text
1 + 2
 ↓
3

3 + "3"
 ↓
"33"
```

Another example:

```javascript
// Left-to-right evaluation affects the result.
console.log('1' + 2 + 3);
// "123"
```

Because:

```text
"1" + 2
 ↓
"12"

"12" + 3
 ↓
"123"
```

---

# 7. The `-` Operator

Unlike `+`, the `-` operator is always a numeric operator.

It attempts to convert operands into numbers.

```javascript
// The string "5" is converted to the number 5.
console.log('5' - 2);
// 3
```

```javascript
// Both strings are converted to numbers before subtraction.
console.log('10' - '3');
// 7
```

```javascript
// A numeric string is converted before subtraction.
console.log('10' - 2);
// 8
```

If conversion fails:

```javascript
// "hello" cannot be converted to a valid number.
console.log('hello' - 2);
// NaN
```

### Important comparison

```javascript
// + can concatenate strings.
console.log('5' + 2);
// "52"

// - converts strings to numbers.
console.log('5' - 2);
// 3
```

---

# 8. Truthy and Falsy Values

**Definition:**  
A **truthy** value becomes `true` when converted to Boolean.

A **falsy** value becomes `false`.

## Falsy values

The main JavaScript falsy values are:

```text
false
0
-0
0n
""
null
undefined
NaN
```

```javascript
// These values are all falsy in Boolean contexts.
console.log(Boolean(false)); // false
console.log(Boolean(0)); // false
console.log(Boolean(-0)); // false
console.log(Boolean(0n)); // false
console.log(Boolean('')); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false
```

Everything else is generally truthy.

Examples:

```javascript
// These values are truthy.
console.log(Boolean('0')); // true
console.log(Boolean('false')); // true
console.log(Boolean([])); // true
console.log(Boolean({})); // true
```

### Common interview trap

```javascript
// A non-empty string is truthy, even when its contents look false.
console.log(Boolean('false'));
// true
```

The string is not empty, so it is truthy.

---

# 9. What is `null`?

**Definition:**  
`null` represents an intentional absence of a value.

```javascript
// null explicitly represents "no value".
const user = null;

console.log(user);
// null
```

`null` is falsy:

```javascript
// null converts to false in a Boolean context.
console.log(Boolean(null));
// false
```

When converted to a number:

```javascript
// Number(null) converts null to zero.
console.log(Number(null));
// 0
```

A famous JavaScript quirk:

```javascript
// typeof null is a historical JavaScript behavior.
console.log(typeof null);
// "object"
```

Although `typeof null` returns `"object"`, `null` is **not an object**. This is a long-standing language quirk.

---

# 10. What is `undefined`?

**Definition:**  
`undefined` generally means that a value has not been assigned or is unavailable.

```javascript
// An uninitialized variable has the value undefined.
let username;

console.log(username);
// undefined
```

It is falsy:

```javascript
// undefined converts to false.
console.log(Boolean(undefined));
// false
```

Number conversion produces `NaN`:

```javascript
// undefined cannot be converted to a valid number.
console.log(Number(undefined));
// NaN
```

String conversion:

```javascript
// undefined becomes the string "undefined".
console.log(String(undefined));
// "undefined"
```

---

# 11. `null` vs `undefined`

| Value       | Meaning                  | Boolean | Number |
| ----------- | ------------------------ | ------: | -----: |
| `null`      | Intentional absence      | `false` |    `0` |
| `undefined` | Missing/unassigned value | `false` |  `NaN` |

Example:

```javascript
// null and undefined have different numeric conversion behavior.
console.log(Number(null));
// 0

console.log(Number(undefined));
// NaN
```

They are loosely equal:

```javascript
// Loose equality treats null and undefined as equal.
console.log(null == undefined);
// true
```

But not strictly equal:

```javascript
// Strict equality requires the same type.
console.log(null === undefined);
// false
```

---

# 12. What is `NaN`?

**Definition:**  
`NaN` means **Not-a-Number**. It represents an invalid numeric result.

```javascript
// Invalid numeric conversion produces NaN.
const result = Number('hello');

console.log(result);
// NaN
```

Despite its name, `NaN` has the JavaScript type `number`.

```javascript
// NaN belongs to the number type.
console.log(typeof NaN);
// "number"
```

---

## Important: `NaN` Is Not Equal to Itself

```javascript
// NaN is not equal to itself.
console.log(NaN === NaN);
// false
```

Use `Number.isNaN()` to check for it:

```javascript
// Number.isNaN() safely checks whether a value is NaN.
const value = Number('hello');

console.log(Number.isNaN(value));
// true
```

Prefer `Number.isNaN()` over the global `isNaN()` when you want to know whether the value itself is the `NaN` value.

---

# 13. Common Type Coercion Examples

```javascript
// These examples demonstrate common JavaScript coercion rules.
console.log('5' + 2); // "52"
console.log('5' - 2); // 3
console.log('5' * 2); // 10
console.log('5' / 2); // 2.5

console.log(true + 1); // 2
console.log(false + 1); // 1

console.log(null + 1); // 1
console.log(undefined + 1); // NaN

console.log('' + 10); // "10"
console.log('' - 10); // -10
```
