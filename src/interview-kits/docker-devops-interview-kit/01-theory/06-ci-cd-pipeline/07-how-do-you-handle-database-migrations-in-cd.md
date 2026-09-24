# How do you handle database migrations in CD?

**Definition:**
Run migrations as a Job/init step with a lock, backward-compatible expand/contract so old and new app versions can coexist during rolling update. Never expand-and-break in one deploy if two versions run together. Backfill data separately. Have a rollback plan that does not require down-migrations if they drop columns.

**Key points:**

- Expand/contract: add column, deploy app, then drop old column later.
- Lock so two deploys do not migrate twice badly — migrations should be idempotent.
- Rolling update means two app versions share one DB.
- Down migrations are often unsafe in prod.
- Take a backup before risky migrations.

> 💡 If they ask 'why did rolling deploy break', the answer is often an incompatible migration.
