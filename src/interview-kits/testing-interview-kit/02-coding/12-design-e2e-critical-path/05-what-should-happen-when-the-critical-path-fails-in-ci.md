# What should happen when the critical path fails in CI?

**Definition:**
Block deploy, attach trace/video, page the owning team if on main, and do not retry blindly more than once. If it is a flake, quarantine with an owner and a due date. Product bugs get a failing test that stays until fixed. Smoke on production after deploy should hit a read-only subset if checkout is too dangerous.

**Key points:**
- Fail the pipeline.
- Artifacts or it did not happen.
- Distinguish flake vs regression with history.
- Prod smoke: login + view order, maybe not place a real order.
- This path is the E2E you are allowed to have in the pyramid tip.

> 💡 Design E2E around business risk, then ruthlessly keep the count small.
