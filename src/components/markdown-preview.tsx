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
  section: 'pl-2.5 md:pl-3',
  subsection: 'pl-4 md:pl-5',
  body: 'pl-5 md:pl-6',
  nestedList: 'pl-8 md:pl-9',
};

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — fail silently
    }
  };

  return (
    <div
      className={cn(
        'my-3 overflow-hidden group rounded-md border shadow-sm relative',
        'ml-5 md:ml-6',
        isDarkTheme ? 'border-slate-700/60' : 'border-slate-200',
      )}
    >
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          'group-hover:opacity-100 opacity-0 absolute top-2 right-2 rounded px-1.5 py-1 text-[11px] font-medium transition-colors',
          copied
            ? 'text-emerald-500'
            : isDarkTheme
              ? 'text-slate-400 hover:bg-slate-700/60 hover:text-slate-200'
              : 'text-slate-500 hover:bg-slate-200/70 hover:text-slate-700',
        )}
        aria-label="Copy code"
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      </button>

      <SyntaxHighlighter
        language={language ?? 'text'}
        PreTag="div"
        style={isDarkTheme ? oneDark : oneLight}
        wrapLongLines
        showLineNumbers={false}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          padding: '0.7rem 0.85rem',
          fontSize: '12px',
          lineHeight: '1.55',
          background: isDarkTheme ? '#0b1120' : '#fafbfc',
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
          'mt-1 mb-3 scroll-m-20 border-b-2 border-primary/50 pb-2 text-xl font-bold tracking-tight first:mt-0 md:text-2xl',
          'bg-linear-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent',
          className,
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          'mt-5 mb-2 scroll-m-20 border-l-4 border-primary text-lg font-semibold tracking-tight text-foreground first:mt-0',
          markdownHierarchy.section,
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          'mt-4 mb-1.5 scroll-m-20 border-l-2 border-violet-400 text-base font-semibold tracking-tight text-foreground',
          markdownHierarchy.subsection,
          className,
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn(
          'mt-3 mb-1.5 scroll-m-20 border-l border-sky-400 text-sm font-semibold text-foreground',
          markdownHierarchy.body,
          className,
        )}
        {...props}
      />
    ),
    h5: ({ className, ...props }) => (
      <h5
        className={cn(
          'mt-2.5 mb-1 scroll-m-20 text-[13px] font-semibold text-foreground/95',
          markdownHierarchy.body,
          className,
        )}
        {...props}
      />
    ),
    h6: ({ className, ...props }) => (
      <h6
        className={cn(
          'mt-2 mb-1 scroll-m-20 text-[11px] font-semibold tracking-wide text-fuchsia-500/80 uppercase',
          markdownHierarchy.body,
          className,
        )}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p
        className={cn(
          'not-first:mt-2 text-[13.5px] leading-6 text-foreground/90',
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
          'my-2 list-disc space-y-1 text-[13.5px] leading-6 text-foreground/90 marker:text-primary',
          markdownHierarchy.nestedList,
          '[&_ul]:mt-1 [&_ul]:list-[circle] [&_ul]:pl-5 [&_ul]:marker:text-violet-400 [&_ol]:mt-1 [&_ol]:pl-5',
          className,
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn(
          'my-2 list-decimal space-y-1 text-[13.5px] leading-6 text-foreground/90 marker:font-semibold marker:text-primary',
          markdownHierarchy.nestedList,
          '[&_ol]:mt-1 [&_ol]:pl-5 [&_ul]:mt-1 [&_ul]:list-[circle] [&_ul]:pl-5 [&_ul]:marker:text-violet-400',
          className,
        )}
        {...props}
      />
    ),
    li: ({ className, children, ...props }) => (
      <li
        className={cn(
          'pl-0.5 leading-6 text-foreground/90 [&>p]:mt-0 [&>p]:pl-0',
          'has-[>input]:list-none has-[>input]:-ml-5',
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
            'mr-1.5 h-3.5 w-3.5 translate-y-0.5 cursor-default rounded border-border align-middle',
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
          'my-3 rounded-r-md border-l-4 border-amber-400 bg-linear-to-r from-amber-400/10 to-transparent px-3 py-2 text-[13.5px] leading-6 text-foreground/85 italic',
          '[&>p]:not-first:mt-1',
          markdownHierarchy.body,
          className,
        )}
        {...props}
      />
    ),
    hr: ({ className, ...props }) => (
      <hr
        className={cn(
          'my-4 h-px border-0 bg-linear-to-r from-primary/60 via-violet-400/60 to-transparent',
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
            'font-medium text-sky-500 underline decoration-sky-400/50 underline-offset-2 transition-colors hover:text-sky-600 hover:decoration-sky-500 dark:text-sky-400 dark:hover:text-sky-300',
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
          'my-3 overflow-x-auto rounded-md ml-5 md:ml-6 border border-border/70 bg-card/70 shadow-sm',
        )}
      >
        <table
          className={cn('w-full min-w-0 border-collapse text-[13px]', className)}
          {...props}
        />
      </div>
    ),
    thead: ({ className, ...props }) => (
      <thead
        className={cn('bg-linear-to-r from-primary/15 via-violet-400/10 to-transparent', className)}
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
          'border-b-2 border-primary/40 px-3 py-1.5 text-left text-[12.5px] font-semibold whitespace-nowrap text-foreground',
          className,
        )}
        style={style}
        {...props}
      />
    ),
    td: ({ className, style, ...props }) => (
      <td
        className={cn('px-3 py-1.5 align-top text-[13px] text-foreground/88', className)}
        style={style}
        {...props}
      />
    ),
    img: ({ className, alt, ...props }) => (
      <span className={cn('my-3 block', markdownHierarchy.body)}>
        <img
          className={cn(
            'max-w-full rounded-md border border-border/70 shadow-sm ring-1 ring-primary/10',
            className,
          )}
          alt={alt ?? 'Markdown image'}
          loading="lazy"
          {...props}
        />
        {alt ? (
          <span className="mt-1 block text-center text-[11px] text-muted-foreground">{alt}</span>
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
            'rounded border px-1 py-0.5 font-mono text-[12px] font-medium',
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
    <div className="markdown-body markdown-preview max-w-none wrap-break-word">
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
