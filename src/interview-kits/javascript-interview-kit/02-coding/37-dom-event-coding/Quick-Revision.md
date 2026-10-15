| Concept          | Main JavaScript technique                      |
| ---------------- | ---------------------------------------------- |
| Event delegation | `addEventListener()`, `closest()`              |
| Dynamic list     | `createElement()`, `appendChild()`, `remove()` |
| Todo list        | Arrays, objects, `filter()`                    |
| Tabs             | `dataset`, `hidden`, ARIA attributes           |
| Accordion        | `hidden`, `aria-expanded`                      |
| Modal            | `showModal()`, `close()`                       |
| Search/filter    | `filter()`, `includes()`                       |
| Pagination       | `slice()`, `Math.ceil()`                       |
| Autocomplete     | `filter()`, `slice()`, input events            |

## How these concepts translate to React

Since React uses declarative rendering, the main difference is that you generally update state rather than directly creating or removing DOM nodes.

| Vanilla JavaScript                  | React equivalent                          |
| ----------------------------------- | ----------------------------------------- |
| `addEventListener()`                | `onClick`, `onChange`                     |
| Manually update the DOM             | JSX rendering                             |
| Array mutation and manual rendering | `useState` with immutable updates         |
| `filter()` for search               | Derived filtered data                     |
| `slice()` for pagination            | Derived page data                         |
| Modal DOM manipulation              | Component state and conditional rendering |
| Tab click handlers                  | State-driven active tab                   |

Recommended practice order: Start with event delegation and dynamic lists. Then build the todo list, tabs, and accordion. Finish with search, pagination, and autocomplete, which combine filtering, state management, and UI rendering.
