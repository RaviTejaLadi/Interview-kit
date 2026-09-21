# How do maxSurge and maxUnavailable change the rollout?

**Definition:**
`maxSurge: 25%` allows extra pods (need cluster capacity). `maxUnavailable: 25%` allows fewer ready pods (can reduce capacity). `maxUnavailable: 0` with `maxSurge: 1` is the safest for small replica counts if you have spare CPU/RAM. If the cluster cannot schedule surge pods, the rollout stalls.

**Key points:**
- Tiny replica count: use absolute numbers (`1`, `0`) not only percents.
- Percentages round in documented ways — read the spec for 1-replica deploys.
- 1 replica + maxUnavailable 1 = downtime.
- PDB (PodDisruptionBudget) also limits voluntary disruptions.
- Capacity planning includes surge.

```yaml
rollingUpdate:
  maxSurge: 1
  maxUnavailable: 0
```
