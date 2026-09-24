# What is a graceful shutdown in containers?

**Definition:**
Kubernetes sends SIGTERM, waits `terminationGracePeriodSeconds`, then SIGKILL. The app should stop taking new requests, drain in-flight work, close DB pools, then exit 0. `preStop` hooks can delay SIGTERM until the Service endpoints are updated (sleep 2–5s) to avoid race with kube-proxy.

**Key points:**

- Node must not ignore SIGTERM (shell form PID 1 problem).
- HTTP server `close()` after SIGTERM.
- Long WebSockets need a plan.
- Jobs: checkpoint or make work idempotent.
- If you exit immediately, in-flight requests 502.

```javascript
process.on('SIGTERM', () => {
  server.close(() => {
    db.end().then(() => process.exit(0));
  });
});
```
