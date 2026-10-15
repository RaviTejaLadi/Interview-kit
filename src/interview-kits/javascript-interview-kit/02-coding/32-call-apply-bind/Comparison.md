| Feature                      | `call()`                | `apply()`               | `bind()`                    |
| ---------------------------- | ----------------------- | ----------------------- | --------------------------- |
| Executes immediately         | Yes                     | Yes                     | No                          |
| Returns                      | Function's result       | Function's result       | New function                |
| Argument format              | Individual arguments    | Array or array-like     | Individual arguments        |
| Fixes `this`                 | For this invocation     | For this invocation     | For the returned function   |
| Supports partial application | Yes, for one invocation | Yes, for one invocation | Yes, for future invocations |
