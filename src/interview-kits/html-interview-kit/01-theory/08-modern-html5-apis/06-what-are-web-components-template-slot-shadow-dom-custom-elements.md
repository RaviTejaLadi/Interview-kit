# What are Web Components?

**Web Components** are a set of browser standards that allow developers to create **reusable, encapsulated custom HTML elements**.

The main technologies are:

1. **Custom Elements**
2. **Shadow DOM**
3. **`<template>`**
4. **`<slot>`**

Together, they allow you to build reusable components that can work independently of frameworks such as React or Angular.

---

## Custom Elements

**Custom Elements** allow you to create your own HTML elements.

For example:

```html
<!-- Use a custom HTML element -->
<user-card></user-card>
```

You define its behavior using JavaScript:

```javascript
// Define the behavior of a custom HTML element
class UserCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "<h2>John Doe</h2><p>Frontend Developer</p>";
  }
}

customElements.define("user-card", UserCard);
```

Now `<user-card>` behaves as a custom HTML element.

---

## Shadow DOM

**Shadow DOM** provides an **encapsulated DOM tree** attached to an element.

Its main benefit is **style and DOM isolation**.

Styles inside the Shadow DOM generally don't leak into the surrounding document, and outside styles generally don't directly style elements inside it.

```javascript
// Create an isolated Shadow DOM for the custom element
class UserCard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        h2 {
          color: blue;
        }
      </style>

      <h2>John Doe</h2>
    `;
  }
}

customElements.define("user-card", UserCard);
```

### `mode`

* `open` → JavaScript can access `element.shadowRoot`.
* `closed` → `element.shadowRoot` returns `null`.

---

##  `<template>`

The **`<template>`** element contains HTML that is **not rendered immediately**.

It provides a reusable HTML structure that JavaScript can clone and insert into the document or Shadow DOM.

```html
<!-- Define reusable HTML that is inert until cloned -->
<template id="userTemplate">
  <div class="card">
    <h2>User Name</h2>
    <p>Frontend Developer</p>
  </div>
</template>
```

JavaScript can clone it:

```javascript
// Clone the template content and add it to the page
const template = document.querySelector("#userTemplate");

const clone = template.content.cloneNode(true);

document.body.appendChild(clone);
```

---

##  `<slot>`

A **`<slot>`** provides a placeholder inside a Web Component where **content supplied by the component's consumer** can be inserted.

Think of it as a component's **content insertion point**.

```html
<!-- Provide content that will be inserted into the component's slot -->
<user-card>
  <span slot="name">Ravi</span>
</user-card>
```

The component can define:

```html
<!-- Define a slot where external content can be inserted -->
<slot name="name"></slot>
```

The `<span slot="name">` supplied by the user is rendered inside that slot.

---

# ⭐ Web Components — Interview Cheat Sheet

| Technology          | Purpose                                                       |
| ------------------- | ------------------------------------------------------------- |
| **Custom Elements** | Create custom HTML elements                                   |
| **Shadow DOM**      | Encapsulate DOM and styles                                    |
| **`<template>`**    | Define reusable, initially inert HTML                         |
| **`<slot>`**        | Allow consumers to inject content                             |
| **Web Components**  | Combination of these standards for reusable native components |

### Easy way to remember

**Custom Element → What is the component?**
**Shadow DOM → How is it isolated?**
**Template → What is its reusable structure?**
**Slot → Where does external content go?**
