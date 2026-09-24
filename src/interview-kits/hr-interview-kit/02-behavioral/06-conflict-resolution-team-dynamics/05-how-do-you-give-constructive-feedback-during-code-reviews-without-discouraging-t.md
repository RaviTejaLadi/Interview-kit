# How do you give constructive feedback during code reviews without discouraging team members?

**Definition:**  
The goal is to show that you treat code reviews as a collaboration and quality-improvement process, not as a way to criticize someone's work.

**Sample answer:**

> I try to separate the code from the person. My comments should explain why something could be improved rather than simply saying that something is wrong.
>
> For example, instead of saying:
>
> "This implementation is bad."
>
> I would say:
>
> "Could we move this logic into a custom hook? That would make the component easier to test and keep the UI focused on rendering."
>
> I also distinguish between blocking issues and suggestions. For example, security problems or bugs should be clearly marked as important, while naming or stylistic improvements can be suggestions.
>
> I also try to mention things that were done well. The purpose of a code review is to improve the code and help the team learn, not to prove that the reviewer knows more.

**Good review structure:**

```text
Problem → Reason → Suggestion → Priority
```

For example:

> "This API call happens every time the component renders. Could we move it into an effect or a data-fetching hook? Otherwise, it may trigger unnecessary requests. I'd consider this a blocking issue."
