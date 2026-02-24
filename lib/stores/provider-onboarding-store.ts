import { create } from 'zustand';

export type WorkType = 'individual' | 'independent' | null;

// Category experience data
export interface CategoryExperience {
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  subcategoryIds: string[];
  subcategoryNames: string[];
  experienceDescription: string;
}

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

  // Step 5: Selected services (subcategory IDs)
  selectedServices: string[];

  // Step 6: Category experiences (dynamic pages based on selected categories)
  categoryExperiences: CategoryExperience[];
  currentCategoryIndex: number;
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

  // Category experience methods
  setCategoryExperiences: (experiences: CategoryExperience[]) => void;
  updateCategoryExperience: (categoryId: string, description: string) => void;
  setCurrentCategoryIndex: (index: number) => void;
  nextCategory: () => boolean; // Returns true if there are more categories
  prevCategory: () => boolean; // Returns true if went back
  getCurrentCategory: () => CategoryExperience | null;
  hasMoreCategories: () => boolean;
  isFirstCategory: () => boolean;

  // Get all data for submission
  getOnboardingData: () => Omit<ProviderOnboardingState, 'currentStep' | 'totalSteps' | 'currentCategoryIndex'>;

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
  categoryExperiences: [],
  currentCategoryIndex: 0,
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

  setCategoryExperiences: (experiences: CategoryExperience[]) => {
    set({ categoryExperiences: experiences, currentCategoryIndex: 0 });
  },

  updateCategoryExperience: (categoryId: string, description: string) => {
    const { categoryExperiences } = get();
    const updatedExperiences = categoryExperiences.map((exp) =>
      exp.categoryId === categoryId ? { ...exp, experienceDescription: description } : exp
    );
    set({ categoryExperiences: updatedExperiences });
  },

  setCurrentCategoryIndex: (index: number) => {
    set({ currentCategoryIndex: index });
  },

  nextCategory: () => {
    const { currentCategoryIndex, categoryExperiences } = get();
    if (currentCategoryIndex < categoryExperiences.length - 1) {
      set({ currentCategoryIndex: currentCategoryIndex + 1 });
      return true;
    }
    return false;
  },

  prevCategory: () => {
    const { currentCategoryIndex } = get();
    if (currentCategoryIndex > 0) {
      set({ currentCategoryIndex: currentCategoryIndex - 1 });
      return true;
    }
    return false;
  },

  getCurrentCategory: () => {
    const { categoryExperiences, currentCategoryIndex } = get();
    return categoryExperiences[currentCategoryIndex] || null;
  },

  hasMoreCategories: () => {
    const { currentCategoryIndex, categoryExperiences } = get();
    return currentCategoryIndex < categoryExperiences.length - 1;
  },

  isFirstCategory: () => {
    const { currentCategoryIndex } = get();
    return currentCategoryIndex === 0;
  },

  getOnboardingData: () => {
    const state = get();
    return {
      workType: state.workType,
      address: state.address,
      personalDescription: state.personalDescription,
      profileImage: state.profileImage,
      selectedServices: state.selectedServices,
      categoryExperiences: state.categoryExperiences,
    };
  },

  resetOnboarding: () => {
    set(initialState);
  },
}));
