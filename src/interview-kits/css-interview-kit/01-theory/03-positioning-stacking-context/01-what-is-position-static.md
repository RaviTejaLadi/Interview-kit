# What is `position: static`?

`static` is the **default position value** for every HTML element.

The element follows the normal document flow. Properties such as `top`, `right`, `bottom`, and `left` **do not affect** a statically positioned element.

```css
/* The element stays in normal document flow. */
.box {
  position: static;
  top: 20px; /* Has no effect */
}
```

### Key points

* Default positioning.
* Element stays in normal flow.
* `top`, `right`, `bottom`, `left` don't work.
* `z-index` does not apply in the usual positioned-element sense.

**Simple analogy:** `static` means *"stay where the normal HTML layout puts me."*