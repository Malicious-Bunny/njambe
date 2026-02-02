import * as WebBrowser from 'expo-web-browser';
import { supabase } from '@/lib/supabase';
import { makeRedirectUri } from 'expo-auth-session';

// Note: WebBrowser.maybeCompleteAuthSession() is called lazily in functions below
// NOT at module level to prevent bundle hanging

// Get the redirect URI for OAuth callbacks
// This needs to match what's configured in Supabase Dashboard
export function getRedirectUri(): string {
  const redirectUri = makeRedirectUri({
    scheme: 'njambe',
    path: 'auth/callback',
  });

  console.log('OAuth Redirect URI:', redirectUri);
  return redirectUri;
}

export interface GoogleAuthResult {
  success: boolean;
  error?: string;
  user?: any;
  session?: any;
}

/**
 * Sign in with Google using Supabase OAuth
 * This handles the full OAuth flow for login
 */
export async function signInWithGoogle(): Promise<GoogleAuthResult> {
  try {
    // Complete any pending auth sessions
    WebBrowser.maybeCompleteAuthSession();

    const redirectUri = getRedirectUri();

    // Get the OAuth URL from Supabase
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUri,
        skipBrowserRedirect: true,
      },
    });

    if (error) {
      console.error('Supabase OAuth error:', error);
      return { success: false, error: error.message };
    }

    if (!data.url) {
      return { success: false, error: 'No OAuth URL received from Supabase' };
    }

    console.log('Opening OAuth URL:', data.url);

    // Open the browser for authentication
    const result = await WebBrowser.openAuthSessionAsync(
      data.url,
      redirectUri,
      {
        showInRecents: true,
        preferEphemeralSession: false,
      }
    );

    console.log('WebBrowser result:', result.type);

    if (result.type !== 'success') {
      if (result.type === 'cancel' || result.type === 'dismiss') {
        return { success: false, error: 'Authentication was cancelled' };
      }
      return { success: false, error: 'Authentication failed' };
    }

    // Parse the callback URL to extract tokens or code
    const url = result.url;
    console.log('Callback URL:', url);

    // Extract the fragment (hash) params - Supabase returns tokens in the hash
    const hashParams = new URLSearchParams(url.split('#')[1] || '');
    const accessToken = hashParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token');

    // Also check query params for code flow
    const queryParams = new URLSearchParams(url.split('?')[1]?.split('#')[0] || '');
    const code = queryParams.get('code');
    const errorParam = queryParams.get('error');
    const errorDescription = queryParams.get('error_description');

    if (errorParam) {
      return { success: false, error: errorDescription || errorParam };
    }

    // If we have tokens directly (implicit flow)
    if (accessToken && refreshToken) {
      const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (sessionError) {
        return { success: false, error: sessionError.message };
      }

      return {
        success: true,
        user: sessionData.user,
        session: sessionData.session,
      };
    }

    // If we have a code (PKCE flow), exchange it
    if (code) {
      const { data: sessionData, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        return { success: false, error: exchangeError.message };
      }

      return {
        success: true,
        user: sessionData.user,
        session: sessionData.session,
      };
    }

    // Try to get the current session - sometimes the auth completes in the background
    const { data: currentSession } = await supabase.auth.getSession();
    if (currentSession.session) {
      return {
        success: true,
        user: currentSession.session.user,
        session: currentSession.session,
      };
    }

    return { success: false, error: 'No authentication data received' };
  } catch (error) {
    console.error('Google auth error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

/**
 * Sign up with Google using Supabase OAuth
 * This is specifically for signup flow where we also need to create a profile
 */
export async function signUpWithGoogle(
  role: 'customer' | 'provider'
): Promise<GoogleAuthResult> {
  try {
    // Complete any pending auth sessions
    WebBrowser.maybeCompleteAuthSession();

    const redirectUri = getRedirectUri();

    // Get the OAuth URL from Supabase
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUri,
        skipBrowserRedirect: true,
        queryParams: {
          prompt: 'consent',
        },
      },
    });

    if (error) {
      console.error('Supabase OAuth error:', error);
      return { success: false, error: error.message };
    }

    if (!data.url) {
      return { success: false, error: 'No OAuth URL received from Supabase' };
    }

    console.log('Opening OAuth URL for signup:', data.url);

    // Open the browser for authentication
    const result = await WebBrowser.openAuthSessionAsync(
      data.url,
      redirectUri,
      {
        showInRecents: true,
        preferEphemeralSession: false,
      }
    );

    console.log('WebBrowser result:', result.type);

    if (result.type !== 'success') {
      if (result.type === 'cancel' || result.type === 'dismiss') {
        return { success: false, error: 'Authentication was cancelled' };
      }
      return { success: false, error: 'Authentication failed' };
    }

    // Parse the callback URL
    const url = result.url;
    console.log('Callback URL:', url);

    // Extract tokens from hash (implicit flow)
    const hashParams = new URLSearchParams(url.split('#')[1] || '');
    const accessToken = hashParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token');

    // Also check for code (PKCE flow)
    const queryParams = new URLSearchParams(url.split('?')[1]?.split('#')[0] || '');
    const code = queryParams.get('code');
    const errorParam = queryParams.get('error');
    const errorDescription = queryParams.get('error_description');

    if (errorParam) {
      return { success: false, error: errorDescription || errorParam };
    }

    let user = null;
    let session = null;

    // If we have tokens directly
    if (accessToken && refreshToken) {
      const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (sessionError) {
        return { success: false, error: sessionError.message };
      }

      user = sessionData.user;
      session = sessionData.session;
    }
    // If we have a code, exchange it
    else if (code) {
      const { data: sessionData, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        return { success: false, error: exchangeError.message };
      }

      user = sessionData.user;
      session = sessionData.session;
    }
    // Check for existing session
    else {
      const { data: currentSession } = await supabase.auth.getSession();
      if (currentSession.session) {
        user = currentSession.session.user;
        session = currentSession.session;
      }
    }

    if (!user) {
      return { success: false, error: 'No user data received' };
    }

    // Create or update the user profile with the specified role
    const fullName = user.user_metadata?.full_name || user.user_metadata?.name || '';
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const { error: profileError } = await supabase.from('users').upsert({
      id: user.id,
      first_name: firstName,
      last_name: lastName,
      email: user.email || '',
      role,
      updated_at: new Date().toISOString(),
    });

    if (profileError) {
      console.error('Error creating profile:', profileError);
      // Don't fail the auth if profile creation fails
    }

    return {
      success: true,
      user,
      session,
    };
  } catch (error) {
    console.error('Google signup error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

/**
 * Creates or updates the user profile in the database after OAuth sign-in
 * @deprecated Use signUpWithGoogle instead which handles profile creation
 */
export async function createOAuthProfile(
  userId: string,
  email: string,
  fullName: string,
  role: 'customer' | 'provider'
): Promise<{ success: boolean; error?: string }> {
  try {
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const { error } = await supabase.from('users').upsert({
      id: userId,
      first_name: firstName,
      last_name: lastName,
      email: email,
      role,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Error creating OAuth profile:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error creating OAuth profile:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create profile',
    };
  }
}
