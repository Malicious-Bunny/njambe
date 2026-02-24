import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { ProgressBar, ServicesCategorySection } from '@/components/custom/provider/onboarding';
import { useProviderOnboardingStore } from '@/lib/stores';
import { fetchServiceCategories, type ServiceCategory } from '@/lib/provider/service-categories';
import { supabase } from '@/lib/supabase';
import { ArrowLeft } from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ServicesSelectionScreen() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const { getOnboardingData, setSelectedServices, resetOnboarding } = useProviderOnboardingStore();

  const [categories, setCategories] = React.useState<ServiceCategory[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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

  const handleConfirm = async () => {
    if (selectedSubcategories.length === 0) {
      Alert.alert(
        'Sélection requise',
        'Veuillez sélectionner au moins un service.',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsSubmitting(true);
    try {
      // Save selected services to store
      setSelectedServices(selectedSubcategories);

      const onboardingData = getOnboardingData();
      console.log('Submitting onboarding data:', {
        ...onboardingData,
        selectedServices: selectedSubcategories,
      });

      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('User not authenticated');
      }

      // Update user profile in database
      const { error: updateError } = await supabase
        .from('users')
        .update({
          work_type: onboardingData.workType,
          address: onboardingData.address,
          personal_description: onboardingData.personalDescription,
          profile_image: onboardingData.profileImage,
          selected_services: selectedSubcategories,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('Error updating profile:', updateError);
        // Continue anyway for now, as table might not have these columns yet
      }

      // Reset onboarding store
      resetOnboarding();

      // Navigate to provider tabs
      router.replace('/(provider)/(tabs)');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      Alert.alert(
        'Erreur',
        'Un problème est survenu lors de la sauvegarde. Veuillez réessayer.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const iconColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={iconColor} />
        <Text className="mt-4 text-muted-foreground">Chargement des services...</Text>
      </SafeAreaView>
    );
  }

  if (isSubmitting) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={iconColor} />
        <Text className="mt-4 text-muted-foreground">Sauvegarde en cours...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Progress Bar - Full width aligned with content */}
      <View className="px-5 pt-2">
        <ProgressBar currentStep={2} totalSteps={3} />
      </View>

      {/* Header with Back Button */}
      <View className="flex-row items-center px-2 py-2">
        <Pressable
          onPress={handleBack}
          className="p-3 active:opacity-70"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={24} color={iconColor} weight="bold" />
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
    </SafeAreaView>
  );
}
