# Build a **Data Table** with sticky header, zebra striping (`odd:`, `even:`), and hover states.

### Definition

A **data table** presents structured information using rows and columns.

Tailwind provides pseudo-class variants that are especially useful for tables:

- `odd:` → targets odd rows
- `even:` → targets even rows
- `hover:` → targets the hovered row
- `sticky` → keeps an element fixed while scrolling

### Example

```html
<!-- Scrollable data table with sticky header and zebra striping -->
<div class="max-h-96 overflow-auto rounded-lg border">
  <table class="w-full text-left text-sm">
    <thead class="sticky top-0 bg-gray-100">
      <tr>
        <th scope="col" class="px-4 py-3">Name</th>
        <th scope="col" class="px-4 py-3">Role</th>
        <th scope="col" class="px-4 py-3">Status</th>
      </tr>
    </thead>

    <tbody>
      <tr class="odd:bg-white even:bg-gray-50 hover:bg-blue-50">
        <td class="px-4 py-3">John</td>
        <td class="px-4 py-3">Developer</td>
        <td class="px-4 py-3">Active</td>
      </tr>

      <tr class="odd:bg-white even:bg-gray-50 hover:bg-blue-50">
        <td class="px-4 py-3">Sarah</td>
        <td class="px-4 py-3">Designer</td>
        <td class="px-4 py-3">Active</td>
      </tr>
    </tbody>
  </table>
</div>
```

### How the variants work

```text
odd:bg-white
    ↓
1st row, 3rd row, 5th row...

even:bg-gray-50
    ↓
2nd row, 4th row, 6th row...

hover:bg-blue-50
    ↓
Current mouse-hovered row
```

### Accessibility

Use:

```html
<th scope="col"></th>
```

for column headers.

For row headers, use:

```html
<th scope="row"></th>
```

This helps screen readers understand table relationships.
