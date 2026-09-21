# How do you analyze time and space complexity?

Time complexity describes how runtime grows with input size `n`. Space complexity describes how extra memory grows with `n`.

## Interview-ready method

1. Identify loops, recursion depth, and nested operations.
2. Keep only the dominant term (drop constants and smaller terms).
3. State both time and space before coding.

## Common examples

- One pass over array: `O(n)` time
- Two nested loops: `O(n^2)` time
- Binary search: `O(log n)` time
- Hash map lookup (average): `O(1)` time

## Tip

Always mention whether complexity is worst-case or average-case. Interviewers often ask this follow-up.
