# Contributing to Interview Kit

Thanks for helping improve this full-stack interview preparation project. This guide keeps content, UI mapping, and folder organization consistent.

## What to contribute

Welcome:

- New interview-relevant questions and coding prompts
- Fixes for outdated, incorrect, or unclear content
- Missing topic files that should exist for an already listed section
- New kits that follow the same naming and folder conventions
- Small doc/index improvements (`README.md`, kit `README.md`, `TOPICS.md`)

Please do not:

- Commit personal solved answers in PRs; keep placeholders like `<!-- Write your answer -->`
- Copy copyrighted/paid question banks
- Submit very large rewrites in one PR without prior discussion

## Current project structure

This is a Vite + React + TypeScript app. Interview content is rendered from markdown files under `src/interview-kits`.

```text
src/
  App.tsx                       # Main app shell + markdown renderer
  components/
    app-sidebar.tsx             # Sidebar grouping, labels, section/icon mapping
    ui/                         # Shared UI primitives
  lib/
    content-index.ts            # Auto-discovers markdown topics via import.meta.glob
  interview-kits/
    {tech}-interview-kit/
      README.md                 # Rendered as "Overview"
      TOPICS.md                 # Rendered as "TOPICS"
      01-theory/                # Theory topics
      02-coding/                # Coding topics (Git may use practical naming)
      03-advanced/              # Advanced topics
```

HR kit uses `01-core/`, `02-behavioral/`, `03-logistics/`, and `04-frameworks/` instead of theory/coding/advanced.

## Supported kit folders

Technology kits currently live at:

- `src/interview-kits/javascript-interview-kit/`
- `src/interview-kits/react-interview-kit/`
- `src/interview-kits/html-interview-kit/`
- `src/interview-kits/css-interview-kit/`
- `src/interview-kits/tailwind-interview-kit/`
- `src/interview-kits/next-js-interview-kit/`
- `src/interview-kits/node-js-interview-kit/`
- `src/interview-kits/mongo-db-interview-kit/`
- `src/interview-kits/git-interview-kit/`
- `src/interview-kits/hr-interview-kit/`

## How topic discovery works

- All `*.md` files under `src/interview-kits/*-interview-kit/**` are auto-indexed by `src/lib/content-index.ts`.
- `README.md` file names are displayed in the app as `Overview`.
- Folder names become section labels in the sidebar (example: `01-theory` -> `Theory`).
- Keep folder names and numbering clean and predictable so sidebar grouping stays stable.

## How to add or edit a topic

1. Update the corresponding kit `README.md` first (question map/source context).
2. Create or edit the markdown topic file with numbered prefix + kebab-case slug (example: `12-flexbox-vs-css-grid-cheatsheet.md`).
3. Keep numbering continuous within the kit section.
4. Update `TOPICS.md` links for that kit.
5. If adding a new kit, also update root [`README.md`](README.md), plus kit ordering/labels/icons in UI code (see next section).

## Adding a brand-new kit

In addition to creating `src/interview-kits/{tech}-interview-kit/`, update:

- Root `README.md` (Technology Guide Index)
- `src/lib/content-index.ts` (`KIT_ORDER` and `KIT_LABELS`)
- `src/components/app-sidebar.tsx` (kit display order and kit icon map)
- `src/App.tsx` (kit icon map used in content header)

## Content conventions

### Rating scale

Use the same stars as the root README:

| Rating     | Meaning                                       |
| ---------- | --------------------------------------------- |
| ⭐⭐⭐⭐⭐ | Must Know — very commonly asked               |
| ⭐⭐⭐⭐   | Important — commonly asked                    |
| ⭐⭐⭐     | Good to Know — useful for stronger interviews |

### Section heading conventions

- Theory files: `### Must Know` (use `### Good to Know` only where already used in that kit)
- Coding files: `### Must Solve` or `### Must Implement`

### Topic template (theory)

```markdown
# 12. Topic Title

### Must Know

1. First question?
2. Second question?

---

## Answers

### 1. First question?

<!-- Write your answer -->

### 2. Second question?

<!-- Write your answer -->
```

Coding and advanced files may use different structures when needed (prompts, checklists, cheatsheets, diagrams).

## Local checks

```bash
npm install
npm run format
npm run lint
npm run typecheck
npm run build
```

Run format/lint checks before opening a PR.

## Pull requests

1. Create a focused branch (example: `feat/css-container-queries`, `fix/js-event-loop-wording`).
2. Keep PRs scoped to one topic area or one cohesive fix.
3. In the PR description, explain why the change improves interview prep quality.
4. Open the PR against `main`.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold it.

## License

By contributing, you agree your work is licensed under the [MIT License](LICENSE).
