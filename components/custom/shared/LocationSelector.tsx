import { Text } from '@/components/ui/text';
import { MapPin } from 'iconoir-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useColorScheme } from 'nativewind';

interface LocationSelectorProps {
  location?: string;
  onChangePress?: () => void;
}

export function LocationSelector({
  location = 'Douala, Cameroon',
  onChangePress,
}: LocationSelectorProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';

  return (
    <View className="flex-row items-center gap-2 px-5 pb-4">
      <MapPin width={18} height={18} color={iconColor} />
      <Text className="text-sm text-muted-foreground dark:text-muted-foreground">{location}</Text>
      <Pressable onPress={onChangePress}>
        <Text className="text-sm text-primary dark:text-primary">Change</Text>
      </Pressable>
    </View>
  );
}
