# Accordion.

An accordion expands and collapses sections of content. It is useful for FAQs, settings, and documentation.

The following example allows only one section to remain open at a time.

// JavaScript: Toggle accordion panels and synchronize accessibility attributes.

```
<div id="accordion">
  <section>
    <button aria-expanded="false" aria-controls="panel1" id="tab1">
      What is JavaScript?
    </button>
    <div id="panel1" hidden>
      JavaScript is a programming language used to build interactive
      websites and applications.
    </div>
  </section>

  <section>
    <button aria-expanded="false" aria-controls="panel2" id="tab2">
      What is event bubbling?
    </button>
    <div id="panel2" hidden>
      Event bubbling allows an event to propagate from a target
      element toward its ancestors.
    </div>
  </section>
</div>

<script>
  const accordion = document.getElementById("accordion");

  accordion.addEventListener("click", (event) => {
    const button = event.target.closest("button[aria-controls]");

    if (!button || !accordion.contains(button)) return;

    const panel = document.getElementById(
      button.getAttribute("aria-controls")
    );

    const shouldOpen = panel.hidden;

    accordion.querySelectorAll("button[aria-controls]").forEach((item) => {
      item.setAttribute("aria-expanded", "false");
      document.getElementById(
        item.getAttribute("aria-controls")
      ).hidden = true;
    });

    if (shouldOpen) {
      button.setAttribute("aria-expanded", "true");
      panel.hidden = false;
    }
  });
</script>
```

### How it works

- `panel.hidden` tells you whether a section is closed.
- Clicking a closed section opens it.
- All other sections close.
- `aria-expanded` communicates the current state to assistive technologies.

Variation: To allow multiple sections to stay open, toggle only the clicked panel instead of closing every panel.
