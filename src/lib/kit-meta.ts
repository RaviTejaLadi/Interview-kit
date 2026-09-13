import cssKitIcon from '../../assets/kits-svgs/css.svg';
import gitKitIcon from '../../assets/kits-svgs/git.svg';
import hrKitIcon from '../../assets/kits-svgs/hr.svg';
import htmlKitIcon from '../../assets/kits-svgs/html.svg';
import javascriptKitIcon from '../../assets/kits-svgs/javascript.svg';
import mongodbKitIcon from '../../assets/kits-svgs/mongodb.svg';
import nextjsKitIcon from '../../assets/kits-svgs/nextjs.svg';
import nodejsKitIcon from '../../assets/kits-svgs/nodejs.svg';
import reactKitIcon from '../../assets/kits-svgs/react.svg';
import tailwindKitIcon from '../../assets/kits-svgs/tailwind.svg';

export const KIT_DISPLAY_ORDER = [
  'html-interview-kit',
  'css-interview-kit',
  'tailwind-interview-kit',
  'javascript-interview-kit',
  'react-interview-kit',
  'next-js-interview-kit',
  'node-js-interview-kit',
  'mongo-db-interview-kit',
  'git-interview-kit',
  'hr-interview-kit',
] as const;

export const KIT_ICON_BY_KEY: Record<string, string> = {
  'javascript-interview-kit': javascriptKitIcon,
  'react-interview-kit': reactKitIcon,
  'html-interview-kit': htmlKitIcon,
  'css-interview-kit': cssKitIcon,
  'tailwind-interview-kit': tailwindKitIcon,
  'next-js-interview-kit': nextjsKitIcon,
  'node-js-interview-kit': nodejsKitIcon,
  'mongo-db-interview-kit': mongodbKitIcon,
  'git-interview-kit': gitKitIcon,
  'hr-interview-kit': hrKitIcon,
};

export const KIT_DESCRIPTIONS: Record<string, string> = {
  'html-interview-kit': 'Semantic markup, accessibility, and how the browser loads pages.',
  'css-interview-kit': 'Layout, responsive design, specificity, and modern CSS features.',
  'tailwind-interview-kit': 'Utility-first styling, theme tokens, and reusable UI patterns.',
  'javascript-interview-kit': 'Language fundamentals, async behavior, and coding challenges.',
  'react-interview-kit': 'Components, hooks, rendering, and interview-style React problems.',
  'next-js-interview-kit': 'App Router, server components, caching, and data mutations.',
  'node-js-interview-kit': 'Runtime internals, APIs, streams, and backend interview problems.',
  'mongo-db-interview-kit': 'Schema design, indexing, aggregation, and database operations.',
  'git-interview-kit': 'Version control workflows, branching, and recovery commands.',
  'hr-interview-kit': 'Behavioral stories, company fit, and interview logistics.',
};

export const KIT_CARD_ACCENT: Record<
  string,
  {
    iconWrap: string;
    hover: string;
  }
> = {
  'html-interview-kit': {
    iconWrap: 'bg-orange-50 dark:bg-orange-400/10',
    hover: 'hover:border-orange-400/50 hover:shadow-orange-500/10',
  },
  'css-interview-kit': {
    iconWrap: 'bg-blue-50 dark:bg-blue-400/10',
    hover: 'hover:border-blue-400/50 hover:shadow-blue-500/10',
  },
  'tailwind-interview-kit': {
    iconWrap: 'bg-cyan-50 dark:bg-cyan-400/10',
    hover: 'hover:border-cyan-400/50 hover:shadow-cyan-500/10',
  },
  'javascript-interview-kit': {
    iconWrap: 'bg-amber-50 dark:bg-amber-400/10',
    hover: 'hover:border-amber-400/50 hover:shadow-amber-500/10',
  },
  'react-interview-kit': {
    iconWrap: 'bg-sky-50 dark:bg-sky-400/10',
    hover: 'hover:border-sky-400/50 hover:shadow-sky-500/10',
  },
  'next-js-interview-kit': {
    iconWrap: 'bg-slate-100 dark:bg-slate-400/10',
    hover: 'hover:border-slate-400/50 hover:shadow-slate-500/10',
  },
  'node-js-interview-kit': {
    iconWrap: 'bg-emerald-50 dark:bg-emerald-400/10',
    hover: 'hover:border-emerald-400/50 hover:shadow-emerald-500/10',
  },
  'mongo-db-interview-kit': {
    iconWrap: 'bg-green-50 dark:bg-green-400/10',
    hover: 'hover:border-green-400/50 hover:shadow-green-500/10',
  },
  'git-interview-kit': {
    iconWrap: 'bg-rose-50 dark:bg-rose-400/10',
    hover: 'hover:border-rose-400/50 hover:shadow-rose-500/10',
  },
  'hr-interview-kit': {
    iconWrap: 'bg-violet-50 dark:bg-violet-400/10',
    hover: 'hover:border-violet-400/50 hover:shadow-violet-500/10',
  },
};

export function sortKitsByDisplayOrder<T extends { id: string }>(kits: T[]) {
  return [...kits].sort((a, b) => {
    const indexA = KIT_DISPLAY_ORDER.indexOf(a.id as (typeof KIT_DISPLAY_ORDER)[number]);
    const indexB = KIT_DISPLAY_ORDER.indexOf(b.id as (typeof KIT_DISPLAY_ORDER)[number]);
    const orderA = indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA;
    const orderB = indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB;
    return orderA - orderB;
  });
}
