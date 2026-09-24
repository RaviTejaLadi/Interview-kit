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
  section: 'pl-1.5 sm:pl-2.5 lg:pl-3',
  subsection: 'pl-2.5 sm:pl-4 lg:pl-5',
  body: 'pl-3 sm:pl-5 lg:pl-6',
  nestedList: 'pl-6 sm:pl-8 lg:pl-9',
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
        'my-3 overflow-hidden group relative border border-foreground',
        'ml-0 sm:ml-4 lg:ml-6',
      )}
    >
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          'group-hover:opacity-100 opacity-0 absolute top-2 right-2 rounded px-1.5 py-1 text-[11px] font-medium transition-colors',
          copied
            ? 'text-emerald-600'
            : isDarkTheme
              ? 'text-paper/70 hover:bg-ink/60 hover:text-paper'
              : 'text-ink/60 hover:bg-muted hover:text-ink',
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
          background: isDarkTheme ? '#16120e' : '#f8f1dc',
        }}
        codeTagProps={{
          style: {
            fontFamily:
              '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
          },
        }}
      >
        {codeText}
      </SyntaxHighlighter>
    </div>
  );
}

function createMarkdownComponents(
  theme: Theme,
  onInternalLink?: (href: string) => boolean,
): Components {
  const isDarkTheme = theme === 'dark';

  return {
    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          'font-heading mt-1 mb-3 scroll-m-20 border-b-2 border-foreground pb-2 text-lg font-semibold tracking-tight first:mt-0 sm:text-xl lg:text-2xl',
          className,
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          'font-heading mt-5 mb-2 scroll-m-20 border-b border-foreground/40 pb-1 text-lg font-semibold tracking-tight text-foreground first:mt-0',
          markdownHierarchy.section,
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          'font-heading mt-4 mb-1.5 scroll-m-20 text-base font-semibold tracking-tight text-foreground',
          markdownHierarchy.subsection,
          className,
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn(
          'font-heading mt-3 mb-1.5 scroll-m-20 text-sm font-semibold text-foreground',
          markdownHierarchy.body,
          className,
        )}
        {...props}
      />
    ),
    h5: ({ className, ...props }) => (
      <h5
        className={cn(
          'font-heading mt-2.5 mb-1 scroll-m-20 text-[13px] font-semibold text-foreground/95',
          markdownHierarchy.body,
          className,
        )}
        {...props}
      />
    ),
    h6: ({ className, ...props }) => (
      <h6
        className={cn(
          'font-heading mt-2 mb-1 scroll-m-20 text-[11px] font-semibold tracking-wide text-secondary uppercase',
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
      <em className={cn('text-foreground italic', className)} {...props} />
    ),
    del: ({ className, ...props }) => (
      <del className={cn('text-rose-400/80 line-through', className)} {...props} />
    ),
    ul: ({ className, ...props }) => (
      <ul
        className={cn(
          'my-2 list-disc space-y-1 text-[13.5px] leading-6 text-foreground/90 marker:text-secondary',
          markdownHierarchy.nestedList,
          '[&_ul]:mt-1 [&_ul]:list-[circle] [&_ul]:pl-5 [&_ul]:marker:text-foreground/70 [&_ol]:mt-1 [&_ol]:pl-5',
          className,
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn(
          'my-2 list-decimal space-y-1 text-[13.5px] leading-6 text-foreground/90 marker:font-semibold marker:text-secondary',
          markdownHierarchy.nestedList,
          '[&_ol]:mt-1 [&_ol]:pl-5 [&_ul]:mt-1 [&_ul]:list-[circle] [&_ul]:pl-5 [&_ul]:marker:text-foreground/70',
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
          'my-4 border-l-2 border-secondary px-4 py-1 text-[13.5px] leading-6 text-foreground/85 italic',
          '[&>p]:not-first:mt-1 [&>p]:pl-0',
          markdownHierarchy.body,
          className,
        )}
        {...props}
      />
    ),
    hr: ({ className, ...props }) => (
      <hr
        className={cn('my-4 h-px border-0 bg-foreground', markdownHierarchy.body, className)}
        {...props}
      />
    ),
    a: ({ className, href, rel, target, children, onClick, ...props }) => {
      const isAnchorLink = href?.startsWith('#');
      const isExternalLink = Boolean(href && /^[a-z][a-z0-9+.-]*:/i.test(href));

      return (
        <a
          href={href}
          target={isAnchorLink || !isExternalLink ? target : (target ?? '_blank')}
          rel={isAnchorLink || !isExternalLink ? rel : (rel ?? 'noreferrer noopener')}
          className={cn(
            'font-medium text-secondary underline decoration-secondary/50 underline-offset-2 transition-colors hover:text-foreground hover:decoration-foreground',
            className,
          )}
          onClick={(event) => {
            onClick?.(event);
            if (event.defaultPrevented || !href || isAnchorLink || isExternalLink) {
              return;
            }

            event.preventDefault();
            onInternalLink?.(href);
          }}
          {...props}
        >
          {children}
        </a>
      );
    },
    table: ({ className, ...props }) => (
      <div
        className={cn('my-3 overflow-x-auto ml-0 sm:ml-4 lg:ml-6 border border-foreground bg-card')}
      >
        <table className={cn('w-full min-w-0 border-collapse text-[13px]', className)} {...props} />
      </div>
    ),
    thead: ({ className, ...props }) => (
      <thead className={cn('bg-muted/60', className)} {...props} />
    ),
    tbody: ({ className, ...props }) => (
      <tbody className={cn('divide-y divide-border/60', className)} {...props} />
    ),
    tr: ({ className, ...props }) => (
      <tr
        className={cn('transition-colors even:bg-muted/30 hover:bg-foreground/5', className)}
        {...props}
      />
    ),
    th: ({ className, style, ...props }) => (
      <th
        className={cn(
          'border-b-2 border-foreground px-3 py-1.5 text-left text-[12.5px] font-semibold whitespace-nowrap text-foreground',
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
          className={cn('max-w-full border border-foreground', className)}
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
            'border px-1 py-0.5 font-mono text-[12px] font-medium',
            isDarkTheme
              ? 'border-paper/30 bg-ink text-paper'
              : 'border-foreground/30 bg-muted text-foreground',
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
  onInternalLink?: (href: string) => boolean;
};

export function MarkdownPreview({ content, theme, onInternalLink }: MarkdownPreviewProps) {
  const markdownComponents = useMemo(
    () => createMarkdownComponents(theme, onInternalLink),
    [onInternalLink, theme],
  );

  return (
    <div className="markdown-body markdown-preview max-w-none font-sans wrap-break-word">
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
