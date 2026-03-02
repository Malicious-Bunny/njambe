import { PageHeader } from '@/components/custom/shared';
import { Text } from '@/components/ui/text';
import { fetchSubcategories, type ServiceSubcategory } from '@/lib/customer/categories';
import { useEditRequestStore } from '@/lib/stores';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { CaretRightIcon } from 'phosphor-react-native';
import * as React from 'react';
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditSubcategoryScreen() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const iconColor = colorScheme === 'dark' ? '#a1a1aa' : '#71717a';

  const setSubcategory = useEditRequestStore((s) => s.setSubcategory);

  const [subcategories, setSubcategories] = React.useState<ServiceSubcategory[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!categoryId) return;
    setLoading(true);
    fetchSubcategories(categoryId)
      .then(setSubcategories)
      .finally(() => setLoading(false));
  }, [categoryId]);

  const handleSubcategoryPress = (sub: ServiceSubcategory) => {
    setSubcategory(sub.id, sub.name);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={[]}>
      <PageHeader title="Edit request" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View className="px-5 pb-4 pt-2">
          <Text className="text-sm font-medium text-muted-foreground">Sub-category</Text>
        </View>
        {loading ? (
          <View className="items-center py-16">
            <ActivityIndicator
              size="large"
              color={colorScheme === 'dark' ? '#fafafa' : '#18181b'}
            />
          </View>
        ) : (
          <View className="gap-2 px-4">
            {subcategories.map((sub) => (
              <Pressable
                key={sub.id}
                onPress={() => handleSubcategoryPress(sub)}
                className="flex-row items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 active:bg-secondary"
              >
                <Text className="text-base text-foreground">{sub.name}</Text>
                <CaretRightIcon size={18} color={iconColor} weight="regular" />
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
