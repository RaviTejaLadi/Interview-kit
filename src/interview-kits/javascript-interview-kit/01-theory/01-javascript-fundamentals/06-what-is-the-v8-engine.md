# What is the V8 engine?

**Definition:**
**V8 is Google's open-source JavaScript and WebAssembly engine.** It is primarily written in C++ and is used by **Google Chrome** and **Node.js**.

V8:

* Parses JavaScript
* Executes JavaScript
* Compiles JavaScript to machine code
* Optimizes frequently executed code
* Performs garbage collection

For example, when you run:

```javascript
// JavaScript executed by the V8 engine
const message = "Hello V8";

console.log(message);
```

V8 is responsible for processing and executing the JavaScript code in environments such as Chrome and Node.js.

**Important:** V8 is a **JavaScript engine**, not the same thing as Node.js.

> **Node.js = runtime environment**
> **V8 = JavaScript engine used by Node.js**