import { NjambeLogo } from '@/components/custom/start/NjambeLogo';
import { router } from 'expo-router';
import { NavArrowLeft, Bell } from 'iconoir-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Pressable, View } from 'react-native';

interface HeaderProps {
  showBackButton?: boolean;
  showNotification?: boolean;
  onBackPress?: () => void;
  onNotificationPress?: () => void;
}

export function Header({
  showBackButton = true,
  showNotification = true,
  onBackPress,
  onNotificationPress,
}: HeaderProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
      {showBackButton ? (
        <Pressable onPress={handleBack} className="p-2">
          <NavArrowLeft width={24} height={24} color={iconColor} />
        </Pressable>
      ) : (
        <View className="w-10" />
      )}
      <NjambeLogo size="md" />
      {showNotification ? (
        <Pressable onPress={onNotificationPress} className="p-2">
          <Bell width={24} height={24} color={iconColor} />
        </Pressable>
      ) : (
        <View className="w-10" />
      )}
    </View>
  );
}
