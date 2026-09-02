# 2. JIT (Just-In-Time) Engine & Compilation

### Must Know

1. What is the Tailwind JIT (Just-In-Time) compiler?
2. How did Tailwind v2 (PurgeCSS) differ from Tailwind v3+ (JIT)?
3. How does the JIT compiler scan files (`content` array in `tailwind.config.js`)?
4. Why does Tailwind use plain string regex extraction instead of parsing JavaScript?
5. Why will dynamic class construction like `text-${color}-500` fail in Tailwind?
6. How do you properly handle dynamic classes in Tailwind?
7. What are arbitrary values in Tailwind (`w-[350px]`, `bg-[#1da1f2]`, `top-[calc(100%-20px)]`)?
