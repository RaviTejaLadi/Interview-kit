# 🚀 Next.js Interview Questions

---

# 📚 PART 1 — THEORY QUESTIONS

---

## 1. Next.js Fundamentals & App Router vs Pages Router ⭐⭐⭐⭐⭐

### Must Know

1. What is Next.js and why use it over pure React (Vite / CRA)?
2. What are the key architectural differences between the Pages Router (`pages/`) and the App Router (`app/`)?
3. How does routing work in the App Router (folder-based routing & `page.tsx`)?
4. What are the special reserved files in the App Router (`layout.tsx`, `template.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`)?
5. Difference between `layout.tsx` and `template.tsx` (state preservation vs re-mounting on navigation).
6. What are Route Groups `(folder)` and why are they useful?
7. What are Colocated files in the App Router?

---

## 2. React Server Components (RSC) & Client Components ⭐⭐⭐⭐⭐

### Must Know

1. What are React Server Components (RSC)?
2. What is the `'use client'` directive?
3. Are components in the App Router Server Components or Client Components by default?
4. Does `'use client'` mean the component only renders on the browser? (SSR pre-rendering explanation).
5. What can Server Components do that Client Components cannot (direct DB access, zero client bundle)?
6. What can Client Components do that Server Components cannot (hooks, browser events, DOM APIs)?
7. How do you pass a Server Component to a Client Component without converting it to a Client Component (Children Pattern)?
8. What is data serialization between Server and Client Components?

---

## 3. Rendering Strategies: SSR, SSG, ISR & CSR ⭐⭐⭐⭐⭐

### Must Know

1. What is Static Site Generation (SSG)?
2. What is Server-Side Rendering (SSR) / Dynamic Rendering?
3. What is Incremental Static Regeneration (ISR)?
4. How does ISR work under the hood (stale-while-revalidate)?
5. Client-Side Rendering (CSR) vs SSR vs SSG vs ISR: Trade-offs in speed, SEO, and server cost.
6. What is Partial Prerendering (PPR)?
7. How does Streaming SSR work with React Suspense?
8. In the Pages Router, what were `getStaticProps`, `getServerSideProps`, and `getStaticPaths`?
9. How are `getStaticProps` and `getServerSideProps` replaced in the App Router?

---

## 4. Data Fetching & Multi-Tier Caching Engine ⭐⭐⭐⭐⭐

### Must Know

1. How do you fetch data inside an async Server Component?
2. What are the 4 caching mechanisms in Next.js (Request Memoization, Data Cache, Full Route Cache, Router Cache)?
3. How does automatic `fetch()` request deduplication work?
4. How do you configure time-based revalidation (`next: { revalidate: 60 }`)?
5. How does on-demand revalidation work using `revalidatePath()` and `revalidateTag()`?
6. How do you opt out of caching (`fetch(url, { cache: 'no-store' })` or `export const dynamic = 'force-dynamic'`)?
7. What triggers dynamic rendering automatically (using `cookies()`, `headers()`, or `searchParams`)?

---

## 5. Server Actions & Mutations ⭐⭐⭐⭐⭐

### Must Know

1. What are Server Actions (`'use server'`)?
2. How do Server Actions eliminate the need for manual API route boilerplate?
3. How do you invoke a Server Action from a `<form action={...}>` vs a button click handler?
4. What is progressive enhancement in forms?
5. How do you handle loading states in Server Actions (`useActionState`, `useFormStatus`)?
6. What is `useOptimistic` and how do you achieve instant UI feedback during server mutations?
7. How do you secure Server Actions (authentication checks, input validation with Zod)?

---

## 6. Routing, Navigation & Optimization APIs ⭐⭐⭐⭐

### Must Know

1. How does `<Link>` differ from standard `<a>` tag (client-side prefetching)?
2. How does `useRouter()` work in the App Router (`next/navigation` vs `next/router`)?
3. What are Dynamic Segments (`[slug]`) and Catch-all Segments (`[...slug]` / `[[...slug]]`)?
4. What is `generateStaticParams()` and how does it replace `getStaticPaths`?
5. How does `next/image` optimize images (resizing, modern WebP/AVIF format, preventing CLS)?
6. How does `next/font` eliminate layout shift and external network requests?
7. How does the Metadata API (`generateMetadata`) handle dynamic SEO?

---

## 7. Middleware & Authentication ⭐⭐⭐⭐

### Must Know

1. What is Next.js Middleware (`middleware.ts`)?
2. Where does Middleware execute (Edge runtime before request completion)?
3. What are common use cases for Middleware (auth redirects, geolocation, A/B testing, header modification)?
4. What are the limitations of Edge Middleware (no Node.js native APIs, lightweight runtime)?
5. How do Route Handlers (`app/api/.../route.ts`) replace API routes?
6. How do you extract headers, cookies, and query params inside a Route Handler?

---

# 💻 PART 2 — CODING & PRACTICAL QUESTIONS

---

## 8. Dynamic Routing & Data Fetching Coding ⭐⭐⭐⭐⭐

### Must Implement

1. Build a dynamic product page (`app/products/[slug]/page.tsx`) with `generateStaticParams` and ISR revalidation.
2. Implement dynamic SEO metadata generation with `generateMetadata`.
3. Build a page that streams slow data using `<Suspense fallback={<Skeleton />}>`.
4. Implement parallel data fetching for multiple independent endpoints using `Promise.all()`.

---

## 9. Server Actions & Route Handlers Coding ⭐⭐⭐⭐⭐

### Must Implement

1. Create a secure POST Route Handler (`app/api/contact/route.ts`) validating body payloads with Zod.
2. Build a Todo list with Server Actions, form validation, and revalidation via `revalidatePath`.
3. Implement an Optimistic UI update using `useOptimistic` and `useActionState`.
4. Write a `middleware.ts` that checks for a session cookie and redirects unauthenticated users to `/login`.

---

# 🧠 PART 3 — MUST-KNOW ADVANCED TOPICS

---

## 10. The RSC Composition Pattern ⭐⭐⭐⭐⭐

```tsx
// ✅ Correct Pattern: Pass Server Component as children to Client Component
// app/page.tsx (Server Component)
import ClientWrapper from './ClientWrapper';
import ServerContent from './ServerContent';

export default function Page() {
  return (
    <ClientWrapper>
      <ServerContent /> {/* Renders on server, passed as JSX child */}
    </ClientWrapper>
  );
}
```

---

# 🏆 TOP 25 — If You Have Very Little Time

### 🔥 Theory

1. App Router vs Pages Router
2. Server Components vs Client Components
3. What `'use client'` actually does
4. SSG vs SSR vs ISR vs CSR
5. How ISR works (stale-while-revalidate)
6. 4 layers of Next.js caching
7. `revalidatePath` vs `revalidateTag`
8. How to opt out of caching (`no-store`, `force-dynamic`)
9. Server Actions (`'use server'`)
10. `useOptimistic` and `useActionState`
11. `layout.tsx` vs `template.tsx`
12. `generateStaticParams` mechanics
13. `next/image` optimizations
14. Next.js Middleware capabilities & limitations
15. Dynamic Route Segments (`[slug]`)

### 💻 Coding

16. Dynamic ISR page with `generateStaticParams`
17. Route Handler with Zod validation
18. Form mutation via Server Action
19. Optimistic update with `useOptimistic`
20. Edge authentication check in `middleware.ts`
21. Dynamic metadata generator function
22. Streaming UI with Suspense boundaries
23. `<Link>` prefetching implementation
24. Passing Server Component as child to Client Component
25. Error handling with `error.tsx` and reset boundary
