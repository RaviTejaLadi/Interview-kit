# What is the Tailwind JIT (Just-In-Time) compiler?

**JIT (Just-In-Time) compiler** is Tailwind's approach for generating CSS **on demand** based on the utility classes it finds in your source files.

Instead of generating a large set of possible utilities first and then removing unused ones, JIT detects the classes you actually use and generates the corresponding CSS.

### Example

```html
<!-- Tailwind detects these classes and generates their CSS -->
<div class="text-white bg-blue-500 p-4 rounded-lg">Hello</div>
```

Conceptually:

```text
Source files
     ↓
Scan for Tailwind classes
     ↓
Detect used utilities
     ↓
Generate CSS
     ↓
Final CSS
```

### Why JIT was useful

It enabled things such as:

- Faster development builds
- Smaller generated CSS
- Arbitrary values
- On-demand variants
- More predictable development/production behavior
