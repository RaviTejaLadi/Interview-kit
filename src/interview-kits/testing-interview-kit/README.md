# 🟢 React Testing — Interview Kit

# 📚 PART 1 — THEORY QUESTIONS

## 1. React Testing Fundamentals ⭐⭐⭐⭐⭐

1. What is testing in React, and why is it important?
2. What are the different types of testing?
   - Unit testing
   - Integration testing
   - End-to-end (E2E) testing
   - Component testing
3. What is the difference between unit testing and integration testing?
4. What is the difference between component testing and E2E testing?
5. What is the testing pyramid?
6. What should you test in a React component?
7. What is the difference between testing implementation details and user behavior?
8. What is test coverage?
9. What are statement, branch, function, and line coverage?
10. What is the difference between a flaky test and a deterministic test?
11. What makes a React test reliable and maintainable?
12. When should you mock a dependency in a test?

## 2. Jest & Vitest ⭐⭐⭐⭐⭐

1. What is Jest?
2. What is Vitest?
3. What is the difference between Jest and Vitest?
4. What are `describe()`, `it()`, and `test()`?
5. What is the difference between `test()` and `it()`?
6. What are `expect()` and matchers?
7. What is the difference between `toBe()` and `toEqual()`?
8. What are `beforeEach()`, `afterEach()`, `beforeAll()`, and `afterAll()`?
9. What is the purpose of `jest.fn()` or `vi.fn()`?
10. What is the difference between `jest.spyOn()` and `vi.spyOn()`?
11. What is the difference between mocks, stubs, and spies?
12. How do you mock modules using `jest.mock()` or `vi.mock()`?
13. How do you configure a test environment using `jsdom`?
14. How do you generate code coverage reports?
15. What are setup files, and how do you configure them?

## 3. React Testing Library ⭐⭐⭐⭐⭐

1. What is React Testing Library (RTL)?
2. Why does React Testing Library encourage testing from the user's perspective?
3. What is the difference between React Testing Library and Enzyme?
4. What are `render()`, `screen`, and `cleanup()`?
5. What is the purpose of `screen.debug()`?
6. What is the difference between `getByRole()`, `queryByRole()`, and `findByRole()`?
7. What is the difference between `getByText()`, `getByLabelText()`, and `getByTestId()`?
8. What are semantic queries, and why should you prefer them?
9. When should you use `data-testid`?
10. What is the purpose of `within()`?
11. What is the purpose of `rerender()`?
12. What is the purpose of `unmount()`?
13. What is the difference between `renderHook()` and `render()`?
14. How do you test components that receive props?
15. How do you test conditional rendering?

## 4. User Interactions & Events ⭐⭐⭐⭐⭐

1. What is `@testing-library/user-event`?
2. What is the difference between `userEvent` and `fireEvent`?
3. Why should you prefer `userEvent` for most user interactions?
4. How do you test button clicks?
5. How do you test text input changes?
6. How do you test checkbox and radio button interactions?
7. How do you test dropdown selections?
8. How do you test keyboard interactions?
9. How do you test form submission?
10. How do you test disabled buttons?
11. How do you test focus and blur behavior?
12. How do you test drag-and-drop interactions?
13. How do you test event propagation?
14. How do you test a modal that closes when the Escape key is pressed?

## 5. Asynchronous Testing ⭐⭐⭐⭐⭐

1. Why is asynchronous testing important in React?
2. What is the difference between `getBy*`, `queryBy*`, and `findBy*` queries?
3. What is `waitFor()`?
4. What is the difference between `waitFor()` and `findBy*`?
5. What is the purpose of `waitForElementToBeRemoved()`?
6. Why should you avoid using arbitrary `setTimeout()` calls in tests?
7. How do you test loading, success, and error states?
8. How do you test a component that fetches API data?
9. How do you test a debounced search input?
10. How do you test asynchronous form validation?
11. How do you handle rejected promises in component tests?
12. How do you avoid race conditions in asynchronous tests?
13. What causes the warning `An update to ... was not wrapped in act(...)`?
14. When should you use `act()` explicitly?

## 6. Mocking APIs & External Dependencies ⭐⭐⭐⭐⭐

1. What is API mocking?
2. Why should you mock API calls in component tests?
3. What is Mock Service Worker (MSW)?
4. What is the difference between mocking `fetch()` and using MSW?
5. How do you mock Axios requests?
6. How do you mock a successful API response?
7. How do you test API failures and HTTP error responses?
8. How do you test network failures?
9. How do you test retry logic?
10. How do you mock browser APIs such as `localStorage`?
11. How do you mock `IntersectionObserver` and `ResizeObserver`?
12. How do you mock third-party components?
13. How do you test components that use environment variables?
14. Why should you reset or restore mocks between tests?
15. When should you avoid mocking a dependency?

## 7. Forms & Validation Testing ⭐⭐⭐⭐⭐

1. How do you test a controlled form?
2. How do you test an uncontrolled form?
3. How do you test required field validation?
4. How do you test email and password validation?
5. How do you test React Hook Form?
6. How do you test Formik forms?
7. How do you test schema validation using Zod or Yup?
8. How do you test server-side validation errors?
9. How do you test successful form submission?
10. How do you test that a form does not submit when invalid?
11. How do you test dynamic form fields?
12. How do you test multi-step forms?
13. How do you test file uploads?
14. How do you test form reset behavior?
15. How do you verify that validation messages are accessible?

## 8. Hooks, Context & State Management Testing ⭐⭐⭐⭐⭐

1. How do you test a custom React hook?
2. What is `renderHook()`?
3. How do you test hooks that use `useState()` and `useEffect()`?
4. How do you test a hook that fetches API data?
5. How do you test Context API providers?
6. How do you test components that use Redux Toolkit?
7. How do you test Redux reducers independently?
8. How do you test Redux async thunks?
9. How do you test Zustand stores?
10. How do you test state updates after user interactions?
11. How do you test memoized components?
12. How do you test hooks that depend on timers?
13. How do you test cleanup logic in `useEffect()`?
14. How do you test components under React Strict Mode?
15. How do you verify that a component re-renders when its context value changes?

## 9. Snapshot Testing & Coverage ⭐⭐⭐⭐

1. What is snapshot testing?
2. How do you create snapshots using Jest or Vitest?
3. When should you use snapshot testing?
4. What are the disadvantages of snapshot testing?
5. What is the difference between snapshot testing and DOM assertion testing?
6. What is visual regression testing?
7. What is the difference between code coverage and test quality?
8. What is branch coverage?
9. How do you identify untested code paths?
10. How do you configure coverage thresholds?
11. Why is 100% code coverage not always a sign of good tests?
12. How do you avoid brittle snapshots?

## 10. End-to-End Testing ⭐⭐⭐⭐⭐

1. What is end-to-end testing?
2. What is Playwright?
3. What is Cypress?
4. What is the difference between Playwright and Cypress?
5. What is the difference between component testing and browser-based E2E testing?
6. How do you test login and logout flows?
7. How do you test navigation between pages?
8. How do you test protected routes?
9. How do you test API integration in a real browser?
10. How do you manage test data?
11. What are fixtures in E2E testing?
12. How do you handle flaky E2E tests?
13. What are auto-waiting and retryable assertions?
14. How do you run E2E tests in CI/CD?
15. How do you test responsive layouts and cross-browser behavior?

## 11. Accessibility & Advanced React Testing ⭐⭐⭐⭐

1. Why is accessibility testing important?
2. How do semantic HTML elements improve testability?
3. How do you test accessible names and roles?
4. What is `jest-axe` or `vitest-axe`?
5. How do you test keyboard navigation?
6. How do you test focus management in modals?
7. How do you test error messages associated with form fields?
8. How do you test components rendered through React portals?
9. How do you test error boundaries?
10. How do you test Suspense and lazy-loaded components?
11. How do you test components that use `useTransition()`?
12. How do you test components that use `useDeferredValue()`?
13. How do you test React Server Components?
14. What are the limitations of JSDOM compared with a real browser?
15. When should you use browser-based testing instead of DOM simulation?

# 💻 PART 2 — CODING & PRACTICAL QUESTIONS

## 12. Component Testing Coding ⭐⭐⭐⭐⭐

1. Write a unit test for a simple React component.
2. Test a component that receives props.
3. Test conditional rendering.
4. Test a component that renders a list of items.
5. Test that an empty state appears when the list has no data.
6. Test a counter with increment and decrement buttons.
7. Test a toggle component.
8. Test a modal that opens and closes.
9. Test tabs and accordion components.
10. Test a component that conditionally renders based on user permissions.

## 13. User Interaction Testing Coding ⭐⭐⭐⭐⭐

1. Test a button click using `userEvent`.
2. Test text input and controlled state updates.
3. Test checkbox and radio button interactions.
4. Test keyboard navigation.
5. Test a dropdown menu.
6. Test a search input that filters a list.
7. Test a form submission.
8. Test a modal that closes using the Escape key.
9. Test disabled and loading buttons.
10. Test focus management and accessible labels.

## 14. API & Asynchronous Testing Coding ⭐⭐⭐⭐⭐

1. Test a component that fetches data using `fetch()`.
2. Mock an API request using MSW.
3. Test loading, success, empty, and error states.
4. Test a failed request and retry behavior.
5. Test API requests made through Axios.
6. Test a component using TanStack Query.
7. Test an optimistic update and rollback.
8. Test cancellation of an API request.
9. Test debounced search behavior.
10. Test a component that fetches data when its props change.

## 15. Forms & Validation Testing Coding ⭐⭐⭐⭐⭐

1. Test required-field validation.
2. Test email and password validation.
3. Test a React Hook Form component.
4. Test a Zod validation schema.
5. Test successful form submission.
6. Test server-side validation errors.
7. Test a form that prevents duplicate submissions.
8. Test dynamic fields using `useFieldArray()`.
9. Test a multi-step form.
10. Test file upload validation and error messages.

## 16. Hooks & State Management Testing Coding ⭐⭐⭐⭐⭐

1. Test a custom counter hook using `renderHook()`.
2. Test a custom data-fetching hook.
3. Test a hook that uses `useEffect()` cleanup.
4. Test a Context API provider.
5. Test a Redux Toolkit reducer.
6. Test a Redux async thunk.
7. Test a component connected to Redux Toolkit.
8. Test a Zustand store.
9. Test state persistence behavior.
10. Test a hook that uses timers or debouncing.

## 17. Mocking & Timer Testing Coding ⭐⭐⭐⭐⭐

1. Mock a function using `vi.fn()` or `jest.fn()`.
2. Mock an API module using `vi.mock()` or `jest.mock()`.
3. Spy on a function using `vi.spyOn()` or `jest.spyOn()`.
4. Mock `localStorage`.
5. Mock `IntersectionObserver`.
6. Use fake timers to test `setTimeout()`.
7. Test a debounced function with fake timers.
8. Test a polling component.
9. Mock a third-party React component.
10. Reset, clear, and restore mocks correctly.

## 18. E2E & Integration Testing Coding ⭐⭐⭐⭐⭐

1. Write an E2E test for login using Playwright.
2. Test navigation between routes.
3. Test protected routes.
4. Test a complete registration flow.
5. Test a product search and filtering flow.
6. Test adding and removing products from a cart.
7. Test API error handling in a browser.
8. Test responsive layouts.
9. Test a form using keyboard-only interactions.
10. Configure E2E tests to run in CI/CD.

# 🧠 PART 3 — MUST-KNOW ADVANCED TOPICS

## 19. React Testing Library Query Priority ⭐⭐⭐⭐⭐

Understand which query to use and when.

| Query              | Behavior                             | Best use                             |
| ------------------ | ------------------------------------ | ------------------------------------ |
| `getByRole()`      | Returns a matching element or throws | Element should exist                 |
| `queryByRole()`    | Returns an element or `null`         | Element may not exist                |
| `findByRole()`     | Returns a Promise                    | Element appears asynchronously       |
| `getByText()`      | Finds an element by text             | Text-based assertions                |
| `getByLabelText()` | Finds a form control by label        | Form testing                         |
| `getByTestId()`    | Finds by `data-testid`               | When semantic queries are unsuitable |

Topics to prepare:

1. Why should you prefer `getByRole()`?
2. When should you use `findByRole()`?
3. Why is `queryByRole()` useful for asserting absence?
4. What causes `Unable to find an accessible element`?
5. How do you query elements inside a specific container?
6. Why should `data-testid` not be the default query?
7. How do you query elements by accessible name?
8. How do you test elements rendered asynchronously?

## 20. Async Testing & React `act()` ⭐⭐⭐⭐⭐

Understand how React processes state updates during tests.

```
Test Starts
    |
    v
Render Component
    |
    v
Trigger User Interaction
    |
    v
State Update / API Request
    |
    v
React Processes Updates
    |
    v
DOM Changes
    |
    v
Assert Expected Result
```

Topics to prepare:

1. Why do state updates sometimes require asynchronous assertions?
2. What does `act()` do?
3. When does React Testing Library handle `act()` automatically?
4. Why should you avoid arbitrary delays?
5. When should you use `waitFor()`?
6. How do you test loading indicators?
7. How do you test disappearing elements?
8. How do you test rejected promises?
9. How do fake timers interact with asynchronous tasks?
10. How do you prevent unresolved promises from leaking between tests?

## 21. Test Setup, CI/CD & Production Quality ⭐⭐⭐⭐⭐

1. How do you configure Vitest with React and Vite?
2. How do you configure Jest with React?
3. What is `setupFilesAfterEnv` in Jest?
4. What is `setupFiles` in Vitest?
5. How do you configure `@testing-library/jest-dom`?
6. What is the difference between `clearAllMocks()`, `resetAllMocks()`, and `restoreAllMocks()`?
7. How do you configure test coverage thresholds?
8. How do you run tests in watch mode?
9. How do you run tests in CI without watch mode?
10. How do you separate unit tests from E2E tests?
11. How do you handle environment variables in tests?
12. How do you identify and fix flaky tests?
13. How do you run tests before creating a pull request?
14. How do you integrate testing into GitHub Actions?
15. How do you decide which tests must block a deployment?

# 🏆 TOP 25 — If You Have Very Little Time

### 🔥 Theory

1. Unit vs integration vs E2E testing.
2. Jest vs Vitest.
3. React Testing Library and its testing philosophy.
4. `getBy*` vs `queryBy*` vs `findBy*`.
5. `userEvent` vs `fireEvent`.
6. `render()` vs `renderHook()`.
7. `waitFor()` vs `findBy*`.
8. What is `act()`?
9. Mocking vs spying.
10. `jest.fn()` vs `jest.spyOn()`.
11. Mock Service Worker (MSW).
12. Testing React Hook Form and Zod.
13. Testing Context API and Redux Toolkit.
14. Snapshot testing vs DOM assertions.
15. Code coverage vs test quality.

### 💻 Coding

16. Test a counter component.
17. Test a form with validation.
18. Test API loading, success, and error states.
19. Mock an API using MSW.
20. Test a custom hook.
21. Test Redux Toolkit state updates.
22. Test a debounced search input.
23. Test a modal and keyboard interactions.
24. Write a Playwright login test.
25. Configure Vitest coverage and CI execution.
