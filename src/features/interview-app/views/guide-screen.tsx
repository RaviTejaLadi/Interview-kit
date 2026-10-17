import { GuideReader } from '@/components/guide-reader';
import { SiteHeader } from '@/components/newspaper-masthead';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AppHeaderActions } from '@/features/interview-app/components/app-header-actions';
import { useInterviewAppController } from '@/features/interview-app/hooks/use-interview-app-controller';

export function GuideScreen() {
  const controller = useInterviewAppController();
  const guide = controller.selectedGuide;

  if (!guide || !controller.selectedGuideProgress) {
    return null;
  }

  return (
    <div className="theme flex h-svh flex-col bg-background">
      <SiteHeader
        actions={<AppHeaderActions theme={controller.theme} onToggleTheme={controller.toggleTheme} />}
        onBrandClick={controller.closeGuide}
        kitLabel="Guides"
        detail={`${controller.guidesReadCount}/${controller.allGuides.length} read · ${controller.guidesStarredCount} starred`}
      />
      <ScrollArea className="min-h-0 flex-1">
        <GuideReader
          guide={guide}
          content={controller.selectedGuideContent}
          isLoading={controller.isLoadingGuide}
          loadError={controller.guideLoadError}
          theme={controller.theme}
          progress={controller.selectedGuideProgress}
          previousGuide={controller.previousGuide}
          nextGuide={controller.nextGuide}
          onBack={controller.closeGuide}
          onOpenGuide={controller.openGuide}
          onToggleRead={() => controller.toggleGuideRead(guide.id)}
          onToggleStarred={() => controller.toggleGuideStarred(guide.id)}
        />
      </ScrollArea>
    </div>
  );
}
