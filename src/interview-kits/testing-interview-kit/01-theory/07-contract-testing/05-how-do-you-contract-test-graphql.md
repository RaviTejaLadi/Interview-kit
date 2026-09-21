# How do you contract-test GraphQL?

**Definition:**
Persisted queries + schema checks (graphql-inspector, Apollo Studio) plus consumer operation collections. Breaking change detection on schema PRs. Pact has GraphQL support but many teams use schema compatibility + codegen instead. Field-level deprecation is the evolution tool.

**Key points:**
- Fail CI if a removed field is still queried in the repo.
- Inspector: breaking vs non-breaking.
- Codegen keeps TypeScript honest.
- Gateway composition checks in federation.
- Still test resolvers for authz.
