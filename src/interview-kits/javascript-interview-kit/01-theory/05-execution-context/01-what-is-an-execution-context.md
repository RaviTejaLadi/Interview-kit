# What is an execution context?

An **execution context** is the environment JavaScript creates to execute a piece of code. It keeps track of things like variables, functions, scope, and the value of `this`.

A useful mental model is:

> **Execution Context = the environment in which JavaScript executes code.**

It provides the information JavaScript needs to execute that code, including:

- Variables and function declarations
- Scope information
- Outer lexical environment
- The value of `this`
- Other execution state

There are several kinds of execution contexts, but the most important ones for interviews are:

1. **Global Execution Context**
2. **Function Execution Context**
3. **Eval Execution Context** — rarely relevant in modern development

For example:

```javascript id="1k3s8p"
// JavaScript creates execution contexts while running this code.
const name = 'Ravi';

function greet() {
  const message = 'Hello';

  console.log(message, name);
}

greet();
```

JavaScript roughly executes this as:

```text
Global Execution Context
        ↓
Function Execution Context for greet()
```
