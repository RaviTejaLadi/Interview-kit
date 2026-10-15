# Todo list.

A todo list combines several essential operations: adding tasks, marking tasks as completed, and deleting tasks.

This example uses an array of objects as the source of truth and re-renders the list whenever the state changes.

// JavaScript: Build a todo list with add, complete, and delete operations.

```
<input id="todoInput" placeholder="Enter a task" />
<button id="addTodo">Add Task</button>
<ul id="todoList"></ul>

<script>
  let todos = [];
  let nextId = 1;

  const input = document.getElementById("todoInput");
  const list = document.getElementById("todoList");

  function renderTodos() {
    list.replaceChildren();

    todos.forEach((todo) => {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      const text = document.createElement("span");
      const deleteButton = document.createElement("button");

      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;

      text.textContent = todo.text;
      text.style.textDecoration = todo.completed
        ? "line-through"
        : "none";

      deleteButton.textContent = "Delete";
      deleteButton.type = "button";

      checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        renderTodos();
      });

      deleteButton.addEventListener("click", () => {
        todos = todos.filter((item) => item.id !== todo.id);
        renderTodos();
      });

      li.append(checkbox, text, deleteButton);
      list.appendChild(li);
    });
  }

  document.getElementById("addTodo").addEventListener("click", () => {
    const text = input.value.trim();

    if (!text) return;

    todos.push({
      id: nextId++,
      text,
      completed: false
    });

    input.value = "";
    renderTodos();
  });
</script>
```

### How it works

Each task is represented by an object:

```
// Example todo data.
const todo = {
  id: 1,
  text: "Learn JavaScript",
  completed: false
};
```

- Add: `push()` adds a task.
- Complete: Updates the task's `completed` property.
- Delete: `filter()` creates a new array without the selected task.
- Render: Rebuilds the list from the updated data.

Interview takeaway: In React, you would normally use `useState` and render the tasks with `todos.map()`, rather than manually manipulating DOM elements.
