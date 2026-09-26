# What is global scope?

A variable declared in the **global scope** can generally be accessed from anywhere in the same JavaScript environment where that global binding is visible.

```javascript
// This variable is declared in global scope.
const appName = 'My App';

function showAppName() {
  console.log(appName);
}

showAppName(); // "My App"
```

### Browser example

With classic scripts, `var` declarations at the top level can become properties of `window`:

```javascript
// var in a classic browser script creates a window property.
var name = 'Ravi';

console.log(window.name); // "Ravi"
```

However, top-level `let` and `const` do **not** become properties of `window`:

```javascript
// let and const do not create window properties.
let age = 25;
const city = 'Brahmapur';

console.log(window.age); // undefined
console.log(window.city); // undefined
```

**Interview point:** Avoid unnecessary global variables because they can cause naming conflicts and make code harder to maintain.
