# What is throttling?

Throttling ensures that a function executes at most once during a specified time interval.

In simple terms, even if an event happens many times, the function is allowed to execute only at a controlled frequency.

Example: Handling a scroll event on a webpage.

Scrolling can trigger hundreds of events. Throttling can limit a handler to execute at most once every 200 milliseconds.

How throttling works

Many events

Limit frequency

Controlled calls

Example code:

```
// Allow the function to execute at most once every 200 ms.
function throttle(callback, delay) {
  let lastExecution = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastExecution >= delay) {
      lastExecution = now;
      callback.apply(this, args);
    }
  };
}

const handleScroll = throttle(() => {
  console.log("Scroll event handled");
}, 200);

window.addEventListener("scroll", handleScroll);
```

Key point: Throttling limits how frequently the callback executes, even while events continue to occur.

This implementation uses leading execution and does not guarantee a final callback after the events stop.
