# Describe a high-pressure production outage or critical bug you had to resolve.

**Definition:**  
This evaluates how you behave under pressure. The interviewer wants to see structured debugging, communication, and incident ownership rather than panic.

**Sample answer:**

> We once had a production issue where users were experiencing failures in an important part of the application shortly after a deployment.
>
> My first step was to understand the scope of the issue using logs, monitoring, and recent deployment changes. I avoided making random changes directly in production.
>
> We identified that a frontend change was making an unexpected API request under a particular condition. I reproduced the issue locally and confirmed the root cause.
>
> Since restoring service was the priority, we rolled back the problematic change first. After the system was stable, I prepared a proper fix, added a regression test, and verified it before redeploying.
>
> We also documented the incident and discussed how we could catch similar issues earlier through better testing and monitoring.
>
> The important thing I learned was to separate **mitigation from permanent resolution**. First restore the service, then fix the underlying problem.

**Good production-debugging sequence:**

```text
Detect
  ↓
Assess impact
  ↓
Mitigate / rollback
  ↓
Find root cause
  ↓
Fix
  ↓
Test
  ↓
Deploy
  ↓
Post-incident review
```
