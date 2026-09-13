# What are ARIA live regions?

An **ARIA live region** tells assistive technologies that content can change dynamically and that those changes may need to be announced to the user.

The main attribute is:

```html
aria-live
```

For example:

```html
<!-- Screen readers can announce dynamically added status messages -->
<div aria-live="polite">Your changes have been saved.</div>
```

## `aria-live="polite"`

`polite` means:

> Announce the update when the user is at a suitable stopping point.

It generally **does not interrupt** the user's current activity.

Good for:

- "Saved successfully"
- Search result counts
- Status updates
- Loading completion

---

## `aria-live="assertive"`

`assertive` means:

> Announce the update immediately and potentially interrupt the current announcement.

Example:

```html
<!-- Use assertive only for important updates that need immediate attention -->
<div aria-live="assertive">Your session is about to expire.</div>
```

Good for situations where the user needs to know immediately.

### Rule of thumb

**Use `polite` by default. Use `assertive` sparingly.**
