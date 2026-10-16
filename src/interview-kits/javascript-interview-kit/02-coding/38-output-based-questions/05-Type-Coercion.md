## Type Coercion: 20 Output-Based Interview Questions

Type coercion in JavaScript means converting a value from one type to another. JavaScript performs this conversion automatically in many expressions, which is why comparisons and arithmetic can produce surprising results.

These 20 output-based questions cover `==`, `===`, `+`, `-`, and Boolean conversion, with answers and explanations.

## 1. Loose Equality (`==`)

The `==` operator compares values after applying type conversion when necessary.

### Q1. Number and string

```
// Q1: Loose equality converts the numeric string to a number.
console.log(5 == "5");
console.log(5 === "5");
```

Output

```
true
false
```

Explanation:

- `5 == "5"` returns `true` because the string is converted to a number.
- `5 === "5"` returns `false` because strict equality does not convert types.

### Q2. Boolean and number

```
// Q2: Booleans convert to numbers during loose equality.
console.log(true == 1);
console.log(false == 0);
console.log(true == 2);
```

Output

```
true
true
false
```

Explanation: During these comparisons, `true` converts to `1` and `false` converts to `0`.

### Q3. `null` and `undefined`

```
// Q3: null and undefined are loosely equal to each other.
console.log(null == undefined);
console.log(null === undefined);
console.log(null == 0);
```

Output

```
true
false
false
```

Explanation: `null == undefined` is a special rule in JavaScript. However, neither is loosely equal to `0`.

### Q4. Empty string and zero

```
// Q4: An empty string converts to zero in loose equality.
console.log("" == 0);
console.log(" " == 0);
console.log("0" == false);
```

Output

```
true
true
true
```

Explanation: Empty and whitespace-only strings convert to `0` when converted to a number. In the third comparison, both `"0"` and `false` ultimately compare as zero.

### Q5. Arrays and loose equality

```
// Q5: Arrays can be converted to primitive strings during comparison.
console.log([] == 0);
console.log([1] == 1);
console.log([1, 2] == "1,2");
```

Output

```
true
true
true
```

Explanation:

- converts to "", which converts to 0.
- `[1]` converts to `"1"`, which converts to `1`.
- `[1, 2]` converts to `"1,2"`, matching the string on the right.

## 2. Strict Equality (`===`)

The `===` operator compares types and values without performing type coercion.

### Q6. Different data types

```
// Q6: Strict equality does not convert between types.
console.log(10 === "10");
console.log(false === 0);
console.log(null === undefined);
```

Output

```
false
false
false
```

Explanation: Each pair contains values of different types, so strict equality returns `false`.

### Q7. `NaN` comparison

```
// Q7: NaN is unequal to every value, including itself.
console.log(NaN == NaN);
console.log(NaN === NaN);
console.log(Object.is(NaN, NaN));
```

Output

```
false
false
true
```

Explanation: `NaN` is not equal to itself under either equality operator. `Object.is()` treats two `NaN` values as equal.

### Q8. Objects and reference equality

```
// Q8: Objects are compared by reference, not by their contents.
console.log({} === {});
console.log([] === []);
console.log([1, 2] === [1, 2]);
```

Output

```
false
false
false
```

Explanation: Every object and array literal creates a new object. Even when their contents match, their references are different.

### Q9. Same object reference

```
// Q9: Two variables can refer to the same object.
const a = { value: 10 };
const b = a;

console.log(a === b);
console.log(a == b);
```

Output

```
true
true
```

Explanation: Both variables reference the same object, so both equality operators return `true`.

## 3. The Addition Operator (`+`)

The `+` operator can perform either numeric addition or string concatenation.

### Q10. Number plus string

```
// Q10: A string operand causes string concatenation.
console.log(5 + "5");
console.log("5" + 5);
console.log(5 + 5 + "5");
```

Output

```
55
55
105
```

Explanation:

- `5 + "5"` produces `"55"`.
- `"5" + 5` produces `"55"`.
- `5 + 5` first produces `10`, then `10 + "5"` produces `"105"`.

The operator is evaluated from left to right.

### Q11. String concatenation with booleans

```
// Q11: Strings cause the plus operator to concatenate values.
console.log("Hello" + true);
console.log("Value: " + null);
console.log("Result: " + undefined);
```

Output

```
Hellotrue
Value: null
Result: undefined
```

Explanation: Once string concatenation is performed, the other value is converted to its string representation.

### Q12. Arrays with `+`

```
// Q12: Arrays are converted to primitive strings during concatenation.
console.log([1, 2] + [3, 4]);
console.log([] + []);
console.log([10] + 5);
```

Output

```
1,23,4

105
```

Explanation:

- `[1, 2]` becomes `"1,2"` and `[3, 4]` becomes `"3,4"`.
- Each empty array becomes `""`, so the result is an empty string.
- `[10]` becomes `"10"`, producing `"105"`.

The second output line is intentionally blank because the result is an empty string.

## 4. The Subtraction Operator (`-`)

Unlike `+`, the `-` operator performs numeric conversion on its operands.

### Q13. String subtraction

```
// Q13: The subtraction operator converts numeric strings to numbers.
console.log("10" - "5");
console.log("10" - 2);
console.log("10" - "abc");
```

Output

```
5
8
NaN
```

Explanation: Numeric strings become numbers. A nonnumeric string such as `"abc"` converts to `NaN`, so the subtraction also returns `NaN`.

### Q14. Boolean subtraction

```
// Q14: Boolean values convert to 1 or 0 during subtraction.
console.log(true - false);
console.log(true - true);
console.log(false - 5);
```

Output

```
1
0
-5
```

Explanation: `true` converts to `1` and `false` converts to `0`.

### Q15. Array subtraction

```
// Q15: Arrays are converted to primitive values and then numbers.
console.log([5] - 2);
console.log([1, 2] - 1);
console.log([] - 1);
```

Output

```
3
NaN
-1
```

Explanation:

- `[5]` becomes `"5"`, then `5`.
- `[1, 2]` becomes `"1,2"`, which is not a valid numeric string.
- becomes "", then 0.

## 5. Boolean Conversion

JavaScript converts values to Boolean using `Boolean(value)` or double negation (`!!value`).

### Q16. Truthy and falsy values

```
// Q16: Check which primitive values are truthy or falsy.
console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));
```

Output

```
false
false
false
false
false
```

Explanation: These are all falsy values in JavaScript.

The complete list of common falsy values is:

- `false`
- `0`, `-0`, `0n`
- `""`
- `null`
- `undefined`
- `NaN`

`document.all` is a legacy browser-specific exception to ordinary truthiness rules.

### Q17. Empty arrays and objects

```
// Q17: Empty arrays and objects are truthy in JavaScript.
console.log(Boolean([]));
console.log(Boolean({}));
console.log(Boolean("0"));
console.log(Boolean("false"));
```

Output

```
true
true
true
true
```

Explanation: All objects are truthy, including empty arrays and empty objects. Nonempty strings are also truthy, even if they contain `"0"` or `"false"`.

### Q18. Logical NOT (`!`) and double NOT (`!!`)

```
// Q18: ! negates truthiness, while !! converts to a Boolean.
console.log(!0);
console.log(!!0);
console.log(!"Hello");
console.log(!!"Hello");
```

Output

```
true
false
false
true
```

Explanation: A single `!` negates the truthiness of a value. Double negation converts it to the corresponding Boolean value.

## 6. Tricky Mixed-Coercion Questions

### Q19. Addition vs subtraction

```
// Q19: Addition may concatenate, while subtraction always converts to numbers.
console.log("10" + 5 - 2);
console.log("10" - 5 + "2");
console.log(1 + true + "2");
```

Output

```
103
52
22
```

Explanation:

1. `"10" + 5` produces `"105"`. Then `"105" - 2` produces `103`.
2. `"10" - 5` produces `5`. Then `5 + "2"` produces `"52"`.
3. `1 + true` produces `2`. Then `2 + "2"` produces `"22"`.

### Q20. Equality with arrays and booleans

```
// Q20: Loose equality converts booleans and objects according to coercion rules.
console.log([] == false);
console.log([0] == false);
console.log([1] == true);
console.log([] === false);
```

Output

```
true
true
true
false
```

Explanation:

- converts to "", then 0, matching false.
- `[0]` converts to `"0"`, then `0`.
- `[1]` converts to `"1"`, then `1`, matching `true`.
- \=== false is false because an array and a Boolean have different types.

## Quick revision table

| Expression or rule  | Result  |
| ------------------- | ------- |
| `5 == "5"`          | `true`  |
| `5 === "5"`         | `false` |
| `null == undefined` | `true`  |
| `NaN === NaN`       | `false` |
| `"5" + 2`           | `"52"`  |
| `"5" - 2`           | `3`     |
| `true + 1`          | `2`     |
| `Boolean([])`       | `true`  |
| `Boolean({})`       | `true`  |
| `Boolean("false")`  | `true`  |
| `[] == 0`           | `true`  |
| `[] === 0`          | `false` |
