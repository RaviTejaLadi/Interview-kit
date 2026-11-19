import { GuidesGallery } from '@/components/GuidesGallery';
import { KitGallery } from '@/components/KitGallery';
import { SiteHeader } from '@/components/NewspaperMasthead';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AppHeaderActions } from '@/features/interview-app/components/AppHeaderActions';
import { useInterviewAppController } from '@/features/interview-app/hooks/use-interview-app-controller';

export function HomePage() {
  const controller = useInterviewAppController();

  const leading = (
    <div className="flex min-w-0 items-center gap-0.5">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={
          controller.homeView === 'kits'
            ? 'h-8 rounded-[8px] bg-primary px-3 text-[13px] font-semibold text-primary-foreground'
            : 'h-8 rounded-[8px] px-3 text-[13px] font-medium text-muted-foreground'
        }
        onClick={() => controller.navigateHomeView('kits')}
      >
        Kits
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={
          controller.homeView === 'guides'
            ? 'h-8 rounded-[8px] bg-primary px-3 text-[13px] font-semibold text-primary-foreground'
            : 'h-8 rounded-[8px] px-3 text-[13px] font-medium text-muted-foreground'
        }
        onClick={() => controller.navigateHomeView('guides')}
      >
        Guides
      </Button>
    </div>
  );

  return (
    <div className="theme flex h-svh flex-col bg-background">
      <SiteHeader
        leading={leading}
        actions={
          <AppHeaderActions theme={controller.theme} onToggleTheme={controller.toggleTheme} />
        }
      />
      <ScrollArea className="min-h-0 flex-1">
        {controller.homeView === 'kits' ? (
          <KitGallery
            groups={controller.groups}
            topicProgressById={controller.topicProgressById}
            onSelectKit={(kitId) => controller.openKit(kitId)}
          />
        ) : (
          <GuidesGallery
            guides={controller.allGuides}
            guideProgressById={controller.guideProgressById}
            readGuideCount={controller.guidesReadCount}
            starredGuideCount={controller.guidesStarredCount}
            onOpenGuide={controller.openGuide}
            onToggleGuideRead={controller.toggleGuideRead}
            onToggleGuideStarred={controller.toggleGuideStarred}
          />
        )}
      </ScrollArea>
    </div>
  );
}
