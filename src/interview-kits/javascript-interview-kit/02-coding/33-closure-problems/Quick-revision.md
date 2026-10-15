| Question               | Main concept                   |
| ---------------------- | ------------------------------ |
| 1. Counter             | Preserving and updating state  |
| 2. Private variable    | Encapsulation                  |
| 3. Run once            | Retaining execution state      |
| 4. Memoization         | Caching computed results       |
| 5. `var` loop problem  | Shared variable binding        |
| 6. `let` loop solution | Per-iteration lexical bindings |

### The key takeaway

A closure does not automatically create a copy of every variable. It retains access to variables in its lexical environment. That is why closures can preserve state, but also why the `var` loop example produces unexpected results.
