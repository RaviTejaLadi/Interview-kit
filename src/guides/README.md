# Guides Standard

All guide source files must live in `src/guides`.

## File Rules

- Use markdown files: `*.md`
- Keep file names slug-based, for example:
  - `react-performance-optimization-guide.md`
  - `nodejs-api-security-pragmatic-guide.md`
- Nested folders are allowed. The index reads `src/guides/**/*.md`.

## Required Frontmatter

Every guide file must start with this metadata block:

```md
---
title: Your Guide Title
summary: One sentence summary for guide cards.
topic: Frontend
difficulty: Intermediate
readTimeMinutes: 10
publishedAt: 2026-10-17
tags:
  - Important
  - React
---
```

## Allowed Values

- `topic`: `Frontend` | `Backend` | `Specific`
- `difficulty`: `Beginner` | `Intermediate` | `Advanced`

`src/lib/guides-index.ts` is file-driven and builds the guide catalog from this metadata.
