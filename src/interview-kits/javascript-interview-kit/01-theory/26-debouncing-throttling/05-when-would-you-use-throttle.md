# When would you use throttle?

Use throttle when you need regular updates during a continuous stream of events.

Common use cases:

- Scroll events: Update scroll position or trigger visibility checks.
- Mouse movement: Track pointer position without excessive processing.
- Window resizing: Update dimensions at controlled intervals while resizing.
- Game controls: Limit how frequently certain actions execute.
- Analytics: Limit the frequency of repeated event processing.

Example: While a user scrolls for five seconds, throttling can process the scroll handler every 200 milliseconds rather than processing every scroll event.

Note that `requestAnimationFrame` is often a better choice for visual updates tied to scrolling or resizing.
