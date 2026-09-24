# Why not just delete build tools in the same stage?

**Definition:**
Deleting files in a later `RUN` does not remove them from earlier layers. The image still contains the compiler in its history and size. Multi-stage never copies those layers into the final image. That is the security and size win.

**Key points:**

- Layers are additive history.
- `docker history` shows the bloat.
- Squash is not a substitute for multi-stage.
- Final stage can use a different base (distroless).
- This is a common senior-level Docker question.
