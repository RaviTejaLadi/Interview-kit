# When do you choose pub/sub vs streams vs lists?

**Definition:**
Pub/sub: live fan-out, loss OK. Lists: simple queues, `BRPOP`, at-most-once unless you implement reliability yourself. Streams: multiple consumers, replay, ACK, at-least-once with idempotent handlers. Kafka/SQS: when you need long retention, huge throughput, or multi-AZ product guarantees Redis is not providing.

**Key points:**

- Cache busting → pub/sub or keyspace notifications.
- Email worker → stream + group (or a dedicated queue product).
- `LPUSH`/`BRPOP` is the interview 'simple queue'.
- Idempotent consumers for at-least-once streams.
- Do not build Kafka on Redis pub/sub.
