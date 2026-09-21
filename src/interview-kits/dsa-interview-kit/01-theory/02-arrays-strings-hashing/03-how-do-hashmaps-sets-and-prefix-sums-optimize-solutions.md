# How do hash maps, sets, and prefix sums optimize brute-force solutions?

## Hash Map / Set

- Convert repeated searches from `O(n)` to average `O(1)`.
- Excellent for counting frequency, seen-before checks, and complement lookups.

## Prefix Sum

- Precompute cumulative totals.
- Any range sum becomes `prefix[r] - prefix[l - 1]` in `O(1)`.

## Interview pattern

If brute force re-scans data many times, ask: "Can I store intermediate results in a map or prefix array?"
