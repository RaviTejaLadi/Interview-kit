# 4. Data Fetching & Multi-Tier Caching Engine

### Must Know

1. How do you fetch data inside an async Server Component?
2. What are the 4 caching mechanisms in Next.js (Request Memoization, Data Cache, Full Route Cache, Router Cache)?
3. How does automatic `fetch()` request deduplication work?
4. How do you configure time-based revalidation (`next: { revalidate: 60 }`)?
5. How does on-demand revalidation work using `revalidatePath()` and `revalidateTag()`?
6. How do you opt out of caching (`fetch(url, { cache: 'no-store' })` or `export const dynamic = 'force-dynamic'`)?
7. What triggers dynamic rendering automatically (using `cookies()`, `headers()`, or `searchParams`)?
