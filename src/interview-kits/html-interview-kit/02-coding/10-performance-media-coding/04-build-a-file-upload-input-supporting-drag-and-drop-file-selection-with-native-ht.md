# File upload with drag-and-drop using HTML/JavaScript

A **file input** allows users to select files from their device.

The HTML **Drag and Drop API** can be combined with `<input type="file">` to create a drop zone where users can either:

* Click and select files.
* Drag files onto the drop zone.

A good implementation should also preserve the native file input as the accessible mechanism.

```html
<!-- Accessible file upload with click-to-select and drag-and-drop support -->
<label for="file-input">Upload a file</label>

<div
  id="drop-zone"
  tabindex="0"
  role="button"
  aria-describedby="upload-help"
>
  <p>Drag and drop a file here</p>
  <p>or click to select a file</p>

  <input
    id="file-input"
    type="file"
    accept=".jpg,.jpeg,.png,.pdf"
  />
</div>

<p id="upload-help">
  Accepted formats: JPG, PNG, and PDF.
</p>

<p id="file-name" aria-live="polite"></p>
```

JavaScript handles both selection methods:

```javascript
// Handle file selection from the input and files dropped onto the drop zone
const input = document.querySelector("#file-input");
const dropZone = document.querySelector("#drop-zone");
const fileName = document.querySelector("#file-name");

function displayFile(file) {
  if (!file) return;

  fileName.textContent = `Selected file: ${file.name}`;
}

input.addEventListener("change", () => {
  displayFile(input.files[0]);
});

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();

  const file = event.dataTransfer.files[0];

  displayFile(file);
});
```

### Making the drop zone clickable

A common approach is to visually hide the input while keeping it accessible, or use a `<label>` associated with the input. For example:

```html
<!-- Use a label as the accessible clickable drop-zone trigger -->
<label for="file-input" id="drop-zone">
  <span>Drag and drop a file here or click to select</span>

  <input
    id="file-input"
    type="file"
    accept=".jpg,.jpeg,.png,.pdf"
  />
</label>
```

You can then add CSS to make it look like a drop area.

### Important security point

The browser gives JavaScript access to the selected **`File` objects**, but websites cannot arbitrarily read files from the user's computer without the user selecting/dropping them.

For an actual upload, you would typically send the file using `FormData` and `fetch()`:

```javascript
// Upload the selected file to the server using multipart/form-data
const formData = new FormData();
formData.append("file", input.files[0]);

fetch("/upload", {
  method: "POST",
  body: formData
});
```

**Do not manually set `Content-Type: multipart/form-data`** when using `FormData`; the browser sets the correct boundary automatically.

---

# ⭐ Quick Interview Cheat Sheet

| Topic              | Key point                                     |
| ------------------ | --------------------------------------------- |
| `<picture>`        | Provides different image sources/formats      |
| AVIF → WebP → JPEG | Modern format with fallback chain             |
| `loading="lazy"`   | Defers non-critical/offscreen image loading   |
| `preconnect`       | Establishes connection early                  |
| `preload`          | Fetches a critical resource early             |
| `async`            | Executes as soon as downloaded                |
| `defer`            | Executes after HTML parsing, preserving order |
| `type="module"`    | ES module; deferred by default                |
| File input         | Native file selection                         |
| Drag & Drop API    | Allows files/data to be dragged and dropped   |
| `FormData`         | Conveniently sends form/file data to a server |
