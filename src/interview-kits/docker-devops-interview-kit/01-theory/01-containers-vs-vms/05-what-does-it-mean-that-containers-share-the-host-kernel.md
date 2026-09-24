# What does it mean that containers share the host kernel?

**Definition:**
There is no kernel of your own. You cannot run a Windows container on a Linux kernel (except via a VM). Kernel modules, `/dev`, and syscalls are the host's. A kernel exploit can break out (hence seccomp, AppArmor/SELinux, dropped capabilities, and not running as root).

**Key points:**

- Choose a base image that matches the host kernel family (Linux).
- Syscall filtering (seccomp) reduces attack surface.
- User namespaces map container root to unprivileged host UID.
- Privileged containers (`--privileged`) disable most isolation — avoid.
- Multi-tenant 'hostile' workloads often get a VM per tenant.
