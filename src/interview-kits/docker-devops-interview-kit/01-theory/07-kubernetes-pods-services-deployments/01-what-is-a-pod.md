# What is a Pod?

**Definition:**
A Pod is the smallest deployable unit in Kubernetes: one or more containers sharing network namespace and volumes. A Pod has one IP. Sidecars (proxy, log shipper) live in the same pod. Pods are mortal; controllers recreate them.

**Key points:**
- Usually one main container per pod for app servers.
- Shared `localhost` between sidecars.
- Do not treat a pod IP as stable.
- Init containers run first.
- Resource requests/limits belong on containers.
