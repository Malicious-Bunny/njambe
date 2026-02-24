import * as React from 'react';
import { View } from 'react-native';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  // Calculate progress percentage (currentStep is 0-indexed, so add 1 for display)
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  return (
    <View className="h-1 flex-1 rounded-full bg-border overflow-hidden">
      <View
        className="h-full rounded-full bg-amber-400"
        style={{ width: `${progressPercent}%` }}
      />
    </View>
  );
}
