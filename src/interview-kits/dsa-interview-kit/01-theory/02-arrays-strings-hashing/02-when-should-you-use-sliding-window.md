# When should you use sliding window?

Use sliding window when you need answers over contiguous subarrays/substrings.

## Common use cases

- Longest/shortest valid window
- Fixed-size window sums or averages
- Distinct character constraints
- Subarray sum or frequency constraints

## Mental model

Expand right pointer to include candidates, then shrink left pointer while constraints are violated. This avoids restarting scans and usually gives `O(n)` time.
