import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/newspaper-masthead';
import {
  ScrollToTopButton,
  TopicDock,
  TopicNavigator,
} from '@/components/topic-navigator';
import { TopicAccordion } from '@/components/topic-accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppHeaderActions } from '@/features/interview-app/components/app-header-actions';
import { TopicDetailPanel } from '@/features/interview-app/components/topic-detail-panel';
import { useInterviewAppController } from '@/features/interview-app/hooks/use-interview-app-controller';
import { getNavSubtitle } from '@/features/interview-app/lib/helpers';

export function KitReaderScreen() {
  const controller = useInterviewAppController();

  const editionSubtitle = controller.selectedNav
    ? [
        controller.selectedNav.section,
        controller.selectedNav.title === controller.selectedNav.kitLabel
          ? null
          : controller.selectedNav.title,
        controller.selectedNav.kind === 'folder'
          ? getNavSubtitle(controller.selectedNav)
          : null,
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
          actions={<AppHeaderActions theme={controller.theme} onToggleTheme={controller.toggleTheme} />}
          onBrandClick={controller.closeKit}
          kitLabel={controller.selectedNav?.kitLabel}
          kitKey={controller.selectedNav?.kitKey}
          kitIcon={controller.selectedTopicIcon}
          detail={editionSubtitle}
          leading={
            <SidebarTrigger className="-ml-0.5 border border-border bg-card text-foreground hover:bg-muted hover:text-foreground sm:-ml-1" />
          }
        />
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
                    onSelectTopic={controller.handleSelectNav}
                    onToggleTopicCompleted={controller.toggleTopicCompleted}
                    onToggleTopicImportant={controller.toggleTopicImportant}
                    isLoading={controller.isLoadingTopic}
                    hasSelectedTopicContent={controller.hasSelectedTopicContent}
                    loadError={controller.topicLoadError}
                    content={controller.selectedTopicContent}
                    theme={controller.theme}
                    onInternalLink={(href) =>
                      controller.handleInternalLink(controller.selectedSingleTopic?.path ?? '', href)
                    }
                  />
                )}
              </TopicNavigator>
              <div ref={controller.contentEndRef} aria-hidden="true" className="h-px w-full" />
            </article>
          )}
        </ScrollArea>
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
