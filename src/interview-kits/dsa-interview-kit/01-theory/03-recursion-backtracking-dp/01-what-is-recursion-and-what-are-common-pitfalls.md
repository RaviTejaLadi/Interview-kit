# What is recursion and what are common pitfalls?

Recursion is solving a problem by defining it in terms of smaller instances of itself.

## Must-have parts

1. Base case (stop condition)
2. Recursive case (progress toward base case)

## Common mistakes

- Missing base case -> infinite recursion
- No progress toward base case
- Ignoring recursion depth and stack overflow risk
- Recomputing subproblems unnecessarily

Use recursion when tree-like branching or divide-and-conquer structure is natural.
