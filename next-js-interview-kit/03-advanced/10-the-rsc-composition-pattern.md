# 10. The RSC Composition Pattern



```tsx
// ✅ Correct Pattern: Pass Server Component as children to Client Component
// app/page.tsx (Server Component)
import ClientWrapper from './ClientWrapper';
import ServerContent from './ServerContent';

export default function Page() {
  return (
    <ClientWrapper>
      <ServerContent /> {/* Renders on server, passed as JSX child */}
    </ClientWrapper>
  );
}
```
