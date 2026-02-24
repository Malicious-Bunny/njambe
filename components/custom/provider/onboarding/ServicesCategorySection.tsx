import { Text } from '@/components/ui/text';
import type { ServiceCategory, ServiceSubcategory } from '@/lib/provider/service-categories';
import {
  Hammer,
  HandCard,
  Leaf,
  Paw,
  Car,
  GraduationCap,
  Stroller,
  HomeSimpleDoor,
} from 'iconoir-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Pressable, View } from 'react-native';

// Icon mapping for categories
const CATEGORY_ICONS = {
  Hammer,
  HandCard,
  Leaf,
  Paw,
  Car,
  GraduationCap,
  Stroller,
  HomeSimpleDoor,
} as const;

interface ServicesCategorySectionProps {
  category: ServiceCategory;
  selectedSubcategories: string[];
  onToggleSubcategory: (subcategoryId: string) => void;
}

export function ServicesCategorySection({
  category,
  selectedSubcategories,
  onToggleSubcategory,
}: ServicesCategorySectionProps) {
  const { colorScheme } = useColorScheme();
  const IconComponent = CATEGORY_ICONS[category.icon];

  const iconColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';

  return (
    <View className="mb-6">
      {/* Category Header */}
      <View className="mb-3 flex-row items-center gap-2">
        <IconComponent width={24} height={24} color={iconColor} strokeWidth={1.5} />
        <Text className="text-lg font-semibold text-foreground">{category.name}</Text>
      </View>

      {/* Subcategories Chips */}
      <View className="flex-row flex-wrap gap-2">
        {category.subcategories.map((subcategory) => {
          const isSelected = selectedSubcategories.includes(subcategory.id);

          return (
            <Pressable
              key={subcategory.id}
              onPress={() => onToggleSubcategory(subcategory.id)}
              className="active:opacity-70"
            >
              <View
                className={`rounded-full border px-4 py-2 ${
                  isSelected
                    ? 'border-primary bg-primary'
                    : 'border-border bg-card'
                }`}
              >
                <Text
                  className={`text-sm ${
                    isSelected ? 'font-medium text-primary-foreground' : 'text-foreground'
                  }`}
                >
                  {subcategory.name}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
