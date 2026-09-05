# What is `position: fixed`?

`fixed` positions an element relative to the **viewport** in the common case.

It is also removed from normal document flow.

```css
/* Keeps the button fixed to the bottom-right of the viewport. */
.help-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
```

As you scroll:

```text
Page
────────────────
Content
Content
Content

             [Help]
```

The button stays in the same viewport position.

### Common uses

* Fixed navigation
* Floating action buttons
* Chat buttons
* Back-to-top buttons
* Cookie banners

### Gotcha ⚠️

Certain properties on ancestors, especially `transform`, can change the containing-block behavior for descendants with `position: fixed`. So "fixed = always relative to viewport" is a useful rule, but not an absolute one.

