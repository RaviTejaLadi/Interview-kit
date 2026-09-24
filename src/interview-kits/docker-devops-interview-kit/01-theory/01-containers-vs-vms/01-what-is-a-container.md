# What is a container?

**Definition:**
A container is a process (or process tree) isolated with Linux namespaces and cgroups, packaged with its filesystem via an image. It shares the host kernel. Docker popularized the developer workflow (image, container, registry) around these kernel features.

**Key points:**

- Isolation: PID, network, mount, user namespaces.
- Limits: CPU/memory via cgroups.
- Image = layered filesystem + config (entrypoint, env).
- Faster start and denser packing than VMs because there is no guest kernel.
- Isolation is weaker than a hypervisor — kernel CVEs affect all containers on the host.
