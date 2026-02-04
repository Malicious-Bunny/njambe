import { CategoriesGrid, SearchBar } from '@/components/custom/customer';
import { EmptyState, Header, LocationSelector } from '@/components/custom/shared';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ServiceScreen() {
  const handleCategoryPress = (categoryId: number) => {
    // TODO: Navigate to category detail screen
    console.log('Category pressed:', categoryId);
  };

  const handleSearchPress = () => {
    // TODO: Navigate to search screen
    console.log('Search pressed');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <Header showBackButton={false} />

        {/* Location */}
        <LocationSelector />

        {/* Search Bar */}
        <SearchBar onPress={handleSearchPress} />

        {/* Welcome Section */}
        <View className="px-5 pb-6">
          <Text className="text-2xl font-bold text-foreground">Find skilled neighbors</Text>
          <Text className="mt-1 text-muted-foreground">
            Browse services offered by people in your community
          </Text>
        </View>

        {/* Categories Grid */}
        <CategoriesGrid onCategoryPress={handleCategoryPress} />

        {/* Recent Section Placeholder */}
        <View className="mt-8 px-5">
          <Text className="mb-4 text-lg font-semibold text-foreground">Popular near you</Text>
          <EmptyState
            title="No services available yet"
            subtitle="Check back soon!"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
