import { Text } from '@/components/ui/text';
import { CATEGORIES } from '@/lib/customer/categories';
import * as React from 'react';
import { View } from 'react-native';
import { CategoryCard } from './CategoryCard';

interface CategoriesGridProps {
  onCategoryPress?: (categoryId: number) => void;
}

export function CategoriesGrid({ onCategoryPress }: CategoriesGridProps) {
  return (
    <View className="px-5">
      <Text className="mb-4 text-lg font-semibold text-foreground dark:text-foreground">Categories</Text>
      <View className="flex-row flex-wrap gap-3">
        {CATEGORIES.map((category) => (
          <View key={category.id} className="w-[22%]">
            <CategoryCard
              category={category}
              onPress={() => onCategoryPress?.(category.id)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
