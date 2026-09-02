# 🎨 CSS Interview Questions

## How to use this kit

1. Work through the questions in this README in order.
2. Open [`TOPICS.md`](./TOPICS.md) and write your answers in the matching topic file.
3. To add or improve content, follow [CONTRIBUTING.md](../CONTRIBUTING.md).

---

# 📚 PART 1 — THEORY QUESTIONS

---

## 1. CSS Box Model & Sizing ⭐⭐⭐⭐⭐

### Must Know

1. What is the CSS Box Model?
2. What are the 4 layers of the Box Model (Content, Padding, Border, Margin)?
3. What is `box-sizing: content-box` vs `box-sizing: border-box`?
4. Why is `* { box-sizing: border-box; }` the modern industry standard?
5. What is Margin Collapsing?
6. In what scenarios does margin collapsing NOT happen?
7. How do negative margins behave?

---

## 2. Specificity, Cascading & Inheritance ⭐⭐⭐⭐⭐

### Must Know

1. What is the Cascade in CSS?
2. How is CSS Specificity calculated (Inline > ID > Class/Attribute/Pseudo-class > Element)?
3. What is the specificity value of `*` (Universal selector) and combinators?
4. What does `!important` do and why should it be avoided?
5. What are the new pseudo-classes `:is()`, `:where()`, and `:has()`?
6. What is the specificity difference between `:is()` and `:where()`?
7. What is CSS inheritance and which properties inherit by default (e.g. `color`, `font` vs `margin`, `padding`)?
8. What do `inherit`, `initial`, `unset`, and `revert` do?

---

## 3. Positioning & Stacking Context ⭐⭐⭐⭐⭐

### Must Know

1. What is `position: static`?
2. What is `position: relative`?
3. What is `position: absolute` and what element does it position against?
4. What is `position: fixed`?
5. What is `position: sticky` and how does it work?
6. Why does `position: sticky` fail if an ancestor has `overflow: hidden`?
7. What is `z-index` and when does it apply?
8. What is a Stacking Context?
9. Why doesn't `z-index: 9999` always appear on top?
10. What creates a new Stacking Context (`opacity < 1`, `transform`, `filter`, `isolation: isolate`)?
11. What is a Block Formatting Context (BFC) and how do you trigger one?

---

## 4. Flexbox (1-Dimensional Layout) ⭐⭐⭐⭐⭐

### Must Know

1. What is Flexbox and what problem does it solve?
2. Main axis vs Cross axis.
3. `justify-content` vs `align-items` vs `align-content`.
4. What does `flex: 1` expand to (`flex-grow`, `flex-shrink`, `flex-basis`)?
5. What is `flex-basis` vs `width`?
6. How does `flex-shrink: 0` prevent items from collapsing?
7. What is `gap` in Flexbox?
8. How do you align an individual item with `align-self`?
9. What does `margin: auto` do inside a Flex container?

---

## 5. CSS Grid (2-Dimensional Layout) ⭐⭐⭐⭐⭐

### Must Know

1. Flexbox vs CSS Grid: Architectural differences and when to use which.
2. What is the `fr` unit?
3. What is `repeat()` and `minmax()`?
4. Difference between `auto-fill` and `auto-fit` in responsive grid layouts.
5. What are `grid-template-areas`?
6. Implicit grid vs Explicit grid.
7. What is CSS Subgrid (`grid-template-columns: subgrid`)?

---

## 6. Responsive Design & Units ⭐⭐⭐⭐⭐

### Must Know

1. Absolute units (`px`) vs Relative units (`rem`, `em`, `%`, `vw`, `vh`, `ch`).
2. `rem` vs `em`: Key differences and inheritance pitfalls.
3. Modern viewport units: `dvh`, `lvh`, `svh` (and why `100vh` causes bugs on mobile).
4. What are CSS Media Queries and what is the mobile-first approach (`min-width`)?
5. What are CSS Container Queries (`@container`) vs Media Queries?
6. What are modern math functions: `calc()`, `min()`, `max()`, and `clamp()`?

---

## 7. Rendering Performance & The Pixel Pipeline ⭐⭐⭐⭐⭐

### Must Know

1. What is the Critical Rendering Pipeline in CSS (CSSOM + DOM = Render Tree)?
2. What is Reflow (Layout) vs Repaint vs Composite?
3. Which CSS properties trigger Reflow (e.g., `width`, `height`, `margin`, `top`, `font-size`)?
4. Which CSS properties trigger Repaint only (e.g., `color`, `background-color`)?
5. Which CSS properties trigger Composite only (GPU-accelerated: `transform`, `opacity`)?
6. What does `will-change` do and why should you use it sparingly?
7. Why should you animate with `transform` and `opacity` instead of `top`/`left`?

---

## 8. CSS Architecture & Modern Features ⭐⭐⭐⭐

### Must Know

1. What are CSS Custom Properties (CSS Variables) and how do they cascade?
2. CSS Variables vs Sass/SCSS variables.
3. What is native CSS Nesting?
4. What is BEM (Block Element Modifier) methodology?
5. CSS Modules vs Styled Components vs Tailwind CSS: Architectural trade-offs.
6. What is the `:has()` relational selector and why is it called the "parent selector"?

---

# 💻 PART 2 — CODING & PRACTICAL QUESTIONS

---

## 9. Layout Coding Challenges ⭐⭐⭐⭐⭐

### Must Implement

1. Center a `div` vertically and horizontally in 3 different ways (Flexbox, Grid, Absolute + Transform).
2. Build a responsive Holy Grail layout (Header, Nav, Main, Aside, Footer) using CSS Grid.
3. Build a responsive card grid that auto-fits items without media queries using `repeat(auto-fit, minmax(250px, 1fr))`.
4. Build a Sticky Navbar that stays pinned when scrolling.
5. Create a responsive navbar with Flexbox that wraps or collapses on mobile.

---

## 10. UI Patterns & Component Styling ⭐⭐⭐⭐⭐

### Must Build

1. Implement single-line text truncation with ellipsis (`text-overflow: ellipsis`).
2. Implement multi-line text clamping (`-webkit-line-clamp: 3`).
3. Build a pure CSS Accordion using `<details>` and `<summary>` or checkbox hack.
4. Build a pure CSS Tooltip using `attr()`, `::after`, and custom positioning.
5. Build a pure CSS Modal / Overlay using `:target` or checkbox state.
6. Style a custom checkbox and radio button.
7. Build a smooth pulse / shimmer skeleton loading animation.

---

# 🧠 PART 3 — MUST-KNOW ADVANCED TOPICS

---

## 11. Specificity Tuple Calculation ⭐⭐⭐⭐⭐

Specificity is calculated as a 4-part vector `(A, B, C, D)`:

```text
A: Inline styles      <div style="...">       (1, 0, 0, 0)
B: IDs                #header                 (0, 1, 0, 0)
C: Classes, pseudo    .card, :hover, [type]   (0, 0, 1, 0)
D: Elements, pseudo   div, p, ::before        (0, 0, 0, 1)

Universal (*) & combinators (+, >, ~)         (0, 0, 0, 0)
```

---

## 12. Flexbox vs CSS Grid Cheatsheet ⭐⭐⭐⭐⭐

- **Use Flexbox for:** 1D layouts (content flows in a line, toolbar, clusters, dynamic items).
- **Use Grid for:** 2D layouts (rows and columns simultaneously, page scaffolding, card grids).

---

# 🏆 TOP 25 — If You Have Very Little Time

### 🔥 Theory

1. CSS Box Model (`content-box` vs `border-box`)
2. Margin collapsing rules
3. Specificity hierarchy calculation
4. `:is()` vs `:where()` vs `:has()`
5. Relative vs Absolute vs Fixed vs Sticky positioning
6. Stacking context & why `z-index` fails
7. Flexbox main axis vs cross axis
8. `justify-content` vs `align-items`
9. `flex: 1` components (`grow`, `shrink`, `basis`)
10. CSS Grid vs Flexbox
11. `auto-fill` vs `auto-fit` in CSS Grid
12. `rem` vs `em` vs `px`
13. `100vh` vs `100dvh` on mobile devices
14. Reflow vs Repaint vs Composite
15. GPU-accelerated animation properties (`transform`, `opacity`)

### 💻 Coding

16. 3 ways to center a `div`
17. Holy grail layout with CSS Grid
18. Responsive auto-fit card grid
19. Single-line and multi-line ellipsis truncation
20. Sticky header with shadow on scroll
21. Pure CSS toggle switch
22. Pure CSS tooltip
23. Skeleton loading shimmer effect
24. Responsive media query breakpoint layout
25. CSS variables dark mode theme toggle
