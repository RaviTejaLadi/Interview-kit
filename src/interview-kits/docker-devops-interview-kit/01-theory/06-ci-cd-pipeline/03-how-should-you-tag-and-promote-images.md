# How should you tag and promote images?

**Definition:**
Immutable git SHA tags + digest. `staging`/`prod` tags if you must, but treat them as moving pointers and still deploy by digest. Never retag `v1.2.3` to different bytes. Promotion: staging digest is the prod candidate after tests.

**Key points:**
- `myapi:main-abc123f`.
- SBOM stored next to the image.
- Cosign/sigstore for signing in mature setups.
- Rollback = deploy previous digest.
- `latest` is not a promotion strategy.
