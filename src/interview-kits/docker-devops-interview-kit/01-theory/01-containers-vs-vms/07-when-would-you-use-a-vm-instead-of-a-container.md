# When would you use a VM instead of a container?

**Definition:**
Strong multi-tenant isolation, a different OS, GPU passthrough simplicity, lifting a full stateful machine, or compliance that requires VM boundaries. Nested: run containers in VMs for defense in depth (GKE, EKS node model).

**Key points:**

- Untrusted code execution sandboxes often use VMs (Firecracker microVMs).
- Legacy apps that assume they own the machine.
- Kernel-level features you cannot have in a shared kernel.
- Most microservices: container on a VM node.
- This is not either/or in the cloud.
