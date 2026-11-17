import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';

import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/newspaper-masthead';
import { ScrollToTopButton, TopicDock, TopicNavigator } from '@/components/topic-navigator';
import { TopicAccordion } from '@/components/topic-accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppHeaderActions } from '@/features/interview-app/components/app-header-actions';
import { TopicDetailPanel } from '@/features/interview-app/components/topic-detail-panel';
import { useInterviewAppController } from '@/features/interview-app/hooks/use-interview-app-controller';
import { getNavSubtitle } from '@/features/interview-app/lib/helpers';
import { KitChatPanel } from '@/features/chat/components/kit-chat-panel';
import {
  CHAT_PANEL_WIDTH_DEFAULT,
  CHAT_PANEL_WIDTH_MAX,
  CHAT_PANEL_WIDTH_MIN,
  CHAT_PANEL_WIDTH_STORAGE_KEY,
} from '@/features/chat/constants/chat.constants';
import { cn } from '@/lib/utils';

function readSavedChatPanelWidth() {
  if (typeof window === 'undefined') {
    return CHAT_PANEL_WIDTH_DEFAULT;
  }

  const saved = window.localStorage.getItem(CHAT_PANEL_WIDTH_STORAGE_KEY);
  if (!saved) {
    return CHAT_PANEL_WIDTH_DEFAULT;
  }

  const parsed = Number.parseInt(saved, 10);
  if (!Number.isFinite(parsed)) {
    return CHAT_PANEL_WIDTH_DEFAULT;
  }

  return Math.min(CHAT_PANEL_WIDTH_MAX, Math.max(CHAT_PANEL_WIDTH_MIN, parsed));
}

export function KitReaderPage() {
  const controller = useInterviewAppController();
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [panelWidth, setPanelWidthState] = useState(CHAT_PANEL_WIDTH_DEFAULT);
  const [isResizing, setIsResizing] = useState(false);
  const dragRef = useRef<{
    startX: number;
    startWidth: number;
    didDrag: boolean;
  } | null>(null);

  useEffect(() => {
    setPanelWidthState(readSavedChatPanelWidth());
  }, []);

  useEffect(() => {
    if (!controller.selectedNav) {
      setIsRightPanelOpen(false);
    }
  }, [controller.selectedNav]);

  const setPanelWidth = useCallback((value: number) => {
    const next = Math.min(CHAT_PANEL_WIDTH_MAX, Math.max(CHAT_PANEL_WIDTH_MIN, value));
    setPanelWidthState(next);
    window.localStorage.setItem(CHAT_PANEL_WIDTH_STORAGE_KEY, String(next));
  }, []);

  const endDrag = useCallback((event: PointerEvent<HTMLButtonElement>) => {
    dragRef.current = null;
    setIsResizing(false);
    document.body.style.removeProperty('cursor');
    document.body.style.removeProperty('user-select');

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  const editionSubtitle = controller.selectedNav
    ? [
        controller.selectedNav.section,
        controller.selectedNav.title === controller.selectedNav.kitLabel
          ? null
          : controller.selectedNav.title,
        controller.selectedNav.kind === 'folder' ? getNavSubtitle(controller.selectedNav) : null,
        controller.currentIndex >= 0 && controller.totalCount > 0
          ? `${controller.currentIndex + 1} / ${controller.totalCount}`
          : null,
      ]
        .filter(Boolean)
        .join(' · ')
    : undefined;

  return (
    <SidebarProvider className="theme bg-background">
      <AppSidebar
        groups={controller.filteredGroups}
        searchValue={controller.searchValue}
        selectedNavId={controller.selectedNav?.id ?? null}
        topicProgressById={controller.topicProgressById}
        totalTopicCount={controller.selectedKitTopicIds.length}
        completedTopicCount={controller.selectedKitCompletedCount}
        importantTopicCount={controller.selectedKitImportantCount}
        onSearchChange={controller.setSearchValue}
        onSelectNav={controller.handleSelectNav}
        onBackToKits={controller.closeKit}
      />
      <SidebarInset className="bg-background">
        <SiteHeader
          actions={
            <AppHeaderActions theme={controller.theme} onToggleTheme={controller.toggleTheme} />
          }
          onBrandClick={controller.closeKit}
          kitLabel={controller.selectedNav?.kitLabel}
          kitKey={controller.selectedNav?.kitKey}
          kitIcon={controller.selectedTopicIcon}
          detail={editionSubtitle}
          leading={
            <SidebarTrigger className="-ml-0.5 border border-border bg-card text-foreground hover:bg-muted hover:text-foreground sm:-ml-1" />
          }
        />
        <div className="min-h-0 flex flex-1 overflow-hidden">
          <ScrollArea
            className="group/reader min-h-0 flex-1 bg-background"
            viewportRef={controller.scrollRef}
            viewportClassName="[overflow-anchor:none]"
          >
            {!controller.selectedNav ? (
              <div className="flex h-full items-center justify-center p-4 sm:p-6">
                <p className="rounded-[var(--radius-card)] border border-border bg-card p-4 text-sm text-muted-foreground shadow-[var(--shadow-card)] sm:p-5">
                  {controller.searchValue.trim()
                    ? 'No topics match this search in the current kit.'
                    : 'Select a topic to read.'}
                </p>
              </div>
            ) : (
              <article className="w-full min-w-0 space-y-3">
                <TopicNavigator>
                  {controller.selectedNav.kind === 'folder' ? (
                    <TopicAccordion
                      key={controller.selectedNav.id}
                      title={controller.selectedNav.title}
                      section={controller.selectedNav.section}
                      topics={controller.selectedNav.topics}
                      contentById={controller.topicContentById}
                      isLoading={controller.isLoadingTopic}
                      theme={controller.theme}
                      focusedTopicId={controller.focusedTopicId}
                      topicProgressById={controller.topicProgressById}
                      previousTopic={controller.previousTopic}
                      nextTopic={controller.nextTopic}
                      isRightPanelOpen={isRightPanelOpen}
                      onToggleRightPanel={() => setIsRightPanelOpen((current) => !current)}
                      onToggleTopicCompleted={controller.toggleTopicCompleted}
                      onToggleTopicImportant={controller.toggleTopicImportant}
                      onSetAllTopicsCompleted={controller.setManyTopicsCompleted}
                      onSetAllTopicsImportant={controller.setManyTopicsImportant}
                      onSelectTopic={controller.handleSelectNav}
                      onInternalLink={controller.handleInternalLink}
                    />
                  ) : (
                    <TopicDetailPanel
                      selectedTopic={controller.selectedSingleTopic}
                      selectedTopicProgress={controller.selectedSingleTopicProgress}
                      previousTopic={controller.previousTopic}
                      nextTopic={controller.nextTopic}
                      isRightPanelOpen={isRightPanelOpen}
                      onToggleRightPanel={() => setIsRightPanelOpen((current) => !current)}
                      onSelectTopic={controller.handleSelectNav}
                      onToggleTopicCompleted={controller.toggleTopicCompleted}
                      onToggleTopicImportant={controller.toggleTopicImportant}
                      isLoading={controller.isLoadingTopic}
                      hasSelectedTopicContent={controller.hasSelectedTopicContent}
                      loadError={controller.topicLoadError}
                      content={controller.selectedTopicContent}
                      theme={controller.theme}
                      onInternalLink={(href) =>
                        controller.handleInternalLink(
                          controller.selectedSingleTopic?.path ?? '',
                          href,
                        )
                      }
                    />
                  )}
                </TopicNavigator>
                <div ref={controller.contentEndRef} aria-hidden="true" className="h-px w-full" />
              </article>
            )}
          </ScrollArea>
          {controller.selectedNav ? (
            <aside
              aria-label="Study chat panel"
              aria-hidden={!isRightPanelOpen}
              className={cn(
                'relative min-h-0 shrink-0 overflow-hidden border-l border-border bg-card',
                !isResizing && 'transition-[width] duration-200 ease-linear',
                isRightPanelOpen ? '' : 'pointer-events-none w-0 border-l-0',
              )}
              style={isRightPanelOpen ? { width: panelWidth } : undefined}
            >
              {isRightPanelOpen ? (
                <button
                  type="button"
                  aria-label="Resize chat panel"
                  tabIndex={-1}
                  title="Drag to resize"
                  onPointerDown={(event) => {
                    if (event.button !== 0) {
                      return;
                    }

                    event.preventDefault();
                    dragRef.current = {
                      startX: event.clientX,
                      startWidth: panelWidth,
                      didDrag: false,
                    };
                    setIsResizing(true);
                    document.body.style.cursor = 'col-resize';
                    document.body.style.userSelect = 'none';
                    event.currentTarget.setPointerCapture(event.pointerId);
                  }}
                  onPointerMove={(event) => {
                    const drag = dragRef.current;
                    if (!drag) {
                      return;
                    }

                    const delta = drag.startX - event.clientX;
                    if (Math.abs(delta) > 4) {
                      drag.didDrag = true;
                    }
                    if (!drag.didDrag) {
                      return;
                    }

                    const next = drag.startWidth + delta;
                    if (next < 160) {
                      setIsRightPanelOpen(false);
                      return;
                    }

                    setIsRightPanelOpen(true);
                    setPanelWidth(next);
                  }}
                  onPointerUp={endDrag}
                  onPointerCancel={endDrag}
                  onDoubleClick={() => {
                    setIsRightPanelOpen(true);
                    setPanelWidth(CHAT_PANEL_WIDTH_DEFAULT);
                  }}
                  className={cn(
                    'absolute inset-y-0 left-0 z-20 hidden w-4 -translate-x-1/2 touch-none sm:flex',
                    'cursor-col-resize after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 hover:after:bg-ring',
                    isResizing && 'after:bg-ring',
                  )}
                />
              ) : null}
              <div
                className={cn('flex h-full min-h-0 flex-col', !isRightPanelOpen && 'invisible')}
                style={{ width: panelWidth }}
              >
                <KitChatPanel
                  kitLabel={controller.selectedNav.kitLabel}
                  section={controller.selectedNav.section}
                  topicTitle={controller.selectedNav.title}
                  onClose={() => setIsRightPanelOpen(false)}
                />
              </div>
            </aside>
          ) : null}
        </div>
        {controller.selectedNav ? (
          <>
            <TopicDock
              previousTopic={controller.previousTopic}
              nextTopic={controller.nextTopic}
              currentTitle={controller.selectedNav.title}
              currentSubtitle={getNavSubtitle(controller.selectedNav)}
              currentIndex={Math.max(controller.currentIndex, 0)}
              totalCount={controller.totalCount}
              visible={controller.scrolled && !controller.footerInView}
              onSelect={controller.handleSelectNav}
              onBackToTop={controller.scrollToTop}
            />
            <ScrollToTopButton
              visible={controller.scrolled}
              dockVisible={controller.scrolled && !controller.footerInView}
              onClick={controller.scrollToTop}
            />
          </>
        ) : null}
      </SidebarInset>
    </SidebarProvider>
  );
}
