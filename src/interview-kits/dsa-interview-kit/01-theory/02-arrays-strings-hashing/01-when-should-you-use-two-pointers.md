# When should you use the two-pointers pattern?

Use two pointers when processing ordered data or when you need pair/triplet relationships without nested loops.

## Typical triggers

- Sorted array + target sum/difference
- Reverse/partition in-place
- Palindrome checks
- Merge two sorted arrays/lists

## Why it is powerful

It often reduces `O(n^2)` brute force to `O(n)` or `O(n log n)` (if sorting is needed first).
