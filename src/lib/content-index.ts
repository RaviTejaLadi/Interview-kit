const markdownModules = import.meta.glob<string>(
  '../interview-kits/*-interview-kit/**/*.md',
  {
  import: 'default',
  query: '?raw',
  },
);

export type Topic = {
  id: string;
  title: string;
  section: string;
  path: string;
  kitKey: string;
  kitLabel: string;
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

function parseTopic(importPath: string, loadContent: () => Promise<string>): Topic {
  const relativePath = importPath.replace('../interview-kits/', '');
  const parts = relativePath.split('/');
  const lastPart = parts[parts.length - 1];
  const fileName = lastPart ? lastPart.replace('.md', '') : 'Untitled';
  const kitKey = parts[0] ?? 'unknown-kit';
  const section = parts[1] ? toTitleCase(parts[1]) : 'General';
  const title = fileName.toLowerCase() === 'readme' ? 'Overview' : toTitleCase(fileName);

  return {
    id: relativePath,
    title,
    section,
    path: relativePath,
    kitKey,
    kitLabel: KIT_LABELS[kitKey] ?? toTitleCase(kitKey),
    loadContent,
  };
}

export function buildTopicIndex() {
  const allTopics = Object.entries(markdownModules)
    .map(([path, loadContent]) => parseTopic(path, loadContent))
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
