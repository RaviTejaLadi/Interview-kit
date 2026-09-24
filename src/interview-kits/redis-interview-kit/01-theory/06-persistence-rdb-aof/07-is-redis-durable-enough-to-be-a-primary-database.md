# Is Redis durable enough to be a primary database?

**Definition:**
It can be, with AOF `always` or `everysec`, replicas, backups, and a data model that fits. Many companies still keep the system of record in Postgres and use Redis as a cache/speed layer. If you choose Redis as primary, you own persistence bugs, RPO, and limited query flexibility.

**Key points:**

- Be explicit about RPO/RTO.
- Financial ledgers usually stay in SQL with ACID.
- Redis modules (JSON, Search) expand the case.
- Operational maturity matters more than a yes/no.
- Interview: 'yes with caveats' beats 'never' or 'always'.
