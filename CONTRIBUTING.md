# Contributing to Interview Kit

Thanks for helping improve this full-stack interview preparation repo. Follow this guide so new questions, topic files, and kits match the layout already used here.

## What to contribute

Welcome:

- New questions that are commonly asked in real interviews
- Fixes for outdated, incorrect, or unclear wording
- Missing topic files that already appear in a kit `README.md`
- A new technology kit that follows the same structure
- Small README, `TOPICS.md`, or index fixes

Please do not:

- Commit personal study answers in pull requests — leave `<!-- Write your answer -->` placeholders for learners
- Copy large question banks from paid platforms or other copyrighted sources
- Rewrite an entire kit in a single pull request unless it was discussed first

## Repo layout

Each technology lives in its own folder:

| Technology   | Folder                      |
| ------------ | --------------------------- |
| JavaScript   | `javascript-interview-kit/` |
| React        | `react-interview-kit/`      |
| HTML5        | `html-interview-kit/`       |
| CSS3         | `css-interview-kit/`        |
| Tailwind CSS | `tailwind-interview-kit/`   |
| Next.js      | `next-js-interview-kit/`    |
| Node.js      | `node-js-interview-kit/`    |
| MongoDB      | `mongo-db-interview-kit/`   |
| Git          | `git-interview-kit/`        |
| HR Round     | `hr-interview-kit/`         |

A typical kit looks like this:

```text
{kit}/
  README.md       # Question map (source of truth for topics)
  TOPICS.md       # Links to practice files
  01-theory/      # One markdown file per theory section
  02-coding/      # Coding problems (Git uses 02-practical/)
  03-advanced/    # Cheatsheets and deep-dives
```

HR uses `01-core/`, `02-behavioral/`, `03-logistics/`, and `04-frameworks/` instead of the theory/coding/advanced split.

## How to add a question or topic

Keep numbering continuous across folders in that kit. Then:

1. Add the section (or extra numbered questions) to the kit `README.md`.
2. Create a matching topic file with the next number and a kebab-case slug, for example `12-flexbox-vs-css-grid-cheatsheet.md`.
3. Link that file from the kit `TOPICS.md`.
4. If you add a whole new kit, also add a row to the Technology Guide Index in the root [`README.md`](README.md).

### Ratings

Use the same stars as the root README:

| Rating     | Meaning                                       |
| ---------- | --------------------------------------------- |
| ⭐⭐⭐⭐⭐ | Must Know — very commonly asked               |
| ⭐⭐⭐⭐   | Important — commonly asked                    |
| ⭐⭐⭐     | Good to Know — useful for stronger interviews |

### Section headings in kit READMEs

- Theory: `### Must Know` (add `### Good to Know` only when that kit already uses it)
- Coding: `### Must Solve` or `### Must Implement`

### Topic file template (theory)

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

Coding topic files use `### Must Solve` or `### Must Implement` instead of `### Must Know`. Advanced files can be cheatsheets or diagrams instead of Q&A.

## How to add a new kit

1. Create `{tech}-interview-kit/` with `README.md`, `TOPICS.md`, numbered folders, and topic files.
2. Add a row to the Technology Guide Index in the root `README.md`.
3. Update the 30-day blueprint only if the kit belongs in the study plan.

## Local checks

```bash
npm install
npm run format
npm run lint
```

Markdown is formatted with Prettier (`proseWrap: preserve`). Run `npm run format` before you open a pull request.

## Pull requests

1. Fork the repo and create a branch, for example `feat/css-container-queries` or `fix/js-event-loop-wording`.
2. Keep the change focused — one topic, or a small set of related questions.
3. In the PR description, say why the question belongs in interviews.
4. Open the pull request against `main`.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold it.

## License

By contributing, you agree that your work is included under the [MIT License](LICENSE).
