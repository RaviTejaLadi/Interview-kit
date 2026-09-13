# What is IndexedDB?

**IndexedDB** is a browser database API designed for storing **larger amounts of structured data** on the client.

Unlike `localStorage`, which stores simple strings, IndexedDB can store structured JavaScript data, including objects and other supported values.

Typical use cases:

- Offline-first applications
- Large datasets
- Caching application data
- Progressive Web Apps (PWAs)
- Complex client-side applications

A simplified example:

```javascript
// Open an IndexedDB database and create an object store on first use.
const request = indexedDB.open('MyApp', 1);

request.onupgradeneeded = () => {
  request.result.createObjectStore('users', {
    keyPath: 'id',
  });
};

request.onsuccess = () => {
  const db = request.result;
  const transaction = db.transaction('users', 'readwrite');
  const users = transaction.objectStore('users');

  users.put({
    id: 1,
    name: 'Ravi',
  });
};
```

IndexedDB is more powerful than Web Storage, but its API is also more complex. Modern applications often use a wrapper library to make IndexedDB easier to work with.
