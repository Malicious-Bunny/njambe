import { create } from 'zustand';

// ─── State ────────────────────────────────────────────────────────────────────

export type ProviderType = 'all' | 'professionals_only';

export interface ServiceRequestState {
  // Step 1: Category selection
  categoryId: string | null;
  categoryName: string | null;

  // Step 2: Subcategory selection
  subcategoryId: string | null;
  subcategoryName: string | null;

  // Step 3: Address
  address: string;

  // Step 4: Description
  title: string;
  description: string;
  providerType: ProviderType;

  // Step 5: Scheduling (upcoming)
  scheduledDate: string | null; // ISO date string

  // Step 6: Photos (upcoming)
  photos: string[]; // local URIs

  // Step 7: Budget (upcoming)
  budget: number | null;
}

// ─── Actions ─────────────────────────────────────────────────────────────────

interface ServiceRequestActions {
  setCategory: (id: string, name: string) => void;
  setSubcategory: (id: string, name: string) => void;
  setAddress: (address: string) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setProviderType: (type: ProviderType) => void;
  setScheduledDate: (date: string | null) => void;
  addPhoto: (uri: string) => void;
  removePhoto: (uri: string) => void;
  setBudget: (budget: number | null) => void;

  // Returns the full request payload ready for the API
  getRequestData: () => ServiceRequestState;

  // Clears everything — call after successful submission or on cancel
  resetRequest: () => void;
}

type ServiceRequestStore = ServiceRequestState & ServiceRequestActions;

// ─── Initial state ────────────────────────────────────────────────────────────

const initialState: ServiceRequestState = {
  categoryId: null,
  categoryName: null,
  subcategoryId: null,
  subcategoryName: null,
  address: '',
  title: '',
  description: '',
  providerType: 'all',
  scheduledDate: null,
  photos: [],
  budget: null,
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useServiceRequestStore = create<ServiceRequestStore>((set, get) => ({
  ...initialState,

  setCategory: (id, name) => {
    // Reset downstream selections whenever category changes
    set({
      categoryId: id,
      categoryName: name,
      subcategoryId: null,
      subcategoryName: null,
    });
  },

  setSubcategory: (id, name) => {
    set({ subcategoryId: id, subcategoryName: name });
  },

  setAddress: (address) => {
    set({ address });
  },

  setTitle: (title) => {
    set({ title });
  },

  setDescription: (description) => {
    set({ description });
  },

  setProviderType: (providerType) => {
    set({ providerType });
  },

  setScheduledDate: (date) => {
    set({ scheduledDate: date });
  },

  addPhoto: (uri) => {
    set((state) => ({ photos: [...state.photos, uri] }));
  },

  removePhoto: (uri) => {
    set((state) => ({ photos: state.photos.filter((p) => p !== uri) }));
  },

  setBudget: (budget) => {
    set({ budget });
  },

  getRequestData: () => {
    const { ...state } = get();
    return state;
  },

  resetRequest: () => {
    set(initialState);
  },
}));
