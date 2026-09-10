# What are inline, block, and inline-block elements?

These terms mainly describe how elements participate in **layout**.

> Technically, whether an element is block/inline/inline-block is controlled by CSS `display`, so an element's default behavior can be changed with CSS.

## Block elements

A block-level element normally:

* Starts on a new line
* Takes the available width by default
* Allows width and height to be applied

Common examples:

```html
<!-- Block-level elements normally appear on separate lines -->
<div>First block</div>
<p>Second block</p>
<section>Third block</section>
```

Conceptually:

```text
┌──────────────────────────────┐
│ First block                  │
└──────────────────────────────┘
┌──────────────────────────────┐
│ Second block                 │
└──────────────────────────────┘
```

---

## Inline elements

An inline element normally:

* Stays within the current line
* Takes only the space required by its content
* Does not normally accept `width` and `height` in the same way as block/inline-block elements

Common examples:

* `<span>`
* `<a>`
* `<strong>`
* `<em>`

```html
<!-- Inline elements flow within the same line -->
<p>
  Learn <strong>HTML</strong> and
  <a href="/css">CSS</a>.
</p>
```

Conceptually:

```text
Learn HTML and CSS.
      ↑       ↑
   inline   inline
```

---

## Inline-block elements

`inline-block` combines characteristics of both.

It:

* Stays inline with surrounding content
* Allows `width` and `height`
* Allows padding and margins to behave more like a box

```html
<!-- Inline-block elements stay on the same line but accept dimensions -->
<style>
  .box {
    display: inline-block;
    width: 120px;
    height: 60px;
    padding: 10px;
  }
</style>

<div class="box">Box 1</div>
<div class="box">Box 2</div>
```

The boxes can appear next to each other while still having explicit dimensions.

### Quick comparison

| Type             | New line? | Width/Height                    | Example                                  |
| ---------------- | --------- | ------------------------------- | ---------------------------------------- |
| **Block**        | Yes       | Yes                             | `<div>`, `<p>`, `<section>`              |
| **Inline**       | No        | Limited/not normally applicable | `<span>`, `<a>`, `<strong>`              |
| **Inline-block** | No        | Yes                             | Any element with `display: inline-block` |

### Important interview point ⭐

**HTML elements do not permanently belong to block or inline categories. CSS controls their layout behavior.**

For example:

```css
/* Change an inline element into a block element */
span {
  display: block;
}

/* Change a block element into an inline element */
div {
  display: inline;
}
```

So, when discussing **block vs inline**, distinguish between the element's **default user-agent styling** and its **actual CSS `display` value**.
