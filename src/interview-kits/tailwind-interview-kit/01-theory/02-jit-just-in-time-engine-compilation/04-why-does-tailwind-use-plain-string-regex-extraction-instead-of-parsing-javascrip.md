# Why does Tailwind use plain string regex extraction instead of parsing JavaScript?

Tailwind doesn't need to understand the entire JavaScript/TypeScript language.

It mainly needs to answer:

> "What strings in these files look like Tailwind class candidates?"

So scanning text is much simpler and faster than building a complete JavaScript AST.

For example:

```jsx
// Tailwind can extract these class candidates from the source text
<div className="flex items-center gap-4">
  Hello
</div>
```

It doesn't need to understand:

- React's AST
- JSX syntax completely
- JavaScript execution
- TypeScript types
- framework-specific behavior

### Why this approach?

Because Tailwind can scan many different file types:

```text
HTML
JS
JSX
TS
TSX
Vue
Svelte
PHP
templates
etc.
```

The important requirement is simply that the class names exist as detectable text.

### Key idea

> **Tailwind's scanner is a source-text detector, not a JavaScript interpreter.**

This is also the reason dynamic class construction causes problems.
