import { Text } from '@/components/ui/text';
import { LanguageSelector } from '@/components/custom/start';
import { router } from 'expo-router';
import { NavArrowLeft } from 'iconoir-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Pressable, View } from 'react-native';

interface BackHeaderProps {
  showLanguageSelector?: boolean;
  onBack?: () => void;
}

export function BackHeader({ showLanguageSelector = false, onBack }: BackHeaderProps) {
  const { colorScheme } = useColorScheme();
  const textColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View className="flex-row items-center justify-between px-5 py-3">
      <Pressable onPress={handleBack} className="flex-row items-center gap-1">
        <NavArrowLeft width={20} height={20} color={textColor} />
        <Text className="text-base text-foreground">Back</Text>
      </Pressable>
      {showLanguageSelector && <LanguageSelector />}
    </View>
  );
}
