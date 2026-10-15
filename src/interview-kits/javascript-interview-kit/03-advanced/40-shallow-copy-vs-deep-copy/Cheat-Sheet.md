## Shallow Copy vs Deep Copy Cheat Sheet

| Concept                        | Shallow Copy | Deep Copy |
| ------------------------------ | ------------ | --------- |
| New top-level object           | ✅           | ✅        |
| New nested objects             | ❌           | ✅        |
| Nested references shared       | ✅           | ❌        |
| Spread `{ ...obj }`            | ✅           | ❌        |
| `Object.assign()`              | ✅           | ❌        |
| `structuredClone()`            | ❌           | ✅        |
| Useful for React state updates | ✅           | Sometimes |
| Completely independent copy    | ❌           | ✅        |
