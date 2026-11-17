import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';

const HIGHLIGHT_CLASS =
  'rounded-[var(--radius-sm)] bg-accent px-0.5 font-medium text-accent-foreground';

export function highlightSearchText(text: unknown, searchTerm?: string): ReactNode {
  const term = searchTerm?.trim();
  if (!term || text == null || text === '') return text as ReactNode;

  const str = String(text);
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = str.split(regex);

  if (parts.length <= 1) return str;

  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <span key={`${index}-${part}`} className={HIGHLIGHT_CLASS}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

type HighlightableProps = {
  value?: unknown;
  tags?: unknown[];
  children?: ReactNode;
  [key: string]: unknown;
};

function applyHighlightProps(
  props: HighlightableProps | null | undefined,
  searchTerm: string,
): HighlightableProps | null | undefined {
  if (!props) return props;

  let nextProps: HighlightableProps = props;
  let changed = false;

  const setProp = (key: string, value: unknown) => {
    if (!changed) {
      nextProps = { ...props };
      changed = true;
    }
    nextProps[key] = value;
  };

  const { value, tags, children } = props;

  if (typeof value === 'string' || typeof value === 'number') {
    setProp('value', highlightSearchText(value, searchTerm));
  }

  if (Array.isArray(tags)) {
    setProp(
      'tags',
      tags.map((tag) =>
        typeof tag === 'string' || typeof tag === 'number'
          ? highlightSearchText(tag, searchTerm)
          : tag,
      ),
    );
  }

  if (children != null) {
    setProp(
      'children',
      Children.map(children, (item) => highlightChild(item, searchTerm)),
    );
  }

  return nextProps;
}

function highlightChild(child: ReactNode, searchTerm: string): ReactNode {
  if (child == null || typeof child === 'boolean') return child;

  if (typeof child === 'string' || typeof child === 'number') {
    return highlightSearchText(child, searchTerm);
  }

  if (Array.isArray(child)) {
    return child.map((item, index) => (
      <Fragment key={index}>{highlightChild(item, searchTerm)}</Fragment>
    ));
  }

  if (!isValidElement(child)) return child;

  if (child.type === Fragment) {
    const fragmentChildren = (child.props as { children?: ReactNode }).children;
    return (
      <Fragment>
        {Children.map(fragmentChildren, (item) => highlightChild(item, searchTerm))}
      </Fragment>
    );
  }

  const nextProps = applyHighlightProps(child.props as HighlightableProps, searchTerm);
  if (nextProps && nextProps !== child.props) {
    return cloneElement(child as ReactElement, nextProps as Partial<unknown>);
  }

  return child;
}

type DTHighlightChildrenProps = {
  children: ReactNode;
  searchTerm?: string;
};

export function DTHighlightChildren({ children, searchTerm }: DTHighlightChildrenProps) {
  const term = searchTerm?.trim();
  if (!term) return children;

  return Children.map(children, (child) => highlightChild(child, term));
}
