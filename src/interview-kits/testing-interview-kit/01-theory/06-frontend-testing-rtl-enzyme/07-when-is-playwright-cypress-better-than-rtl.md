# When is Playwright/Cypress better than RTL?

**Definition:**
When you need a real browser (layout, cookies, downloads, multi-tab, visual diffs, true navigation) or a full stack. RTL/jsdom cannot test CSS overflow clicks, real iframe payments, or service workers faithfully. Keep RTL for component behavior; Playwright for journeys. Cypress is similar E2E with a different architecture.

**Key points:**
- jsdom ≠ Chrome.
- Visual regression: Playwright screenshots / Chromatic.
- Auth cookie flows across domains: E2E.
- Component Testing in Playwright exists too — know the option.
- Cost: E2E fewer tests, RTL more.
