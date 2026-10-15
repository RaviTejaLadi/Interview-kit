# `throttle()`

## What is `throttle()`?

Throttling ensures a function executes at most once per specified time interval.

Imagine scrolling a page. A scroll event can fire many times per second. Throttling limits how frequently your handler executes, even while scrolling continues.

### How throttle works

Interval: 500 ms

0 ms

First event executes

100 ms

Event ignored

250 ms

Event ignored

400 ms

Event ignored

500 ms

Next eligible event can execute

## 2.1 Implement `throttle()` from scratch

A timestamp-based implementation executes immediately on the first call and suppresses calls until the interval expires.

// Basic leading throttle implementation.

```
function throttle(callback, delay) {
  let lastExecutionTime = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastExecutionTime >= delay) {
      lastExecutionTime = now;
      callback.apply(this, args);
    }
  };
}
```

### Explanation

1. `lastExecutionTime` tracks the last execution time.
2. `Date.now()` gets the current timestamp in milliseconds.
3. The elapsed time is calculated.
4. If the elapsed time is at least `delay`, the callback executes.
5. Otherwise, the call is ignored.

### Example

// Limit function execution to once every second.

```
const logScroll = throttle(() => {
  console.log("Scroll handler executed");
}, 1000);

window.addEventListener("scroll", logScroll, {
  passive: true,
});
```

Even if the scroll event fires hundreds of times, this handler executes no more frequently than once per second.

## 2.2 Leading execution

Leading throttle executes immediately when the first event arrives, then limits further executions to one per interval.

The implementation above is a leading throttle, with an important edge case: because `lastExecutionTime` starts at zero, the first call can be suppressed if the environment's clock is still less than the specified delay. A clearer implementation explicitly tracks whether a call has happened.

// Leading throttle that always permits the first call.

```
function throttleLeading(callback, delay) {
  let lastExecutionTime = null;

  return function (...args) {
    const now = Date.now();

    if (
      lastExecutionTime === null ||
      now - lastExecutionTime >= delay
    ) {
      lastExecutionTime = now;
      callback.apply(this, args);
    }
  };
}
```

### Example

// Demonstrate leading throttle.

```
const logEvent = throttleLeading(
  () => console.log("Executed"),
  1000
);

logEvent(); // Executes immediately
logEvent(); // Ignored
logEvent(); // Ignored

// After one second, another call can execute.
logEvent();
```

Notice that throttle does not wait for events to stop. It controls the maximum execution frequency.

## 2.3 Trailing execution

A trailing throttle remembers the most recent call during the interval and executes it when the interval ends.

This is useful when you want to limit updates but also need the final value to be processed.

// Throttle with leading and trailing execution.

```
function throttle(callback, delay) {
  let lastExecutionTime = 0;
  let timerId;
  let lastArgs;
  let lastThis;

  function throttled(...args) {
    const now = Date.now();
    const remaining = delay - (now - lastExecutionTime);

    lastArgs = args;
    lastThis = this;

    if (remaining <= 0) {
      clearTimeout(timerId);
      timerId = undefined;
      lastExecutionTime = now;

      callback.apply(lastThis, lastArgs);
      lastArgs = lastThis = undefined;
    } else if (timerId === undefined) {
      timerId = setTimeout(() => {
        lastExecutionTime = Date.now();
        timerId = undefined;

        callback.apply(lastThis, lastArgs);
        lastArgs = lastThis = undefined;
      }, remaining);
    }
  }

  throttled.cancel = () => {
    clearTimeout(timerId);
    timerId = undefined;
    lastArgs = lastThis = undefined;
    lastExecutionTime = 0;
  };

  return throttled;
}
```

### How it behaves

Suppose the delay is 1,000 ms.

- At 0 ms, the callback executes immediately.
- Calls at 200 ms and 500 ms do not execute immediately.
- The latest arguments are retained.
- At approximately 1,000 ms, the trailing callback executes with the latest arguments.

This implementation supports both leading and trailing execution. The trailing execution is scheduled relative to the last actual execution, not necessarily the last incoming event.

## 2.4 Cancel a pending throttle

The `.cancel()` method clears a pending trailing callback and resets the throttle state.

// Cancel pending throttled execution.

```
const updatePosition = throttle((position) => {
  console.log("Position:", position);
}, 1000);

updatePosition(10);
updatePosition(20);

// Cancel any pending trailing execution.
updatePosition.cancel();
```

This cancellation method works with the throttle implementation in section 2.3. The leading callback, if it already ran, cannot be undone.

## 2.5 Real-world scroll example using throttle

Suppose you want to update a progress indicator as the user scrolls. You need regular updates while scrolling, rather than waiting for scrolling to stop.

// Update page scroll progress at a controlled rate.

```
const updateScrollProgress = throttle(() => {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    scrollableHeight > 0
      ? (window.scrollY / scrollableHeight) * 100
      : 0;

  console.log(`Scroll progress: ${progress.toFixed(1)}%`);
}, 100);

window.addEventListener("scroll", updateScrollProgress, {
  passive: true,
});

// Cleanup when no longer needed:
// window.removeEventListener("scroll", updateScrollProgress);
// updateScrollProgress.cancel();
```

Here, the handler executes at most once per 100 ms, with a trailing update for the latest scroll position.

## 2.6 Real-world search input example using throttle

Throttle can also be used for search, but it behaves differently from debounce.

A throttled search may send a request periodically while the user is typing. It does not necessarily wait until typing stops.

// Perform search requests at a limited frequency.

```
const throttledSearch = throttle(async (query) => {
  if (!query.trim()) return;

  try {
    const response = await fetch(
      `/api/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Search failed");
    }

    const results = await response.json();
    console.log(results);
  } catch (error) {
    console.error("Search error:", error);
  }
}, 1000);

const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", (event) => {
  throttledSearch(event.target.value);
});
```

This assumes the page contains an element with `id="search"` and that `/api/search` is a valid endpoint.

For a typical search box, debounce is usually preferable because you generally want to search after the user pauses typing. Throttle is more appropriate when periodic updates are useful.
