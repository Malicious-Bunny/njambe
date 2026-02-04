import '@/global.css';

import { getUserRole, getRouteForRole } from '@/lib/auth';
import { NAV_THEME } from '@/lib/theme';
import { supabase } from '@/lib/supabase';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack, router } from 'expo-router';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Handle deep links for password reset
  React.useEffect(() => {
    const handleDeepLink = async (url: string) => {
      console.log('Deep link received:', url);

      // Check if this is a password reset link
      if (url.includes('reset-password') || url.includes('type=recovery')) {
        // Extract tokens from the URL hash fragment
        const hashIndex = url.indexOf('#');
        if (hashIndex !== -1) {
          const hashParams = new URLSearchParams(url.substring(hashIndex + 1));
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');
          const type = hashParams.get('type');

          if (type === 'recovery' && accessToken && refreshToken) {
            // Set the session with the recovery tokens
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (!error) {
              // Navigate to reset password screen
              router.replace('/auth/reset-password');
              return;
            } else {
              console.error('Error setting recovery session:', error);
            }
          }
        }
      }
    };

    // Handle initial URL (app opened via deep link)
    // Wrapped in try-catch to prevent crash on some platforms
    const checkInitialUrl = async () => {
      try {
        const url = await Linking.getInitialURL();
        if (url) {
          handleDeepLink(url);
        }
      } catch (error) {
        console.log('Could not get initial URL:', error);
      }
    };
    checkInitialUrl();

    // Handle URL changes while app is running
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Initialize auth on app start and redirect if session exists
  React.useEffect(() => {
    const initAuth = async () => {
      try {
        // Check for existing session
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error getting session:', error);
          setIsInitialized(true);
          return;
        }

        // If user has an active session, redirect to their dashboard
        if (session?.user) {
          console.log('Existing session found, redirecting user...');
          const role = await getUserRole(session.user.id, session.user.user_metadata);
          const route = getRouteForRole(role);

          // Use setTimeout to ensure navigation happens after layout is mounted
          setTimeout(() => {
            router.replace(route as any);
          }, 0);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);

      // Handle password recovery event
      if (event === 'PASSWORD_RECOVERY') {
        router.replace('/auth/reset-password');
        return;
      }

      // Handle sign out - redirect to start screen
      if (event === 'SIGNED_OUT') {
        router.replace('/');
        return;
      }

      // Handle sign in - redirect to appropriate dashboard
      if (event === 'SIGNED_IN' && session?.user) {
        const role = await getUserRole(session.user.id, session.user.user_metadata);
        const route = getRouteForRole(role);
        router.replace(route as any);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Show loading screen while initializing
  if (!isInitialized) {
    return (
      <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <View className="flex-1 bg-background items-center justify-center">
          <ActivityIndicator size="large" color={colorScheme === 'dark' ? '#fafafa' : '#18181b'} />
        </View>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(customer)" options={{ headerShown: false }} />
        <Stack.Screen name="(provider)" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/forgot-password" options={{ headerShown: false }} />
        <Stack.Screen name="auth/reset-password" options={{ headerShown: false }} />
      </Stack>
      <PortalHost />
    </ThemeProvider>
  );
}
