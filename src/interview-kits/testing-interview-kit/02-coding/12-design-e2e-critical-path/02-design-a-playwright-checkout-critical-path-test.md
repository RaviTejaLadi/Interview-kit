# Design a Playwright checkout critical-path test

**Definition:**
Seed a user and product in a test DB (or API). Open the app, login (or set a session cookie to skip UI login if that is not the path under test), add item, fill shipping, pay with a sandbox gateway or mocked payment route, assert order confirmation id. Isolate from real money.

**Key points:**
- Prefer API seed over UI for unrelated steps.
- Do not E2E-test the payment provider's website — sandbox or mock.
- Unique email per run.
- Trace on failure.
- Assert a business outcome (order id), not only a URL.

```javascript
test('guest can check out a seeded product', async ({ page, request }) => {
  const { sku } = await seedProduct(request);
  await page.goto('/');
  await page.getByRole('link', { name: sku }).click();
  await page.getByRole('button', { name: /add to cart/i }).click();
  await page.getByRole('link', { name: /cart/i }).click();
  await page.getByRole('button', { name: /checkout/i }).click();
  await page.getByLabel(/email/i).fill(`buyer-${Date.now()}@example.test`);
  await page.getByRole('button', { name: /pay with test card/i }).click();
  await expect(page.getByRole('heading', { name: /order confirmed/i })).toBeVisible();
  await expect(page.getByTestId('order-id')).toHaveText(/ord_/i);
});
```
