# What is debouncing?

Debouncing delays function execution until a specified amount of time has passed without another event occurring.

In simple terms, if a user keeps typing, the function waits until the user stops typing before executing.

Example: Search suggestions on an e-commerce website.

If a user types `React`, instead of making an API request for every character, debounce waits until the user stops typing for 500 milliseconds.

How debounce works

User types

Wait 500 ms

Execute once

Example code:

```
// Execute the function only after the user stops typing for 500 ms.
function debounce(callback, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

const search = debounce((value) => {
  console.log("Searching for:", value);
}, 500);

search("R");
search("Re");
search("React");

// Output after 500 ms without another call:
// Searching for: React
```

Key point: Every new call resets the timer. The callback executes only after the calls stop for the specified delay.
