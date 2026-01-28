import { create } from 'zustand';

export type Language = 'en' | 'fr';

interface AppState {
  language: Language;
  isOnboardingComplete: boolean;
}

interface AppActions {
  setLanguage: (language: Language) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

type AppStore = AppState & AppActions;

export const useAppStore = create<AppStore>((set) => ({
  // Initial state
  language: 'en',
  isOnboardingComplete: false,

  // Actions
  setLanguage: (language: Language) => {
    set({ language });
  },

  completeOnboarding: () => {
    set({ isOnboardingComplete: true });
  },

  resetOnboarding: () => {
    set({ isOnboardingComplete: false });
  },
}));
