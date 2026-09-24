# Why shouldn't you use `sm:` to style mobile screens?

Because `sm:` means:

> **768? No — `sm:` means 640px and above.**

It does **not** mean "mobile."

For example:

```html
<!-- This applies blue only at 640px and above -->
<div class="sm:bg-blue-500">
  Content
</div>
```

Below `640px`, the `sm:bg-blue-500` utility doesn't apply.

If you want the mobile/default style, write it **without a breakpoint**:

```html
<!-- Base style applies to all widths; md overrides it on larger screens -->
<div class="bg-red-500 md:bg-blue-500">
  Content
</div>
```

Meaning:

```text
< 768px → red
≥ 768px → blue
```

### Mobile-first rule

Instead of:

```html
<!-- Less aligned with Tailwind's mobile-first approach -->
<div class="sm:text-center">
```

think:

```html
<!-- Base styles target small screens; md modifies larger screens -->
<div class="text-center md:text-left">
```

The unprefixed class is your **base/mobile style**.
