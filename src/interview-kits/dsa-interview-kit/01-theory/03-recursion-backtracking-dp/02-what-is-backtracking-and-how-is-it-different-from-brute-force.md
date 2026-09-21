# What is backtracking and how is it different from brute force?

Backtracking is a structured search that builds candidates step-by-step and abandons invalid paths early (pruning).

## Backtracking flow

1. Choose
2. Explore
3. Un-choose (undo state)

## Difference from plain brute force

- Brute force checks every possibility blindly.
- Backtracking uses constraints to cut branches before full exploration.

Classic examples: subsets, permutations, N-Queens, Sudoku, combination sum.
