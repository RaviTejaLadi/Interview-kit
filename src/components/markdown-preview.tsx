import { useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown, { type Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark';

const markdownHierarchy = {
  section: 'pl-3 md:pl-4',
  subsection: 'pl-5 md:pl-6',
  body: "pl-7 md:pl-8",
  nestedList: 'pl-11 md:pl-12',
};

// Stable per-language accent so the same language always gets the same color.
const LANGUAGE_COLORS: Record<string, { dot: string; text: string }> = {
  js: { dot: 'bg-yellow-400', text: 'text-yellow-500' },
  javascript: { dot: 'bg-yellow-400', text: 'text-yellow-500' },
  jsx: { dot: 'bg-cyan-400', text: 'text-cyan-500' },
  ts: { dot: 'bg-blue-400', text: 'text-blue-500' },
  typescript: { dot: 'bg-blue-400', text: 'text-blue-500' },
  tsx: { dot: 'bg-sky-400', text: 'text-sky-500' },
  python: { dot: 'bg-emerald-400', text: 'text-emerald-500' },
  py: { dot: 'bg-emerald-400', text: 'text-emerald-500' },
  bash: { dot: 'bg-slate-400', text: 'text-slate-500' },
  sh: { dot: 'bg-slate-400', text: 'text-slate-500' },
  json: { dot: 'bg-amber-400', text: 'text-amber-500' },
  html: { dot: 'bg-orange-400', text: 'text-orange-500' },
  css: { dot: 'bg-violet-400', text: 'text-violet-500' },
  sql: { dot: 'bg-fuchsia-400', text: 'text-fuchsia-500' },
  rust: { dot: 'bg-orange-500', text: 'text-orange-600' },
  go: { dot: 'bg-cyan-500', text: 'text-cyan-600' },
  yaml: { dot: 'bg-rose-400', text: 'text-rose-500' },
  yml: { dot: 'bg-rose-400', text: 'text-rose-500' },
  markdown: { dot: 'bg-indigo-400', text: 'text-indigo-500' },
  md: { dot: 'bg-indigo-400', text: 'text-indigo-500' },
};

function getLanguageColor(language?: string) {
  if (!language) return { dot: 'bg-primary/60', text: 'text-muted-foreground' };
  return LANGUAGE_COLORS[language.toLowerCase()] ?? { dot: 'bg-primary/60', text: 'text-primary' };
}

function CodeBlock({
  codeText,
  language,
  isDarkTheme,
}: {
  codeText: string;
  language?: string;
  isDarkTheme: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const langColor = getLanguageColor(language);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — fail silently
    }
  };

  return (
    <div
      className={cn(
        'my-6 overflow-hidden rounded-lg border shadow-md',
        "ml-7 md:ml-8",
        isDarkTheme ? 'border-slate-700/60' : 'border-slate-200',
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between border-b px-4 py-1.5 text-xs font-medium',
          isDarkTheme
            ? 'border-slate-700/60 bg-gradient-to-r from-slate-800 to-slate-800/70 text-slate-400'
            : 'border-slate-200 bg-gradient-to-r from-slate-100 to-slate-50 text-slate-500',
        )}
      >
        <span className="flex items-center gap-2">
          <span className={cn('h-2 w-2 rounded-full', langColor.dot)} />
          <span className={cn('font-mono tracking-wide uppercase', langColor.text)}>
            {language ?? 'text'}
          </span>
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            'flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors',
            copied
              ? 'text-emerald-500'
              : isDarkTheme
                ? 'text-slate-400 hover:bg-slate-700/60 hover:text-slate-200'
                : 'text-slate-500 hover:bg-slate-200/70 hover:text-slate-700',
          )}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language ?? 'text'}
        PreTag="div"
        style={isDarkTheme ? oneDark : oneLight}
        wrapLongLines
        showLineNumbers={codeText.split('\n').length > 5}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          padding: '1rem 1.1rem',
          fontSize: '13px',
          lineHeight: '1.7',
          background: isDarkTheme ? '#0b1120' : '#fafbfc',
        }}
        lineNumberStyle={{
          minWidth: '2.25em',
          paddingRight: '1em',
          color: isDarkTheme ? '#475569' : '#cbd5e1',
          userSelect: 'none',
        }}
        codeTagProps={{
          style: {
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
          },
        }}
      >
        {codeText}
      </SyntaxHighlighter>
    </div>
  );
}

function createMarkdownComponents(theme: Theme): Components {
  const isDarkTheme = theme === 'dark';

  return {
    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          'mt-2 mb-6 scroll-m-20 border-b-2 border-primary/50 pb-3 text-3xl font-bold tracking-tight text-foreground first:mt-0 md:text-4xl',
          'bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent',
          className,
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          'mt-10 mb-4 scroll-m-20 border-l-4 border-primary text-2xl font-semibold tracking-tight text-foreground first:mt-0',
          markdownHierarchy.section,
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          'mt-8 mb-3 scroll-m-20 border-l-2 border-violet-400 text-xl font-semibold tracking-tight text-foreground',
          markdownHierarchy.subsection,
          className,
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn(
          'mt-6 mb-2 scroll-m-20 border-l border-sky-400 text-lg font-semibold text-foreground',
          markdownHierarchy.body,
          className,
        )}
        {...props}
      />
    ),
    h5: ({ className, ...props }) => (
      <h5
        className={cn(
          'mt-5 mb-2 scroll-m-20 text-base font-semibold text-foreground/95',
          markdownHierarchy.body,
          className,
        )}
        {...props}
      />
    ),
    h6: ({ className, ...props }) => (
      <h6
        className={cn(
          'mt-4 mb-2 scroll-m-20 text-sm font-semibold tracking-wide text-fuchsia-500/80 uppercase',
          markdownHierarchy.body,
          className,
        )}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p
        className={cn(
          'not-first:mt-4 leading-7 text-foreground/90',
          markdownHierarchy.body,
          className,
        )}
        {...props}
      />
    ),
    strong: ({ className, ...props }) => (
      <strong className={cn('font-semibold text-foreground', className)} {...props} />
    ),
    em: ({ className, ...props }) => (
      <em className={cn('italic text-violet-500 dark:text-violet-300', className)} {...props} />
    ),
    del: ({ className, ...props }) => (
      <del className={cn('text-rose-400/80 line-through', className)} {...props} />
    ),
    ul: ({ className, ...props }) => (
      <ul
        className={cn(
          'my-4 list-disc space-y-2 text-foreground/90 marker:text-primary',
          markdownHierarchy.nestedList,
          '[&_ul]:mt-2 [&_ul]:list-[circle] [&_ul]:pl-6 [&_ul]:md:pl-7 [&_ul]:marker:text-violet-400 [&_ol]:mt-2 [&_ol]:pl-6 [&_ol]:md:pl-7',
          className,
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn(
          'my-4 list-decimal space-y-2 text-foreground/90 marker:font-semibold marker:text-primary',
          markdownHierarchy.nestedList,
          '[&_ol]:mt-2 [&_ol]:pl-6 [&_ol]:md:pl-7 [&_ul]:mt-2 [&_ul]:list-[circle] [&_ul]:pl-6 [&_ul]:md:pl-7 [&_ul]:marker:text-violet-400',
          className,
        )}
        {...props}
      />
    ),
    li: ({ className, children, ...props }) => (
      <li
        className={cn(
          'pl-1 leading-7 text-foreground/90 [&>p]:mt-0 [&>p]:pl-0',
          'has-[>input]:list-none has-[>input]:-ml-6',
          className,
        )}
        {...props}
      >
        {children}
      </li>
    ),
    input: ({ className, type, checked, ...props }) =>
      type === 'checkbox' ? (
        <input
          type="checkbox"
          checked={checked}
          className={cn(
            'mr-2 h-4 w-4 translate-y-0.5 cursor-default rounded border-border align-middle',
            'accent-emerald-500',
            className,
          )}
          {...props}
        />
      ) : (
        <input type={type} className={className} {...props} />
      ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          'my-6 rounded-r-md border-l-4 border-amber-400 bg-gradient-to-r from-amber-400/10 to-transparent px-4 py-3 text-foreground/85 italic',
          '[&>p]:not-first:mt-2',
          markdownHierarchy.body,
          className,
        )}
        {...props}
      />
    ),
    hr: ({ className, ...props }) => (
      <hr
        className={cn(
          'my-8 h-[2px] border-0 bg-gradient-to-r from-primary/60 via-violet-400/60 to-transparent',
          markdownHierarchy.body,
          className,
        )}
        {...props}
      />
    ),
    a: ({ className, href, rel, target, children, ...props }) => {
      const isAnchorLink = href?.startsWith('#');

      return (
        <a
          href={href}
          target={isAnchorLink ? target : (target ?? '_blank')}
          rel={isAnchorLink ? rel : (rel ?? 'noreferrer noopener')}
          className={cn(
            'font-medium text-sky-500 underline decoration-sky-400/50 underline-offset-4 transition-colors hover:text-sky-600 hover:decoration-sky-500 dark:text-sky-400 dark:hover:text-sky-300',
            className,
          )}
          {...props}
        >
          {children}
        </a>
      );
    },
    table: ({ className, ...props }) => (
      <div
        className={cn(
          'my-6 overflow-x-auto rounded-lg ml-7 md:ml-8 border border-border/70 bg-card/70 shadow-md',
        )}
      >
        <table className={cn('w-full min-w-xl border-collapse text-sm', className)} {...props} />
      </div>
    ),
    thead: ({ className, ...props }) => (
      <thead
        className={cn(
          'bg-gradient-to-r from-primary/15 via-violet-400/10 to-transparent',
          className,
        )}
        {...props}
      />
    ),
    tbody: ({ className, ...props }) => (
      <tbody className={cn('divide-y divide-border/60', className)} {...props} />
    ),
    tr: ({ className, ...props }) => (
      <tr
        className={cn('transition-colors even:bg-muted/20 hover:bg-primary/5', className)}
        {...props}
      />
    ),
    th: ({ className, style, ...props }) => (
      <th
        className={cn(
          'border-b-2 border-primary/40 px-4 py-2.5 text-left text-sm font-semibold whitespace-nowrap text-foreground',
          className,
        )}
        style={style}
        {...props}
      />
    ),
    td: ({ className, style, ...props }) => (
      <td
        className={cn('px-4 py-2.5 align-top text-foreground/88', className)}
        style={style}
        {...props}
      />
    ),
    img: ({ className, alt, ...props }) => (
      <span className={cn('my-6 block', markdownHierarchy.body)}>
        <img
          className={cn(
            'max-w-full rounded-md border border-border/70 shadow-md ring-1 ring-primary/10',
            className,
          )}
          alt={alt ?? 'Markdown image'}
          loading="lazy"
          {...props}
        />
        {alt ? (
          <span className="mt-2 block text-center text-xs text-muted-foreground">{alt}</span>
        ) : null}
      </span>
    ),
    pre: ({ children }) => <>{children}</>,
    code: ({ className, children, ...props }) => {
      const codeText = String(children).replace(/\n$/, '');
      const languageMatch = /language-([\w-]+)/.exec(className ?? '');
      const language = languageMatch?.[1];
      const isBlock = Boolean(language || codeText.includes('\n'));

      if (isBlock) {
        return <CodeBlock codeText={codeText} language={language} isDarkTheme={isDarkTheme} />;
      }

      return (
        <code
          className={cn(
            'rounded-md border px-1.5 py-0.5 font-mono text-[0.85em] font-medium',
            isDarkTheme
              ? 'border-fuchsia-800/50 bg-fuchsia-950/40 text-fuchsia-300'
              : 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-600',
            className,
          )}
          {...props}
        >
          {children}
        </code>
      );
    },
  };
}

type MarkdownPreviewProps = {
  content: string;
  theme: Theme;
};

export function MarkdownPreview({ content, theme }: MarkdownPreviewProps) {
  const markdownComponents = useMemo(() => createMarkdownComponents(theme), [theme]);

  return (
    <div className="markdown-body markdown-preview max-w-none break-words">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
