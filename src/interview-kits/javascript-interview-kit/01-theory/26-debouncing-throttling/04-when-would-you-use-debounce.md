# When would you use debounce?

Use debounce when you want to wait until a user finishes an action before running expensive logic.

Common use cases:

- Search input: Fetch search results after the user stops typing.
- Form validation: Validate input after the user pauses.
- Window resizing: Recalculate layout after resizing stops.
- Autocomplete: Fetch suggestions after the user finishes entering text.
- API calls: Avoid unnecessary requests triggered by repeated input changes.

Example: If the user types a search query for three seconds, debounce can prevent requests for intermediate characters and send a request only after the user pauses.
