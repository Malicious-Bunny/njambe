import { Text } from '@/components/ui/text';
import * as React from 'react';
import { Pressable, View } from 'react-native';

interface LanguageSelectorProps {
  onPress?: () => void;
}

export function LanguageSelector({ onPress }: LanguageSelectorProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-2 rounded-full bg-secondary px-3 py-2 shadow-sm">
      {/* Cameroon Flag */}
      <View className="h-6 w-6 overflow-hidden rounded-full border border-border flex-row">
        <View className="w-1/3 bg-green-600" />
        <View className="relative w-1/3 items-center justify-center bg-red-500">
          <Text className="absolute text-[8px] text-yellow-400">★</Text>
        </View>
        <View className="w-1/3 bg-yellow-400" />
      </View>
      <Text className="text-sm font-semibold text-foreground">EN</Text>
    </Pressable>
  );
}
