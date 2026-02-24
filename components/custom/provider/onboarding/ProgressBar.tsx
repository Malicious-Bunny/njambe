import * as React from 'react';
import { View } from 'react-native';
import { Progress, ProgressTrack, ProgressIndicator } from '@/components/ui/progress';
import { useColorScheme } from 'nativewind';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const { colorScheme } = useColorScheme();

  // Calculate progress percentage (currentStep is 0-indexed, so add 1 for display)
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  // Zinc theme colors
  const trackColor = colorScheme === 'dark' ? '#27272a' : '#e4e4e7'; // zinc-800 / zinc-200
  const indicatorColor = colorScheme === 'dark' ? '#fafafa' : '#18181b'; // zinc-50 / zinc-900

  return (
    <View className="flex-1">
      <ProgressTrack style={{ backgroundColor: trackColor, height: 4 }}>
        <ProgressIndicator
          value={progressPercent}
          style={{ backgroundColor: indicatorColor }}
          animated={true}
        />
      </ProgressTrack>
    </View>
  );
}