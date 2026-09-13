# What is a content-addressable filesystem?

A **content-addressable filesystem (CAF)** identifies data based on the **content itself**, rather than its filename or location.

Git uses this concept for its object database.

For example, imagine a file contains:

```text
Hello Git
```

Git hashes that content:

```text
Hash → a particular SHA-1/SHA-256 object ID
```

The hash becomes the object's address.

If the content changes:

```text
Hello Git
```

to:

```text
Hello Git!
```

the hash changes too.

### Why is this useful?

Git can quickly determine:

- whether two pieces of content are identical
- whether content has changed
- whether an object already exists
- whether repository data has been corrupted

The important idea is:

> **Content → Hash → Object ID**

rather than:

> **Filename → Location → Content**
