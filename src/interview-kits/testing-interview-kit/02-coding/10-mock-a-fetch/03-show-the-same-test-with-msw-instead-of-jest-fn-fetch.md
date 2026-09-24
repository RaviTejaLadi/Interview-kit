# Show the same test with MSW instead of jest.fn fetch

**Definition:**
MSW intercepts at the network so the client uses real `fetch`. Better when the SUT is a component that you do not want to inject fetch into. Handlers live next to the test or in a shared module.

**Key points:**

- `setupServer` in node for Jest.
- `server.use` to override per test.
- `onUnhandledRequest: 'error'` catches missed calls.
- Still not an E2E test of the real backend.
- Share handlers with Storybook if you want.

```javascript
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('/api/users/:id', ({ params }) => HttpResponse.json({ id: params.id, name: 'Ada' })),
);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('getUser with MSW', async () => {
  await expect(getUser('1')).resolves.toMatchObject({ name: 'Ada' });
});
```
