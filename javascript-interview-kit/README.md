# 🟨 JavaScript Interview Questions

---

# 📚 PART 1 — THEORY QUESTIONS

---

## 1. JavaScript Fundamentals ⭐⭐⭐⭐⭐

### Must Know

1. What is JavaScript?
2. What is ECMAScript?
3. Is JavaScript single-threaded?
4. Is JavaScript synchronous or asynchronous?
5. What is a JavaScript engine?
6. What is the V8 engine?
7. What is `"use strict"`?
8. What is the difference between `==` and `===`?
9. What is type coercion?
10. What are truthy and falsy values?

---

## 2. Variables & Data Types ⭐⭐⭐⭐⭐

### Must Know

1. Difference between `var`, `let`, and `const`.
2. What are primitive data types in JavaScript?
3. What are reference types?
4. Difference between primitive and reference values.
5. What is `undefined`?
6. What is `null`?
7. Difference between `null` and `undefined`.
8. What is `NaN`?
9. Why is `typeof null` `"object"`?
10. Why is `typeof NaN` `"number"`?
11. What are `Symbol` and `BigInt`?
12. What are truthy and falsy values?

---

## 3. Scope ⭐⭐⭐⭐⭐

### Must Know

1. What is scope?
2. What is global scope?
3. What is function scope?
4. What is block scope?
5. What is lexical scope?
6. What is scope chaining?
7. How does JavaScript find a variable?
8. What is variable shadowing?

---

## 4. Hoisting & Temporal Dead Zone ⭐⭐⭐⭐⭐

### Must Know

1. What is hoisting?
2. Are `var`, `let`, and `const` hoisted?
3. How does hoisting differ between `var`, `let`, and `const`?
4. What is the Temporal Dead Zone (TDZ)?
5. Are function declarations hoisted?
6. Function declaration vs function expression hoisting.
7. What happens when you access a variable before initialization?

---

## 5. Execution Context ⭐⭐⭐⭐⭐

### Must Know

1. What is an execution context?
2. What is the global execution context?
3. What is a function execution context?
4. What happens when a function is called?
5. What is the execution context stack (call stack)?
6. How is scope related to execution context?

> 💡 You should understand this concept well enough to explain how JavaScript executes code from start to finish.

---

## 6. Functions ⭐⭐⭐⭐⭐

### Must Know

1. Function declaration vs function expression.
2. What are arrow functions?
3. Arrow function vs regular function.
4. What are parameters and arguments?
5. What are default parameters?
6. What are rest parameters?
7. What are callback functions?
8. What are higher-order functions?
9. What are first-class functions?
10. What is a pure function?
11. What is an IIFE?
12. What is recursion?
13. What is function composition?
14. What are `call()`, `apply()`, and `bind()`?

---

## 7. Closures ⭐⭐⭐⭐⭐

### Must Know

1. What is a closure?
2. How does a closure work?
3. Why are closures useful?
4. How does a closure remember variables after a function finishes?
5. How are closures used for data privacy?
6. How do closures work with callbacks?
7. What are common closure problems with loops?
8. Explain the difference between `var` and `let` using closures.

---

## 8. `this` Keyword ⭐⭐⭐⭐⭐

### Must Know

1. What is `this`?
2. How is `this` determined?
3. What is `this` inside a regular function?
4. What is `this` inside an arrow function?
5. How does `this` work inside an object method?
6. How does `this` work with constructors?
7. How does `call()` change `this`?
8. How does `apply()` change `this`?
9. How does `bind()` change `this`?
10. Why don't arrow functions have their own `this`?
11. How does `this` behave in strict mode?

---

## 9. Objects ⭐⭐⭐⭐⭐

### Must Know

1. What is an object?
2. How can you create an object?
3. Dot notation vs bracket notation.
4. How do you add, update, and delete properties?
5. What is object destructuring?
6. What is object spread?
7. What is `Object.keys()`?
8. What is `Object.values()`?
9. What is `Object.entries()`?
10. What is `Object.assign()`?
11. What is optional chaining (`?.`)?
12. What is nullish coalescing (`??`)?
13. Difference between shallow copy and deep copy.
14. What is object immutability?

---

## 10. Prototypes & Prototype Chain ⭐⭐⭐⭐⭐

### Must Know

1. What is a prototype?
2. What is the prototype chain?
3. What is `prototype`?
4. What is `__proto__`?
5. Difference between `prototype` and `__proto__`.
6. How does JavaScript inheritance work?
7. How does property lookup work through the prototype chain?
8. What is `Object.create()`?
9. What is `Object.getPrototypeOf()`?
10. How are JavaScript classes related to prototypes?

> ⚠️ You don't need to memorize every prototype API. You **must understand the prototype chain**.

---

## 11. Classes & OOP ⭐⭐⭐⭐

### Must Know

1. What are classes in JavaScript?
2. What is a constructor?
3. What is `extends`?
4. What is `super()`?
5. What is inheritance?
6. What are static methods?
7. What are private class fields?
8. What are getters and setters?
9. Class vs constructor function.
10. How do classes use prototypes internally?

---

## 12. Arrays ⭐⭐⭐⭐⭐

### Must Know

1. What is an array?
2. `map()` vs `forEach()`.
3. `map()` vs `filter()`.
4. `filter()` vs `find()`.
5. What does `reduce()` do?
6. What are `some()` and `every()`?
7. `slice()` vs `splice()`.
8. `find()` vs `findIndex()`.
9. What is array destructuring?
10. What is array spread?
11. How do you remove duplicates from an array?
12. How do you flatten an array?
13. How do you sort an array?
14. How do you copy an array?

---

## 13. Strings ⭐⭐⭐⭐

### Must Know

1. Are JavaScript strings mutable?
2. What are template literals?
3. How do you manipulate strings?
4. `slice()` vs `substring()`.
5. How do you reverse a string?
6. How do you check whether a string is a palindrome?
7. How do you check whether two strings are anagrams?

---

## 14. Destructuring, Spread & Rest ⭐⭐⭐⭐⭐

### Must Know

1. What is destructuring?
2. Array destructuring.
3. Object destructuring.
4. What is the spread operator?
5. What is the rest operator?
6. Spread vs rest.
7. Does spread create a deep copy?
8. How can spread be used to create a shallow copy?

---

## 15. Call Stack ⭐⭐⭐⭐⭐

### Must Know

1. What is the call stack?
2. How does the call stack execute functions?
3. What is a stack overflow?
4. How does recursion affect the call stack?
5. How does asynchronous code interact with the call stack?

---

## 16. Event Loop ⭐⭐⭐⭐⭐

### Must Know

1. What is the event loop?
2. Why is JavaScript single-threaded?
3. What is the call stack?
4. What is the callback/task queue?
5. What is the microtask queue?
6. What is a macrotask?
7. What is a microtask?
8. Why do Promises execute before `setTimeout()`?
9. Why doesn't `setTimeout(fn, 0)` execute immediately?
10. How does the event loop handle asynchronous operations?

### 🔥 You MUST be able to predict:

```javascript
// Tests microtask vs macrotask execution order
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');
```

Expected output:

```text
1
4
3
2
```

---

## 17. Promises ⭐⭐⭐⭐⭐

### Must Know

1. What is a Promise?
2. What are the states of a Promise?
3. What are `.then()`, `.catch()`, and `.finally()`?
4. What is Promise chaining?
5. What happens when a Promise is rejected?
6. What does `Promise.all()` do?
7. What does `Promise.allSettled()` do?
8. What does `Promise.race()` do?
9. What does `Promise.any()` do?
10. Difference between `Promise.all()` and `Promise.allSettled()`.
11. Difference between `Promise.race()` and `Promise.any()`.
12. How do you handle Promise errors?

---

## 18. Async/Await ⭐⭐⭐⭐⭐

### Must Know

1. What is `async/await`?
2. What does an `async` function return?
3. What does `await` do?
4. How do you handle errors with `async/await`?
5. How does `async/await` work with Promises?
6. Does `await` block JavaScript?
7. How do you run multiple asynchronous operations concurrently?
8. `Promise.all()` vs sequential `await`.

---

## 19. DOM ⭐⭐⭐⭐⭐

### Must Know

1. What is the DOM?
2. What is the difference between DOM and BOM?
3. How do you select an element?
4. `querySelector()` vs `getElementById()`.
5. How do you create a DOM element?
6. How do you add/remove elements?
7. How do you modify classes?
8. `innerHTML` vs `innerText` vs `textContent`.
9. What is DOM traversal?
10. What is event delegation?

---

## 20. Events ⭐⭐⭐⭐⭐

### Must Know

1. What is event bubbling?
2. What is event capturing?
3. What is event propagation?
4. What is event delegation?
5. What is `event.target`?
6. What is `event.currentTarget`?
7. Difference between `target` and `currentTarget`.
8. What does `preventDefault()` do?
9. What does `stopPropagation()` do?
10. Why is event delegation useful?

---

## 21. ES6+ Features ⭐⭐⭐⭐⭐

### Must Know

1. `let` and `const`.
2. Arrow functions.
3. Template literals.
4. Destructuring.
5. Spread/rest.
6. Default parameters.
7. Classes.
8. Modules.
9. Promises.
10. Optional chaining.
11. Nullish coalescing.
12. `Map` and `Set`.

---

## 22. Modules ⭐⭐⭐⭐

### Must Know

1. What are JavaScript modules?
2. What is `export`?
3. What is `import`?
4. Named export vs default export.
5. Can a module have multiple default exports?
6. ES Modules vs CommonJS.
7. `import` vs `require()`.
8. What is dynamic `import()`?

---

## 23. Map, Set, WeakMap & WeakSet ⭐⭐⭐⭐

### Must Know

1. What is `Map`?
2. `Map` vs Object.
3. What is `Set`?
4. `Set` vs Array.
5. What is `WeakMap`?
6. Why is `WeakMap` useful?
7. What is `WeakSet`?
8. How can `Set` be used to remove duplicates?

---

## 24. Error Handling ⭐⭐⭐⭐

### Must Know

1. What is `try...catch`?
2. What is `finally`?
3. What does `throw` do?
4. How do you create a custom error?
5. How do you handle Promise errors?
6. How do you handle errors with `async/await`?
7. Syntax error vs runtime error.

---

## 25. Memory & Garbage Collection ⭐⭐⭐⭐

### Must Know

1. How does JavaScript manage memory?
2. What is garbage collection?
3. What is the heap?
4. What is the stack?
5. What is a memory leak?
6. What commonly causes memory leaks in JavaScript?
7. How can closures contribute to memory leaks?
8. How can event listeners cause memory leaks?

---

## 26. Debouncing & Throttling ⭐⭐⭐⭐⭐

### Must Know

1. What is debouncing?
2. What is throttling?
3. Difference between debounce and throttle.
4. When would you use debounce?
5. When would you use throttle?

Typical examples:

- 🔎 Search input → Debounce
- 📜 Scroll event → Throttle
- 🖱️ Rapid button clicks → Debounce/throttle depending on behavior

---

# 💻 PART 2 — CODING QUESTIONS

The coding section focuses on problems that actually test important JavaScript skills.

---

## 27. Basic JavaScript Coding ⭐⭐⭐⭐⭐

### Must Solve

1. Reverse a string.
2. Check if a string is a palindrome.
3. Check if two strings are anagrams.
4. Find the largest number in an array.
5. Find the second-largest number.
6. Find the smallest number.
7. Find the sum of an array.
8. Count character frequency.
9. Count vowels in a string.
10. Find the first non-repeating character.
11. Find duplicate characters.
12. Find factorial.
13. Generate Fibonacci numbers.
14. Check if a number is prime.

---

## 28. Array Problems ⭐⭐⭐⭐⭐

### Must Solve

1. Remove duplicates from an array.
2. Find duplicate elements.
3. Find the missing number.
4. Find the second-largest number.
5. Find the intersection of two arrays.
6. Find the union of two arrays.
7. Move all zeros to the end.
8. Reverse an array.
9. Flatten a nested array.
10. Merge two sorted arrays.
11. Find pairs that add up to a target.
12. Find the frequency of array elements.
13. Find the maximum subarray sum.
14. Rotate an array.

---

## 29. String Problems ⭐⭐⭐⭐⭐

### Must Solve

1. Reverse a string.
2. Reverse words in a sentence.
3. Check palindrome.
4. Check anagram.
5. Count character frequency.
6. Find the first non-repeating character.
7. Remove duplicate characters.
8. Find the longest word.
9. Find the longest substring without repeating characters.

---

## 30. Object Problems ⭐⭐⭐⭐⭐

### Must Solve

1. Clone an object.
2. Deep clone an object.
3. Compare two objects.
4. Merge two objects.
5. Flatten a nested object.
6. Group an array of objects by a property.
7. Remove duplicate objects.
8. Convert an array into an object.
9. Convert an object into an array.

---

## 31. Array Method Polyfills ⭐⭐⭐⭐⭐

You should understand how these methods work internally.

### Must Implement

1. `map()`
2. `filter()`
3. `reduce()`
4. `forEach()`
5. `find()`
6. `some()`
7. `every()`

> 🔥 The first three are the highest priority: `map`, `filter`, and `reduce`.

---

## 32. `call`, `apply` & `bind` ⭐⭐⭐⭐⭐

### Must Implement

1. Implement `call()`.
2. Implement `apply()`.
3. Implement `bind()`.

Also understand:

- How `this` is passed.
- Why `bind()` returns a new function.
- Difference between the three methods.

---

## 33. Closure Problems ⭐⭐⭐⭐⭐

### Must Solve

1. Create a counter using closure.
2. Create a private variable using closure.
3. Create a function that runs only once.
4. Implement memoization.
5. Explain the `var` loop closure problem.
6. Solve the same loop problem using `let`.

---

## 34. Promise Coding ⭐⭐⭐⭐⭐

### Must Implement

1. Create a Promise from scratch at a basic level.
2. Implement `Promise.all()`.
3. Implement `Promise.race()`.
4. Implement `Promise.allSettled()`.
5. Implement `Promise.any()`.

### Also Practice

6. Promise chaining.
7. Promise error handling.
8. Sequential Promise execution.
9. Parallel Promise execution.

---

## 35. Async JavaScript Problems ⭐⭐⭐⭐⭐

### Must Solve

1. Fetch data using `async/await`.
2. Handle API errors.
3. Execute multiple APIs in parallel.
4. Execute APIs sequentially.
5. Retry a failed request.
6. Add a timeout to an async operation.
7. Cancel a request using `AbortController`.

---

## 36. Debounce & Throttle Coding ⭐⭐⭐⭐⭐

### Must Implement

1. `debounce()`
2. `throttle()`

### Understand

- Leading execution.
- Trailing execution.
- Canceling a pending debounce.
- Real-world search input example.
- Real-world scroll example.

---

## 37. DOM & Event Coding ⭐⭐⭐⭐⭐

### Must Build / Implement

1. Event delegation.
2. Dynamic list handling.
3. Todo list.
4. Tabs.
5. Accordion.
6. Modal.
7. Search/filter UI.
8. Pagination.
9. Basic autocomplete.

> 💡 These are more useful for frontend interviews than artificial “design a JavaScript system” questions.

---

## 38. Output-Based Questions ⭐⭐⭐⭐⭐

You should practice predicting output involving:

### Scope & Hoisting

- `var` vs `let`
- Function hoisting
- TDZ
- Shadowing

### Closures

- Nested functions
- Loops
- Delayed callbacks

### `this`

- Regular functions
- Arrow functions
- Object methods
- `call/apply/bind`

### Async JavaScript

- Promises
- `setTimeout`
- `async/await`
- Microtasks
- Macrotasks

### Type Coercion

- `==`
- `===`
- `+`
- `-`
- Boolean conversion

---

# 🧠 PART 3 — MUST-KNOW ADVANCED TOPICS

These aren't separate huge question banks. They are concepts you should be able to explain clearly.

---

## 39. Type Coercion ⭐⭐⭐⭐⭐

Know:

- `==` vs `===`
- String conversion
- Number conversion
- Boolean conversion
- `+` operator
- `-` operator
- Truthy/falsy values
- `null`
- `undefined`
- `NaN`

---

## 40. Shallow Copy vs Deep Copy ⭐⭐⭐⭐⭐

Know:

- Reference assignment.
- Spread operator.
- `Object.assign()`.
- `structuredClone()`.
- Nested object references.
- Why spread does not perform a deep clone.

---

## 41. Immutability ⭐⭐⭐⭐⭐

Know:

- What immutability means.
- Mutation vs non-mutation.
- Why immutable updates matter in frontend development.
- How to immutably update objects.
- How to immutably update arrays.

---

## 42. Event Loop Execution Order ⭐⭐⭐⭐⭐

You should be able to reason about:

```text
Synchronous code
      ↓
Call Stack
      ↓
Microtasks
      ↓
Next task / Macrotask
      ↓
Microtasks
      ↓
Next task
```

Especially understand:

- `Promise.then()`
- `queueMicrotask()`
- `setTimeout()`
- `setInterval()`
- `async/await`

---

# 🏆 TOP 30 — If You Have Very Little Time

If you only have time to prepare **30 JavaScript questions**, do these first.

### 🔥 Theory

1. `var` vs `let` vs `const`
2. Primitive vs reference types
3. `==` vs `===`
4. Type coercion
5. Scope
6. Hoisting
7. Temporal Dead Zone
8. Execution context
9. Closures
10. `this`
11. Arrow function vs regular function
12. `call` vs `apply` vs `bind`
13. Prototype
14. Prototype chain
15. Class vs prototype
16. `map` vs `forEach`
17. `map` vs `filter` vs `reduce`
18. Shallow vs deep copy
19. Event loop
20. Microtasks vs macrotasks
21. Promise
22. `Promise.all`
23. `Promise.allSettled`
24. `Promise.race`
25. `Promise.any`
26. `async/await`
27. Event bubbling/capturing/delegation
28. Debounce vs throttle
29. Event delegation
30. ES Modules

---

# 💻 TOP 30 CODING QUESTIONS

If you want the highest-value coding practice:

1. Reverse a string.
2. Check palindrome.
3. Check anagram.
4. Find duplicate elements.
5. Remove duplicates from an array.
6. Find the missing number.
7. Find the second-largest number.
8. Find character frequency.
9. Find first non-repeating character.
10. Find intersection of two arrays.
11. Move zeros to the end.
12. Flatten an array.
13. Merge sorted arrays.
14. Two Sum.
15. Maximum subarray sum.
16. Longest substring without repeating characters.
17. Implement `map()`.
18. Implement `filter()`.
19. Implement `reduce()`.
20. Implement `call()`.
21. Implement `apply()`.
22. Implement `bind()`.
23. Create a closure-based counter.
24. Implement `once()`.
25. Implement memoization.
26. Implement `Promise.all()`.
27. Implement debounce.
28. Implement throttle.
29. Implement event delegation.
30. Predict output involving Promises, timers, closures, and `this`.

---

# 🎯 WHAT YOU DO NOT NEED TO PRIORITIZE

The following are intentionally **not part of the core preparation list**:

- ❌ Design a Pub/Sub system
- ❌ Design a Promise queue
- ❌ Design a task scheduler
- ❌ Design a rate limiter
- ❌ Design a request manager
- ❌ Design a middleware framework
- ❌ Design a state-management library
- ❌ Design a custom event system
- ❌ Build an entire caching architecture
- ❌ Build an autocomplete system from scratch
- ❌ Complex generator problems
- ❌ Advanced regex puzzles
- ❌ Rare JavaScript engine internals
- ❌ Obscure browser APIs

These can be useful in **specialized senior/system-design interviews**, but they are not part of the **core JavaScript interview preparation** most developers need.

---

# 📌 FINAL PREPARATION ORDER

Follow this order instead of trying to memorize everything at once:

```text
1. Fundamentals
      ↓
2. Variables & Types
      ↓
3. Scope & Hoisting
      ↓
4. Functions
      ↓
5. Closures
      ↓
6. this + call/apply/bind
      ↓
7. Objects + Prototypes
      ↓
8. Arrays + Strings
      ↓
9. Copying + Immutability
      ↓
10. Event Loop
      ↓
11. Promises
      ↓
12. Async/Await
      ↓
13. DOM + Events
      ↓
14. Debounce + Throttle
      ↓
15. Polyfills
      ↓
16. Coding Problems
      ↓
17. Output-Based Questions
```

---

# ✅ FINAL CHECKLIST

## Theory

- JavaScript fundamentals
- Variables
- Primitive/reference types
- Type coercion
- Scope
- Hoisting
- TDZ
- Execution context
- Functions
- Closures
- `this`
- `call/apply/bind`
- Objects
- Prototypes
- Prototype chain
- Classes
- Arrays
- Strings
- Destructuring
- Spread/rest
- Shallow/deep copy
- Immutability
- Call stack
- Event loop
- Microtasks/macrotasks
- Promises
- Async/await
- DOM
- Events
- Event delegation
- ES6+
- Modules
- Map/Set
- Error handling
- Memory management
- Debounce/throttle

## Coding

- String problems
- Array problems
- Object problems
- Two Sum
- Sliding window
- Frequency counting
- Recursion basics
- `map` polyfill
- `filter` polyfill
- `reduce` polyfill
- `call` polyfill
- `apply` polyfill
- `bind` polyfill
- Closure problems
- Memoization
- `Promise.all`
- Async/await problems
- Debounce
- Throttle
- DOM/event problems
- Output-based questions
