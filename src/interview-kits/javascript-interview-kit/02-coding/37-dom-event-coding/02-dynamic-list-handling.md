# Dynamic list handling.

Dynamic list handling means adding, removing, or updating list items in response to user actions without reloading the page.

For example, you might add a new skill to a list or remove an item when a delete button is clicked.

// JavaScript: Add and remove list items using event delegation.

```
<input id="itemInput" placeholder="Enter an item" />
<button id="addButton">Add</button>

<ul id="itemsList"></ul>

<script>
  const input = document.getElementById("itemInput");
  const addButton = document.getElementById("addButton");
  const list = document.getElementById("itemsList");

  addButton.addEventListener("click", () => {
    const value = input.value.trim();

    if (!value) return;

    const li = document.createElement("li");
    const span = document.createElement("span");
    const removeButton = document.createElement("button");

    span.textContent = value;
    removeButton.textContent = "Remove";
    removeButton.type = "button";

    li.append(span, " ", removeButton);
    list.appendChild(li);

    input.value = "";
    input.focus();
  });

  list.addEventListener("click", (event) => {
    if (event.target.matches("button")) {
      event.target.closest("li").remove();
    }
  });
</script>
```

### Key concepts

- `createElement()` creates DOM elements.
- `textContent` inserts text safely.
- `appendChild()` adds an element to the DOM.
- `remove()` removes an element.
- Event delegation handles clicks on all current and future remove buttons.

Gotcha: Avoid inserting untrusted user input with `innerHTML`, because it can introduce cross-site scripting (XSS) vulnerabilities.
