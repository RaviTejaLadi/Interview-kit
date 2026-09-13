# What is the Intersection Observer API?

The **Intersection Observer API** allows JavaScript to detect when an element **enters or leaves the visible area of the viewport or another scrolling container**.

It is commonly used for:

- Lazy loading images
- Infinite scrolling
- Implementing animations when elements become visible
- Tracking visibility
- Detecting when a section enters the viewport

Instead of continuously using `scroll` events, the browser efficiently notifies you when the intersection changes.

```javascript
// Observe when an element becomes visible in the viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log('Element is visible');
    }
  });
});

observer.observe(document.querySelector('#target'));
```

### Important property

`entry.isIntersecting` tells you whether the observed element is currently intersecting the specified root.
