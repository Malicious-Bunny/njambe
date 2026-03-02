import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RequestsStackLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <SafeAreaView className="flex-1 bg-background" edges={['top']}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
      </SafeAreaView>
    </ThemeProvider>
  );
}
