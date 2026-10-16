const guideMarkdownModules = import.meta.glob<string>('../guides/*.md', {
  import: 'default',
  query: '?raw',
});

export type GuideTopic = 'Frontend' | 'Backend';

export type Guide = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  topic: GuideTopic;
  difficulty: 'Intermediate';
  readTimeMinutes: number;
  publishedAt: string;
  tags: string[];
  loadContent: () => Promise<string>;
};

const GUIDE_META: Omit<Guide, 'id' | 'loadContent'>[] = [
  {
    slug: 'react-performance-optimization-guide',
    title: 'React Performance Optimization Guide',
    summary:
      'A practical sequence to identify rendering bottlenecks, reduce bundle cost, and improve interaction speed.',
    topic: 'Frontend',
    difficulty: 'Intermediate',
    readTimeMinutes: 12,
    publishedAt: '2026-10-12',
    tags: ['React', 'Performance', 'Web Vitals', 'Frontend'],
  },
  {
    slug: 'nodejs-api-security-pragmatic-guide',
    title: 'Node.js API Security Pragmatic Guide',
    summary:
      'Production-focused API hardening checklist covering validation, auth, rate limiting, secrets, and monitoring.',
    topic: 'Backend',
    difficulty: 'Intermediate',
    readTimeMinutes: 10,
    publishedAt: '2026-10-13',
    tags: ['Node.js', 'API Security', 'Backend', 'Auth'],
  },
];

export function buildGuidesIndex() {
  return GUIDE_META.map((meta) => {
    const importPath = `../guides/${meta.slug}.md`;
    const loadContent = guideMarkdownModules[importPath];

    if (!loadContent) {
      throw new Error(`Guide markdown module not found: ${importPath}`);
    }

    return {
      ...meta,
      id: meta.slug,
      loadContent,
    } satisfies Guide;
  }).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
