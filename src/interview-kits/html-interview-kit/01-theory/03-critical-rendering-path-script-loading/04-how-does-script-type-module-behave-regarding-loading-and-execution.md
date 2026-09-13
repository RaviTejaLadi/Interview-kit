# How does `<script type="module">` behave?

A module script is created using:

```html id="1z4d6j"
<!-- Module scripts use JavaScript module semantics -->
<script type="module" src="/app.js"></script>
```

Module scripts behave **similarly to deferred scripts by default**.

That means:

- HTML parsing continues while the module downloads.
- The module executes after HTML parsing has completed.
- Module dependencies are fetched automatically.
- Modules have their own scope.
- Modules are automatically in **strict mode**.

For example:

```html id="f4gq8a"
<!-- The module imports another module dependency -->
<script type="module" src="/main.js"></script>
```

```javascript id="w0d1as"
// main.js imports functionality from another module.
import { calculateTotal } from './cart.js';

console.log(calculateTotal());
```

The browser can fetch the dependency graph:

```text
main.js
   │
   ├── cart.js
   ├── utils.js
   └── other dependencies
```

### Important difference

Module scripts are deferred by default, but you can use `async` with modules:

```html id="x8u4gq"
<!-- Async module executes as soon as its module graph is ready -->
<script type="module" async src="/analytics.js"></script>
```

Then it follows async-style execution behavior.
