# 6. Error Handling & Process Lifecycle

### Must Know

1. Operational errors vs Programmer errors.
2. What happens if a Promise rejection is unhandled (`unhandledRejection`)?
3. What is `uncaughtException` and why should the process always be terminated after it occurs?
4. What is Graceful Shutdown and why is it mandatory in containerized / Kubernetes environments?
5. What are OS process termination signals: `SIGTERM` vs `SIGINT` vs `SIGKILL`?
6. How do you drain active HTTP connections before calling `process.exit()`?
