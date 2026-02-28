import { Text } from '@/components/ui/text';
import type { ServiceCategory } from '@/lib/customer/categories';
import {
  BabyCarriageIcon,
  BookOpenIcon,
  BroomIcon,
  HeartIcon,
  LeafIcon,
  PawPrintIcon,
  TruckIcon,
  WrenchIcon,
} from 'phosphor-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';

const ICON_MAP = {
  WrenchIcon,
  BroomIcon,
  LeafIcon,
  PawPrintIcon,
  TruckIcon,
  BookOpenIcon,
  BabyCarriageIcon,
  HeartIcon,
} as const;

export interface CategoryCardProps {
  category: ServiceCategory;
  onPress?: () => void;
}

export function CategoryCard({ category, onPress }: CategoryCardProps) {
  const IconComponent = ICON_MAP[category.icon];

  return (
    <Pressable
      onPress={onPress}
      className="flex-1 items-center rounded-2xl border border-border bg-card p-4 active:bg-secondary"
    >
      <View className="mb-3 h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800">
        <IconComponent size={28} color="#ffffff" weight="regular" />
      </View>
      <Text className="mb-1 text-center text-sm font-semibold text-foreground" numberOfLines={1}>
        {category.name}
      </Text>
      <Text className="text-center text-xs text-muted-foreground" numberOfLines={3}>
        {category.description}
      </Text>
    </Pressable>
  );
}
