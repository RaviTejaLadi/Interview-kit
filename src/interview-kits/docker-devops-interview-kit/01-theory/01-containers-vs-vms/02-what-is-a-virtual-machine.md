# What is a virtual machine?

**Definition:**
A VM virtualizes hardware. Each VM runs a guest OS kernel on a hypervisor (KVM, Hyper-V, ESXi). Strong isolation, independent kernels and devices, slower boot, more RAM overhead. Cloud VMs are still the isolation boundary for many multi-tenant workloads.

**Key points:**
- Guest kernel + init system inside each VM.
- Better isolation and different OS per VM (Windows next to Linux).
- Heavier: minutes vs milliseconds to start (order of magnitude).
- You can run containers inside VMs (the usual cloud pattern).
- Hardware-assisted virtualization vs OS-level virtualization (containers).
