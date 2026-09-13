# What are Cookies (`document.cookie`)?

**Cookies** are small pieces of data associated with a website that can be stored by the browser and, depending on their attributes, **automatically sent with HTTP requests** to the relevant server.

JavaScript can access some cookies through:

```javascript
// Create a simple cookie that expires after one day.
document.cookie = 'theme=dark; max-age=86400';

// Read cookies available to JavaScript.
console.log(document.cookie);
```

Cookies can be used for:

- Session identifiers
- Authentication
- Preferences
- Tracking
- Other small pieces of state

### Important limitation

Cookies are much smaller than storage mechanisms such as IndexedDB. A common practical limit is around **4 KB per cookie**, including its metadata, rather than several MB.

Unlike `localStorage` and `sessionStorage`, cookies can be sent automatically with matching HTTP requests.
