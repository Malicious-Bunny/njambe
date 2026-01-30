import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { NavArrowLeft } from 'iconoir-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useColorScheme } from 'nativewind';

interface PageHeaderProps {
  title: string;
  onBackPress?: () => void;
}

export function PageHeader({ title, onBackPress }: PageHeaderProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#FAFAFA' : '#18181B';

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View className="flex-row items-center px-4 pt-2 pb-4">
      <Pressable onPress={handleBack} className="p-2">
        <NavArrowLeft width={24} height={24} color={iconColor} />
      </Pressable>
      <View className="flex-1 items-center pr-10">
        <Text className="text-lg font-semibold text-foreground">{title}</Text>
      </View>
    </View>
  );
}
