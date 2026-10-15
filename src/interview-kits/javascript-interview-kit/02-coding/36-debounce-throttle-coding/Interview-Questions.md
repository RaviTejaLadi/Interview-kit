## Common interview questions

Q1. Why does debounce use `clearTimeout()`?

To cancel the previous scheduled callback whenever a new event occurs. This ensures the callback runs only after the event stream becomes quiet for the configured delay.

Q2. Why does throttle use `Date.now()`?

A timestamp-based throttle compares the current time with the last execution time to determine whether the next execution is allowed.

Q3. Can debounce and throttle both use `setTimeout()`?

Yes. Debounce commonly uses a timer that resets on every call. Throttle can use timestamps, timers, or both, depending on whether leading and trailing execution are required.

Q4. Which is better for API calls?

It depends on the use case:

- Search suggestions: debounce.
- Continuous scroll tracking: throttle.
- Autosaving after typing stops: debounce.
- Periodic location updates: throttle.

Q5. What is the difference between leading and trailing execution?

- Leading: execute at the beginning of an eligible period.
- Trailing: execute at the end of the period using the latest call's arguments.

Q6. Why do we use `callback.apply(this, args)`?

It preserves the original calling context and arguments. This makes a utility more reusable than calling `callback()` directly.

Q7. Should we always use debounce or throttle for scroll events?

No. For lightweight handlers, neither may be necessary. For high-frequency visual updates, `requestAnimationFrame()` can be a better fit because it coordinates work with the browser's rendering cycle.

## 6. What to remember

- Debounce: wait until the user stops triggering events.
- Throttle: limit how often a callback executes.
- Leading: execute immediately at the beginning.
- Trailing: execute after the interval with the latest arguments.
- Cancel: clear pending scheduled work.
- React: keep callback identities stable, clean up timers, and prevent stale API responses where necessary.

One final distinction: neither technique automatically limits the number of API requests already in flight. Use `AbortController`, request identifiers, or suitable caching when asynchronous requests can overlap.
