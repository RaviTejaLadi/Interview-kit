# How do you handle signals and PID 1 in the Node Dockerfile?

**Definition:**
Use exec-form CMD so Node is PID 1, or use `tini`. Node can handle SIGTERM if it is PID 1. Shell form (`CMD node src/index.js` without JSON) often does not forward signals. Pair with `server.close` in the app.

**Key points:**

- JSON-array CMD.
- Optional: `ENTRYPOINT ["/sbin/tini", "--"]`.
- Alpine: `apk add tini`.
- Kubernetes SIGTERM tests: logs should show shutdown.
- Do not start via `npm start` if npm swallows signals — call node directly.

```dockerfile
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "src/index.js"]
```
