# 🐳 Docker & DevOps Interview Questions

# 📚 PART 1 — THEORY QUESTIONS

---

## 1. Containers vs VMs ⭐⭐⭐⭐⭐

1. What is a container?
2. What is a virtual machine?
3. How do containers and VMs compare?
4. What are namespaces and cgroups?
5. What does it mean that containers share the host kernel?
6. What is Docker vs containerd vs Kubernetes?
7. When would you use a VM instead of a container?

---

## 2. Images, Layers & Dockerfile ⭐⭐⭐⭐⭐

1. What is a Docker image vs a container?
2. How do image layers work?
3. What is a Dockerfile?
4. What is the difference between CMD and ENTRYPOINT?
5. What should go in .dockerignore?
6. How do you keep images small and secure?
7. What is an image digest vs a tag?

---

## 3. Volumes & Networks ⭐⭐⭐⭐⭐

1. What are Docker volumes?
2. What is the difference between a bind mount and a named volume?
3. How does the Docker network model work?
4. What is the difference between EXPOSE, ports, and publishing?
5. How do containers resolve each other by hostname?
6. How should you persist a Postgres database in Docker?
7. What are common volume and network pitfalls?

---

## 4. Docker Compose ⭐⭐⭐⭐⭐

1. What is Docker Compose?
2. How does depends_on work?
3. How do you pass environment variables securely?
4. How do Compose override files work?
5. Can you use Compose in production?
6. How do you run one-off commands and jobs?
7. How do you debug a Compose stack?

---

## 5. Multi-Stage Builds ⭐⭐⭐⭐⭐

1. What is a multi-stage Docker build?
2. Why not just delete build tools in the same stage?
3. How do you cache npm/pip/go modules in CI builds?
4. How do multi-stage builds work with native addons?
5. How do you copy from a stage vs from the host?
6. What is a target and how does CI use it?
7. How do you handle secrets during docker build?

---

## 6. CI/CD Pipeline ⭐⭐⭐⭐⭐

1. What is CI vs CD?
2. What does a typical container CI pipeline look like?
3. How should you tag and promote images?
4. Where do you run tests in a Docker pipeline?
5. How do you inject configuration across environments?
6. What is GitOps?
7. How do you handle database migrations in CD?

---

## 7. Kubernetes Pods, Services & Deployments ⭐⭐⭐⭐⭐

1. What is a Pod?
2. What is a Deployment?
3. What is a Service?
4. How do labels and selectors work?
5. What is the difference between a Deployment and a StatefulSet?
6. How does Kubernetes scheduling use requests and limits?
7. What is an Ingress (or Gateway)?

---

## 8. Healthchecks & Rollouts ⭐⭐⭐⭐⭐

1. What is a liveness probe vs a readiness probe?
2. What should /healthz return?
3. How does a rolling update work?
4. What is a Recreate vs RollingUpdate vs blue-green vs canary?
5. How do you roll back a bad deploy?
6. What is a graceful shutdown in containers?
7. How do healthchecks interact with rollouts?

---

# 💻 PART 2 — CODING QUESTIONS

---

## 9. Sample Dockerfile for a Node API ⭐⭐⭐⭐⭐

1. Write a production Dockerfile for a Node HTTP API
2. Add a multi-stage build for a TypeScript Node API
3. How do you handle signals and PID 1 in the Node Dockerfile?
4. What belongs in .dockerignore for this API?
5. How do you add a healthcheck in Dockerfile vs Compose vs Kubernetes?

---

## 10. Compose for API + Postgres + Redis ⭐⭐⭐⭐⭐

1. Write compose.yaml for api, postgres, and redis
2. Why must the API use hostname postgres not localhost?
3. Add a migrate job and a bind mount for local development
4. How do you persist Redis in this stack if you need it?
5. How would you run this stack in CI for integration tests?

---

## 11. Explain a Rolling Update ⭐⭐⭐⭐⭐

1. Write a Deployment YAML that uses RollingUpdate
2. Step through what happens when you change the image
3. What breaking changes make rolling updates unsafe?
4. How do you verify a rollout and roll back?
5. How do maxSurge and maxUnavailable change the rollout?

---
