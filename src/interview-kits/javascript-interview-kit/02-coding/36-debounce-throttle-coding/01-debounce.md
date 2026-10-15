# `debounce()`

## What is `debounce()`?

Debouncing delays function execution until a specified amount of time has passed since the last function call.

Imagine a search input. When you type `React`, five characters generate multiple input events. Instead of calling the API for every character, debounce waits until you stop typing.

### How debounce works

Delay: 500 ms

0 ms

User types `R`

Timer starts

200 ms

User types `e`

Previous timer resets

400 ms

User types `a`

Previous timer resets again

900 ms

Function executes if no new input occurs

## 1.1 Implement `debounce()` from scratch

// Basic JavaScript debounce implementation.

```
function debounce(callback, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}
```

### Explanation

1. `timerId` stores the currently pending timer.
2. Every function call runs `clearTimeout(timerId)`.
3. The previous timer is cancelled.
4. A new timer starts using `setTimeout()`.
5. If no new call occurs within `delay`, the callback executes.
6. `...args` preserves the arguments passed to the function.
7. `callback.apply(this, args)` preserves the calling context (`this`) and arguments.

### Example

// Try the debounced function with repeated calls.

```
function sayHello(name) {
  console.log(`Hello, ${name}`);
}

const debouncedHello = debounce(sayHello, 1000);

debouncedHello("Ravi");
debouncedHello("Teja");
debouncedHello("React");

// After one second without another call:
// Hello, React
```

Only the last call executes because each new call resets the timer.

## 1.2 Leading execution

Leading execution means the callback executes immediately on the first call instead of waiting for the delay.

Subsequent calls during the debounce window are suppressed. In this implementation, the next execution becomes possible after the delay expires.

// Debounce with leading execution.

```
function debounceLeading(callback, delay) {
  let timerId;

  return function (...args) {
    const shouldCallImmediately = timerId === undefined;

    clearTimeout(timerId);

    timerId = setTimeout(() => {
      timerId = undefined;
    }, delay);

    if (shouldCallImmediately) {
      callback.apply(this, args);
    }
  };
}
```

### Example

// Demonstrate immediate execution followed by suppression.

```
const logClick = debounceLeading(
  () => console.log("Executed"),
  1000
);

logClick(); // Immediately: Executed
logClick(); // Suppressed
logClick(); // Suppressed

// After the timer expires:
logClick(); // Immediately: Executed
```

Important: This is a leading-only debounce. It does not execute a final trailing callback.

## 1.3 Trailing execution

Trailing execution means the callback runs after the last call, once the specified delay has elapsed.

The basic implementation from section 1.1 is a trailing debounce.

For example, if a user types several characters within 500 ms, the callback executes 500 ms after the final keystroke.

```
// Trailing debounce example.
const search = debounce((query) => {
  console.log("Searching for:", query);
}, 500);

search("R");
search("Re");
search("Rea");
search("React");

// After 500 ms without another call:
// Searching for: React
```

### Leading vs. trailing debounce

| Behavior               | Leading                  | Trailing          |
| ---------------------- | ------------------------ | ----------------- |
| Execution              | Immediately              | After the delay   |
| Uses latest arguments? | Not necessarily          | Yes               |
| Common use             | Immediate click feedback | Search input      |
| API request pattern    | First event              | Final input value |

You can also combine leading and trailing execution when you need an immediate response and a final response after activity stops.

## 1.4 Cancel a pending debounce

Sometimes you need to cancel a scheduled callback. For example, a user might clear a search field or navigate away before the pending API request starts.

We can expose a `.cancel()` method on the returned function.

// Debounce implementation with cancellation support.

```
function debounce(callback, delay) {
  let timerId;

  function debounced(...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback.apply(this, args);
      timerId = undefined;
    }, delay);
  }

  debounced.cancel = function () {
    clearTimeout(timerId);
    timerId = undefined;
  };

  return debounced;
}
```

### Example

// Cancel the callback before its timer expires.

```
const saveData = debounce(() => {
  console.log("Data saved");
}, 2000);

saveData();

saveData.cancel();

// "Data saved" will not be logged for this pending call.
```

Calling `.cancel()` clears the pending timer. It does not cancel a callback that has already started executing or an API request already in progress.

## 1.5 Real-world search input example

A search input is one of the most common uses of debounce.

Without debounce, every keystroke might trigger an API request. With debounce, we wait until the user pauses typing.

// React search component using a debounced API call.

```
import { useEffect, useMemo, useState } from "react";

function debounce(callback, delay) {
  let timerId;

  const debounced = (...args) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  debounced.cancel = () => clearTimeout(timerId);

  return debounced;
}

export default function SearchUsers() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce(async (searchTerm) => {
        if (!searchTerm.trim()) {
          setResults([]);
          setError("");
          return;
        }

        try {
          const response = await fetch(
            `/api/users?q=${encodeURIComponent(searchTerm)}`
          );

          if (!response.ok) {
            throw new Error("Search request failed");
          }

          const data = await response.json();
          setResults(data);
          setError("");
        } catch {
          setError("Unable to load users.");
        }
      }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(query);

    return () => debouncedSearch.cancel();
  }, [query, debouncedSearch]);

  return (
    <div>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search users..."
      />

      {error && <p role="alert">{error}</p>}

      <ul>
        {results.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

This example assumes `/api/users` returns an array of users. Replace that endpoint with your actual API.

React gotcha: `useMemo` keeps the debounced function stable across renders, while the effect cleanup cancels pending work. If requests can overlap, also use `AbortController` or a request ID to prevent older responses from overwriting newer results.

## 1.6 Real-world scroll example using debounce

Suppose you want to run expensive calculations after the user stops scrolling. Debounce avoids repeating that work during continuous scrolling.

// Run an action after scrolling stops.

```
const handleScrollEnd = debounce(() => {
  console.log("Scrolling stopped");

  // Perform expensive layout calculations here.
}, 200);

window.addEventListener("scroll", handleScrollEnd, {
  passive: true,
});

// Cleanup when the feature is no longer needed:
// window.removeEventListener("scroll", handleScrollEnd);
// handleScrollEnd.cancel();
```

This is useful for scroll-end analytics, final-position calculations, and certain lazy-loading strategies.
