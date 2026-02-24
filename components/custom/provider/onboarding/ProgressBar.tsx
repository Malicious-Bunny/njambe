import * as React from 'react';
import { View } from 'react-native';
import { Progress, ProgressTrack, ProgressIndicator } from '@/components/ui/progress';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  // Calculate progress percentage (currentStep is 0-indexed, so add 1 for display)
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  return (
    <View className="flex-1">
      <ProgressTrack style={{ backgroundColor: '#e5e7eb', height: 4 }}>
        <ProgressIndicator
          value={progressPercent}
          style={{ backgroundColor: '#fbbf24' }} // amber-400
          animated={true}
        />
      </ProgressTrack>
    </View>
  );
}
