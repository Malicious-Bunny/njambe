import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Crypto from 'expo-crypto';
import { supabase } from '@/lib/supabase';
import { Platform } from 'react-native';

// Warm up the browser for faster OAuth on Android
WebBrowser.maybeCompleteAuthSession();

// Supabase configuration
const SUPABASE_URL = 'https://kumbvpzqtagbpocwnrxv.supabase.co';

// Get the redirect URI based on platform
export function getRedirectUri(): string {
  // For Expo Go and development builds
  const redirectUri = AuthSession.makeRedirectUri({
    scheme: 'njambe',
    path: 'auth/callback',
  });

  return redirectUri;
}

// Generate PKCE code verifier and challenge
async function generatePKCE(): Promise<{ codeVerifier: string; codeChallenge: string }> {
  // Generate a random code verifier (43-128 characters)
  const randomBytes = await Crypto.getRandomBytesAsync(32);
  const codeVerifier = Array.from(randomBytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  // Generate code challenge using SHA-256
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    codeVerifier,
    { encoding: Crypto.CryptoEncoding.BASE64 }
  );

  // Convert to URL-safe base64
  const codeChallenge = digest
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return { codeVerifier, codeChallenge };
}

export interface GoogleAuthResult {
  success: boolean;
  error?: string;
  user?: any;
}

/**
 * Initiates Google OAuth sign-in with Supabase
 * Uses PKCE flow for secure authentication
 */
export async function signInWithGoogle(): Promise<GoogleAuthResult> {
  try {
    // Generate PKCE codes
    const { codeVerifier, codeChallenge } = await generatePKCE();

    // Get the redirect URI
    const redirectUri = getRedirectUri();

    console.log('Redirect URI:', redirectUri);

    // Build the Supabase OAuth URL
    const authUrl = new URL(`${SUPABASE_URL}/auth/v1/authorize`);
    authUrl.searchParams.set('provider', 'google');
    authUrl.searchParams.set('redirect_to', redirectUri);
    authUrl.searchParams.set('code_challenge', codeChallenge);
    authUrl.searchParams.set('code_challenge_method', 'S256');

    // Open the browser for Google sign-in
    const result = await WebBrowser.openAuthSessionAsync(
      authUrl.toString(),
      redirectUri,
      {
        showInRecents: true,
        preferEphemeralSession: false,
      }
    );

    if (result.type !== 'success') {
      if (result.type === 'cancel' || result.type === 'dismiss') {
        return { success: false, error: 'Authentication was cancelled' };
      }
      return { success: false, error: 'Authentication failed' };
    }

    // Parse the redirect URL to get the authorization code
    const url = new URL(result.url);
    const code = url.searchParams.get('code');
    const errorParam = url.searchParams.get('error');
    const errorDescription = url.searchParams.get('error_description');

    if (errorParam) {
      return { success: false, error: errorDescription || errorParam };
    }

    if (!code) {
      return { success: false, error: 'No authorization code received' };
    }

    // Exchange the code for a session using Supabase
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return { success: false, error: error.message };
    }

    if (data.session && data.user) {
      return { success: true, user: data.user };
    }

    return { success: false, error: 'Failed to establish session' };
  } catch (error) {
    console.error('Google auth error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

/**
 * Creates or updates the user profile in the database after OAuth sign-in
 */
export async function createOAuthProfile(
  userId: string,
  email: string,
  fullName: string,
  role: 'customer' | 'provider'
): Promise<{ success: boolean; error?: string }> {
  try {
    // Split full name into first and last name
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
