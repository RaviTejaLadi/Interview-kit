const guideMarkdownModules = import.meta.glob<string>('../guides/**/*.md', {
  import: 'default',
  query: '?raw',
  eager: true,
});

export type GuideTopic = 'Frontend' | 'Backend' | 'Specific';
export type GuideDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type Guide = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  topic: GuideTopic;
  difficulty: GuideDifficulty;
  readTimeMinutes: number;
  publishedAt: string;
  tags: string[];
  loadContent: () => Promise<string>;
};

type ParsedGuideFile = {
  meta: {
    title: string;
    summary: string;
    topic: GuideTopic;
    difficulty: GuideDifficulty;
    readTimeMinutes: number;
    publishedAt: string;
    tags: string[];
  };
  content: string;
};

const FRONTMATTER_BLOCK = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function parseScalar(value: string) {
  const trimmed = value.trim();
  return trimmed.replace(/^['"]|['"]$/g, '');
}

function parseTopic(value: string): GuideTopic {
  if (value === 'Frontend' || value === 'Backend' || value === 'Specific') {
    return value;
  }

  return 'Specific';
}

function parseDifficulty(value: string): GuideDifficulty {
  if (value === 'Beginner' || value === 'Intermediate' || value === 'Advanced') {
    return value;
  }

  return 'Intermediate';
}

function parseTags(tagsRaw: string | undefined) {
  if (!tagsRaw) {
    return [];
  }

  const trimmed = tagsRaw.trim();
  if (!trimmed) {
    return [];
  }

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    const value = trimmed.slice(1, -1).trim();
    if (!value) {
      return [];
    }

    return value
      .split(',')
      .map((part) => parseScalar(part))
      .filter(Boolean);
  }

  return trimmed
    .split(',')
    .map((part) => parseScalar(part))
    .filter(Boolean);
}

function extractFrontmatter(rawMarkdown: string) {
  const match = rawMarkdown.match(FRONTMATTER_BLOCK);
  if (!match) {
    return {
      frontmatter: '',
      content: rawMarkdown.trim(),
    };
  }

  return {
    frontmatter: match[1] ?? '',
    content: rawMarkdown.replace(FRONTMATTER_BLOCK, '').trim(),
  };
}

function parseFrontmatter(frontmatter: string) {
  const lines = frontmatter.split(/\r?\n/);
  const values: Record<string, string> = {};
  const tags: string[] = [];
  let collectingTags = false;

  for (const line of lines) {
    if (!line.trim()) {
      continue;
    }

    if (collectingTags) {
      const tagMatch = line.match(/^\s*-\s*(.+)\s*$/);
      if (tagMatch) {
        tags.push(parseScalar(tagMatch[1] ?? ''));
        continue;
      }

      collectingTags = false;
    }

    const keyValueMatch = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!keyValueMatch) {
      continue;
    }

    const key = keyValueMatch[1] ?? '';
    const value = keyValueMatch[2] ?? '';

    if (key === 'tags' && !value.trim()) {
      collectingTags = true;
      continue;
    }

    values[key] = value;
  }

  const inlineTags = parseTags(values.tags);
  const allTags = [...inlineTags, ...tags].filter(Boolean);

  return {
    values,
    tags: Array.from(new Set(allTags)),
  };
}

function getSlugFromImportPath(importPath: string) {
  const normalized = importPath.replace(/\\/g, '/');
  const fileName = normalized.split('/').pop() ?? normalized;
  return fileName.replace(/\.md$/i, '');
}

function parseGuideFile(importPath: string, rawMarkdown: string): ParsedGuideFile {
  const slug = getSlugFromImportPath(importPath);
  const { frontmatter, content } = extractFrontmatter(rawMarkdown);
  const { values, tags } = parseFrontmatter(frontmatter);

  const title = parseScalar(values.title ?? '') || slug.replace(/[-_]/g, ' ');
  const summary = parseScalar(values.summary ?? '') || 'Guide content for interview preparation.';
  const topic = parseTopic(parseScalar(values.topic ?? 'Specific'));
  const difficulty = parseDifficulty(parseScalar(values.difficulty ?? 'Intermediate'));
  const readTimeMinutesRaw = Number.parseInt(parseScalar(values.readTimeMinutes ?? '10'), 10);
  const readTimeMinutes = Number.isFinite(readTimeMinutesRaw) ? readTimeMinutesRaw : 10;
  const publishedAt = parseScalar(values.publishedAt ?? '') || '1970-01-01';

  return {
    meta: {
      title,
      summary,
      topic,
      difficulty,
      readTimeMinutes,
      publishedAt,
      tags,
    },
    content,
  };
}

export function buildGuidesIndex() {
  return Object.entries(guideMarkdownModules)
    .filter(([importPath]) => !/\/README\.md$/i.test(importPath))
    .map(([importPath, rawMarkdown]) => {
      const slug = getSlugFromImportPath(importPath);
      const parsed = parseGuideFile(importPath, rawMarkdown);

      return {
        id: slug,
        slug,
        ...parsed.meta,
        loadContent: () => Promise.resolve(parsed.content),
      } satisfies Guide;
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title));
}
