import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';

export default function OnboardingLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="work-type" />
        <Stack.Screen name="welcome-address" />
        <Stack.Screen name="personal-description" />
        <Stack.Screen name="profile-photo" />
        <Stack.Screen name="services-selection" />
        <Stack.Screen name="category-experience" />
      </Stack>
    </ThemeProvider>
  );
}
