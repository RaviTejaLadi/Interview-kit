# How do multi-stage builds work with native addons?

**Definition:**
Compile in a builder that has headers (`python`, `make`, `g++`) matching the final libc. Alpine musl vs Debian glibc must match between build and runtime or Node bindings break. Copy the compiled `node_modules` into an identical-base runtime stage.

**Key points:**

- Same OS family for build and run when native code exists.
- Distroless + native addons can be painful.
- Prefer official binary packages when possible.
- Test the final image, not only the builder.
- `ldd` on the `.node` file if it crashes at start.
