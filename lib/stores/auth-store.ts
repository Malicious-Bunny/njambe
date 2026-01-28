import { create } from 'zustand';
import type { Country } from '@/lib/customer/countries';
import { DEFAULT_COUNTRY } from '@/lib/customer/countries';
import { supabase, isSupabaseConfigured, type UserProfile } from '@/lib/supabase';
import type { AuthError, User as SupabaseUser, Session } from '@supabase/supabase-js';

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
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

// Auth actions
interface AuthActions {
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  socialLogin: (provider: 'google' | 'linkedin' | 'apple') => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  refreshSession: () => Promise<void>;
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

// Helper to convert Supabase user to app user
const mapSupabaseUserToUser = (
  supabaseUser: SupabaseUser,
  profile?: UserProfile | null
): User => {
  return {
    id: supabaseUser.id,
    firstName: profile?.first_name || supabaseUser.user_metadata?.first_name || '',
    lastName: profile?.last_name || supabaseUser.user_metadata?.last_name || '',
    email: supabaseUser.email || '',
    country: profile
      ? { code: profile.country_code, name: profile.country_name, emoji: '🇨🇲' }
      : DEFAULT_COUNTRY,
    role: (profile?.role as UserRole) || 'customer',
    acceptsPromos: profile?.accepts_promos || false,
    createdAt: new Date(supabaseUser.created_at),
  };
};

// Helper to format auth errors
const formatAuthError = (error: AuthError): string => {
  switch (error.message) {
    case 'Invalid login credentials':
      return 'Invalid email or password';
    case 'Email not confirmed':
      return 'Please verify your email before logging in';
    case 'User already registered':
      return 'An account with this email already exists';
    case 'Password should be at least 6 characters':
      return 'Password must be at least 6 characters';
    case 'Unable to validate email address: invalid format':
      return 'Please enter a valid email address';
    default:
      return error.message || 'An unexpected error occurred';
  }
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Initial state
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isInitialized: false,

  // Initialize auth state (call on app start)
  initialize: async () => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured. Running in mock mode.');
      set({ isInitialized: true });
      return;
    }

    try {
      set({ isLoading: true });

      // Get current session
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error);
        set({ isInitialized: true, isLoading: false });
        return;
      }

      if (session?.user) {
        // Fetch user profile from database
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        const user = mapSupabaseUserToUser(session.user, profile);
        set({
          user,
          session,
          isAuthenticated: true,
          isInitialized: true,
          isLoading: false,
        });
      } else {
        set({ isInitialized: true, isLoading: false });
      }

      // Listen for auth state changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          const user = mapSupabaseUserToUser(session.user, profile);
          set({ user, session, isAuthenticated: true });
        } else if (event === 'SIGNED_OUT') {
          set({ user: null, session: null, isAuthenticated: false });
        } else if (event === 'TOKEN_REFRESHED' && session) {
          set({ session });
        }
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ isInitialized: true, isLoading: false });
    }
  },

  // Login with email and password
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    if (!isSupabaseConfigured()) {
      // Mock mode for development
      await new Promise((resolve) => setTimeout(resolve, 500));
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
      return { success: true };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const errorMessage = formatAuthError(error);
        set({ error: errorMessage, isLoading: false });
        return { success: false, error: errorMessage };
      }

      if (data.user) {
        // Fetch user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        const user = mapSupabaseUserToUser(data.user, profile);
        set({
          user,
          session: data.session,
          isAuthenticated: true,
          isLoading: false,
        });
        return { success: true };
      }

      set({ isLoading: false });
      return { success: false, error: 'Login failed' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  // Signup with email and password
  signup: async (data: SignupData) => {
    set({ isLoading: true, error: null });

    if (!isSupabaseConfigured()) {
      // Mock mode for development
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
      return { success: true };
    }

    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            role: data.role,
          },
        },
      });

      if (authError) {
        const errorMessage = formatAuthError(authError);
        set({ error: errorMessage, isLoading: false });
        return { success: false, error: errorMessage };
      }

      if (authData.user) {
        // Create user profile in database
        const { error: profileError } = await supabase.from('profiles').upsert({
          id: authData.user.id,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          country_code: data.country.code,
          country_name: data.country.name,
          role: data.role,
          accepts_promos: data.acceptsPromos,
          updated_at: new Date().toISOString(),
        });

        if (profileError) {
          console.error('Error creating profile:', profileError);
          // Don't fail signup if profile creation fails - user can update later
        }

        const user: User = {
          id: authData.user.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          country: data.country,
          role: data.role,
          acceptsPromos: data.acceptsPromos,
          createdAt: new Date(),
        };

        set({
          user,
          session: authData.session,
          isAuthenticated: true,
          isLoading: false,
        });

        return { success: true };
      }

      set({ isLoading: false });
      return { success: false, error: 'Signup failed' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed';
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  // Social login (OAuth)
  socialLogin: async (provider: 'google' | 'linkedin' | 'apple') => {
    set({ isLoading: true, error: null });

    if (!isSupabaseConfigured()) {
      // Mock mode for development
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
      return { success: true };
    }

    try {
      // Map provider names to Supabase OAuth providers
      const oauthProvider = provider === 'linkedin' ? 'linkedin_oidc' : provider;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: oauthProvider as 'google' | 'apple' | 'linkedin_oidc',
        options: {
          skipBrowserRedirect: true, // For React Native, we handle redirect differently
        },
      });

      if (error) {
        const errorMessage = formatAuthError(error);
        set({ error: errorMessage, isLoading: false });
        return { success: false, error: errorMessage };
      }

      // OAuth will redirect and onAuthStateChange will handle the rest
      set({ isLoading: false });
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Social login failed';
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  // Logout
  logout: async () => {
    set({ isLoading: true });

    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }

    set({
      user: null,
      session: null,
      isAuthenticated: false,
      error: null,
      isLoading: false,
    });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Set loading state
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  // Refresh session
  refreshSession: async () => {
    if (!isSupabaseConfigured()) return;

    try {
      const { data: { session }, error } = await supabase.auth.refreshSession();
      if (!error && session) {
        set({ session });
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
    }
  },
}));
