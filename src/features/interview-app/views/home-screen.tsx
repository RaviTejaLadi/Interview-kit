import { GuidesGallery } from '@/components/guides-gallery';
import { KitGallery } from '@/components/kit-gallery';
import { SiteHeader } from '@/components/newspaper-masthead';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AppHeaderActions } from '@/features/interview-app/components/app-header-actions';
import { useInterviewAppController } from '@/features/interview-app/hooks/use-interview-app-controller';

export function HomeScreen() {
  const controller = useInterviewAppController();

  const leading = (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant={controller.homeView === 'kits' ? 'default' : 'outline'}
        size="sm"
        onClick={() => controller.navigateHomeView('kits')}
      >
        Interview Kits
      </Button>
      <Button
        type="button"
        variant={controller.homeView === 'guides' ? 'default' : 'outline'}
        size="sm"
        onClick={() => controller.navigateHomeView('guides')}
      >
        Guides
      </Button>
    </div>
  );

  return (
    <div className="theme flex h-svh flex-col bg-background">
      <SiteHeader
        showBrand={false}
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
