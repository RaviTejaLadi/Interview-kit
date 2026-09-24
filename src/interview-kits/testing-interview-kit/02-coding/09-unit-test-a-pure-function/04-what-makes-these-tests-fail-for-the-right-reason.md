# What makes these tests fail for the right reason?

**Definition:**
Change the implementation to be wrong and watch the named test fail. If you break rounding and a 'rejects negative qty' test fails, your tests are coupled. Each test should have one reason to fail. Split cases rather than one mega-assert.

**Key points:**

- Mutation testing mindset.
- Avoid multiple unrelated expects in one test unless they are the same scenario.
- Assertion messages (`expect(x).toBe(y)`) should be readable in CI logs.
- Do not assert internals of a closure.
- Delete redundant tests that duplicate coverage without new behavior.
