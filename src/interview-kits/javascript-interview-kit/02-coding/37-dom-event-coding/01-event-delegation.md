# Event delegation.

Event delegation is a technique where you attach a single event listener to a parent element instead of adding individual listeners to every child.

It works because of event bubbling: an event triggered on a child element bubbles up through its ancestors.

Real-world example: Handling clicks on a list containing hundreds of buttons.

// HTML: Add one listener to the parent instead of listeners to every button.

```
<ul id="userList">
  <li><button data-id="1">User 1</button></li>
  <li><button data-id="2">User 2</button></li>
  <li><button data-id="3">User 3</button></li>
</ul>

<script>
  const userList = document.getElementById("userList");

  userList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-id]");

    // Ignore clicks outside the intended buttons.
    if (!button || !userList.contains(button)) return;

    console.log("Clicked user:", button.dataset.id);
  });
</script>
```

### How it works

1. A user clicks a button.
2. The click event bubbles to `userList`.
3. `closest()` finds the intended button, even if the user clicks an element inside it.
4. `dataset.id` retrieves the user's ID.

Advantages

- Fewer event listeners.
- Works with dynamically added elements.
- Reduces repetitive event-handling code.

Gotcha: Use `event.target` to identify the clicked element and `event.currentTarget` to identify the element whose listener is running.
