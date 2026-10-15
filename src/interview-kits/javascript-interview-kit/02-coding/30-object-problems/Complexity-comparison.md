Let (n) be the number of properties or array elements, excluding the cost of recursively processing nested values.

| Problem              | Basic approach | Built-in approach |
| -------------------- | -------------- | ----------------- |
| 1. Shallow clone     | (O(n))         | (O(n))            |
| 2. Deep clone        | (O(n))         | (O(n))            |
| 3. Compare objects   | (O(n))         | (O(n))            |
| 4. Merge objects     | (O(n + m))     | (O(n + m))        |
| 5. Flatten object    | (O(n))         | (O(n))            |
| 6. Group array       | (O(n)) average | (O(n)) average    |
| 7. Remove duplicates | (O(n^2))       | (O(n)) average    |
| 8. Array to object   | (O(n))         | (O(n))            |
| 9. Object to array   | (O(n))         | (O(n))            |

Deep cloning, comparison, and flattening depend on the number of nested properties and the operations performed on their values. The JSON-based comparison in problem 3 is not a general deep-equality algorithm.
