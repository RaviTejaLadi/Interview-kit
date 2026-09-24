# Tell me about a time you introduced a critical bug into production. How did you handle the aftermath?

**Definition:**  
This question tests **accountability under pressure**. Don't blame testing, another developer, or the requirements. Explain how you helped mitigate the problem and prevent recurrence.

**Sample answer:**

> Yes. In one release, I introduced a bug that affected a particular user flow. The issue wasn't obvious during development because it only occurred with a specific combination of data.
>
> Once the issue was reported, I immediately investigated the deployment and identified the change that introduced the problem. I informed the team rather than trying to fix it silently.
>
> Since restoring the affected functionality was the priority, we first rolled back the problematic change. I then reproduced the issue locally, fixed the underlying problem, and added a regression test covering that scenario.
>
> After the fix was deployed, I reviewed why our existing tests didn't catch the case and added the missing test coverage.
>
> I took responsibility for the mistake and focused on reducing its impact and preventing the same class of bug from happening again.

### Good structure

```text
Acknowledge
    ↓
Assess impact
    ↓
Mitigate / rollback
    ↓
Find root cause
    ↓
Fix
    ↓
Add regression test
    ↓
Improve process
```

**Avoid saying:**

> "QA should have caught it."

Instead:

> "Our existing test coverage didn't cover that scenario, and I worked on adding coverage for it."
