# How does Git use SHA-1 and SHA-256 cryptographic hashing?

Git uses cryptographic hashes to generate **object IDs**.

Historically, Git repositories use **SHA-1** object IDs, which are 160 bits and are normally displayed as **40 hexadecimal characters**.

Modern Git also supports **SHA-256**, which produces a 256-bit object ID represented by **64 hexadecimal characters**.

Conceptually:

```text
Git object content
       ↓
Cryptographic hash
       ↓
Object ID
       ↓
Object stored/referenced using that ID
```

For example, conceptually:

```text
"Hello Git"
     ↓
SHA-1
     ↓
a40...some 40-character object ID
```

The important property is that changing the content changes the hash.

### Why Git benefits from this

Suppose:

```text
Commit B
   ↓
Tree B
   ↓
Blob B
```

If the blob's content changes, its object ID changes.

That changes the tree's content, which changes the tree's ID.

That causes the commit's referenced tree to change, so the commit ID also changes.

This creates a **chain of content integrity**.

> Note: SHA-1 is no longer considered collision-resistant for general cryptographic use, but Git's SHA-1 repository design includes additional protections, and Git also supports SHA-256 repositories.
