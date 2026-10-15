# Tabs.

Tabs let users switch between different content panels without navigating to another page.

Examples include product details, reviews, and specifications.

// JavaScript: Switch between tab panels using data attributes.

```
<div role="tablist">
  <button role="tab" data-tab="overview" aria-selected="true">
    Overview
  </button>
  <button role="tab" data-tab="features" aria-selected="false">
    Features
  </button>
  <button role="tab" data-tab="reviews" aria-selected="false">
    Reviews
  </button>
</div>

<div id="overview" role="tabpanel">Product overview.</div>
<div id="features" role="tabpanel" hidden>Product features.</div>
<div id="reviews" role="tabpanel" hidden>Customer reviews.</div>

<script>
  const tablist = document.querySelector('[role="tablist"]');

  tablist.addEventListener("click", (event) => {
    const selectedTab = event.target.closest("[data-tab]");

    if (!selectedTab || !tablist.contains(selectedTab)) return;

    const selectedId = selectedTab.dataset.tab;

    tablist.querySelectorAll("[data-tab]").forEach((tab) => {
      const isActive = tab === selectedTab;
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    document.querySelectorAll('[role="tabpanel"]').forEach((panel) => {
      panel.hidden = panel.id !== selectedId;
    });
  });
</script>
```

### How it works

1. Each tab has a `data-tab` attribute.
2. Clicking a tab identifies its corresponding panel.
3. `aria-selected` updates the selected tab's state.
4. The `hidden` property controls which panel is visible.

Gotcha: For production interfaces, implement the full WAI-ARIA tabs keyboard pattern, including arrow-key navigation and focus management. The example above demonstrates mouse-click behavior.
