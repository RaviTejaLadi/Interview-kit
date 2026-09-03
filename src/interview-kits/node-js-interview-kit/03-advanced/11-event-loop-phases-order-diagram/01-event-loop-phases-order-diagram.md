# Event Loop Phases Order Diagram

```text
   ┌───────────────────────┐
┌─>│        Timers         │ setTimeout, setInterval
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     Pending I/O       │ OS deferred callbacks
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     Idle, Prepare     │ Internal
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │         Poll          │ Incoming connections, data reads (Blocks here!)
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │        Check          │ setImmediate
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │    Close Callbacks    │ socket.on('close')
└──┴───────────────────────┘
   * Microtasks (process.nextTick & Promise) run between EVERY phase transition!
```
