# Build an accessible `Accordion` component styled entirely with Tailwind utilities.

### Definition

An **accordion** is an interactive component where users can expand and collapse sections of content.

Example:

```text
▸ What is React?
▾ What is Tailwind?
    Tailwind is a utility-first CSS framework.
▸ What is CVA?
```

An accessible accordion should:

- Use a real `<button>`
- Be keyboard accessible
- Expose expanded state with `aria-expanded`
- Associate the button with its content
- Allow screen readers to understand the relationship

### React implementation

```tsx
// Build an accessible accordion with React state and Tailwind utilities.
import { useState } from "react";

type AccordionItem = {
  id: string;
  title: string;
  content: string;
};

const items: AccordionItem[] = [
  {
    id: "react",
    title: "What is React?",
    content: "React is a JavaScript library for building user interfaces.",
  },
  {
    id: "tailwind",
    title: "What is Tailwind CSS?",
    content:
      "Tailwind CSS is a utility-first CSS framework for building interfaces.",
  },
  {
    id: "cva",
    title: "What is CVA?",
    content:
      "CVA helps create type-safe variant-based component styles.",
  },
];

export function Accordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y rounded-lg border">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${item.id}-content`}
                onClick={() =>
                  setOpenId(isOpen ? null : item.id)
                }
                className="flex w-full items-center justify-between px-4 py-4 text-left font-medium hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                {item.title}

                <span
                  aria-hidden="true"
                  className={`transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  ↓
                </span>
              </button>
            </h3>

            <div
              id={`${item.id}-content`}
              hidden={!isOpen}
              className="px-4 pb-4 text-sm text-gray-600"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

### Important accessibility attributes

#### `aria-expanded`

Tells assistive technology whether the section is open.

```html
<!-- aria-expanded reflects the current accordion state -->
<button aria-expanded="true">
```

or:

```html
<!-- Closed accordion section -->
<button aria-expanded="false">
```

#### `aria-controls`

Connects the button to the content it controls.

```html
<!-- Button controls the matching content element -->
<button aria-controls="react-content">
```

```html
<!-- Content controlled by the accordion button -->
<div id="react-content">
```

#### `hidden`

```html
<!-- Hidden content is removed from the rendered interaction when closed -->
<div hidden>
```

This is preferable to simply using `opacity-0` or `invisible` when the content should not be available to assistive technology while collapsed.