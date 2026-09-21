# 🧪 Testing Interview Questions

# 📚 PART 1 — THEORY QUESTIONS

---

## 1. The Test Pyramid ⭐⭐⭐⭐⭐

1. What is the test pyramid?
2. Why should most tests be at the bottom of the pyramid?
3. What is the ice-cream cone anti-pattern?
4. Where do component tests fit in the pyramid?
5. Where do API/contract tests fit?
6. How do you apply the pyramid in a microservices org?
7. How would you explain the pyramid in an interview?

---

## 2. Unit vs Integration vs E2E ⭐⭐⭐⭐⭐

1. What is a unit test?
2. What is an integration test?
3. What is an end-to-end test?
4. How do you decide which layer to test a bug at?
5. What is a smoke test vs a regression suite?
6. Should integration tests use mocks?
7. How do these layers show up in CI?

---

## 3. Mocks, Stubs & Fakes ⭐⭐⭐⭐⭐

1. What is a test double?
2. What is the difference between a stub and a mock?
3. What is a fake?
4. What is a spy?
5. When should you mock fetch or HTTP?
6. What is a dummy vs a stub?
7. How do Jest mocks work at a high level?

---

## 4. TDD ⭐⭐⭐⭐⭐

1. What is TDD?
2. What is the red-green-refactor cycle in practice?
3. When is TDD a good fit?
4. What is outside-in vs inside-out TDD?
5. How does TDD relate to coverage metrics?
6. What is a characterization test?
7. What are common TDD mistakes?

---

## 5. Test Doubles Pitfalls ⭐⭐⭐⭐

1. What is over-mocking?
2. What is testing implementation details?
3. How do mocks go stale against real APIs?
4. What is a false positive test?
5. What is a false negative / brittle test?
6. Why is mocking the database in a repository test often useless?
7. How do you keep doubles honest?

---

## 6. Frontend Testing (RTL vs Enzyme) ⭐⭐⭐⭐⭐

1. What is React Testing Library?
2. What was Enzyme and why did teams move away?
3. What is shallow rendering and why is it discouraged?
4. How should you query the DOM in RTL?
5. How do you test async UI (loading, fetch)?
6. How do you test user events vs fireEvent?
7. When is Playwright/Cypress better than RTL?

---

## 7. Contract Testing ⭐⭐⭐⭐

1. What is contract testing?
2. What is Pact / consumer-driven contract testing?
3. How does OpenAPI-based contract testing work?
4. When do contract tests fail to help?
5. How do you contract-test GraphQL?
6. Where do contract tests sit vs E2E?
7. How would you introduce contract testing to a monolith + SPA?

---

## 8. Flaky Tests ⭐⭐⭐⭐⭐

1. What is a flaky test?
2. What are common causes of flakes in UI tests?
3. How does shared state make tests flaky?
4. How do time and randomness cause flakes?
5. Is retrying a test in CI a valid fix?
6. How do you debug a flake that only fails in CI?
7. How do you prevent flakes in a growing suite?

---

# 💻 PART 2 — CODING QUESTIONS

---

## 9. Unit Test a Pure Function ⭐⭐⭐⭐⭐

1. Write a pure function and its Jest tests
2. How do you test a function that currently uses Date.now?
3. Write tests for parse failures without throwing in production API mapping
4. What makes these tests fail for the right reason?
5. How would you TDD a discount cap (max 50%)?

---

## 10. Mock a Fetch ⭐⭐⭐⭐⭐

1. Unit-test a client function by stubbing fetch
2. Test HTTP error and network failure branches
3. Show the same test with MSW instead of jest.fn fetch
4. How do you assert the request body of a POST?
5. What should you not mock when testing fetch wrappers?

---

## 11. Test a React Click Handler ⭐⭐⭐⭐⭐

1. Conceptually test a button click that increments a counter
2. Test that a submit button calls onSave with form values
3. Test disabled state and loading after click
4. What would Enzyme have done differently?
5. When is a click test not enough?

---

## 12. Design E2E Critical Path ⭐⭐⭐⭐⭐

1. How do you choose the critical path to automate?
2. Design a Playwright checkout critical-path test
3. What fixtures and isolation does this path need?
4. How do you keep this E2E from becoming a 40-minute suite?
5. What should happen when the critical path fails in CI?

---
