# Search/filter UI.

A search/filter UI allows users to find items by matching a search term against their names or other properties.

For example, filtering a list of products as the user types.

// JavaScript: Filter products in real time using the search input.

```
<input id="searchInput" placeholder="Search products..." />
<ul id="productList"></ul>

<script>
  const products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Mobile Phone" },
    { id: 3, name: "Headphones" },
    { id: 4, name: "Laptop Stand" }
  ];

  const input = document.getElementById("searchInput");
  const list = document.getElementById("productList");

  function renderProducts(items) {
    list.replaceChildren();

    if (items.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No products found.";
      list.appendChild(li);
      return;
    }

    items.forEach((product) => {
      const li = document.createElement("li");
      li.textContent = product.name;
      list.appendChild(li);
    });
  }

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );

    renderProducts(filteredProducts);
  });

  renderProducts(products);
</script>
```

### How it works

Suppose the user types `laptop`.

1. The `input` event fires whenever the input value changes.
2. `toLowerCase()` makes matching case-insensitive.
3. `filter()` returns products whose names contain the search term.
4. The UI displays the matching results.

Time complexity: For \\(n\\) products with average name length \\(m\\), a search is approximately \\(O(nm)\\) in the worst case.

Gotcha: For large datasets or API-driven search, consider debouncing requests to avoid making an API call on every keystroke.
