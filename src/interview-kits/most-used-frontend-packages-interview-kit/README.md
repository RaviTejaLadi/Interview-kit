# 🟢 Most-Used Frontend Packages — Interview Kit

# 📚 PART 1 — THEORY QUESTIONS

## 1. React Ecosystem & Core Packages ⭐⭐⭐⭐⭐

1. What are the most commonly used packages in React development?
2. What is the difference between React and React DOM?
3. What is the purpose of `react-dom/client`?
4. What is the difference between a React library and a React framework?
5. What is the difference between client-side rendering (CSR) and server-side rendering (SSR)?
6. What is the purpose of Vite in a React project?
7. What is the difference between Vite and Webpack?
8. What is tree shaking, and how does it reduce bundle size?
9. What are dependencies and devDependencies in `package.json`?
10. How do you choose between a lightweight package and a feature-rich library?

## 2. Routing — React Router ⭐⭐⭐⭐⭐

1. What is React Router?
2. What is the difference between `BrowserRouter` and `HashRouter`?
3. What are `Routes` and `Route`?
4. What is the difference between `Link` and `NavLink`?
5. What is the purpose of `useNavigate()`?
6. What is the difference between `useParams()` and `useSearchParams()`?
7. How do you implement nested routes?
8. How do you implement protected routes?
9. What are loaders and actions in React Router?
10. How do you implement lazy-loaded routes?
11. How do you handle 404 pages?
12. How do you preserve query parameters during navigation?

## 3. State Management — Redux Toolkit, Zustand & Context ⭐⭐⭐⭐⭐

1. What is Redux Toolkit, and why is it preferred over traditional Redux?
2. What are `configureStore()`, `createSlice()`, and `createAsyncThunk()`?
3. What is the difference between Redux Toolkit and Context API?
4. What is Zustand, and how does it simplify state management?
5. What is the difference between Zustand and Redux Toolkit?
6. When should you use local state instead of global state?
7. What is Redux middleware?
8. What is the purpose of Redux DevTools?
9. What is state normalization?
10. How do you persist state across page reloads?
11. What are the risks of storing authentication tokens in persisted client state?
12. How do you prevent unnecessary component re-renders in global state management?

## 4. API Data Fetching — Axios, Fetch & TanStack Query ⭐⭐⭐⭐⭐

1. What is Axios, and how does it differ from the native Fetch API?
2. What are Axios interceptors?
3. How do you configure a reusable Axios instance?
4. How do you attach authentication tokens to API requests?
5. How do you handle API errors centrally?
6. What is TanStack Query (React Query)?
7. What is the difference between server state and client state?
8. What are `useQuery()` and `useMutation()`?
9. What are `staleTime` and `gcTime`?
10. What is query invalidation?
11. How do you implement optimistic updates?
12. How do you cancel an API request?
13. How do you implement pagination and infinite scrolling?
14. What is the difference between TanStack Query and Redux Toolkit?
15. How do you prevent duplicate API requests?

## 5. Forms & Validation — React Hook Form, Formik & Zod ⭐⭐⭐⭐⭐

1. What is React Hook Form?
2. What is the difference between React Hook Form and Formik?
3. What are controlled and uncontrolled components?
4. How does `register()` work in React Hook Form?
5. What is the purpose of `handleSubmit()`?
6. What are `watch()`, `setValue()`, and `reset()`?
7. What is schema-based validation?
8. What is Zod, and how does it differ from Yup?
9. How do you integrate Zod with React Hook Form?
10. How do you implement conditional validation?
11. How do you validate nested objects and arrays?
12. How do you handle server-side validation errors?
13. How do you implement multi-step forms?
14. How do you prevent unnecessary re-renders in large forms?

## 6. Styling & UI Component Libraries ⭐⭐⭐⭐⭐

1. What is Tailwind CSS?
2. What is the difference between Tailwind CSS and Bootstrap?
3. What is the difference between Material UI (MUI) and Ant Design?
4. What is shadcn/ui, and how does it differ from a traditional component library?
5. What is the difference between CSS Modules and styled-components?
6. What is Emotion, and how does it work with React?
7. What is the purpose of `clsx` and `classnames`?
8. What is the purpose of `tailwind-merge`?
9. How do you create reusable UI components?
10. How do you implement dark mode?
11. How do you customize a component library's theme?
12. How do you reduce CSS bundle size?
13. How do you build responsive layouts using utility classes?
14. What are design tokens, and why are they useful?

## 7. Performance Optimization Packages ⭐⭐⭐⭐⭐

1. What is `React.memo()`?
2. What are `useMemo()` and `useCallback()`?
3. What is the purpose of `lazy()` and `Suspense`?
4. What is code splitting?
5. What is the difference between lazy loading and preloading?
6. What is the purpose of `@tanstack/react-virtual`?
7. How does virtualization improve performance for large lists?
8. What is the purpose of `lodash`?
9. What is the difference between Lodash and native JavaScript methods?
10. How do you use `lodash.debounce()`?
11. What is the difference between debouncing and throttling?
12. How do you analyze bundle size using tools such as `rollup-plugin-visualizer`?
13. What causes unnecessary React re-renders?
14. How do you optimize a large React application?

## 8. Utility Packages — Lodash, date-fns & Day.js ⭐⭐⭐⭐

1. What is Lodash, and why is it used?
2. What is the difference between `_.cloneDeep()` and the spread operator?
3. What is the difference between `_.groupBy()` and native `reduce()`?
4. What is Day.js?
5. What is the difference between Day.js, date-fns, and Moment.js?
6. Why is Moment.js generally not the first choice for new projects?
7. How do you format dates and times?
8. How do you handle time zones?
9. What is the difference between a timestamp and a formatted date?
10. How do you compare dates safely?
11. What is the purpose of `uuid` and `nanoid`?
12. Why should array indexes generally not be used as React keys for dynamic lists?

## 9. Authentication & Security Packages ⭐⭐⭐⭐⭐

1. What is the purpose of `jwt-decode`?
2. Can `jwt-decode` verify a JWT signature?
3. What is the difference between decoding and verifying a JWT?
4. What is the purpose of `DOMPurify`?
5. How do you prevent XSS when rendering user-generated HTML?
6. What is the purpose of `helmet` in a Node.js backend?
7. What is the difference between frontend validation and backend validation?
8. Why should frontend environment variables not contain secrets?
9. How do you securely handle authentication state in React?
10. What is the difference between `localStorage`, `sessionStorage`, and cookies?
11. What are CSRF tokens?
12. Why is client-side route protection insufficient for securing APIs?

## 10. Testing — Vitest, Jest & React Testing Library ⭐⭐⭐⭐⭐

1. What is Vitest?
2. What is the difference between Jest and Vitest?
3. What is React Testing Library?
4. What is the difference between unit testing and integration testing?
5. What is the purpose of `render()` and `screen`?
6. What is the difference between `getByRole()`, `queryByRole()`, and `findByRole()`?
7. What is the purpose of `userEvent`?
8. How do you mock API requests?
9. What is Mock Service Worker (MSW)?
10. How do you test React hooks?
11. How do you test form validation?
12. How do you test loading, success, and error states?
13. What is the purpose of Playwright and Cypress?
14. How do you test a protected route?
15. How do you avoid brittle tests that depend on implementation details?

## 11. Build Tools & Package Management ⭐⭐⭐⭐

1. What is npm?
2. What is the difference between npm, Yarn, and pnpm?
3. What is the purpose of `package-lock.json`?
4. What is semantic versioning?
5. What is the difference between `^`, `~`, and an exact version in `package.json`?
6. What is the difference between `npm install` and `npm ci`?
7. What are peer dependencies?
8. What is the difference between development and production dependencies?
9. What is a bundler?
10. What are plugins and loaders in a build tool?
11. What is an environment variable in Vite?
12. What is the difference between `.env`, `.env.development`, and `.env.production`?
13. What is the purpose of ESLint?
14. What is Prettier, and how does it differ from ESLint?
15. What are Husky and lint-staged?
16. How do you troubleshoot dependency conflicts and package installation errors?

# 💻 PART 2 — CODING & PRACTICAL QUESTIONS

## 12. Routing & Navigation Coding ⭐⭐⭐⭐⭐

1. Set up React Router in a React application.
2. Create nested routes for a dashboard.
3. Implement protected routes based on authentication.
4. Create role-based routing for admin and user pages.
5. Read route parameters using `useParams()`.
6. Read and update query parameters using `useSearchParams()`.
7. Implement lazy-loaded routes.
8. Build a reusable layout with an `Outlet`.
9. Implement a 404 page.
10. Preserve search filters when navigating between pages.

## 13. State Management Coding ⭐⭐⭐⭐⭐

1. Create a Redux Toolkit store.
2. Implement a counter using `createSlice()`.
3. Fetch API data using `createAsyncThunk()`.
4. Build a shopping cart using Redux Toolkit.
5. Implement the same shopping cart using Zustand.
6. Share state using Context API.
7. Persist selected preferences across reloads.
8. Implement selectors to derive computed state.
9. Prevent unnecessary re-renders in global state consumers.
10. Compare local state, Context API, Redux Toolkit, and Zustand for the same use case.

## 14. API Integration Coding ⭐⭐⭐⭐⭐

1. Create a reusable Axios instance.
2. Add request and response interceptors.
3. Attach an authorization header to requests.
4. Build a custom hook for fetching API data.
5. Implement loading, success, and error states.
6. Fetch data using TanStack Query.
7. Implement mutations and query invalidation.
8. Build optimistic updates for a todo list.
9. Implement search with debouncing.
10. Cancel stale requests using `AbortController`.
11. Implement pagination and infinite scrolling.
12. Handle token expiration without creating infinite refresh loops.

## 15. Forms & Validation Coding ⭐⭐⭐⭐⭐

1. Create a form using React Hook Form.
2. Validate an email and password using Zod.
3. Integrate Zod with React Hook Form.
4. Implement dynamic form fields using `useFieldArray()`.
5. Create conditional fields based on user selection.
6. Implement a multi-step registration form.
7. Display server-side validation errors.
8. Reset a form after successful submission.
9. Prevent duplicate form submissions.
10. Build an accessible form with labels and error messages.

## 16. UI & Styling Packages Coding ⭐⭐⭐⭐⭐

1. Create a responsive layout using Tailwind CSS.
2. Build a reusable modal component.
3. Create a dropdown using a UI component library.
4. Implement dark mode with theme switching.
5. Create reusable button variants using `clsx`.
6. Merge Tailwind classes safely using `tailwind-merge`.
7. Customize an MUI theme.
8. Build an accessible tabs component.
9. Create a searchable dropdown with keyboard navigation.
10. Build a reusable data table with sorting and pagination.

## 17. Performance & Utility Coding ⭐⭐⭐⭐⭐

1. Implement debounced search using Lodash.
2. Implement throttled scroll handling.
3. Virtualize a large list using `@tanstack/react-virtual`.
4. Lazy-load a component using `React.lazy()`.
5. Optimize a component using `React.memo()`.
6. Use `useMemo()` for expensive calculations.
7. Use `useCallback()` when stable function references are needed.
8. Format dates using date-fns or Day.js.
9. Generate unique IDs using `nanoid`.
10. Analyze and reduce a production bundle.
11. Find and fix unnecessary component re-renders.
12. Implement pagination for a large dataset.

## 18. Testing & Code Quality Coding ⭐⭐⭐⭐⭐

1. Configure Vitest in a React project.
2. Write unit tests for a utility function.
3. Test a component using React Testing Library.
4. Test user interactions using `userEvent`.
5. Mock an API request.
6. Test loading and error states.
7. Test a form with invalid and valid inputs.
8. Test protected routes.
9. Configure ESLint and Prettier.
10. Set up Husky and lint-staged.
11. Write an integration test using MSW.
12. Write an end-to-end test using Playwright.

# 🧠 PART 3 — MUST-KNOW ADVANCED TOPICS

## 19. Frontend Package Selection & Architecture ⭐⭐⭐⭐⭐

Understand which package solves which problem.

| Requirement                | Common package choices              |
| -------------------------- | ----------------------------------- |
| Routing                    | React Router                        |
| Global state               | Redux Toolkit, Zustand              |
| API server state           | TanStack Query                      |
| HTTP requests              | Fetch API, Axios                    |
| Forms                      | React Hook Form, Formik             |
| Validation                 | Zod, Yup, Joi                       |
| Styling                    | Tailwind CSS, CSS Modules           |
| UI components              | MUI, Ant Design, shadcn/ui          |
| Utility functions          | Lodash                              |
| Date handling              | date-fns, Day.js                    |
| Large list virtualization  | TanStack Virtual                    |
| Unit and component testing | Vitest, Jest, React Testing Library |
| API mocking                | MSW                                 |
| End-to-end testing         | Playwright, Cypress                 |
| Linting and formatting     | ESLint, Prettier                    |
| Unique IDs                 | `crypto.randomUUID()`, Nano ID      |

Topics to prepare:

1. How do you select a package for a project?
2. When should you avoid adding a dependency?
3. How do you evaluate bundle size and tree-shaking support?
4. How do you check maintenance activity and security vulnerabilities?
5. How do you avoid overlapping libraries?
6. How do you replace an outdated dependency?
7. How do you handle breaking changes during package upgrades?
8. How do you maintain a consistent design system across components?

## 20. Frontend Data Flow & State Architecture ⭐⭐⭐⭐⭐

```
User Interaction
       |
       v
React Component
       |
       v
Local / Global State
       |
       v
API Data-Fetching Layer
       |
       v
Axios / Fetch
       |
       v
Backend API
       |
       v
Database
       |
       v
API Response
       |
       v
Cache Update / State Update
       |
       v
UI Re-render
```

Topics to prepare:

1. Local state vs global state vs server state.
2. Redux Toolkit vs Zustand vs Context API.
3. TanStack Query caching and invalidation.
4. API error handling and retry strategies.
5. Authentication and authorization boundaries.
6. Separation of API services from UI components.
7. Custom hooks for reusable business logic.
8. Data normalization and derived state.
9. Request cancellation and race conditions.
10. Optimistic updates and rollback behavior.

## 21. Package Performance, Security & Maintenance ⭐⭐⭐⭐⭐

1. What is tree shaking?
2. What is code splitting?
3. How do CommonJS and ES Modules affect tree shaking?
4. What is a supply-chain attack in npm?
5. How do you audit dependencies using `npm audit`?
6. What is a lockfile, and why should it be committed?
7. What are transitive dependencies?
8. How do you detect unused dependencies?
9. What are bundle analyzers?
10. How do you prevent secrets from being included in frontend bundles?
11. How do you avoid dependency version conflicts?
12. What is the difference between a polyfill and a transpiler?
13. How do you safely upgrade React and its ecosystem packages?
14. How do you assess whether a package is suitable for production?

# 🏆 TOP 25 — If You Have Very Little Time

### 🔥 Theory

1. React Router and protected routes.
2. Redux Toolkit vs Zustand vs Context API.
3. Axios vs Fetch API.
4. Axios interceptors.
5. TanStack Query and server-state management.
6. React Hook Form vs Formik.
7. Zod vs Yup.
8. Tailwind CSS vs Bootstrap.
9. MUI vs Ant Design vs shadcn/ui.
10. Lodash and native JavaScript methods.
11. Day.js vs date-fns.
12. Debouncing vs throttling.
13. React Testing Library vs Jest vs Vitest.
14. Vite vs Webpack.
15. npm vs Yarn vs pnpm.

### 💻 Coding

16. Create a protected route using React Router.
17. Build a Redux Toolkit or Zustand store.
18. Configure Axios interceptors.
19. Fetch and cache data using TanStack Query.
20. Build a validated form using React Hook Form and Zod.
21. Implement debounced API search.
22. Virtualize a large list.
23. Write component tests using React Testing Library.
24. Configure ESLint and Prettier.
25. Analyze bundle size and optimize dependencies.
