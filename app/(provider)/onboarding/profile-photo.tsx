import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { ProgressBar } from '@/components/custom/provider/onboarding';
import { useProviderOnboardingStore } from '@/lib/stores';
import { NavArrowLeft, CartPlus, CheckCircle, XmarkCircle } from 'iconoir-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Alert, Image, Pressable, View } from 'react-native';
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
  const { profileImage, setProfileImage } = useProviderOnboardingStore();
  const [selectedImage, setSelectedImage] = React.useState<string | null>(profileImage);

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
            setSelectedImage('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face');
          },
        },
        {
          text: 'Appareil photo',
          onPress: () => {
            setSelectedImage('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face');
          },
        },
        { text: 'Annuler', style: 'cancel' },
      ]
    );
  };

  const handleContinue = () => {
    setProfileImage(selectedImage);
    router.push('/(provider)/onboarding/services-selection');
  };

  const handleSkip = () => {
    setProfileImage(null);
    router.push('/(provider)/onboarding/services-selection');
  };

  const iconColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';
  const mutedColor = colorScheme === 'dark' ? '#52525b' : '#a1a1aa';

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header Row: Back Button + Progress Bar */}
      <View className="flex-row items-center px-2 pt-2">
        <Pressable
          onPress={handleBack}
          className="p-3 active:opacity-70"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <NavArrowLeft width={24} height={24} color={iconColor} strokeWidth={2} />
        </Pressable>
        <View className="flex-1 px-4">
          <ProgressBar currentStep={1} totalSteps={3} />
        </View>
        <View className="w-12" />
      </View>

      {/* Content */}
      <View className="flex-1 px-5 pt-6">
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
          <Pressable onPress={handleSelectPhoto} className="active:opacity-80">
            <View className="h-44 w-44 items-center justify-center rounded-full border-2 border-dashed border-border bg-secondary/30">
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage }}
                  className="h-full w-full rounded-full"
                  resizeMode="cover"
                />
              ) : (
                <CartPlus width={48} height={48} color={mutedColor} strokeWidth={1.5} />
              )}
            </View>
          </Pressable>
        </View>

        {/* Example Photos */}
        <View className="mb-6">
          <View className="flex-row items-center justify-center gap-8">
            {EXAMPLE_PHOTOS.map((photo) => (
              <View key={photo.id} className="items-center">
                <View className="relative">
                  <Image
                    source={{ uri: photo.uri }}
                    className="h-16 w-16 rounded-full"
                    resizeMode="cover"
                  />
                  {/* Badge */}
                  <View className="absolute -bottom-1 -right-1">
                    {photo.isGood ? (
                      <CheckCircle width={24} height={24} color="#22c55e" fill="#22c55e" strokeWidth={0} />
                    ) : (
                      <XmarkCircle width={24} height={24} color="#ef4444" fill="#ef4444" strokeWidth={0} />
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Bottom Buttons - Side by Side */}
      <View className="flex-row items-center gap-4 px-5 pb-8">
        {/* Skip Button */}
        <Pressable onPress={handleSkip} className="flex-1 items-center justify-center py-4 active:opacity-70">
          <Text className="text-base font-medium text-muted-foreground">Passer</Text>
        </Pressable>

        {/* Continue Button */}
        <Button
          onPress={handleContinue}
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
