import { Text } from '@/components/ui/text';
import type { Category } from '@/lib/customer/categories';
import * as React from 'react';
import { Pressable } from 'react-native';

interface CategoryCardProps {
  category: Category;
  onPress?: () => void;
}

export function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="items-center gap-2 rounded-2xl bg-card p-4 shadow-sm active:bg-accent dark:bg-card dark:active:bg-accent">
      <Text className="text-3xl">{category.icon}</Text>
      <Text className="text-xs font-medium text-foreground dark:text-foreground">{category.name}</Text>
    </Pressable>
  );
}
