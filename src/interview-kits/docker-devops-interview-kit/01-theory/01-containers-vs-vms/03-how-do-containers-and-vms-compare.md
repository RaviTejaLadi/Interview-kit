# How do containers and VMs compare?

**Definition:**
Containers share a kernel and isolate processes; VMs emulate machines and isolate kernels. Containers win at build/ship/start speed and density. VMs win at isolation, mixed OS, and noisy-neighbor boundaries. Production is usually VMs (or bare metal) underneath, containers as the unit of deploy.

**Key points:**
- Security boundary: VM > container (typically).
- Packaging app + libs: container images excel.
- Resource overhead: containers much lower.
- Portability: image vs VM disk image — both exist; Docker Hub made containers easier for apps.
- Interview: 'containers are not VMs' is the opening line — then namespaces vs hypervisor.
