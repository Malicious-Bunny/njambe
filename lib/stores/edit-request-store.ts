import type { CategoryIconName } from '@/lib/customer/categories';
import { create } from 'zustand';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProviderTypeEdit = 'all' | 'professionals_only';

export interface EditRequestState {
  requestId: string | null;
  title: string;
  description: string;
  categoryId: string | null;
  categoryName: string | null;
  categoryIcon: CategoryIconName | null;
  categoryColor: string | null;
  subcategoryId: string | null;
  subcategoryName: string;
  providerType: ProviderTypeEdit;
  address: string;
  photos: string[];
}

// ─── Actions ─────────────────────────────────────────────────────────────────

interface EditRequestActions {
  initFromRequest: (req: {
    id: string;
    title: string;
    description: string;
    categoryId: string;
    categoryName: string;
    categoryIcon: CategoryIconName;
    categoryColor: string;
    subcategoryName: string;
    providerType: ProviderTypeEdit;
    address: string;
  }) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setCategory: (id: string, name: string, icon: CategoryIconName, color: string) => void;
  setSubcategory: (id: string, name: string) => void;
  setProviderType: (type: ProviderTypeEdit) => void;
  setAddress: (address: string) => void;
  addPhoto: (uri: string) => void;
  removePhoto: (uri: string) => void;
  reset: () => void;
}

type EditRequestStore = EditRequestState & EditRequestActions;

// ─── Initial state ────────────────────────────────────────────────────────────

const initialState: EditRequestState = {
  requestId: null,
  title: '',
  description: '',
  categoryId: null,
  categoryName: null,
  categoryIcon: null,
  categoryColor: null,
  subcategoryId: null,
  subcategoryName: '',
  providerType: 'all',
  address: '',
  photos: [],
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useEditRequestStore = create<EditRequestStore>((set) => ({
  ...initialState,

  initFromRequest: (req) => {
    set({
      requestId: req.id,
      title: req.title,
      description: req.description,
      categoryId: req.categoryId,
      categoryName: req.categoryName,
      categoryIcon: req.categoryIcon,
      categoryColor: req.categoryColor,
      subcategoryId: null,
      subcategoryName: req.subcategoryName,
      providerType: req.providerType,
      address: req.address,
      photos: [],
    });
  },

  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),

  setCategory: (id, name, icon, color) => {
    set({
      categoryId: id,
      categoryName: name,
      categoryIcon: icon,
      categoryColor: color,
      subcategoryId: null,
      subcategoryName: '',
    });
  },

  setSubcategory: (id, name) => set({ subcategoryId: id, subcategoryName: name }),
  setProviderType: (providerType) => set({ providerType }),
  setAddress: (address) => set({ address }),

  addPhoto: (uri) => set((s) => ({ photos: [...s.photos, uri] })),
  removePhoto: (uri) => set((s) => ({ photos: s.photos.filter((p) => p !== uri) })),

  reset: () => set(initialState),
}));
