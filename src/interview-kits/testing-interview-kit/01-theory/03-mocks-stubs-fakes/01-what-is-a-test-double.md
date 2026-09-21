# What is a test double?

**Definition:**
A test double is any stand-in for a collaborator in a test (Gerard Meszaros). Subtypes: dummy, stub, spy, mock, fake. Interviews often say 'mock' for all of them; you should distinguish. Doubles let you control inputs and observe interactions without the real dependency.

**Key points:**
- Dummy: passed but never used (fill an arg list).
- Stub: returns canned data.
- Spy: records calls, often wraps a real object.
- Mock: pre-programmed expectations (fail if not called that way).
- Fake: working lightweight implementation (in-memory repo).
