# Are `var`, `let`, and `const` hoisted?

**Yes.** All three declarations are hoisted, but they behave differently.

| Declaration | Hoisted? | Initial value before declaration | TDZ?   |
| ----------- | -------- | -------------------------------- | ------ |
| `var`       | ✅ Yes   | `undefined`                      | ❌ No  |
| `let`       | ✅ Yes   | Uninitialized                    | ✅ Yes |
| `const`     | ✅ Yes   | Uninitialized                    | ✅ Yes |

The important distinction is:

> **`let` and `const` are hoisted but remain uninitialized until execution reaches their declaration.**
