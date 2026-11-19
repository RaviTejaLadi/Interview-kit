import { useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';
import 'katex/dist/katex.min.css';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown, { type Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

import { Checkbox } from '@/components/ui/checkbox';
import { remarkRenderMath, renderLatex } from '@/lib/markdown-math';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark';

const CODE_FONT =
  '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

type HighlighterStyle = { [key: string]: CSSProperties };

type CodePalette = {
  background: string;
  foreground: string;
  border: string;
  comment: string;
  punctuation: string;
  keyword: string;
  string: string;
  number: string;
  tag: string;
  function: string;
  selection: string;
};

const LIGHT_CODE: CodePalette = {
  background: '#f1e8db',
  foreground: '#1d1b18',
  border: '#ddd3c5',
  comment: '#6f6961',
  punctuation: '#6f6961',
  keyword: '#24521c',
  string: '#8a5a00',
  number: '#b4532a',
  tag: '#2a7a3d',
  function: '#3d3428',
  selection: '#e7ddf5',
};

const DARK_CODE: CodePalette = {
  background: '#1c1915',
  foreground: '#efe6d6',
  border: '#342f28',
  comment: '#8d7f6c',
  punctuation: '#a3998b',
  keyword: '#cfe3b2',
  string: '#e3ae3c',
  number: '#d97a4f',
  tag: '#7fc278',
  function: '#f0dcc0',
  selection: '#3f4c2b',
};

function codePalette(isDarkTheme: boolean) {
  return isDarkTheme ? DARK_CODE : LIGHT_CODE;
}

function themeStyle(isDarkTheme: boolean): HighlighterStyle {
  const palette = codePalette(isDarkTheme);
  const base = (isDarkTheme ? oneDark : oneLight) as HighlighterStyle;
  const painted: HighlighterStyle = {};

  for (const [key, value] of Object.entries(base)) {
    painted[key] = { ...value };
  }

  const surface: CSSProperties = {
    background: palette.background,
    color: palette.foreground,
    textShadow: 'none',
    fontFamily: CODE_FONT,
  };

  for (const key of ['code[class*="language-"]', 'pre[class*="language-"]'] as const) {
    painted[key] = { ...painted[key], ...surface, margin: 0 };
  }

  const inlineKey = ':not(pre) > code[class*="language-"]';
  painted[inlineKey] = {
    ...painted[inlineKey],
    background: palette.background,
    color: palette.foreground,
    textShadow: 'none',
    fontFamily: CODE_FONT,
  };

  const paint = (token: string, color: string) => {
    if (!painted[token]) {
      return;
    }
    painted[token] = { ...painted[token], color, textShadow: 'none' };
  };

  paint('comment', palette.comment);
  paint('prolog', palette.comment);
  paint('cdata', palette.comment);
  paint('doctype', palette.comment);
  paint('punctuation', palette.punctuation);
  paint('operator', palette.punctuation);
  paint('keyword', palette.keyword);
  paint('atrule', palette.keyword);
  paint('builtin', palette.keyword);
  paint('important', palette.keyword);
  paint('string', palette.string);
  paint('char', palette.string);
  paint('attr-value', palette.string);
  paint('attr-name', palette.string);
  paint('boolean', palette.number);
  paint('number', palette.number);
  paint('constant', palette.number);
  paint('symbol', palette.number);
  paint('tag', palette.tag);
  paint('selector', palette.tag);
  paint('function', palette.function);
  paint('class-name', palette.function);
  paint('property', palette.foreground);
  paint('entity', palette.foreground);
  paint('variable', palette.foreground);
  paint('url', palette.string);

  for (const key of Object.keys(painted)) {
    if (key.includes('selection')) {
      painted[key] = {
        ...painted[key],
        background: palette.selection,
        color: palette.foreground,
        textShadow: 'none',
      };
    }
  }

  return painted;
}

function inferLanguage(language: string | undefined, code: string) {
  const normalized = language?.toLowerCase();
  if (normalized === 'js') {
    return 'javascript';
  }

  if (normalized && !['text', 'plaintext', 'txt', 'plain'].includes(normalized)) {
    return normalized;
  }

  if (normalized) {
    return 'text';
  }

  if (/(function|const|let|var|class|import|export|return|console\.|=>|\{|\}|;|\/\/)/.test(code)) {
    return 'javascript';
  }

  return 'javascript';
}

const markdownHierarchy = {
  section: '',
  subsection: '',
  body: '',
  nestedList: 'pl-5',
};

function readRenderedMath(
  props: {
    className?: string;
    'data-latex'?: string;
    'data-display'?: string;
  },
  children: ReactNode,
) {
  const className = typeof props.className === 'string' ? props.className : '';
  const encoded =
    props['data-latex'] ??
    (className.split(/\s+/).includes('math-src') && typeof children === 'string'
      ? children
      : undefined);

  if (!encoded) {
    return null;
  }

  try {
    const expression = decodeURIComponent(encoded).trim();
    if (!expression) {
      return null;
    }

    return {
      expression,
      display: props['data-display'] === 'block',
    };
  } catch {
    return null;
  }
}

function MarkdownMath({ expression, display }: { expression: string; display: boolean }) {
  const html = renderLatex(expression, display);
  if (!html) {
    return <span className="math-fallback">{expression}</span>;
  }

  return (
    <span
      className={display ? 'math-display' : 'math-inline'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function CodeBlock({
  codeText,
  language,
  theme,
}: {
  codeText: string;
  language?: string;
  theme: Theme;
}) {
  const [copied, setCopied] = useState(false);
  const isDarkTheme = theme === 'dark';
  const palette = codePalette(isDarkTheme);

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
      className="group relative my-3 max-w-full overflow-x-auto rounded-(--radius-control) border"
      style={{ background: palette.background, borderColor: palette.border }}
    >
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          'absolute top-1.5 right-1.5 rounded-(--radius-xs) border px-1.5 py-1 text-[11px] transition-colors',
          copied ? 'text-[#7fc278]' : 'hover:bg-foreground/5',
        )}
        style={{
          background: palette.background,
          borderColor: palette.border,
          color: copied ? undefined : palette.punctuation,
        }}
        aria-label="Copy code"
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      </button>

      <SyntaxHighlighter
        language={inferLanguage(language, codeText)}
        PreTag="div"
        style={themeStyle(isDarkTheme)}
        showLineNumbers={false}
        customStyle={{
          margin: 0,
          maxWidth: '100%',
          overflowX: 'auto',
          borderRadius: 0,
          padding: '0.75rem 0.875rem',
          fontSize: '12px',
          lineHeight: '1.55',
          background: palette.background,
          color: palette.foreground,
          fontFamily: CODE_FONT,
          textShadow: 'none',
        }}
        codeTagProps={{
          style: {
            fontFamily: CODE_FONT,
            color: palette.foreground,
            textShadow: 'none',
            background: 'transparent',
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
  return {
    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          'font-display mt-1 mb-3 scroll-m-20 border-b border-border pb-1.5 text-lg text-foreground first:mt-0',
          className,
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          'font-display mt-6 mb-2 scroll-m-20 border-b border-border pb-1.5 text-base text-foreground first:mt-0',
          markdownHierarchy.section,
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          'font-heading mt-4 mb-1.5 scroll-m-20 text-sm font-semibold tracking-tight text-foreground',
          markdownHierarchy.subsection,
          className,
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn(
          'font-heading mt-3 mb-1 scroll-m-20 text-[13px] font-semibold text-foreground',
          markdownHierarchy.body,
          className,
        )}
        {...props}
      />
    ),
    h5: ({ className, ...props }) => (
      <h5
        className={cn(
          'font-heading mt-3 mb-1 scroll-m-20 text-sm font-semibold text-foreground/95',
          markdownHierarchy.body,
          className,
        )}
        {...props}
      />
    ),
    h6: ({ className, ...props }) => (
      <h6
        className={cn(
          'mt-2 mb-1 scroll-m-20 text-sm font-semibold text-primary',
          markdownHierarchy.body,
          className,
        )}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p
        className={cn(
          'not-first:mt-2 text-[13px] leading-5 text-foreground/95',
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
          'my-2 list-disc space-y-1 text-[13px] leading-5 text-foreground/95 marker:text-primary',
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
          'my-2 list-decimal space-y-1 text-[13px] leading-5 text-foreground/95 marker:font-semibold marker:text-primary',
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
    input: ({ className, type, checked }) =>
      type === 'Checkbox' ? (
        <Checkbox
          checked={Boolean(checked)}
          disabled
          className={cn('mr-1.5 translate-y-0.5 align-middle', className)}
          aria-hidden
        />
      ) : null,
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          'my-4 rounded-r-[var(--radius-control)] border-l-4 border-primary bg-[var(--color-note)] px-4 py-2 text-[14px] leading-6 text-[var(--color-note-foreground)] [&_p]:text-[var(--color-note-foreground)] [&_strong]:text-[var(--color-note-foreground)]',
          '[&>p]:not-first:mt-1 [&>p]:pl-0',
          markdownHierarchy.body,
          className,
        )}
        {...props}
      />
    ),
    hr: ({ className, ...props }) => (
      <hr
        className={cn('my-4 h-px border-0 bg-border', markdownHierarchy.body, className)}
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
            'font-medium text-primary underline decoration-primary/40 underline-offset-2 transition-colors hover:text-[var(--primary-hover)] hover:decoration-[var(--primary-hover)]',
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
        className={cn(
          'my-4 max-w-full overflow-x-auto rounded-(--radius-control) border border-border bg-card',
        )}
      >
        <table
          className={cn('w-full min-w-[36rem] border-collapse text-[13px]', className)}
          {...props}
        />
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
        className={cn('transition-colors even:bg-muted/20 hover:bg-muted/50', className)}
        {...props}
      />
    ),
    th: ({ className, style, ...props }) => (
      <th
        className={cn(
          'border-b border-border px-3 py-1.5 text-left text-[12.5px] font-semibold whitespace-nowrap text-foreground',
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
            'h-auto max-w-full rounded-(--radius-control) border border-border',
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
    span: ({ className, children, ...props }) => {
      const math = readRenderedMath({ className, ...props }, children);
      if (math) {
        return <MarkdownMath expression={math.expression} display={math.display} />;
      }

      return (
        <span className={className} {...props}>
          {children}
        </span>
      );
    },
    pre: ({ children }) => <>{children}</>,
    code: ({ className, children }) => {
      const codeText = String(children).replace(/\n$/, '');
      const languageMatch = /language-([\w-]+)/.exec(className ?? '');
      const language = languageMatch?.[1];
      const isBlock = Boolean(language || codeText.includes('\n'));
      const isDarkTheme = theme === 'dark';
      const palette = codePalette(isDarkTheme);

      if (isBlock) {
        return <CodeBlock codeText={codeText} language={language} theme={theme} />;
      }

      return (
        <SyntaxHighlighter
          language={inferLanguage(language, codeText)}
          style={themeStyle(isDarkTheme)}
          PreTag="span"
          customStyle={{
            display: 'inline',
            margin: 0,
            padding: '0.05rem 0.35rem',
            borderRadius: 4,
            fontSize: '12px',
            lineHeight: '1.45',
            verticalAlign: 'baseline',
            background: palette.background,
            color: palette.foreground,
            border: `1px solid ${palette.border}`,
            fontFamily: CODE_FONT,
            textShadow: 'none',
          }}
          codeTagProps={{
            style: {
              display: 'inline',
              fontFamily: CODE_FONT,
              color: palette.foreground,
              textShadow: 'none',
              background: 'transparent',
            },
          }}
        >
          {codeText}
        </SyntaxHighlighter>
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
    <div className="markdown-body markdown-preview mx-auto w-full max-w-5xl font-sans wrap-break-word">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm, remarkRenderMath]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
