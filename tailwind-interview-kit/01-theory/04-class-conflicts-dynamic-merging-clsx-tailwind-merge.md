# 4. Class Conflicts & Dynamic Merging (`clsx` + `tailwind-merge`)



### Must Know

1. What happens when two conflicting Tailwind classes are applied to the same element (e.g. `p-2 p-4`)?
2. Why does the cascade order in generated CSS determine the winner rather than the class string order?
3. What is `clsx` and what problem does it solve?
4. What is `tailwind-merge` and how does it resolve Tailwind class conflicts?
5. What is the `cn(...)` utility helper (popularized by shadcn/ui)?
6. What is CVA (`class-variance-authority`) and how does it create type-safe UI variants?
