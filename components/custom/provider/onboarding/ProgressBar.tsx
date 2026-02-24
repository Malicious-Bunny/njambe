import * as React from 'react';
import { View } from 'react-native';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <View className="flex-row gap-2 px-5 py-3">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          className={`h-1.5 flex-1 rounded-full ${
            index <= currentStep ? 'bg-foreground' : 'bg-border'
          }`}
        />
      ))}
    </View>
  );
}
