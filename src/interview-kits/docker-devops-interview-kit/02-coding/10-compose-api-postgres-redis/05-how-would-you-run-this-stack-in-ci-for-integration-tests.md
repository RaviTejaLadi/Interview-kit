# How would you run this stack in CI for integration tests?

**Definition:**
`docker compose up --build -d --wait` (Compose v2 wait for healthy), run tests against `localhost:3000`, then `docker compose down -v` if you do not need the volume. Use a dedicated compose project name and test database name. Do not reuse a developer volume with junk data.

**Key points:**
- `--wait` respects healthchecks.
- `-v` on down wipes volumes — good for CI hermeticity.
- Build cache between CI jobs.
- Publish API to `127.0.0.1` on the runner.
- Collect `compose logs` on failure.

```bash
docker compose -p ci up --build -d --wait
npm test
status=$?
docker compose -p ci logs
docker compose -p ci down -v
exit $status
```
