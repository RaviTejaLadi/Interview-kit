import { useEffect, useMemo, useState } from 'react';
import { BookOpenText, Search } from 'lucide-react';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { buildTopicIndex } from '@/lib/content-index';

let allTopics = [];
let groups = [];

try {
  const topicIndex = buildTopicIndex();
  allTopics = topicIndex.allTopics;
  groups = topicIndex.groups;
} catch (error) {
  console.error('Failed to build topic index:', error);
}

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState(allTopics[0]?.id ?? null);
  const [topicContentById, setTopicContentById] = useState({});
  const [isLoadingTopic, setIsLoadingTopic] = useState(false);
  const [topicLoadError, setTopicLoadError] = useState('');

  const filteredGroups = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    if (!query) {
      return groups;
    }

    return groups
      .map((group) => ({
        ...group,
        topics: group.topics.filter((topic) => {
          const haystack = `${topic.title} ${topic.section} ${topic.kitLabel}`.toLowerCase();
          return haystack.includes(query);
        }),
      }))
      .filter((group) => group.topics.length > 0);
  }, [searchValue]);

  const selectedTopic =
    allTopics.find((topic) => topic.id === selectedTopicId) ?? filteredGroups[0]?.topics[0] ?? null;

  const selectedTopicContent = selectedTopic ? (topicContentById[selectedTopic.id] ?? '') : '';

  const hasSelectedTopicContent = selectedTopic ? hasOwn(topicContentById, selectedTopic.id) : false;

  useEffect(() => {
    if (!selectedTopic && filteredGroups[0]?.topics[0]) {
      setSelectedTopicId(filteredGroups[0].topics[0].id);
    }
  }, [filteredGroups, selectedTopic]);

  useEffect(() => {
    let ignore = false;

    async function loadTopicContent() {
      if (!selectedTopic) {
        return;
      }

      if (hasOwn(topicContentById, selectedTopic.id)) {
        return;
      }

      setIsLoadingTopic(true);
      setTopicLoadError('');

      try {
        const markdown = await selectedTopic.loadContent();
        if (!ignore) {
          setTopicContentById((current) => ({
            ...current,
            [selectedTopic.id]: markdown,
          }));
        }
      } catch (error) {
        if (!ignore) {
          setTopicLoadError(error instanceof Error ? error.message : 'Failed to load markdown');
        }
      } finally {
        if (!ignore) {
          setIsLoadingTopic(false);
        }
      }
    }

    loadTopicContent();
    return () => {
      ignore = true;
    };
  }, [selectedTopic, topicContentById]);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <aside className="flex w-[340px] flex-col border-r bg-card/30">
        <div className="space-y-4 border-b p-4">
          <div className="flex items-center gap-2">
            <BookOpenText className="h-5 w-5 text-primary" />
            <h1 className="text-base font-semibold">Interview Kit Portal</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Pick a topic from the sidebar and learn from markdown notes.
          </p>

          <div className="relative">
            <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-8"
              placeholder="Search topics..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-4">
          {filteredGroups.length === 0 ? (
            <p className="rounded-md border bg-background p-3 text-sm text-muted-foreground">
              No topics found. Try a different keyword.
            </p>
          ) : (
            filteredGroups.map((group) => (
              <section key={group.id} className="space-y-2">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {group.label}
                </h2>
                <div className="space-y-1">
                  {group.topics.map((topic) => (
                    <Button
                      key={topic.id}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        'h-auto w-full flex-col items-start gap-0.5 px-2 py-2 text-left',
                        selectedTopic?.id === topic.id && 'bg-accent text-accent-foreground',
                      )}
                      onClick={() => setSelectedTopicId(topic.id)}
                    >
                      <span className="line-clamp-2 text-sm font-medium">{topic.title}</span>
                      <span className="text-xs text-muted-foreground">{topic.section}</span>
                    </Button>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        {!selectedTopic ? (
          <div className="flex h-full items-center justify-center p-6">
            <p className="rounded-md border bg-card p-4 text-sm text-muted-foreground">
              Select a topic to view content.
            </p>
          </div>
        ) : (
          <article className="mx-auto w-full max-w-5xl space-y-4 p-6 md:p-8">
            <header className="rounded-md border bg-card p-4">
              <p className="text-sm text-muted-foreground">{selectedTopic.kitLabel}</p>
              <h2 className="text-2xl font-semibold">{selectedTopic.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{selectedTopic.path}</p>
            </header>

            <div className="rounded-md border bg-background p-4 shadow-sm md:p-6">
              {isLoadingTopic && !hasSelectedTopicContent ? (
                <p className="text-sm text-muted-foreground">Loading markdown...</p>
              ) : topicLoadError ? (
                <p className="text-sm text-red-600">
                  Could not load this file. {topicLoadError}
                </p>
              ) : (
                <div className="markdown-body prose prose-slate max-w-none">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
                    {selectedTopicContent}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </article>
        )}
      </main>
    </div>
  );
}

export default App;
