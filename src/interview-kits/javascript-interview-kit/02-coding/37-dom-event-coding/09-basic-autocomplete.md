# Basic autocomplete.

Autocomplete displays suggestions while a user types into an input field.

Examples include searching for cities, selecting usernames, and filling out address fields.

Unlike a normal search UI, autocomplete usually displays a small set of suggestions that the user can select.

// JavaScript: Create a basic autocomplete with clickable suggestions.

```
<label for="cityInput">City</label>
<input
  id="cityInput"
  type="text"
  autocomplete="off"
  placeholder="Start typing a city..."
/>

<ul id="suggestions"></ul>

<script>
  const cities = [
    "Hyderabad",
    "Bengaluru",
    "Chennai",
    "Mumbai",
    "Delhi",
    "Pune",
    "Kolkata"
  ];

  const input = document.getElementById("cityInput");
  const suggestions = document.getElementById("suggestions");

  function renderSuggestions(matches) {
    suggestions.replaceChildren();

    matches.forEach((city) => {
      const li = document.createElement("li");
      const button = document.createElement("button");

      button.type = "button";
      button.textContent = city;

      button.addEventListener("click", () => {
        input.value = city;
        suggestions.replaceChildren();
      });

      li.appendChild(button);
      suggestions.appendChild(li);
    });
  }

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();

    if (!query) {
      suggestions.replaceChildren();
      return;
    }

    const matches = cities
      .filter((city) => city.toLowerCase().includes(query))
      .slice(0, 5);

    renderSuggestions(matches);

    if (matches.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No suggestions found.";
      suggestions.appendChild(li);
    }
  });

  // Close suggestions when the input loses focus.
  input.addEventListener("blur", () => {
    setTimeout(() => suggestions.replaceChildren(), 150);
  });
</script>
```

### How it works

1. Listen for changes to the input.
2. Filter cities that match the query.
3. Use `slice(0, 5)` to limit results to five suggestions.
4. Display each suggestion as a button.
5. When the user selects one, update the input value and clear the suggestions.

The short delay in the `blur` handler allows the click on a suggestion to register before the list disappears.

Production considerations

- Support arrow keys, Enter, and Escape.
- Expose suggestions using appropriate combobox and listbox ARIA patterns.
- Handle loading, empty, and error states for API-backed suggestions.
- Debounce network requests and avoid displaying stale responses.
