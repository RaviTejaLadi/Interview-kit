# What is Pact / consumer-driven contract testing?

**Definition:**
The consumer writes tests against a mock provider; Pact generates a contract file. Provider CI verifies it can satisfy all contracts from its consumers (Pact Broker `can-i-deploy`). This flips ownership: providers do not break unknown consumers as easily.

**Key points:**

- Consumer test → pact file → provider verification.
- `can-i-deploy` gate in CD.
- States (`given User exists`) set up provider data.
- Not for bidirectional streaming complexity without extra work.
- Team process matters more than the library.
