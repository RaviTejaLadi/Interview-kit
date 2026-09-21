# What are Redis Streams?

**Definition:**
Streams are an append-only log (`XADD`) with IDs (`timestamp-seq`). Consumers read with `XREAD` or consumer groups (`XREADGROUP`) that track pending entries, ACK with `XACK`, and claim stuck messages (`XCLAIM`). Streams can be capped (`MAXLEN`). This is Redis's durable-ish queue/event log.

**Key points:**
- History exists until trimmed.
- Consumer groups = competing consumers.
- PEL (pending entries list) tracks un-ACKed messages.
- Use for jobs, event sourcing lite, activity feeds.
- Not Kafka: scale and retention are different leagues, but the API is similar in spirit.

```bash
XADD jobs * type resize imageId 9
XGROUP CREATE jobs workers $ MKSTREAM
XREADGROUP GROUP workers w1 COUNT 10 BLOCK 5000 STREAMS jobs >
```
