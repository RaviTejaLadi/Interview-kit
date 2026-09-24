# How do containers resolve each other by hostname?

**Definition:**
On a Compose/user-defined network, Docker's internal DNS maps service names to container IPs. Scale-out can give multiple A records. IPs change when containers recreate — always use names, never hardcode IPs. In Kubernetes, Services provide a stable virtual IP and DNS (`api.default.svc.cluster.local`).

**Key points:**

- Compose service name = hostname.
- Networks must be shared.
- Custom aliases: `networks.default.aliases`.
- Split DNS in corporate environments can break this — know it.
- Health vs DNS: DNS can return an IP before the app listens — use healthchecks/retries.
