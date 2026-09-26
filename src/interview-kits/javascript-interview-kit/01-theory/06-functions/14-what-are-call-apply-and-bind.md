# What are `call()`, `apply()`, and `bind()`?

`call()`, `apply()`, and `bind()` are methods used to control the value of **`this`** when calling a regular function.

They are closely related but behave differently.

---

## `call()`

`call()` invokes the function **immediately** and accepts arguments individually.

```javascript
// call() invokes the function immediately with a specific this value.
const user = {
  name: 'Ravi',
};

function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

greet.call(user, 'Hello', '!');
// Hello, Ravi!
```

Syntax:

```text
function.call(thisArg, arg1, arg2, ...)
```

---

## `apply()`

`apply()` works similarly to `call()`, but arguments are passed as an **array-like value**.

```javascript
// apply() invokes the function immediately and accepts arguments as an array.
const user = {
  name: 'Ravi',
};

function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

greet.apply(user, ['Hello', '!']);
// Hello, Ravi!
```

Syntax:

```text
function.apply(thisArg, [arg1, arg2, ...])
```

---

## `bind()`

`bind()` does **not execute the function immediately**.

Instead, it returns a **new function** with `this` permanently bound to the provided value.

```javascript
// bind() creates a new function with this permanently associated with user.
const user = {
  name: 'Ravi',
};

function greet() {
  console.log(`Hello, ${this.name}`);
}

const greetUser = greet.bind(user);

greetUser(); // Hello, Ravi
```

---

## `call()` vs `apply()` vs `bind()`

| Method    | Executes immediately? | Arguments                                  |
| --------- | --------------------: | ------------------------------------------ |
| `call()`  |                ✅ Yes | Individual arguments                       |
| `apply()` |                ✅ Yes | Array / array-like arguments               |
| `bind()`  |                 ❌ No | Individual arguments, returns new function |

### Easy way to remember

```text
call()
→ Call now
→ Arguments individually

apply()
→ Apply now
→ Arguments as an array

bind()
→ Bind for later
→ Returns a new function
```

### Important arrow-function gotcha

`call()`, `apply()`, and `bind()` cannot change the lexical `this` of an arrow function.

```javascript
// Arrow functions use lexical this, so call() cannot replace it.
const greet = () => {
  console.log(this);
};

greet.call({ name: 'Ravi' });
```

For controlling `this`, these methods are primarily relevant to **regular functions**.
