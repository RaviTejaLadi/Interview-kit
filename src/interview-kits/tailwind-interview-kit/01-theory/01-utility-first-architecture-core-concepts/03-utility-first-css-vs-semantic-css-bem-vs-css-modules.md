# Utility-first CSS vs Semantic CSS (BEM) vs CSS Modules.

These approaches solve the same general problem—organizing CSS—but use different strategies.

| Approach        | Main idea                  | Example                      |
| --------------- | -------------------------- | ---------------------------- |
| **Tailwind**    | Compose utility classes    | `p-4 text-white bg-blue-500` |
| **BEM**         | Semantic naming convention | `card__title--large`         |
| **CSS Modules** | Locally scoped CSS classes | `styles.card`                |

### A. Utility-first — Tailwind

```jsx
// Build the component entirely with utility classes
function Card() {
  return (
    <div className="p-6 rounded-lg bg-white shadow">
      <h2 className="text-xl font-bold">Hello</h2>
    </div>
  );
}
```

The styling is visible directly where the component is used.

---

### B. Semantic CSS — BEM

BEM stands for:

**Block → Element → Modifier**

For example:

```html
<!-- BEM naming describes the component structure -->
<article class="card card--featured">
  <h2 class="card__title">Hello</h2>
</article>
```

CSS:

```css
/* Style the BEM block */
.card {
  padding: 24px;
  background: white;
}

/* Style the BEM element */
.card__title {
  font-size: 20px;
}

/* Style the BEM modifier */
.card--featured {
  border: 2px solid blue;
}
```

The class names describe **what the component is**.

---

### C. CSS Modules

CSS Modules provide **locally scoped CSS classes**.

```css
/* Card.module.css */
.card {
  padding: 24px;
  background: white;
  border-radius: 8px;
}
```

```jsx
// CSS Modules scope the class to this component
import styles from './Card.module.css';

function Card() {
  return <div className={styles.card}>Hello</div>;
}
```

The important difference is that CSS Modules solve **CSS scoping**, while Tailwind primarily solves **styling through utilities**.

### In short

```text
Tailwind
→ "How should this element look?"

BEM
→ "What does this component represent?"

CSS Modules
→ "How can I scope this CSS to this component?"
```

They can also be combined. For example, CSS Modules can be used for component-specific complex CSS while Tailwind handles common layout and spacing.
