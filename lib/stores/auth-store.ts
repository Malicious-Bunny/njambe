import { create } from 'zustand';
import type { Country } from '@/lib/customer/countries';
import { DEFAULT_COUNTRY } from '@/lib/customer/countries';

// User types
export type UserRole = 'customer' | 'provider';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: Country;
  role: UserRole;
  acceptsPromos: boolean;
  createdAt: Date;
}

// Auth state
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Auth actions
interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  socialLogin: (provider: 'google' | 'linkedin' | 'apple') => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: Country;
  role: UserRole;
  acceptsPromos: boolean;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Actions
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implement actual login API call
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock user for now
      const mockUser: User = {
        id: '1',
        firstName: 'User',
        lastName: 'Test',
        email,
        country: DEFAULT_COUNTRY,
        role: 'customer',
        acceptsPromos: false,
        createdAt: new Date(),
      };

      set({ user: mockUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false
      });
    }
  },

  signup: async (data: SignupData) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implement actual signup API call
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newUser: User = {
        id: Math.random().toString(36).substring(7),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        country: data.country,
        role: data.role,
        acceptsPromos: data.acceptsPromos,
        createdAt: new Date(),
      };

      set({ user: newUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Signup failed',
        isLoading: false
      });
    }
  },

  socialLogin: async (provider: 'google' | 'linkedin' | 'apple') => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implement actual social login
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockUser: User = {
        id: Math.random().toString(36).substring(7),
        firstName: 'Social',
        lastName: 'User',
        email: `user@${provider}.com`,
        country: DEFAULT_COUNTRY,
        role: 'customer',
        acceptsPromos: false,
        createdAt: new Date(),
      };

      set({ user: mockUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Social login failed',
        isLoading: false
      });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, error: null });
  },

  clearError: () => {
    set({ error: null });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));
