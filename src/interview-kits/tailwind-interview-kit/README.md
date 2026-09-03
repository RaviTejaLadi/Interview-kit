# 💨 Tailwind CSS Interview Questions

# 📚 PART 1 — THEORY QUESTIONS

---

## 1. Utility-First Architecture & Core Concepts ⭐⭐⭐⭐⭐

### Must Know

1. What is Tailwind CSS?
2. What is the Utility-First paradigm?
3. Utility-first CSS vs Semantic CSS (BEM) vs CSS Modules.
4. What are the main benefits of Tailwind CSS (bundle size plateau, no naming fatigue, local context)?
5. What are the common criticisms of Tailwind CSS (HTML clutter, readability)?
6. How does Tailwind prevent CSS file size from growing indefinitely?

---

## 2. JIT (Just-In-Time) Engine & Compilation ⭐⭐⭐⭐⭐

### Must Know

1. What is the Tailwind JIT (Just-In-Time) compiler?
2. How did Tailwind v2 (PurgeCSS) differ from Tailwind v3+ (JIT)?
3. How does the JIT compiler scan files (`content` array in `tailwind.config.js`)?
4. Why does Tailwind use plain string regex extraction instead of parsing JavaScript?
5. Why will dynamic class construction like `text-${color}-500` fail in Tailwind?
6. How do you properly handle dynamic classes in Tailwind?
7. What are arbitrary values in Tailwind (`w-[350px]`, `bg-[#1da1f2]`, `top-[calc(100%-20px)]`)?

---

## 3. Configuration & Design Tokens (`tailwind.config.js`) ⭐⭐⭐⭐⭐

### Must Know

1. What is `tailwind.config.js` and what is its role?
2. What is the difference between `theme` and `theme.extend`?
3. What happens if you put colors directly under `theme: { colors: { ... } }`?
4. How do you define custom colors, spacing, fonts, and breakpoints?
5. What are official Tailwind plugins (`@tailwindcss/forms`, `@tailwindcss/typography`, `@tailwindcss/aspect-ratio`)?
6. What are CSS Directives in Tailwind (`@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`)?
7. What is the `@apply` directive and why is overusing `@apply` considered an anti-pattern?

---

## 4. Class Conflicts & Dynamic Merging (`clsx` + `tailwind-merge`) ⭐⭐⭐⭐⭐

### Must Know

1. What happens when two conflicting Tailwind classes are applied to the same element (e.g. `p-2 p-4`)?
2. Why does the cascade order in generated CSS determine the winner rather than the class string order?
3. What is `clsx` and what problem does it solve?
4. What is `tailwind-merge` and how does it resolve Tailwind class conflicts?
5. What is the `cn(...)` utility helper (popularized by shadcn/ui)?
6. What is CVA (`class-variance-authority`) and how does it create type-safe UI variants?

---

## 5. Responsive Design & Breakpoint Logic ⭐⭐⭐⭐⭐

### Must Know

1. What are Tailwind's default responsive breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`)?
2. Are Tailwind breakpoints mobile-first (`min-width`) or desktop-first (`max-width`)?
3. Why shouldn't you use `sm:` to style mobile screens?
4. How do you target a specific screen range in Tailwind?
5. How do you customize breakpoints in `tailwind.config.js`?
6. What is the `container` class in Tailwind?

---

## 6. Dark Mode & Theming Strategies ⭐⭐⭐⭐⭐

### Must Know

1. How does Dark Mode work in Tailwind (`dark:` prefix)?
2. What is the difference between `darkMode: 'media'` and `darkMode: 'class'` (or `'selector'`)?
3. How do you implement a user-toggleable dark mode with `localStorage`?
4. How do you integrate CSS variables with Tailwind for multi-theme support (e.g., shadcn/ui approach)?
5. How do you style form elements and inputs cleanly in dark mode?

---

## 7. Pseudo-classes, States & Group Modifiers ⭐⭐⭐⭐

### Must Know

1. How do you style pseudo-classes (`hover:`, `focus:`, `active:`, `focus-visible:`, `disabled:`)?
2. What is `group` and `group-hover` (styling child elements based on parent hover state)?
3. What is `peer` and `peer-checked` / `peer-focus` (styling sibling elements)?
4. What is `aria-*` and `data-*` variant support in Tailwind (`aria-expanded:`, `data-[state=open]:`)?
5. What are child selectors like `*:` and `has-*:` in modern Tailwind?

---

# 💻 PART 2 — CODING & PRACTICAL QUESTIONS

---

## 8. Component Building with Tailwind ⭐⭐⭐⭐⭐

### Must Build / Implement

1. Build a responsive, accessible **E-commerce Product Card** with image aspect ratio, badges, star ratings, and hover state transitions.
2. Build an accessible **Modal Dialog Overlay** with backdrop blur and responsive modal card.
3. Build a **Responsive Navigation Bar** with desktop links and mobile hamburger drawer.
4. Build a **Data Table** with sticky header, zebra striping (`odd:`, `even:`), and hover states.
5. Build an interactive **Form Input Group** with floating labels, error messages, and focus rings using `peer`.

---

## 9. Reusable Component Variants (React + Tailwind) ⭐⭐⭐⭐⭐

### Must Implement

1. Implement the `cn(...)` utility using `clsx` and `tailwind-merge`.
2. Build a type-safe `Button` component supporting variants (`primary`, `secondary`, `outline`, `destructive`, `ghost`) and sizes (`sm`, `md`, `lg`) using `cva`.
3. Build a `Badge` component with dynamic status variants (`success`, `warning`, `error`, `info`).
4. Build an accessible `Accordion` component styled entirely with Tailwind utilities.

---

# 🧠 PART 3 — MUST-KNOW ADVANCED TOPICS

---

## 10. The `cn` Utility Architecture ⭐⭐⭐⭐⭐

You must know why this is required in modern React + Tailwind codebases:

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Solves:
// cn('px-2 py-1', 'px-4') => 'py-1 px-4' (px-2 is safely removed by twMerge!)
```

---

# 🏆 TOP 20 — If You Have Very Little Time

### 🔥 Theory

1. Utility-first paradigm benefits & trade-offs
2. JIT compiler & content array scanning
3. Why dynamic interpolated classes fail (`text-${color}-500`)
4. `theme` vs `theme.extend` in configuration
5. Why `@apply` should not be overused
6. `clsx` vs `tailwind-merge`
7. Mobile-first breakpoint behavior (`min-width`)
8. Dark mode strategies (`media` vs `class`)
9. `group` and `group-hover`
10. `peer` and `peer-focus`
11. Arbitrary values (`[value]`)
12. CSS variables theming with Tailwind
13. Purging mechanism in production builds
14. Accessibility focus rings (`focus-visible:ring-2`)
15. `aria-expanded:` and state variants

### 💻 Coding

16. Implement the `cn` helper function
17. Build a reusable Button component with `cva`
18. Responsive Card with dark mode support
19. Responsive Holy Grail grid with Tailwind classes
20. Floating label form input using `peer`

---

# 🎯 WHAT YOU DO NOT NEED TO PRIORITIZE

- ❌ Memorizing every single spacing and color hex code
- ❌ Legacy PurgeCSS configs from Tailwind v1/v2
- ❌ Building custom PostCSS plugins from scratch
- ❌ Obscure CSS grid sub-properties rarely used in utility classes

---

# 📌 FINAL PREPARATION ORDER

```text
1. Utility-First Mental Model
      ↓
2. JIT Engine & Content Scanning
      ↓
3. Tailwind Configuration (theme.extend)
      ↓
4. Responsive Mobile-First Breakpoints
      ↓
5. Pseudo-Classes (hover, focus, group, peer)
      ↓
6. Class Merging (clsx + tailwind-merge)
      ↓
7. Component Variant Architecture (cva)
      ↓
8. Dark Mode & Theming
```

---

# ✅ FINAL CHECKLIST

## Theory

- Utility-first principles
- JIT compiler scanning
- `tailwind.config.js` (`extend`)
- Breakpoint logic (`sm`, `md`, `lg`)
- Dark mode configuration
- `group` and `peer`
- `tailwind-merge` rationale

## Coding

- `cn` utility function
- Reusable Button with `cva`
- Responsive Product Card
- Responsive Navbar
