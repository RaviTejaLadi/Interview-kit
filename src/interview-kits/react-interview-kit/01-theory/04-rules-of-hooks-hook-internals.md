# 4. Rules of Hooks & Hook Internals

### Must Know

1. What are the two core Rules of Hooks?
2. Why can't Hooks be called inside `if` statements, loops, or nested functions?
3. How does React track hook state internally (Singly linked lists on Fiber)?
4. What happens if the order of Hook execution changes between renders?
5. What are stale closures in React hooks?
6. How do you solve stale closures in `useEffect` or `useCallback`?
7. When and why should you write a custom Hook?
