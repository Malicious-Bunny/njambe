import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View } from 'react-native';

interface ErrorBannerProps {
  message: string | null;
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  if (!message) return null;

  return (
    <View className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
      <Text className="text-sm text-red-600 dark:text-red-400 text-center">
        {message}
      </Text>
    </View>
  );
}
