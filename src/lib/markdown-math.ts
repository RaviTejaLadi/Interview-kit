import katex from 'katex';

type MarkdownNode = {
  type: string;
  value?: string;
  children?: MarkdownNode[];
};

type MathMatch = {
  start: number;
  end: number;
  expression: string;
  display: boolean;
};

const BARE_DISPLAY_MATH = /^\s*\[([^\]\n]*\\[a-zA-Z][^\]\n]*)\]\s*$/;

function isDollarMath(expression: string) {
  const value = expression.trim();
  if (!value || value.length > 80 || /[{}`;]/.test(value)) {
    return false;
  }

  if (/\\[a-zA-Z]/.test(value)) {
    return true;
  }

  return /^[A-Za-z]+(?:\([^()\n]*\))?$/.test(value);
}

function matchDelimited(
  value: string,
  index: number,
  open: string,
  close: string,
  display: boolean,
): MathMatch | null {
  if (!value.startsWith(open, index)) {
    return null;
  }

  const contentStart = index + open.length;
  const closeIndex = value.indexOf(close, contentStart);
  if (closeIndex === -1) {
    return null;
  }

  const expression = value.slice(contentStart, closeIndex);
  if (!expression.trim()) {
    return null;
  }

  return {
    start: index,
    end: closeIndex + close.length,
    expression,
    display,
  };
}

function matchInlineDollar(value: string, index: number): MathMatch | null {
  if (value[index] !== '$' || value[index + 1] === '$') {
    return null;
  }

  if (index > 0 && value[index - 1] === '\\') {
    return null;
  }

  const next = value[index + 1];
  if (!next || next === '{' || /\s/.test(next)) {
    return null;
  }

  const lineEnd = value.indexOf('\n', index);
  const searchEnd = lineEnd === -1 ? value.length : lineEnd;
  const closeIndex = value.indexOf('$', index + 1);
  if (closeIndex === -1 || closeIndex >= searchEnd || closeIndex - index > 80) {
    return null;
  }

  const expression = value.slice(index + 1, closeIndex);
  if (!isDollarMath(expression)) {
    return null;
  }

  return {
    start: index,
    end: closeIndex + 1,
    expression,
    display: false,
  };
}

function findMatchingParen(value: string, openIndex: number) {
  let depth = 0;

  for (let index = openIndex; index < value.length; index += 1) {
    const char = value[index];
    if (char === '(') {
      depth += 1;
    } else if (char === ')') {
      depth -= 1;
      if (depth === 0) {
        return index;
      }
    } else if (char === '\n') {
      return -1;
    }
  }

  return -1;
}

function isComplexityInner(inner: string) {
  const withoutCommands = inner.replace(/\\[a-zA-Z]+/g, '');
  if (/[A-Za-z]{4,}/.test(withoutCommands)) {
    return false;
  }

  return /^[A-Za-z0-9\\^_+\-*/=.,\s()]+$/.test(inner) && /[A-Za-z0-9\\]/.test(inner);
}

function isBigOExpression(expression: string) {
  if (!/^[OΘΩ]\(/.test(expression) || !expression.endsWith(')')) {
    return false;
  }

  const inner = expression.slice(2, -1);
  return inner.trim().length > 0 && inner.length <= 60 && isComplexityInner(inner);
}

function isDelimitedMath(expression: string) {
  return (
    isBigOExpression(expression) ||
    /^[nmkN]$/.test(expression) ||
    /^\d+!\s*=\s*\d+$/.test(expression)
  );
}

function matchParenMath(value: string, index: number): MathMatch | null {
  if (value[index] !== '(') {
    return null;
  }

  if (index > 0 && /[A-Za-z0-9_\\(]/.test(value[index - 1] ?? '')) {
    return null;
  }

  const closeIndex = findMatchingParen(value, index);
  if (closeIndex === -1 || closeIndex - index > 80) {
    return null;
  }

  const expression = value.slice(index + 1, closeIndex).trim();
  if (!isDelimitedMath(expression)) {
    return null;
  }

  return {
    start: index,
    end: closeIndex + 1,
    expression,
    display: false,
  };
}

function matchBareBigO(value: string, index: number): MathMatch | null {
  if (value[index] !== 'O' && value[index] !== 'Θ' && value[index] !== 'Ω') {
    return null;
  }

  if (index > 0 && /[A-Za-z0-9_]/.test(value[index - 1] ?? '')) {
    return null;
  }

  if (value[index + 1] !== '(') {
    return null;
  }

  const closeIndex = findMatchingParen(value, index + 1);
  if (closeIndex === -1) {
    return null;
  }

  const expression = value.slice(index, closeIndex + 1);
  if (!isBigOExpression(expression)) {
    return null;
  }

  return {
    start: index,
    end: closeIndex + 1,
    expression,
    display: false,
  };
}

function findMath(value: string, index: number) {
  return (
    matchDelimited(value, index, '\\[', '\\]', true) ??
    matchDelimited(value, index, '\\(', '\\)', false) ??
    matchDelimited(value, index, '$$', '$$', true) ??
    matchParenMath(value, index) ??
    matchBareBigO(value, index) ??
    matchInlineDollar(value, index)
  );
}

function placeholder(expression: string, display: boolean) {
  const encoded = encodeURIComponent(expression.trim());
  const mode = display ? 'block' : 'inline';
  return `<span class="math-src" data-latex="${encoded}" data-display="${mode}"></span>`;
}

function splitMathText(value: string): MarkdownNode[] {
  const bare = value.match(BARE_DISPLAY_MATH);
  if (bare?.[1]) {
    return [{ type: 'html', value: placeholder(bare[1], true) }];
  }

  if (!/\\\[|\\\(|\$|O\(|Θ\(|Ω\(|\(/.test(value)) {
    return [{ type: 'text', value }];
  }

  const parts: MarkdownNode[] = [];
  let cursor = 0;
  let index = 0;

  while (index < value.length) {
    const match = findMath(value, index);
    if (!match) {
      index += 1;
      continue;
    }

    if (match.start > cursor) {
      parts.push({ type: 'text', value: value.slice(cursor, match.start) });
    }

    parts.push({ type: 'html', value: placeholder(match.expression, match.display) });
    cursor = match.end;
    index = match.end;
  }

  if (cursor === 0) {
    return [{ type: 'text', value }];
  }

  if (cursor < value.length) {
    parts.push({ type: 'text', value: value.slice(cursor) });
  }

  return parts;
}

function transformNode(node: MarkdownNode) {
  if (!node.children) {
    return;
  }

  const next: MarkdownNode[] = [];
  for (const child of node.children) {
    if (child.type === 'text' && typeof child.value === 'string') {
      const parts = splitMathText(child.value);
      if (parts.length === 1 && parts[0]?.type === 'text') {
        next.push(child);
      } else {
        next.push(...parts);
      }
      continue;
    }

    if (child.type !== 'code' && child.type !== 'inlineCode') {
      transformNode(child);
    }
    next.push(child);
  }

  node.children = next;
}

export function remarkRenderMath() {
  return (tree: MarkdownNode) => {
    transformNode(tree);
  };
}

export function renderLatex(expression: string, displayMode: boolean) {
  try {
    return katex.renderToString(expression.trim(), {
      displayMode,
      throwOnError: true,
      output: 'htmlAndMathml',
      strict: 'ignore',
      trust: false,
    });
  } catch {
    return null;
  }
}
