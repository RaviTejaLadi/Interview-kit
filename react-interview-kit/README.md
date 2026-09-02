# ⚛️ React Interview Questions

---

# 📚 PART 1 — THEORY QUESTIONS

---

## 1. React Fundamentals ⭐⭐⭐⭐⭐

### Must Know

1. What is React?
2. What are the key features of React?
3. What is JSX?
4. Can browsers read JSX directly?
5. What is the Virtual DOM?
6. Real DOM vs Virtual DOM.
7. What is Reconciliation?
8. What is unidirectional data flow?
9. What are components in React?
10. Functional components vs Class components.
11. What are pure components?

---

## 2. State & Props ⭐⭐⭐⭐⭐

### Must Know

1. What is state in React?
2. What are props in React?
3. State vs Props: Key differences.
4. Why is state immutable in React?
5. What happens when state is mutated directly?
6. What is "lifting state up"?
7. What is prop drilling?
8. How do you pass data from a child to a parent component?
9. What is `children` prop?
10. What are controlled vs uncontrolled components?

---

## 3. Component Lifecycle & Hooks Basics ⭐⭐⭐⭐⭐

### Must Know

1. What are the phases of component lifecycle (Mount, Update, Unmount)?
2. How do Hooks replace class lifecycle methods?
3. What is `useState()`?
4. What is `useEffect()`?
5. How does `useEffect` mimic `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`?
6. What is the dependency array in `useEffect`?
7. What happens if you omit the dependency array?
8. What happens if you pass an empty dependency array `[]`?
9. What is a cleanup function in `useEffect` and when does it run?
10. What is `useLayoutEffect` vs `useEffect`?

---

## 4. Rules of Hooks & Hook Internals ⭐⭐⭐⭐⭐

### Must Know

1. What are the two core Rules of Hooks?
2. Why can't Hooks be called inside `if` statements, loops, or nested functions?
3. How does React track hook state internally (Singly linked lists on Fiber)?
4. What happens if the order of Hook execution changes between renders?
5. What are stale closures in React hooks?
6. How do you solve stale closures in `useEffect` or `useCallback`?
7. When and why should you write a custom Hook?

---

## 5. React Fiber & Reconciliation Algorithm ⭐⭐⭐⭐⭐

### Must Know

1. What is React Fiber?
2. Why did React rewrite the reconciler from the stack reconciler to Fiber?
3. What is cooperative multitasking and scheduling?
4. What are the two phases of React rendering: Render phase vs Commit phase?
5. Which phase can be paused, aborted, or prioritized?
6. What are lanes and priority levels in React?
7. What is the Diffing Algorithm and what are its $O(n)$ heuristics?
8. Why are `key` props required in lists?
9. Why should you NEVER use array index as a `key` for dynamic lists?
10. What happens under the hood when a component re-renders?

---

## 6. Rendering Behavior & React 18 Features ⭐⭐⭐⭐⭐

### Must Know

1. What triggers a re-render in a React component?
2. Does a parent re-render always re-render its children?
3. What is Automatic Batching in React 18?
4. How did batching work before React 18 vs in React 18?
5. What is `flushSync()`?
6. What is Concurrent React?
7. What is `useTransition()` and how does it prevent UI freezing?
8. What is `useDeferredValue()` vs `useTransition()`?
9. What is StrictMode and why does it render components twice in development?
10. What is `Suspense` and how does it handle asynchronous loading?

---

## 7. Advanced Hooks ⭐⭐⭐⭐⭐

### Must Know

1. What is `useRef()`?
2. Difference between `useRef` and `useState`.
3. Does changing a ref trigger a re-render?
4. Common use cases for `useRef` (DOM access, storing mutable timer IDs).
5. What is `useMemo()`?
6. What is `useCallback()`?
7. Difference between `useMemo` and `useCallback`.
8. What is `useReducer()`?
9. `useState` vs `useReducer`: When to choose which?
10. What is `useId()`?
11. What is `useImperativeHandle()` and `forwardRef`?
12. What is `useSyncExternalStore()`?

---

## 8. React Performance Optimization ⭐⭐⭐⭐⭐

### Must Know

1. How do you identify unnecessary re-renders (React DevTools Profiler)?
2. What is `React.memo()`?
3. Why does `React.memo` fail when passing inline functions or objects?
4. How do `useCallback` and `useMemo` work together with `React.memo`?
5. What are the performance costs of overusing `useMemo` and `useCallback`?
6. What is Code Splitting in React?
7. How do `React.lazy()` and `Suspense` work?
8. What is windowing / virtualization for long lists?
9. How does component composition prevent re-renders without `React.memo`?

---

## 9. Context API & State Management ⭐⭐⭐⭐⭐

### Must Know

1. What is the Context API?
2. When should you use Context vs Props?
3. What is the "Context Re-render Trap"?
4. Why does every consumer of a Context re-render when any value changes?
5. How do you prevent unnecessary re-renders in Context (splitting contexts, memoization)?
6. Context API vs Redux Toolkit vs Zustand: Architectural comparison.
7. What are selectors in state management and why are they crucial?

---

## 10. React Patterns & Error Handling ⭐⭐⭐⭐

### Must Know

1. What is the Compound Component pattern?
2. What are Render Props?
3. What are Higher-Order Components (HOCs)?
4. Why have custom Hooks largely replaced HOCs and Render Props?
5. What is an Error Boundary?
6. Can functional components be Error Boundaries (using `react-error-boundary`)?
7. What errors do Error Boundaries NOT catch?
8. What are React Portals and when do you use them (Modals, Tooltips)?

---

# 💻 PART 2 — CODING QUESTIONS

---

## 11. Custom Hooks Implementation ⭐⭐⭐⭐⭐

### Must Implement

1. Implement `useDebounce(value, delay)`.
2. Implement `useThrottle(value, interval)`.
3. Implement `useFetch(url, options)` with caching, loading, error, and `AbortController`.
4. Implement `useLocalStorage(key, initialValue)`.
5. Implement `usePrevious(value)`.
6. Implement `useOnClickOutside(ref, handler)`.
7. Implement `useMediaQuery(query)`.
8. Implement `useToggle(initialState)`.
9. Implement `useInterval(callback, delay)`.

---

## 12. State & Component Logic Problems ⭐⭐⭐⭐⭐

### Must Solve

1. Build a counter with step, increment, decrement, and reset.
2. Build a multi-step form with state preservation.
3. Build a searchable/filterable list with debounced query.
4. Implement dependent/cascading dropdowns (Country → State → City).
5. Build an interactive Star Rating component.
6. Build a character counter with max-limit indicator for a text area.
7. Build an undo/redo state container using `useReducer`.

---

## 13. UI Components & Machine Coding ⭐⭐⭐⭐⭐

### Must Build

1. Build an accessible **Modal / Dialog** with backdrop click and `Escape` key handler using Portals.
2. Build an **Accordion** component (single-open and multi-open modes).
3. Build a **Tabs** component using the Compound Component pattern (`<Tabs>`, `<Tabs.List>`, `<Tabs.Tab>`, `<Tabs.Panel>`).
4. Build an **Image Carousel / Slider** with autoplay, pause on hover, next/prev controls, and indicators.
5. Build an **Autocomplete / Typeahead** search bar with keyboard navigation (`ArrowUp`, `ArrowDown`, `Enter`).
6. Build an **Infinite Scroll** list using `IntersectionObserver`.
7. Build a **Virtualized List** (rendering only visible window items).
8. Build a **Toast / Notification** notification system with auto-dismiss.

---

## 14. Performance & Re-render Debugging ⭐⭐⭐⭐⭐

### Must Solve

1. Identify why a child component is re-rendering unexpectedly and fix it with `React.memo` and `useCallback`.
2. Fix a timer leak inside `useEffect`.
3. Fix a stale state closure inside an event handler or interval.
4. Convert a prop-drilling chain into clean Context or compound components.
5. Optimize an expensive list rendering without third-party libraries.

---

# 🧠 PART 3 — MUST-KNOW ADVANCED TOPICS

---

## 15. Fiber Architecture Mental Model ⭐⭐⭐⭐⭐

You must be able to explain:

```text
Render Phase (Interruptible, asynchronous work)
   ├── Diff Virtual DOM trees
   ├── Build WorkInProgress Fiber Tree
   └── Tag Fibers (Placement, Update, Deletion)
Commit Phase (Uninterruptible, synchronous work)
   ├── Mutate host DOM
   ├── Run useLayoutEffect synchronously
   └── Schedule and run useEffect asynchronously
```

---

## 16. The State Batching Timeline ⭐⭐⭐⭐⭐

Know how batching behaves across React versions:

```javascript
// Inside a Promise or setTimeout:
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 17: Triggers 2 separate re-renders
  // React 18: Automatically batched into exactly 1 re-render
}, 100);
```

---

# 🏆 TOP 25 — If You Have Very Little Time

### 🔥 Theory

1. Real DOM vs Virtual DOM
2. Reconciliation & Diffing Algorithm
3. Why state must be immutable
4. Rules of Hooks & why hook order matters
5. `useEffect` dependency array & cleanup timing
6. `useMemo` vs `useCallback`
7. When `React.memo` helps and when it breaks
8. `useRef` vs `useState`
9. Prop drilling vs Context API
10. The Context re-render problem
11. Automatic Batching in React 18
12. React Fiber architecture overview
13. Keys in lists (why index as key causes bugs)
14. Controlled vs uncontrolled components
15. Error boundaries

### 💻 Coding

16. Implement `useDebounce` hook
17. Implement `useFetch` with `AbortController`
18. Implement `useLocalStorage` hook
19. Build an accessible Modal with Portals
20. Build an Accordion component
21. Build a Tabs compound component
22. Build an Autocomplete search with debounce
23. Build an Infinite Scroll with IntersectionObserver
24. Fix a stale closure bug in `useEffect`
25. Optimize a re-rendering list with `React.memo` and `useCallback`

---

# 🎯 WHAT YOU DO NOT NEED TO PRIORITIZE

* ❌ Class component lifecycle methods (`componentWillReceiveProps`, `getSnapshotBeforeUpdate`)
* ❌ Legacy Context API (`contextTypes`)
* ❌ Redux boilerplate without Redux Toolkit (old `switch/case` reducers)
* ❌ Writing custom reconcilers or AST transformers
* ❌ Relay / complex GraphQL client architectures (unless role-specific)
* ❌ Obscure hooks (`useDebugValue`, `useInsertionEffect`)

---

# 📌 FINAL PREPARATION ORDER

```text
1. JSX & Virtual DOM
      ↓
2. State, Props & Immutability
      ↓
3. Hooks: useState, useEffect & Rules
      ↓
4. Hooks: useRef, useMemo, useCallback
      ↓
5. Component Lifecycle & Cleanup
      ↓
6. Context API & State Management
      ↓
7. Performance Optimization (memo)
      ↓
8. React 18 Concurrency & Batching
      ↓
9. Fiber Architecture & Reconciliation
      ↓
10. Custom Hooks Coding
      ↓
11. Machine Coding (Modal, Tabs, Autocomplete)
```

---

# ✅ FINAL CHECKLIST

## Theory
* JSX & Virtual DOM
* State vs Props
* Immutability
* `useState` & `useEffect`
* Rules of Hooks & Linked List model
* `useRef`
* `useMemo` & `useCallback`
* `React.memo`
* Context API & re-render pitfalls
* Fiber Reconciler & lanes
* React 18 Automatic Batching
* Concurrent React (`useTransition`)
* Error Boundaries & Portals

## Coding
* `useDebounce`
* `useFetch` with abort signal
* `useLocalStorage`
* Modal dialog
* Tabs compound component
* Accordion
* Autocomplete / Typeahead
* Infinite scroll list
