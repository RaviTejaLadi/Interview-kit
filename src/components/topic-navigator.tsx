import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  Maximize2Icon,
  Minimize2Icon,
  MoonIcon,
  SunIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type NavTarget = {
  id: string;
  title: string;
};

const headerIconButtonClassName = {
  paper: 'border-border bg-card hover:bg-muted',
  ink: 'border-border bg-card text-foreground hover:bg-muted',
};

type ButtonTone = keyof typeof headerIconButtonClassName;

type AdjacentTopics = {
  previousTopic: NavTarget | null;
  nextTopic: NavTarget | null;
};

function TopicSideButton({
  topic,
  direction,
  onSelect,
}: {
  topic: NavTarget | null;
  direction: 'previous' | 'next';
  onSelect: (topicId: string) => void;
}) {
  const isPrevious = direction === 'previous';

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      disabled={!topic}
      onClick={() => topic && onSelect(topic.id)}
      className={cn(
        'size-8 border-border bg-card',
        'hover:bg-muted',
      )}
      aria-label={
        topic
          ? `${isPrevious ? 'Previous' : 'Next'} topic: ${topic.title}`
          : isPrevious
            ? 'No previous topic'
            : 'No next topic'
      }
      title={
        topic
          ? `${isPrevious ? 'Previous' : 'Next'}: ${topic.title}`
          : isPrevious
            ? 'First topic in this kit'
            : 'Last topic in this kit'
      }
    >
      {isPrevious ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      <span className="sr-only">{isPrevious ? 'Previous topic' : 'Next topic'}</span>
    </Button>
  );
}

export function TopicStepButtons({
  previousTopic,
  nextTopic,
  onSelect,
}: AdjacentTopics & {
  onSelect: (topicId: string) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <TopicSideButton topic={previousTopic} direction="previous" onSelect={onSelect} />
      <TopicSideButton topic={nextTopic} direction="next" onSelect={onSelect} />
    </div>
  );
}

export function TopicNavigator({ children }: { children: ReactNode }) {
  return (
    <nav aria-label="Topic pagination" className="w-full min-w-0">
      {children}
    </nav>
  );
}

export function TopicDock({
  previousTopic,
  nextTopic,
  currentTitle,
  currentSubtitle,
  currentIndex,
  totalCount,
  visible,
  onSelect,
  onBackToTop,
}: AdjacentTopics & {
  currentTitle: string;
  currentSubtitle: string;
  currentIndex: number;
  totalCount: number;
  visible: boolean;
  onSelect: (topicId: string) => void;
  onBackToTop: () => void;
}) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-x-0 bottom-0 z-10 p-2 sm:p-3 transition-all duration-200',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
      )}
      aria-hidden={!visible}
    >
      <div
        className={cn(
          'pointer-events-auto mx-auto flex max-w-7xl items-center gap-2 rounded-[var(--radius-card)] border border-border bg-card p-2 shadow-[var(--shadow-card)]',
          'dark:border-border dark:bg-card',
          !visible && 'pointer-events-none',
        )}
      >
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="min-w-0 flex-1 justify-start border-border bg-card"
          disabled={!previousTopic}
          onClick={() => previousTopic && onSelect(previousTopic.id)}
          aria-label={
            previousTopic ? `Previous topic: ${previousTopic.title}` : 'No previous topic'
          }
        >
          <ChevronLeftIcon />
          <span className="min-w-0 truncate">{previousTopic?.title ?? 'First topic'}</span>
        </Button>

        <button
          type="button"
          onClick={onBackToTop}
          className="hidden min-w-0 max-w-48 shrink-0 px-2 py-1 text-center hover:bg-muted lg:block"
          aria-label="Back to top"
          title="Back to top"
        >
          <p className="truncate text-xs font-medium text-foreground">{currentTitle}</p>
          <p className="truncate text-[11px] text-muted-foreground">
            {currentIndex + 1} / {totalCount}
            {currentSubtitle ? ` · ${currentSubtitle}` : ''}
          </p>
        </button>

        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="border-border bg-card lg:hidden"
          onClick={onBackToTop}
          aria-label="Back to top"
          title="Back to top"
        >
          <ChevronUpIcon />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="min-w-0 flex-1 justify-end border-border bg-card"
          disabled={!nextTopic}
          onClick={() => nextTopic && onSelect(nextTopic.id)}
          aria-label={nextTopic ? `Next topic: ${nextTopic.title}` : 'No next topic'}
        >
          <span className="min-w-0 truncate">{nextTopic?.title ?? 'Last topic'}</span>
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
}

export function ScrollToTopButton({
  visible,
  dockVisible,
  onClick,
}: {
  visible: boolean;
  dockVisible: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={cn(
        'absolute z-20 size-10 border border-border bg-card transition-all duration-200',
        'hover:bg-muted',
        dockVisible ? 'right-3 bottom-20 sm:right-5' : 'right-3 bottom-3 sm:right-5 sm:bottom-5',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
      )}
      onClick={onClick}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ChevronUpIcon />
      <span className="sr-only">Scroll to top</span>
    </Button>
  );
}

export function FullscreenButton({ tone = 'paper' }: { tone?: ButtonTone }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    onChange();
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      className={headerIconButtonClassName[tone]}
      onClick={async () => {
        try {
          if (document.fullscreenElement) {
            await document.exitFullscreen();
            return;
          }

          await document.documentElement.requestFullscreen();
        } catch {
          // Fullscreen can be blocked by the browser or unsupported on some devices.
        }
      }}
      aria-label={isFullscreen ? 'Exit full screen' : 'Enter full screen'}
      title={isFullscreen ? 'Exit full screen' : 'Full screen'}
    >
      {isFullscreen ? <Minimize2Icon /> : <Maximize2Icon />}
      <span className="sr-only">{isFullscreen ? 'Exit full screen' : 'Enter full screen'}</span>
    </Button>
  );
}

export function ThemeToggle({
  theme,
  onToggle,
  tone = 'paper',
}: {
  theme: 'light' | 'dark';
  onToggle: () => void;
  tone?: ButtonTone;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      className={headerIconButtonClassName[tone]}
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      <span className="sr-only">Switch to {theme === 'dark' ? 'light' : 'dark'} mode</span>
    </Button>
  );
}
