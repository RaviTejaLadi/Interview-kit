# What is `localStorage`?

**`localStorage`** is a browser storage mechanism that allows a website to store **key-value data persistently** on the user's device.

Data remains available even after:

* Closing the browser
* Restarting the computer
* Reloading the page

It is associated with the website's **origin** (scheme + host + port).

### Example

```javascript
// Store and retrieve data using localStorage.
localStorage.setItem("theme", "dark");

const theme = localStorage.getItem("theme");

console.log(theme); // "dark"
```

To remove data:

```javascript
// Remove a specific localStorage item.
localStorage.removeItem("theme");

// Remove all localStorage data for the current origin.
localStorage.clear();
```

### Important points

* Stores strings.
* Data persists until explicitly removed.
* Not automatically sent to the server.
* Accessible through JavaScript.
* Typically has a capacity of several MB per origin, but the exact quota varies by browser and environment.