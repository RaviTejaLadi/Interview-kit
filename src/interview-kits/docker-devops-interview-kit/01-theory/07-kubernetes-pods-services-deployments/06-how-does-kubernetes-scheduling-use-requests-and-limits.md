# How does Kubernetes scheduling use requests and limits?

**Definition:**
Requests are what the scheduler uses to place the pod (guaranteed resources). Limits cap usage; exceeding memory limit OOMKills. CPU limits throttle. If you set limits without requests, defaults may surprise you. QoS classes: Guaranteed, Burstable, BestEffort.

**Key points:**
- Memory limit too low = crash loop.
- CPU limit too low = latency.
- Overcommit CPU more than memory typically.
- HPA often scales on CPU utilization vs requests.
- Right-size from observability, not guesses forever.
