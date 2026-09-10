# What is the Drag and Drop API?

The **HTML Drag and Drop API** allows users to **drag elements or data and drop them onto another element**.

It is commonly used for:

* File uploads
* Reordering lists
* Kanban boards
* Moving items between containers
* Dragging data between elements

Important events include:

| Event       | Purpose                            |
| ----------- | ---------------------------------- |
| `dragstart` | Dragging begins                    |
| `drag`      | Element is being dragged           |
| `dragover`  | Dragged item is over a drop target |
| `drop`      | Item is dropped                    |
| `dragend`   | Dragging finishes                  |

```html
<!-- Create a draggable element and a drop target -->
<div id="item" draggable="true">Drag me</div>

<div id="dropZone">Drop here</div>

<script>
  const item = document.querySelector("#item");
  const dropZone = document.querySelector("#dropZone");

  item.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", item.id);
  });

  dropZone.addEventListener("dragover", (event) => {
    event.preventDefault(); // Required to allow dropping
  });

  dropZone.addEventListener("drop", (event) => {
    event.preventDefault();

    const id = event.dataTransfer.getData("text/plain");
    const draggedItem = document.getElementById(id);

    dropZone.appendChild(draggedItem);
  });
</script>
```

### Key point

The `draggable="true"` attribute makes an element draggable.

For modern applications, especially touch-heavy interfaces, libraries or pointer-based implementations are sometimes preferred because native HTML drag-and-drop has browser/device behavior differences.
