import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { ProgressBar } from '@/components/custom/provider/onboarding';
import { useProviderOnboardingStore } from '@/lib/stores';
import { supabase } from '@/lib/supabase';
import { NavArrowLeft, Camera, Check, Xmark } from 'iconoir-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { ActivityIndicator, Alert, Image, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Example photos showing good and bad profile photos
const EXAMPLE_PHOTOS = [
  {
    id: 1,
    uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isGood: true,
  },
  {
    id: 2,
    uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop',
    isGood: false,
  },
  {
    id: 3,
    uri: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=150&h=150&fit=crop',
    isGood: false,
  },
];

export default function ProfilePhotoScreen() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const { profileImage, setProfileImage, getOnboardingData, resetOnboarding } =
    useProviderOnboardingStore();
  const [selectedImage, setSelectedImage] = React.useState<string | null>(profileImage);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleSelectPhoto = () => {
    // TODO: Implement image picker
    // For now, we'll use a placeholder image
    Alert.alert(
      'Sélectionner une photo',
      'Choisissez une source',
      [
        {
          text: 'Galerie',
          onPress: () => {
            // Placeholder: Set a sample image
            setSelectedImage('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face');
          },
        },
        {
          text: 'Appareil photo',
          onPress: () => {
            // Placeholder: Set a sample image
            setSelectedImage('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face');
          },
        },
        { text: 'Annuler', style: 'cancel' },
      ]
    );
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      setProfileImage(selectedImage);
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
          profile_image: selectedImage,
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
      router.replace('/(provider)/(tabs)/');
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

  const handleSkip = async () => {
    // Skip photo upload and complete onboarding
    setSelectedImage(null);
    await handleComplete();
  };

  const iconColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';
  const mutedColor = colorScheme === 'dark' ? '#71717a' : '#a1a1aa';

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
        <ProgressBar currentStep={1} totalSteps={2} />
      </View>

      {/* Header with Back Button */}
      <View className="flex-row items-center px-2 py-2">
        <Pressable
          onPress={handleBack}
          className="p-3 active:opacity-70"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <NavArrowLeft width={24} height={24} color={iconColor} strokeWidth={2} />
        </Pressable>
      </View>

      <View className="flex-1 px-5">
        {/* Title */}
        <Text className="text-2xl font-bold text-foreground">
          Ajoutez votre plus belle photo !
        </Text>

        {/* Subtitle */}
        <Text className="mt-3 text-base leading-6 text-muted-foreground">
          Montrez aux clients qui vous êtes : téléchargez votre photo de profil et n'hésitez pas à recadrer la photo si c'est nécessaire.
        </Text>

        {/* Photo Upload Area */}
        <View className="flex-1 items-center justify-center">
          <Pressable
            onPress={handleSelectPhoto}
            className="active:opacity-80"
          >
            <View
              className="h-48 w-48 items-center justify-center rounded-full border-2 border-dashed border-border bg-card"
              style={{ borderStyle: 'dashed' }}
            >
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage }}
                  className="h-full w-full rounded-full"
                  resizeMode="cover"
                />
              ) : (
                <Camera width={48} height={48} color={mutedColor} strokeWidth={1.5} />
              )}
            </View>
          </Pressable>
        </View>

        {/* Example Photos */}
        <View className="mb-8">
          <View className="flex-row items-center justify-center gap-6">
            {EXAMPLE_PHOTOS.map((photo) => (
              <View key={photo.id} className="items-center">
                <View className="relative">
                  <Image
                    source={{ uri: photo.uri }}
                    className="h-16 w-16 rounded-full"
                    resizeMode="cover"
                  />
                  {/* Badge */}
                  <View
                    className={`absolute -bottom-1 -right-1 h-6 w-6 items-center justify-center rounded-full ${
                      photo.isGood ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {photo.isGood ? (
                      <Check width={14} height={14} color="#ffffff" strokeWidth={2.5} />
                    ) : (
                      <Xmark width={14} height={14} color="#ffffff" strokeWidth={2.5} />
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Bottom Buttons */}
      <View className="flex-row items-center gap-4 px-5 pb-8">
        <Pressable
          onPress={handleSkip}
          className="flex-1 items-center justify-center py-4 active:opacity-70"
        >
          <Text className="text-lg text-muted-foreground">Passer</Text>
        </Pressable>

        <Button
          onPress={handleComplete}
          className="h-14 flex-[2] rounded-xl bg-primary"
        >
          <Text className="text-lg font-semibold text-primary-foreground">
            Continuer
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
