import type { ServiceCategory } from '@/lib/customer/categories';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { CategoryCard } from './CategoryCard';

interface CategoriesGridProps {
  categories: ServiceCategory[];
  loading: boolean;
  onCategoryPress?: (category: ServiceCategory) => void;
}

export function CategoriesGrid({ categories, loading, onCategoryPress }: CategoriesGridProps) {
  const { colorScheme } = useColorScheme();

  if (loading) {
    return (
      <View className="items-center py-20">
        <ActivityIndicator
          size="large"
          color={colorScheme === 'dark' ? '#fafafa' : '#18181b'}
        />
      </View>
    );
  }

  const rows: ServiceCategory[][] = [];
  for (let i = 0; i < categories.length; i += 2) {
    rows.push(categories.slice(i, i + 2));
  }

  return (
    <View className="gap-3 px-4">
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row gap-3">
          {row.map((category) => (
            <View key={category.id} className="flex-1">
              <CategoryCard
                category={category}
                onPress={() => onCategoryPress?.(category)}
              />
            </View>
          ))}
          {row.length === 1 && <View className="flex-1" />}
        </View>
      ))}
    </View>
  );
}
