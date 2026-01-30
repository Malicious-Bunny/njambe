import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View } from 'react-native';

interface NjambeLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export function NjambeLogo({ size = 'lg' }: NjambeLogoProps) {
  const textSize = size === 'lg' ? 'text-3xl' : size === 'md' ? 'text-2xl' : 'text-xl';
  const dotSize = size === 'lg' ? 'h-1.5 w-1.5' : size === 'md' ? 'h-1 w-1' : 'h-0.5 w-0.5';
  const dotSpacing = size === 'lg' ? 'ml-1' : 'ml-0.5';

  return (
    <View className="flex-row items-center">
      <Text className={`${textSize} font-bold tracking-tight text-foreground`}>njam</Text>
      <Text className={`${textSize} font-bold tracking-tight text-primary dark:text-primary`}>be</Text>
      <View className={`${dotSpacing} flex-col gap-0.5`}>
        <View className="flex-row gap-0.5">
          <View className={`${dotSize} rounded-full bg-primary`} />
          <View className={`${dotSize} rounded-full bg-muted-foreground`} />
        </View>
        <View className="flex-row gap-0.5">
          <View className={`${dotSize} rounded-full bg-muted-foreground`} />
          <View className={`${dotSize} rounded-full bg-primary`} />
        </View>
      </View>
    </View>
  );
}
