# What happens when two conflicting Tailwind classes are applied to the same element (e.g. `p-2 p-4`)?

Consider:

```html id="h2b9c6"
<!-- Two conflicting padding utilities -->
<div class="p-2 p-4">Content</div>
```

Both classes are present in the HTML:

```text
p-2
p-4
```

You might expect `p-4` to win because it appears later.

**That is not how CSS works.**

The winner is determined by the CSS cascade, including:

1. `!important`
2. Cascade layers
3. Specificity
4. Source order

Because Tailwind utilities generally have the same specificity, **the utility that appears later in the generated CSS wins**.

So:

```text
class="p-2 p-4"
```

does **not** guarantee that `p-4` wins.

Likewise:

```text
class="p-4 p-2"
```

doesn't guarantee that `p-2` wins.
