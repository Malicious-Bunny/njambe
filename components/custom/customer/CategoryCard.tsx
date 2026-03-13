import { Text } from '@/components/ui/text';
import type { ServiceCategory } from '@/lib/customer/categories';
import * as React from 'react';
import { Image, Pressable, View } from 'react-native';

export interface CategoryCardProps {
  category: ServiceCategory;
  onPress?: () => void;
}

export function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <Pressable onPress={onPress} className="flex-1 active:opacity-75">
      <View className="mb-2.5 w-full overflow-hidden rounded-2xl" style={{ aspectRatio: 4 / 3 }}>
        <Image
          source={{ uri: category.image }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
      <Text className="text-sm font-semibold text-foreground" numberOfLines={2}>
        {category.name}
      </Text>
    </Pressable>
  );
}
