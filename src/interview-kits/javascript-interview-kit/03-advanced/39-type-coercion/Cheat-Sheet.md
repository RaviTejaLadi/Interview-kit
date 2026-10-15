# Cheat Sheet

| Expression           |  Result | Why                   |
| -------------------- | ------: | --------------------- |
| `"5" + 2`            |  `"52"` | String concatenation  |
| `"5" - 2`            |     `3` | Numeric conversion    |
| `"5" * 2`            |    `10` | Numeric conversion    |
| `"5" / 2`            |   `2.5` | Numeric conversion    |
| `true + 1`           |     `2` | `true → 1`            |
| `false + 1`          |     `1` | `false → 0`           |
| `null + 1`           |     `1` | `null → 0`            |
| `undefined + 1`      |   `NaN` | `undefined → NaN`     |
| `5 == "5"`           |  `true` | Coercion              |
| `5 === "5"`          | `false` | Different types       |
| `null == undefined`  |  `true` | Special equality rule |
| `null === undefined` | `false` | Different types       |

---

## 🧠 Final Mental Model

Remember these four rules:

```text
1. ==  → allows type coercion
2. === → no implicit type coercion
3. +   → string concatenation OR numeric addition
4. -, *, / → usually convert operands to numbers
```

And remember the main falsy values:

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

**Interview one-liner:**

> **Type coercion is JavaScript's conversion of values between types, either implicitly during operations such as `+` and `-`, or explicitly using functions such as `String()`, `Number()`, and `Boolean()`.**
