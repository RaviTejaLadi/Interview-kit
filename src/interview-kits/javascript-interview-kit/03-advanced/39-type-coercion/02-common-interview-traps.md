# Common Interview Traps 🧠

### `"5" + 5`

```javascript
// + performs string concatenation when a string is involved.
console.log("5" + 5);
// "55"
```

### `"5" - 5`

```javascript
// - converts the string to a number.
console.log("5" - 5);
// 0
```

### `true + true`

```javascript
// true converts to 1 during numeric addition.
console.log(true + true);
// 2
```

### `false + 10`

```javascript
// false converts to 0 during numeric addition.
console.log(false + 10);
// 10
```

### `null + 1`

```javascript
// null converts to 0 during numeric conversion.
console.log(null + 1);
// 1
```

### `undefined + 1`

```javascript
// undefined converts to NaN during numeric conversion.
console.log(undefined + 1);
// NaN
```