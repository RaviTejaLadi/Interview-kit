# What are namespaces and cgroups?

**Definition:**
Namespaces partition what a process can see (PIDs, nets, mounts, UTS hostname, IPC, users). Cgroups limit and account what a process can use (CPU, memory, IO). Together they are the kernel implementation of containers. Docker/containerd set these up for you.

**Key points:**

- PID namespace: `ps` inside shows container processes.
- Net namespace: own interfaces and ports.
- Mount namespace: own root filesystem (pivot_root/chroot-like).
- Memory cgroup OOM-kills the container, not the whole host (ideally).
- You can build a container with `unshare` — Docker is UX + image spec.
