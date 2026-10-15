## Immutability Cheat Sheet

| Operation                 | Mutates? | Immutable approach                      |
| ------------------------- | -------: | --------------------------------------- |
| `array.push()`            |   ❌ Yes | `[...array, item]`                      |
| `array.pop()`             |   ❌ Yes | `array.slice(0, -1)`                    |
| `array.splice()`          |   ❌ Yes | `toSpliced()` / `filter()`              |
| `array.sort()`            |   ❌ Yes | `toSorted()` / `[...array].sort()`      |
| `array.reverse()`         |   ❌ Yes | `toReversed()` / `[...array].reverse()` |
| `array.map()`             |    ✅ No | Use directly                            |
| `array.filter()`          |    ✅ No | Use directly                            |
| `array.slice()`           |    ✅ No | Use directly                            |
| `object.property = value` |   ❌ Yes | `{ ...object, property: value }`        |
| `delete object.property`  |   ❌ Yes | Destructuring                           |
