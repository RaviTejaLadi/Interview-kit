# What is the difference between CMD and ENTRYPOINT?

**Definition:**
`ENTRYPOINT` is the main process; `CMD` supplies default arguments. `docker run image extra` appends to `CMD` if `ENTRYPOINT` is set, or overrides `CMD` if only `CMD` is set. Use exec form `[]` so PID 1 is your app (signals: SIGTERM). Shell form runs via `/bin/sh -c` and can ignore signals.

**Key points:**
- Exec form: `ENTRYPOINT ["node", "server.js"]`.
- PID 1 must reap zombies or use `tini`.
- Kubernetes `command`/`args` map to entrypoint/cmd.
- Do not wrap the app in a shell unless you trap signals.
- One concern per container: the entrypoint is the server, not a pile of services.

```dockerfile
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "src/index.js"]
```
