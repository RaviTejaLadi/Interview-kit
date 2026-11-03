# How do you monitor Redis in production?

Monitoring Redis means tracking its health, performance, memory usage, and ability to serve requests reliably.

### Key metrics to monitor

| Metric              | Why it matters                                         |
| ------------------- | ------------------------------------------------------ |
| Memory usage        | Detect memory pressure and capacity limits.            |
| CPU usage           | Identify expensive commands or high workload.          |
| Command latency     | Detect slow Redis operations.                          |
| Cache hit ratio     | Measure how often requests find cached data.           |
| Evicted keys        | Detect keys removed because of memory limits.          |
| Connected clients   | Identify connection spikes or leaks.                   |
| Commands per second | Understand workload and traffic changes.               |
| Replication lag     | Detect replicas falling behind the primary.            |
| Persistence status  | Check whether snapshots or AOF operations are healthy. |

Redis exposes many of these metrics through its `INFO` command.&#x20;

### A. Useful Redis CLI commands

Run these commands in a terminal where `redis-cli` is installed and configured to access your Redis instance.

```
# 1. Check whether Redis is responding.
redis-cli PING

# 2. Inspect memory usage.
redis-cli INFO memory

# 3. Inspect command and traffic statistics.
redis-cli INFO stats

# 4. Check primary/replica replication status.
redis-cli INFO replication

# 5. Review commands that took a long time to execute.
redis-cli SLOWLOG GET 10

# 6. Measure Redis response latency from the client machine.
redis-cli --latency
```

Expected response to the first command:

```
PONG
```

For production instances requiring authentication or TLS, use the appropriate connection configuration. Avoid putting passwords directly into shell commands, where they may be exposed in shell history or process information.

### B. Monitor cache hit ratio

You can calculate the cache hit ratio using the `keyspace_hits` and `keyspace_misses` counters from `INFO stats`.

\\[ \text{Hit ratio} = \frac{\text{Hits}}{\text{Hits}+\text{Misses}}\times100 \\]

For example, if Redis reports 8,000 hits and 2,000 misses:

\\[ \frac{8000}{8000+2000}\times100=80\\% \\]

That means 80% of the recorded key lookups were hits.

An 80% hit ratio is not universally good or bad. Compare it against your application's baseline and the cost of fetching data from the underlying database.

### C. Configure latency monitoring

Redis has a built-in latency monitoring subsystem. For example, you can configure it to record events that cross a 100-millisecond threshold.

```
# Set the latency-monitoring threshold to 100 milliseconds.
redis-cli CONFIG SET latency-monitor-threshold 100

# Inspect recent latency events.
redis-cli LATENCY LATEST

# Get a diagnostic report.
redis-cli LATENCY DOCTOR
```

The threshold should reflect your latency objectives. This runtime configuration is not necessarily permanent across restarts; persist the setting using the appropriate configuration mechanism for your deployment.&#x20;

### D. Use a production monitoring dashboard

For a production deployment, combine Redis metrics with application-level monitoring.

Common options include:

- Prometheus + Grafana: Collect and visualize metrics and configure alerts.
- Redis Insight: Inspect keys, execute commands, and explore Redis performance.
- Managed Redis dashboards: Use the metrics and alerting offered by your cloud provider.
- Application monitoring: Track request latency, Redis timeouts, cache hit rates, and database fallback rates.

Set alerts for sustained latency increases, memory pressure, rising evictions, connection exhaustion, replication problems, and failed persistence operations. Define thresholds based on your workload rather than relying on universal numbers.
