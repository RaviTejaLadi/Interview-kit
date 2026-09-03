const markdownModules = import.meta.glob<string>(
  '../interview-kits/*-interview-kit/**/*.md',
  {
    import: 'default',
    query: '?raw',
  },
);

const kitReadmeModules = import.meta.glob<string>(
  '../interview-kits/*-interview-kit/README.md',
  {
    eager: true,
    import: 'default',
    query: '?raw',
  },
);

export type Topic = {
  id: string;
  title: string;
  section: string;
  topicKey: string | null;
  topicTitle: string | null;
  path: string;
  kitKey: string;
  kitLabel: string;
  starRating: number | null;
  loadContent: () => Promise<string>;
};

export type TopicGroup = {
  id: string;
  label: string;
  topics: Topic[];
};

const KIT_ORDER = [
  'javascript-interview-kit',
  'react-interview-kit',
  'html-interview-kit',
  'css-interview-kit',
  'tailwind-interview-kit',
  'next-js-interview-kit',
  'node-js-interview-kit',
  'mongo-db-interview-kit',
  'git-interview-kit',
  'hr-interview-kit',
];

const KIT_LABELS: Record<string, string> = {
  'javascript-interview-kit': 'JavaScript',
  'react-interview-kit': 'React',
  'html-interview-kit': 'HTML',
  'css-interview-kit': 'CSS',
  'tailwind-interview-kit': 'Tailwind CSS',
  'next-js-interview-kit': 'Next.js',
  'node-js-interview-kit': 'Node.js',
  'mongo-db-interview-kit': 'MongoDB',
  'git-interview-kit': 'Git',
  'hr-interview-kit': 'HR Round',
};

function toTitleCase(value: string) {
  return value
    .replace(/^\d+[-_]?/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

type KitStarRatings = {
  byNumber: Map<number, number>;
  bySlug: Map<string, number>;
};

function toRatingSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/⭐/g, '')
    .replace(/`/g, '')
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseLeadingNumber(fileName: string) {
  const match = fileName.match(/^(\d+)/);
  return match ? Number(match[1]) : null;
}

function parseReadmeStarRatings(markdown: string): KitStarRatings {
  const byNumber = new Map<number, number>();
  const bySlug = new Map<string, number>();
  const headingRe = /^##\s+(\d+)\.\s+(.+)$/gm;

  for (const match of markdown.matchAll(headingRe)) {
    const sectionNumber = Number(match[1]);
    const heading = match[2].trim();
    const starCount = (heading.match(/⭐/g) ?? []).length;

    if (!sectionNumber || starCount === 0) {
      continue;
    }

    const titleSlug = toRatingSlug(heading);
    byNumber.set(sectionNumber, starCount);
    bySlug.set(titleSlug, starCount);
  }

  return { byNumber, bySlug };
}

function getReadmeRatingsByKit() {
  const ratingsByKit = new Map<string, KitStarRatings>();

  for (const [importPath, markdown] of Object.entries(kitReadmeModules)) {
    const kitKey = importPath.replace('../interview-kits/', '').split('/')[0];
    if (!kitKey) {
      continue;
    }

    ratingsByKit.set(kitKey, parseReadmeStarRatings(markdown));
  }

  return ratingsByKit;
}

function getStarRatingForFile(kitKey: string, fileName: string, ratingsByKit: Map<string, KitStarRatings>) {
  const kitRatings = ratingsByKit.get(kitKey);
  if (!kitRatings) {
    return null;
  }

  const topicNumber = parseLeadingNumber(fileName);
  if (topicNumber !== null) {
    const ratingByNumber = kitRatings.byNumber.get(topicNumber);
    if (ratingByNumber != null) {
      return ratingByNumber;
    }
  }

  const fileSlug = toRatingSlug(fileName.replace(/^\d+[-_]?/, ''));
  return kitRatings.bySlug.get(fileSlug) ?? null;
}

function parseTopic(
  importPath: string,
  loadContent: () => Promise<string>,
  ratingsByKit: Map<string, KitStarRatings>,
): Topic | null {
  const relativePath = importPath.replace('../interview-kits/', '');
  const parts = relativePath.split('/');
  const lastPart = parts[parts.length - 1];
  const fileName = lastPart ? lastPart.replace('.md', '') : 'Untitled';
  const kitKey = parts[0] ?? 'unknown-kit';
  const isKitRootFile = parts.length <= 2;

  if (fileName.toLowerCase() === 'readme' && !isKitRootFile) {
    return null;
  }

  const sectionKey = parts.length > 2 ? parts[1] : null;
  const topicKey = parts.length > 3 ? (parts[2] ?? null) : null;
  const ratingFileName = topicKey ?? fileName;
  const section = sectionKey ? toTitleCase(sectionKey) : 'General';
  const questionNumber = topicKey ? parseLeadingNumber(fileName) : null;
  const displayName = toTitleCase(fileName);
  const title =
    fileName.toLowerCase() === 'readme'
      ? 'Overview'
      : questionNumber !== null
        ? `${questionNumber}. ${displayName}`
        : displayName;

  return {
    id: relativePath,
    title,
    section,
    topicKey,
    topicTitle: topicKey ? toTitleCase(topicKey) : null,
    path: relativePath,
    kitKey,
    kitLabel: KIT_LABELS[kitKey] ?? toTitleCase(kitKey),
    starRating: getStarRatingForFile(kitKey, ratingFileName, ratingsByKit),
    loadContent,
  };
}

export function buildTopicIndex() {
  const ratingsByKit = getReadmeRatingsByKit();
  const allTopics = Object.entries(markdownModules)
    .map(([path, loadContent]) => parseTopic(path, loadContent, ratingsByKit))
    .filter((topic): topic is Topic => topic !== null)
    .sort((a, b) => a.path.localeCompare(b.path));

  const grouped = allTopics.reduce((acc, topic) => {
    if (!acc.has(topic.kitKey)) {
      acc.set(topic.kitKey, {
        id: topic.kitKey,
        label: topic.kitLabel,
        topics: [],
      });
    }

    const group = acc.get(topic.kitKey);
    if (group) {
      group.topics.push(topic);
    }
    return acc;
  }, new Map<string, TopicGroup>());

  const groups = Array.from(grouped.values()).sort((a, b) => {
    const indexA = KIT_ORDER.indexOf(a.id);
    const indexB = KIT_ORDER.indexOf(b.id);
    const orderA = indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA;
    const orderB = indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB;
    return orderA - orderB || a.label.localeCompare(b.label);
  });

  return { allTopics, groups };
}

function isInternalMarkdownHref(href: string) {
  const trimmed = href.trim();
  if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('mailto:') || trimmed.startsWith('tel:')) {
    return false;
  }

  return !/^[a-z][a-z0-9+.-]*:/i.test(trimmed);
}

function resolveRelativePath(fromFile: string, href: string) {
  const pathOnly = decodeURIComponent(href.split('#')[0]?.split('?')[0] ?? '').replace(/\\/g, '/');
  if (!pathOnly) {
    return null;
  }

  const baseSegments = fromFile.replace(/\\/g, '/').split('/').slice(0, -1);
  const hrefSegments = pathOnly.split('/');
  const segments = pathOnly.startsWith('/') ? [] : [...baseSegments];

  for (const segment of hrefSegments) {
    if (!segment || segment === '.') {
      continue;
    }

    if (segment === '..') {
      segments.pop();
      continue;
    }

    segments.push(segment);
  }

  return segments.join('/');
}

export function resolveTopicFromHref(currentPath: string, href: string, topics: Topic[]) {
  if (!isInternalMarkdownHref(href)) {
    return null;
  }

  const resolved = resolveRelativePath(currentPath, href);
  if (!resolved) {
    return null;
  }

  const normalized = resolved.replace(/\/+$/, '');
  const candidates = [resolved, normalized, `${normalized}.md`];

  for (const candidate of candidates) {
    const exact = topics.find((topic) => topic.path === candidate || topic.id === candidate);
    if (exact) {
      return exact;
    }
  }

  const nested = topics.filter(
    (topic) => topic.path === normalized || topic.path.startsWith(`${normalized}/`),
  );

  return nested[0] ?? null;
}
