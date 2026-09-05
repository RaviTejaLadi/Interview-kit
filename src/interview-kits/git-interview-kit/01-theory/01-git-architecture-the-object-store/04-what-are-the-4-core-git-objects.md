# What are the 4 core Git Objects?

Git's object database is built around four object types:

1. **Blob**
2. **Tree**
3. **Commit**
4. **Tag**

> Small correction to your wording: an **annotated tag is a Git object**, but it is not necessarily a “permanent reference” in the same sense as a branch. A tag reference can be moved or deleted, although an annotated tag object itself is immutable once created.

---

## 4.1 Blob

A **blob** stores the raw contents of a file.

It does **not** store the filename.

For example:

```text
hello.txt
    ↓
"Hello Git"
    ↓
   Blob
```

The filename is stored by a **tree**, not by the blob.

You can inspect objects with:

```bash
# Show the object type and content associated with a Git object ID.
git cat-file -t <object-id>
git cat-file -p <object-id>
```

---

## 4.2 Tree

A **tree** represents a directory.

It maps:

```text
filename → blob
```

and can also point to other trees representing subdirectories.

For example:

```text
Tree
├── index.html → Blob
├── app.js     → Blob
└── src/       → Tree
                 └── Button.js → Blob
```

So a tree provides the **directory structure and filenames**.

---

## 4.3 Commit

A **commit** represents a snapshot of the project and metadata about that snapshot.

A commit points to a **root tree** and can point to one or more parent commits.

Conceptually:

```text
Commit
├── tree → Root Tree
├── parent → Previous Commit
├── author
├── committer
└── commit message
```

For a normal commit:

```text
Commit B
   │
   ├── tree → Project snapshot
   │
   └── parent → Commit A
```

A merge commit can have **multiple parents**.

---

## 4.4 Annotated Tag

An **annotated tag** is a Git object that stores information about a tag.

It can point to another Git object, commonly a commit.

It can contain:

* tag name
* tagger
* message
* referenced object
* optional cryptographic signature

For example:

```text
Annotated Tag
      │
      ↓
   Commit
      │
      ↓
   Tree
```

You commonly create one with:

```bash
# Create an annotated release tag.
git tag -a v1.0.0 -m "Version 1.0.0"
```

### Object relationship

The four objects can be visualized as:

```text
              Annotated Tag
                    │
                    ↓
                  Commit
                    │
                    ↓
                  Tree
                /      \
               ↓        ↓
            Blob      Tree
                       │
                       ↓
                     Blob
```

This object model is one of the most important concepts for understanding Git internals.