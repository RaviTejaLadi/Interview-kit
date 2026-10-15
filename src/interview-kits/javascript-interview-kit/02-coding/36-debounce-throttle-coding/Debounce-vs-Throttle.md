| Feature            | Debounce                    | Throttle                     |
| ------------------ | --------------------------- | ---------------------------- |
| Main purpose       | Wait for inactivity         | Limit execution frequency    |
| Typical execution  | After the final event       | Periodically during events   |
| Leading execution  | Optional                    | Common                       |
| Trailing execution | Common                      | Optional or configurable     |
| Search API         | Excellent fit               | Useful for periodic search   |
| Scroll progress    | Usually not ideal           | Excellent fit                |
| Window resize      | Useful after resizing stops | Useful during resizing       |
| Cancellation       | Clear pending timer         | Clear pending trailing timer |
