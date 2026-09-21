# What belongs in .dockerignore for this API?

**Definition:**
Exclude git, local env files, host node_modules, tests if not needed in the image, IDE dirs, and README. If tests run in a test stage, copy them only in that stage with a well-scoped COPY.

**Key points:**
- Never copy `.env`.
- Host `node_modules` breaks Linux binaries if copied.
- Smaller context = faster CI.
- Keep `package-lock.json` included.
- Review with `docker build` context size logs.

```text
.git
.gitignore
node_modules
.env
.env.*
coverage
*.md
.vscode
test
```
