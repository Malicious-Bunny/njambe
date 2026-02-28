import { CategoriesGrid } from '@/components/custom/customer';
import { Text } from '@/components/ui/text';
import { fetchServiceCategories, type ServiceCategory } from '@/lib/customer/categories';
import { useServiceRequestStore } from '@/lib/stores';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CustomerServicesScreen() {
  const router = useRouter();
  const setCategory = useServiceRequestStore((s) => s.setCategory);
  const [categories, setCategories] = React.useState<ServiceCategory[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchServiceCategories()
      .then(setCategories)
      .finally(() => setLoading(false));
  }, []);

  const handleCategoryPress = (category: ServiceCategory) => {
    setCategory(category.id, category.name);
    router.push({
      pathname: '/(customer)/(tabs)/services/subcategories',
      params: { categoryId: category.id },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={[]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View className="px-5 pb-4 pt-3">
          <Text className="mb-1 text-3xl font-bold text-foreground">Post a request</Text>
          <Text className="text-base leading-relaxed text-muted-foreground">
            Request a service, receive offers, choose the best one and enjoy!
          </Text>
        </View>
        <CategoriesGrid
          categories={categories}
          loading={loading}
          onCategoryPress={handleCategoryPress}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
