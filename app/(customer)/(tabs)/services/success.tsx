import { CategoriesGrid } from '@/components/custom/customer';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { fetchServiceCategories, type ServiceCategory } from '@/lib/customer/categories';
import { useServiceRequestStore } from '@/lib/stores';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { CheckCircleIcon } from 'phosphor-react-native';
import * as React from 'react';
import { BackHandler, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SuccessScreen() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const setCategory = useServiceRequestStore((s) => s.setCategory);

  const [categories, setCategories] = React.useState<ServiceCategory[]>([]);
  const [loading, setLoading] = React.useState(true);

  const iconColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';

  // Block Android hardware back button
  React.useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => sub.remove();
  }, []);

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

  const handleViewRequests = () => {
    router.navigate('/(customer)/(tabs)/requests');
  };

  const handleNewRequest = () => {
    router.navigate('/(customer)/(tabs)/services');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={[]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Success hero */}
        <View className="items-center px-8 pb-8 pt-10">
          <View className="mb-5 h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <CheckCircleIcon size={52} color={iconColor} weight="duotone" />
          </View>
          <Text className="mb-3 text-center text-2xl font-bold text-foreground">
            Request submitted!
          </Text>
          <Text className="text-center text-base leading-relaxed text-muted-foreground">
            Providers near you will review your request and reach out to you shortly.
          </Text>
        </View>

        {/* Divider */}
        <View className="h-px mx-4 bg-border" />

        {/* Suggested categories */}
        <View className="pt-6">
          <View className="px-5 pb-4">
            <Text className="text-xl font-bold text-foreground">Explore other services</Text>
            <Text className="mt-1 text-sm text-muted-foreground">
              Need something else? Post another request.
            </Text>
          </View>
          <CategoriesGrid
            categories={categories}
            loading={loading}
            onCategoryPress={handleCategoryPress}
          />
        </View>
      </ScrollView>

      {/* CTAs */}
      <View className="gap-3 border-t border-border px-4 pb-3 pt-3">
        <Button onPress={handleViewRequests}>
          <Text className="font-semibold text-primary-foreground">Continue to requests</Text>
        </Button>
        <Button variant="outline" onPress={handleNewRequest}>
          <Text className="font-semibold text-foreground">Enter new request</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
