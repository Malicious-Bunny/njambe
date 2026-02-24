import { create } from 'zustand';

export type WorkType = 'individual' | 'independent' | null;

export interface ProviderOnboardingState {
  // Step tracking
  currentStep: number;
  totalSteps: number;

  // Step 1: Work type
  workType: WorkType;

  // Step 2: Address
  address: string;

  // Step 3: Personal description
  personalDescription: string;

  // Step 4: Profile photo
  profileImage: string | null;

  // Step 5: Selected services
  selectedServices: string[];
}

interface ProviderOnboardingActions {
  // Navigation
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  // Data setters
  setWorkType: (type: WorkType) => void;
  setAddress: (address: string) => void;
  setPersonalDescription: (description: string) => void;
  setProfileImage: (uri: string | null) => void;
  setSelectedServices: (services: string[]) => void;

  // Get all data for submission
  getOnboardingData: () => Omit<ProviderOnboardingState, 'currentStep' | 'totalSteps'>;

  // Reset store
  resetOnboarding: () => void;
}

type ProviderOnboardingStore = ProviderOnboardingState & ProviderOnboardingActions;

const initialState: ProviderOnboardingState = {
  currentStep: 0,
  totalSteps: 5,
  workType: null,
  address: '',
  personalDescription: '',
  profileImage: null,
  selectedServices: [],
};

export const useProviderOnboardingStore = create<ProviderOnboardingStore>((set, get) => ({
  ...initialState,

  setCurrentStep: (step: number) => {
    set({ currentStep: step });
  },

  nextStep: () => {
    const { currentStep, totalSteps } = get();
    if (currentStep < totalSteps - 1) {
      set({ currentStep: currentStep + 1 });
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 });
    }
  },

  setWorkType: (type: WorkType) => {
    set({ workType: type });
  },

  setAddress: (address: string) => {
    set({ address });
  },

  setPersonalDescription: (description: string) => {
    set({ personalDescription: description });
  },

  setProfileImage: (uri: string | null) => {
    set({ profileImage: uri });
  },

  setSelectedServices: (services: string[]) => {
    set({ selectedServices: services });
  },

  getOnboardingData: () => {
    const state = get();
    return {
      workType: state.workType,
      address: state.address,
      personalDescription: state.personalDescription,
      profileImage: state.profileImage,
      selectedServices: state.selectedServices,
    };
  },

  resetOnboarding: () => {
    set(initialState);
  },
}));
