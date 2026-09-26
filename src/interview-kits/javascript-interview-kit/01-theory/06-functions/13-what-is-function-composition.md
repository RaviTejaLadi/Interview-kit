# What is function composition?

**Function composition** means combining multiple small functions to create a larger function.

The output of one function becomes the input of another.

Suppose:

```text
double → addOne → result
```

We can implement it like this:

```javascript
// Function composition connects the output of one function to the next.
const double = (value) => value * 2;
const addOne = (value) => value + 1;

const compose = (first, second) => (value) => {
  return second(first(value));
};

const doubleThenAddOne = compose(double, addOne);

console.log(doubleThenAddOne(5)); // 11
```

Execution:

```text
5
 ↓
double(5)
 ↓
10
 ↓
addOne(10)
 ↓
11
```

Composition encourages:

- Small reusable functions
- Separation of concerns
- Declarative programming
- Easier testing
