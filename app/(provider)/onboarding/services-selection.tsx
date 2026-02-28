import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { ServicesCategorySection } from '@/components/custom/provider/onboarding';
import { useProviderOnboardingStore, type CategoryExperience } from '@/lib/stores';
import { fetchServiceCategories, type ServiceCategory } from '@/lib/provider/service-categories';
import { ArrowLeftIcon } from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, View } from 'react-native';

// Map category icons to emoji for display
const CATEGORY_EMOJI_MAP: Record<string, string> = {
  Hammer: '🔨',
  Broom: '🧹',
  Leaf: '🌿',
  PawPrint: '🐾',
  Car: '🚗',
  GraduationCap: '🎓',
  BabyCarriage: '👶',
  House: '🏠',
};

export default function ServicesSelectionScreen() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const { setSelectedServices, setCategoryExperiences } = useProviderOnboardingStore();

  const [categories, setCategories] = React.useState<ServiceCategory[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch categories on mount
  React.useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchServiceCategories();
        setCategories(response.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        Alert.alert(
          'Erreur',
          'Impossible de charger les catégories. Veuillez réessayer.',
          [{ text: 'OK' }]
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleToggleSubcategory = (subcategoryId: string) => {
    setSelectedSubcategories((prev) => {
      if (prev.includes(subcategoryId)) {
        return prev.filter((id) => id !== subcategoryId);
      }
      return [...prev, subcategoryId];
    });
  };

  const handleConfirm = () => {
    if (selectedSubcategories.length === 0) {
      Alert.alert(
        'Sélection requise',
        'Veuillez sélectionner au moins un service.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Save selected services to store
    setSelectedServices(selectedSubcategories);

    // Build CategoryExperience objects grouped by category
    const categoryExperiences: CategoryExperience[] = [];

    for (const category of categories) {
      // Find all selected subcategories for this category
      const selectedSubs = category.subcategories.filter((sub) =>
        selectedSubcategories.includes(sub.id)
      );

      if (selectedSubs.length > 0) {
        categoryExperiences.push({
          categoryId: category.id,
          categoryName: category.name,
          categoryIcon: CATEGORY_EMOJI_MAP[category.icon] || '📋',
          subcategoryIds: selectedSubs.map((sub) => sub.id),
          subcategoryNames: selectedSubs.map((sub) => sub.name),
          experienceDescription: '',
        });
      }
    }

    // Save category experiences to store
    setCategoryExperiences(categoryExperiences);

    // Navigate to category experience page
    router.push('/(provider)/onboarding/category-experience');
  };

  const iconColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={iconColor} />
        <Text className="mt-4 text-muted-foreground">Chargement des services...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Header with Back Button */}
      <View className="flex-row items-center px-2 py-2">
        <Pressable
          onPress={handleBack}
          className="p-3 active:opacity-70"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeftIcon size={24} color={iconColor} weight="regular" />
        </Pressable>
      </View>

      {/* Title and Subtitle */}
      <View className="px-5">
        <Text className="text-2xl font-bold text-foreground">
          Quels services souhaitez-vous proposer ?
        </Text>
        <Text className="mt-2 text-base leading-6 text-muted-foreground">
          Découvrez et sélectionnez plusieurs compétences
        </Text>
      </View>

      {/* Categories ScrollView */}
      <ScrollView
        className="flex-1 px-5 pt-6"
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {categories.map((category) => (
          <ServicesCategorySection
            key={category.id}
            category={category}
            selectedSubcategories={selectedSubcategories}
            onToggleSubcategory={handleToggleSubcategory}
          />
        ))}
      </ScrollView>

      {/* Bottom Button */}
      <View className="px-5 pb-8 pt-4">
        <Button
          onPress={handleConfirm}
          disabled={selectedSubcategories.length === 0}
          className={`h-14 w-full rounded-xl ${
            selectedSubcategories.length > 0 ? 'bg-primary' : 'bg-muted'
          }`}
        >
          <Text
            className={`text-lg font-semibold ${
              selectedSubcategories.length > 0 ? 'text-primary-foreground' : 'text-muted-foreground'
            }`}
          >
            Confirmer
          </Text>
        </Button>
      </View>
    </View>
  );
}
