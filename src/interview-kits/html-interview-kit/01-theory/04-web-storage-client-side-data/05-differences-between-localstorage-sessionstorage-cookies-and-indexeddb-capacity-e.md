# Differences between `localStorage`, `sessionStorage`, Cookies, and `IndexedDB`

| Feature                           | `localStorage`         | `sessionStorage`      | Cookies                       | IndexedDB                        |
| --------------------------------- | ---------------------- | --------------------- | ----------------------------- | -------------------------------- |
| **Type**                          | Key-value storage      | Key-value storage     | Small key-value data          | Database                         |
| **Typical capacity**              | Several MB             | Several MB            | ~4 KB per cookie              | Much larger, quota-dependent     |
| **Expiration**                    | Until removed          | Page/session lifetime | Configurable expiration       | Persistent until deleted/evicted |
| **Sent to server automatically?** | ❌ No                  | ❌ No                 | ✅ Yes, when applicable       | ❌ No                            |
| **Accessible from JS?**           | ✅ Yes                 | ✅ Yes                | ✅ Unless `HttpOnly`          | ✅ Yes                           |
| **Structured data**               | ❌ Strings             | ❌ Strings            | ❌ Strings                    | ✅ Yes                           |
| **Best for**                      | Persistent simple data | Temporary tab data    | Sessions/server communication | Large structured data            |

### Example use cases

```text
localStorage
→ Theme preference
→ Language preference

sessionStorage
→ Temporary form state
→ Current checkout step

Cookies
→ Session ID
→ Authentication cookie

IndexedDB
→ Offline application data
→ Large client-side datasets
```

### Security reminder

None of these should be treated as a general-purpose **secret vault**. Data accessible to JavaScript can potentially be read by malicious JavaScript running in the page.
