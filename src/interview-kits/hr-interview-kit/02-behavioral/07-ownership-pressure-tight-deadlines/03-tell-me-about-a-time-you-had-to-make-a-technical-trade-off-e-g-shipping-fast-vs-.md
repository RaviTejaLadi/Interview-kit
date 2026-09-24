# Tell me about a time you had to make a technical trade-off (e.g., shipping fast vs writing perfect code / tech debt).

**Definition:**  
A technical trade-off happens when you cannot optimize everything at the same time—for example, speed, maintainability, performance, cost, or code quality.

**Sample answer:**

> In one project, we had a feature that needed to be released quickly. I initially wanted to build a more reusable abstraction because I expected similar functionality to be needed in the future.
>
> However, after discussing the actual requirements with the team, we realized that the future use cases weren't confirmed and the abstraction would add unnecessary complexity.
>
> We decided to implement the simplest clean solution that met the current requirements instead of building a generalized system prematurely.
>
> I made sure the implementation was still structured so it could be refactored later without a major rewrite. We documented the limitation and created a follow-up item for future improvements if the requirement became real.
>
> That experience taught me that **good engineering isn't always about building the most sophisticated solution. It's about choosing the appropriate level of complexity for the current problem.**

**Good phrase to remember:**

> "I prefer intentional technical debt over accidental technical debt."
