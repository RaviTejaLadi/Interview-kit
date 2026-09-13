# What is a JavaScript engine?

**Definition:**
A **JavaScript engine** is a program that **parses, executes, and optimizes JavaScript code**.

Different environments use different JavaScript engines.

| Environment | Engine         |
| ----------- | -------------- |
| Chrome      | V8             |
| Node.js     | V8             |
| Firefox     | SpiderMonkey   |
| Safari      | JavaScriptCore |
| Edge        | V8             |

A simplified process looks like:

```text
JavaScript Code
      ↓
   Parsing
      ↓
  Bytecode / IR
      ↓
 Execution
      ↓
 JIT Optimization
      ↓
 Machine Code
```

Modern engines use **JIT (Just-In-Time) compilation** techniques to optimize frequently executed code.
