import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useProviderOnboardingStore } from '@/lib/stores';
import { supabase } from '@/lib/supabase';
import { ArrowLeft } from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';

export default function CategoryExperienceScreen() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const {
    getCurrentCategory,
    updateCategoryExperience,
    nextCategory,
    prevCategory,
    hasMoreCategories,
    isFirstCategory,
    categoryExperiences,
    currentCategoryIndex,
    getOnboardingData,
    resetOnboarding,
  } = useProviderOnboardingStore();

  const [description, setDescription] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const slideAnim = React.useRef(new Animated.Value(0)).current;
  const [displayedIndex, setDisplayedIndex] = React.useState(currentCategoryIndex);

  const currentCategory = getCurrentCategory();
  const totalCategories = categoryExperiences.length;

  // Animate when category index changes
  React.useEffect(() => {
    if (displayedIndex !== currentCategoryIndex) {
      // Determine slide direction
      const isGoingForward = currentCategoryIndex > displayedIndex;
      const slideOutValue = isGoingForward ? -30 : 30;
      const slideInValue = isGoingForward ? 30 : -30;

      // Animate out
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: slideOutValue,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Update displayed index
        setDisplayedIndex(currentCategoryIndex);

        // Reset slide position for entrance
        slideAnim.setValue(slideInValue);

        // Animate in
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.spring(slideAnim, {
            toValue: 0,
            friction: 8,
            tension: 60,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }
  }, [currentCategoryIndex, displayedIndex]);

  // Initialize description from store when category changes
  React.useEffect(() => {
    if (currentCategory) {
      setDescription(currentCategory.experienceDescription || '');
    }
  }, [currentCategoryIndex, currentCategory?.categoryId]);

  const handleBack = () => {
    // Save current description before going back
    if (currentCategory) {
      updateCategoryExperience(currentCategory.categoryId, description);
    }

    // If first category, go back to services-selection
    if (isFirstCategory()) {
      router.back();
    } else {
      // Go to previous category
      prevCategory();
    }
  };

  const handleSkip = () => {
    // Don't save description (or save empty), just move forward
    if (currentCategory) {
      updateCategoryExperience(currentCategory.categoryId, '');
    }

    if (hasMoreCategories()) {
      nextCategory();
    } else {
      handleCompleteOnboarding();
    }
  };

  const handleContinue = () => {
    // Save the current description
    if (currentCategory) {
      updateCategoryExperience(currentCategory.categoryId, description);
    }

    if (hasMoreCategories()) {
      nextCategory();
    } else {
      handleCompleteOnboarding();
    }
  };

  const handleCompleteOnboarding = async () => {
    setIsSubmitting(true);
    try {
      const onboardingData = getOnboardingData();
      console.log('Submitting onboarding data:', onboardingData);

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
          selected_services: onboardingData.selectedServices,
          category_experiences: onboardingData.categoryExperiences,
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
  const placeholderColor = colorScheme === 'dark' ? '#71717a' : '#a1a1aa';

  // If no category data, show loading or error
  if (!currentCategory) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-muted-foreground">Aucune catégorie sélectionnée</Text>
        <Button onPress={() => router.back()} className="mt-4">
          <Text>Retour</Text>
        </Button>
      </View>
    );
  }

  if (isSubmitting) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={iconColor} />
        <Text className="mt-4 text-muted-foreground">Sauvegarde en cours...</Text>
      </View>
    );
  }

  // Format subcategories in brackets
  const subcategoriesText = `(${currentCategory.subcategoryNames.join(', ')})`;

  return (
    <View className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header with Back Button */}
        <View className="flex-row items-center px-2 py-2">
          <Pressable
            onPress={handleBack}
            className="p-3 active:opacity-70"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeft size={24} color={iconColor} weight="regular" />
          </Pressable>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Animated Main Content */}
          <Animated.View
            className="flex-1 px-5"
            style={{
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
            }}
          >
            {/* Title with category emoji, name and subcategories in brackets */}
            <Text className="text-xl font-bold text-foreground">
              Décrivez votre expérience en
            </Text>
            <Text className="mt-1 text-xl font-bold text-foreground">
              {currentCategory.categoryIcon} {currentCategory.categoryName}
            </Text>
            <Text className="mt-1 text-base leading-6 text-muted-foreground">
              {subcategoriesText}
            </Text>

            {/* Textarea for experience description */}
            <View className="mt-6 flex-1">
              <View className="min-h-[200px] rounded-2xl border border-border bg-card p-4">
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Écrivez votre description de compétence"
                  placeholderTextColor={placeholderColor}
                  multiline
                  textAlignVertical="top"
                  className="flex-1 text-base text-foreground"
                  style={{ minHeight: 180, color: colorScheme === 'dark' ? '#fafafa' : '#18181b' }}
                />
              </View>

              {/* Category indicator */}
              <Text className="mt-4 text-center text-sm text-muted-foreground">
                Catégorie {currentCategoryIndex + 1} sur {totalCategories}
              </Text>
            </View>
          </Animated.View>

          {/* Bottom Buttons */}
          <View className="flex-row items-center justify-between px-5 pb-8 pt-4">
            {/* Skip button */}
            <Pressable onPress={handleSkip} className="px-6 py-3 active:opacity-70">
              <Text className="text-base font-medium text-muted-foreground">Passer</Text>
            </Pressable>

            {/* Continue button */}
            <Button
              onPress={handleContinue}
              className="h-14 flex-1 ml-4 rounded-xl bg-primary"
            >
              <Text className="text-lg font-semibold text-primary-foreground">Continuer</Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
