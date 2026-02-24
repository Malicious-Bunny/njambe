import { ProgressBar } from '@/components/custom/provider/onboarding';
import { NAV_THEME } from '@/lib/theme';
import { useProviderOnboardingStore } from '@/lib/stores';
import { ThemeProvider } from '@react-navigation/native';
import { Stack, usePathname } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Route to step mapping
const ROUTE_STEP_MAP: Record<string, number> = {
  'work-type': 0,
  'welcome-address': 1,
  'personal-description': 2,
  'profile-photo': 3,
  'services-selection': 4,
  'category-experience': 5,
};

// Routes where progress bar should be visible
const PROGRESS_BAR_ROUTES = [
  'personal-description',
  'profile-photo',
  'services-selection',
  'category-experience',
];

// Total number of steps (excluding category-experience which is dynamic)
const TOTAL_BASE_STEPS = 5;

export default function OnboardingLayout() {
  const { colorScheme } = useColorScheme();
  const pathname = usePathname();
  const { categoryExperiences, currentCategoryIndex } = useProviderOnboardingStore();

  // Extract the current route name from pathname
  const currentRoute = React.useMemo(() => {
    // pathname will be like "/(provider)/onboarding/personal-description"
    const parts = pathname.split('/');
    return parts[parts.length - 1] || '';
  }, [pathname]);

  // Calculate current step based on route
  const currentStep = React.useMemo(() => {
    const baseStep = ROUTE_STEP_MAP[currentRoute] ?? 0;

    // For category-experience, add progress through categories
    if (currentRoute === 'category-experience' && categoryExperiences.length > 0) {
      const categoryProgress = currentCategoryIndex / categoryExperiences.length;
      return baseStep + categoryProgress * 0.9;
    }

    return baseStep;
  }, [currentRoute, categoryExperiences.length, currentCategoryIndex]);

  // Calculate total steps (base steps + dynamic category steps)
  const totalSteps = React.useMemo(() => {
    if (categoryExperiences.length > 0) {
      return TOTAL_BASE_STEPS + 1; // Add 1 for the category-experience step
    }
    return TOTAL_BASE_STEPS;
  }, [categoryExperiences.length]);

  // Check if progress bar should be visible
  const showProgressBar = PROGRESS_BAR_ROUTES.includes(currentRoute);

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <SafeAreaView className="flex-1 bg-background" edges={['top']}>
        {/* Persistent Progress Bar */}
        {showProgressBar && (
          <View className="px-5 pt-2">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </View>
        )}

        {/* Stack Navigator */}
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: 'transparent' },
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
      </SafeAreaView>
    </ThemeProvider>
  );
}
