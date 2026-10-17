import { create } from 'zustand';

import { interviewCatalog } from '@/features/interview-app/catalog';
import {
  getHomeViewFromLocation,
  getInitialTheme,
  getKitIdFromHash,
  type HomeView,
  type Theme,
} from '@/features/interview-app/lib/navigation';

type InterviewAppState = {
  searchValue: string;
  homeView: HomeView;
  selectedKitId: string | null;
  selectedNavId: string | null;
  focusedTopicId: string | null;
  selectedGuideId: string | null;
  topicContentById: Record<string, string>;
  guideContentById: Record<string, string>;
  isLoadingTopic: boolean;
  isLoadingGuide: boolean;
  topicLoadError: string;
  guideLoadError: string;
  theme: Theme;
};

type InterviewAppActions = {
  setSearchValue: (value: string) => void;
  setHomeView: (value: HomeView) => void;
  setSelectedKitId: (value: string | null) => void;
  setSelectedNavId: (value: string | null) => void;
  setFocusedTopicId: (value: string | null) => void;
  setSelectedGuideId: (value: string | null) => void;
  setTopicContentById: (
    value:
      | Record<string, string>
      | ((current: Record<string, string>) => Record<string, string>),
  ) => void;
  setGuideContentById: (
    value:
      | Record<string, string>
      | ((current: Record<string, string>) => Record<string, string>),
  ) => void;
  setIsLoadingTopic: (value: boolean) => void;
  setIsLoadingGuide: (value: boolean) => void;
  setTopicLoadError: (value: string) => void;
  setGuideLoadError: (value: string) => void;
  setTheme: (value: Theme | ((current: Theme) => Theme)) => void;
};

type InterviewAppStore = InterviewAppState & InterviewAppActions;

export const useInterviewAppStore = create<InterviewAppStore>((set) => ({
  searchValue: '',
  homeView: getHomeViewFromLocation(),
  selectedKitId:
    getHomeViewFromLocation() === 'kits' ? getKitIdFromHash(interviewCatalog.groups) : null,
  selectedNavId: null,
  focusedTopicId: null,
  selectedGuideId: null,
  topicContentById: {},
  guideContentById: {},
  isLoadingTopic: false,
  isLoadingGuide: false,
  topicLoadError: '',
  guideLoadError: '',
  theme: getInitialTheme(),
  setSearchValue: (searchValue) => set({ searchValue }),
  setHomeView: (homeView) => set({ homeView }),
  setSelectedKitId: (selectedKitId) => set({ selectedKitId }),
  setSelectedNavId: (selectedNavId) => set({ selectedNavId }),
  setFocusedTopicId: (focusedTopicId) => set({ focusedTopicId }),
  setSelectedGuideId: (selectedGuideId) => set({ selectedGuideId }),
  setTopicContentById: (topicContentById) =>
    set((state) => ({
      topicContentById:
        typeof topicContentById === 'function'
          ? topicContentById(state.topicContentById)
          : topicContentById,
    })),
  setGuideContentById: (guideContentById) =>
    set((state) => ({
      guideContentById:
        typeof guideContentById === 'function'
          ? guideContentById(state.guideContentById)
          : guideContentById,
    })),
  setIsLoadingTopic: (isLoadingTopic) => set({ isLoadingTopic }),
  setIsLoadingGuide: (isLoadingGuide) => set({ isLoadingGuide }),
  setTopicLoadError: (topicLoadError) => set({ topicLoadError }),
  setGuideLoadError: (guideLoadError) => set({ guideLoadError }),
  setTheme: (theme) =>
    set((state) => ({ theme: typeof theme === 'function' ? theme(state.theme) : theme })),
}));
