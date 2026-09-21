# What is a smoke test vs a regression suite?

**Definition:**
Smoke tests are a tiny subset (app boots, login works, homepage 200) run after deploy. Regression suites are broader. Smoke should be minutes or less so you can roll back quickly. Do not wait for the full E2E pack to know prod is down.

**Key points:**
- Post-deploy smoke in CD.
- Full regression on PR or nightly.
- Health checks are not smoke tests of user journeys.
- Keep smoke independent of huge seed datasets if you can.
- Alert on smoke failure immediately.
