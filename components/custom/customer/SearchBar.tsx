import { Text } from '@/components/ui/text';
import { Search } from 'iconoir-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useColorScheme } from 'nativewind';

interface SearchBarProps {
  placeholder?: string;
  onPress?: () => void;
}

export function SearchBar({
  placeholder = 'What service do you need?',
  onPress,
}: SearchBarProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#71717A' : '#A1A1AA';

  return (
    <View className="px-5 pb-6">
      <Pressable
        onPress={onPress}
        className="flex-row items-center gap-3 rounded-2xl bg-card px-4 py-3.5 shadow-sm active:bg-secondary">
        <Search width={20} height={20} color={iconColor} />
        <Text className="flex-1 text-muted-foreground">{placeholder}</Text>
      </Pressable>
    </View>
  );
}
