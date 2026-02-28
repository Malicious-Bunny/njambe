import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { Stack, usePathname } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Animated, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Route → step number (1-indexed; 0 = no bar)
const STEP_MAP: Record<string, number> = {
  subcategories: 1,
  address: 2,
  description: 3,
  photos: 4,
  review: 5,
};

const TOTAL_STEPS = 5;

const PROGRESS_ROUTES = new Set(Object.keys(STEP_MAP));

export default function ServicesStackLayout() {
  const { colorScheme } = useColorScheme();
  const pathname = usePathname();

  const currentRoute = React.useMemo(() => {
    const parts = pathname.split('/');
    return parts[parts.length - 1] ?? '';
  }, [pathname]);

  const showProgress = PROGRESS_ROUTES.has(currentRoute);
  const currentStep = STEP_MAP[currentRoute] ?? 0;

  // Single Animated.Value that persists across route changes — no bar remount
  const progressAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!showProgress) return;
    Animated.timing(progressAnim, {
      toValue: currentStep / TOTAL_STEPS,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentStep, showProgress]);

  const trackColor = colorScheme === 'dark' ? '#27272a' : '#e4e4e7';
  const fillColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <SafeAreaView className="flex-1 bg-background" edges={['top']}>
        {/* Progress bar — mounted once, animates on step change, never remounts */}
        {showProgress && (
          <View style={{ height: 3, width: '100%', backgroundColor: trackColor }}>
            <Animated.View
              style={{
                height: '100%',
                backgroundColor: fillColor,
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              }}
            />
          </View>
        )}

        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: 'transparent' },
          }}
        >
          <Stack.Screen name="success" options={{ gestureEnabled: false }} />
        </Stack>
      </SafeAreaView>
    </ThemeProvider>
  );
}
