import { useInterviewAppStore } from '@/features/interview-app/store/use-interview-app-store';
import { GuideScreen } from '@/features/interview-app/views/guide-screen';
import { HomeScreen } from '@/features/interview-app/views/home-screen';
import { KitReaderScreen } from '@/features/interview-app/views/kit-reader-screen';

function App() {
  const selectedGuideId = useInterviewAppStore((state) => state.selectedGuideId);
  const selectedKitId = useInterviewAppStore((state) => state.selectedKitId);

  if (selectedGuideId) {
    return <GuideScreen />;
  }

  if (!selectedKitId) {
    return <HomeScreen />;
  }

  return <KitReaderScreen />;
}

export default App;
