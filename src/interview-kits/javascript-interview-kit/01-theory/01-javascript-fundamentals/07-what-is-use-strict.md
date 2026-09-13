# What is `"use strict"`?

**Definition:**
`"use strict"` enables **strict mode**, which makes JavaScript apply stricter rules and helps detect certain common programming mistakes.

You can enable it for an entire script:

```javascript
// Enable strict mode for this script
'use strict';

x = 10; // ReferenceError
```

Without strict mode, assigning to an undeclared variable could create a global variable in older JavaScript behavior.

Another example:

```javascript
// Strict mode prevents accidental modification of read-only properties
'use strict';

const user = {};

Object.defineProperty(user, 'name', {
  value: 'Ravi',
  writable: false,
});

user.name = 'John'; // TypeError
```

### Important points

Strict mode:

- Prevents accidental global variables
- Throws errors for some otherwise silent mistakes
- Makes certain operations illegal
- Changes some `this` behavior
- Helps write safer JavaScript

**Note:** JavaScript modules (`import`/`export`) and class bodies are automatically strict mode, so you generally don't need to manually write `"use strict"` there.
