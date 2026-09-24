# How did Tailwind v2 (PurgeCSS) differ from Tailwind v3+ (JIT)?

This distinction is important for interviews.

### Tailwind v2

Tailwind v2 traditionally generated a large set of possible utilities.

Then **PurgeCSS** was used during the production build to remove CSS that wasn't detected as being used.

```text
Tailwind v2

Generate lots of CSS
        ↓
       Purge
        ↓
Remove unused CSS
        ↓
Production CSS
```

You would configure files to scan:

```js
// Tailwind v2 configuration
module.exports = {
  purge: ['./src/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
};
```

---

### Tailwind v2.1+

Tailwind introduced its own **JIT engine** as an experimental/opt-in feature.

It generated utilities on demand instead of generating everything first.

---

### Tailwind v3+

JIT became the **default approach**.

The configuration changed from `purge` to `content`:

```js
// Tailwind v3 configuration
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
};
```

The basic difference:

| Tailwind v2 + PurgeCSS     | Tailwind v3+                               |
| -------------------------- | ------------------------------------------ |
| Generate many utilities    | Generate utilities on demand               |
| Purge unused CSS afterward | Detect classes and generate what is needed |
| `purge` configuration      | `content` configuration                    |
| Larger development CSS     | More focused generated CSS                 |
| JIT was optional in v2.1   | JIT-style generation is default in v3      |

### Important current-version note

Tailwind **v4** changed the architecture again. It uses a newer automatic content detection approach and CSS-first configuration, so you should not describe the `content` array as the universal Tailwind mechanism today.

For interview questions specifically mentioning `tailwind.config.js` and `content`, they're usually referring to the **Tailwind v3 model**.
