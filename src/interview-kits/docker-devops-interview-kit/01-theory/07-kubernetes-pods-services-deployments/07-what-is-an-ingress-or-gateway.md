# What is an Ingress (or Gateway)?

**Definition:**
Ingress (and the newer Gateway API) exposes HTTP(S) routes from outside the cluster to Services: host, path, TLS. An Ingress controller (NGINX, Traefik, cloud ALB) implements the spec. It is not a Service type; it sits in front of ClusterIP services.

**Key points:**
- TLS termination at the edge.
- Path-based routing `/api` vs `/`.
- Cloud load balancers may be created by the controller.
- NetworkPolicy still needed east-west.
- Do not NodePort every microservice to the internet.
