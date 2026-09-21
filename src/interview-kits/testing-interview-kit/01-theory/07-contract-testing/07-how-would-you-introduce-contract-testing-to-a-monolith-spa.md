# How would you introduce contract testing to a monolith + SPA?

**Definition:**
Start with OpenAPI (or generated types from tRPC/GraphQL) shared in a package. Add a CI step that the Express app satisfies the spec (response validation in tests). Point the SPA at MSW handlers generated from the spec. Add Pact only if multiple consumers or separate deploy trains appear.

**Key points:**
- Do not start with a broker for one team.
- Shared types are already a weak contract.
- Runtime zod validation at the boundary.
- Split later when teams and release trains split.
- Document breaking-change process.
