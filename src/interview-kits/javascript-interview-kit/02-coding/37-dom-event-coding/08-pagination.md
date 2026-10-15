# Pagination.

Pagination divides a large dataset into smaller pages instead of displaying every item at once.

For example, displaying 10 users per page from a list of 100 users.

The key formula is:

[ \text{startIndex}=(\text{currentPage}-1)\times\text{pageSize} ]

// JavaScript: Implement previous and next pagination controls.

```
<ul id="userList"></ul>

<button id="previous">Previous</button>
<span id="pageInfo"></span>
<button id="next">Next</button>

<script>
  const users = Array.from({ length: 45 }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`
  }));

  const pageSize = 10;
  let currentPage = 1;

  const list = document.getElementById("userList");
  const pageInfo = document.getElementById("pageInfo");
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");

  const totalPages = Math.ceil(users.length / pageSize);

  function renderPage() {
    const startIndex = (currentPage - 1) * pageSize;
    const pageUsers = users.slice(startIndex, startIndex + pageSize);

    list.replaceChildren();

    pageUsers.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = user.name;
      list.appendChild(li);
    });

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    previousButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
  }

  previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPage();
    }
  });

  renderPage();
</script>
```

### How it works

For page 2 with a page size of 10:

- Start index: `(2 - 1) * 10 = 10`
- End index: `10 + 10 = 20`
- `slice(10, 20)` returns items 11 through 20.

Important edge cases

- Disable Previous on the first page.
- Disable Next on the last page.
- Handle empty datasets.
- Reset the current page when a filter changes.
- For large server-side datasets, request only the items needed for the current page.
