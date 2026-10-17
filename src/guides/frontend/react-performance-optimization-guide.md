---
title: React Performance Optimization Guide
summary: A practical sequence to identify rendering bottlenecks, reduce bundle cost, and improve interaction speed.
topic: Frontend
difficulty: Intermediate
readTimeMinutes: 12
publishedAt: 2026-10-12
tags:
  - React
  - Performance
  - Web Vitals
  - Frontend
  - Important
---

# React Performance Optimization Guide

## Why this guide exists

Modern React apps usually become slow for one of three reasons:

1. Too many re-renders
2. Expensive rendering work
3. Slow data and bundle delivery

This guide gives you a practical sequence you can use in interviews and real projects.

## 1) Start with measurement, not guesses

- Use React DevTools Profiler to find components with high render duration.
- Track Largest Contentful Paint (LCP) and Interaction to Next Paint (INP) in browser performance tools.
- Write down one clear baseline before optimizing.

Example baseline:

- Product page LCP: `3.4s`
- Search input interaction: `240ms`
- Bundle size on first load: `640KB`

## 2) Fix unnecessary re-renders

### Common causes

- Parent state changes that force unrelated children to render.
- New object and function references on every render.
- Large lists where every item updates for one small change.

### Practical fixes

- Use `React.memo` for leaf components that receive stable props.
- Use `useMemo` for expensive derived values.
- Use `useCallback` for callbacks passed into memoized children.
- Keep state as close as possible to where it is used.

```tsx
const Row = React.memo(function Row({ item, onSelect }: RowProps) {
  return <button onClick={() => onSelect(item.id)}>{item.name}</button>;
});

function List({ items }: { items: Item[] }) {
  const onSelect = useCallback((id: string) => {
    // handle selection
  }, []);

  return items.map((item) => <Row key={item.id} item={item} onSelect={onSelect} />);
}
```

## 3) Virtualize big lists

If a page renders hundreds or thousands of rows, virtualize.

- Render only visible rows.
- Keep row height predictable when possible.
- Preserve keyboard and screen-reader accessibility.

Interview language:

"I would virtualize the list first because reducing DOM nodes gives an immediate win even before micro-optimizations."

## 4) Split code and prioritize critical UI

- Use route-level code splitting with dynamic imports.
- Use lazy loading for heavy widgets.
- Keep above-the-fold UI small and fast.

```tsx
const AnalyticsPanel = React.lazy(() => import("./AnalyticsPanel"));
```

- Preload likely-next routes when user intent is clear.
- Defer non-critical third-party scripts.

## 5) Optimize data fetching and caching

- Deduplicate identical requests.
- Cache server responses based on freshness needs.
- Avoid waterfall requests by parallelizing independent calls.
- Use optimistic updates for mutation-heavy screens.

Checklist:

- [ ] Request deduplication
- [ ] Background revalidation
- [ ] Error retry with backoff
- [ ] Loading states that do not block entire page

## 6) Keep forms responsive

- Use uncontrolled inputs for very large forms where possible.
- Debounce expensive validation.
- Move heavy synchronous work off the input thread.

If typing feels delayed, profile the input path first.

## 7) Final verification loop

After each optimization:

1. Re-measure the same metrics
2. Confirm no regression in accessibility
3. Confirm no UX break on low-end devices

Example outcome:

- LCP from `3.4s` to `2.1s`
- INP from `240ms` to `110ms`
- Initial bundle from `640KB` to `430KB`

## Interview-ready summary

When asked "How do you optimize React performance?" answer in this order:

1. Measure with profiler and web vitals
2. Remove unnecessary re-renders
3. Virtualize large lists
4. Split code and reduce critical bundle
5. Improve data fetching and caching
6. Re-measure and verify accessibility
