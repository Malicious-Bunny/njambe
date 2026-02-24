import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { ProgressBar } from '@/components/custom/provider/onboarding';
import { useProviderOnboardingStore } from '@/lib/stores';
import { NavArrowLeft } from 'iconoir-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MIN_CHARACTERS = 50;

export default function PersonalDescriptionScreen() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const { personalDescription, setPersonalDescription } = useProviderOnboardingStore();
  const [localDescription, setLocalDescription] = React.useState(personalDescription);

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    setPersonalDescription(localDescription);
    router.push('/(provider)/onboarding/profile-photo');
  };

  const characterCount = localDescription.trim().length;
  const isValid = characterCount >= MIN_CHARACTERS;
  const iconColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';
  const placeholderColor = colorScheme === 'dark' ? '#71717a' : '#a1a1aa';

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Progress Bar - Full width aligned with content */}
        <View className="px-5 pt-2">
          <ProgressBar currentStep={0} totalSteps={2} />
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

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-5 pt-2">
            {/* Title */}
            <Text className="text-2xl font-bold text-foreground">
              Dites-nous en plus sur vous !{' '}
              <Text className="text-2xl">😊</Text>
            </Text>

            {/* Subtitle */}
            <Text className="mt-3 text-base leading-6 text-muted-foreground">
              C'est le moment d'expliquer à vos futurs clients{' '}
              <Text className="font-bold text-foreground">qui vous êtes.</Text>
            </Text>

            {/* Text Area */}
            <View className="mt-6 flex-1">
              <View className="min-h-[250px] rounded-2xl border border-border bg-card p-4">
                <TextInput
                  placeholder="Écrivez votre description personnelle"
                  placeholderTextColor={placeholderColor}
                  value={localDescription}
                  onChangeText={setLocalDescription}
                  multiline
                  textAlignVertical="top"
                  className="flex-1 text-base text-foreground"
                  style={{ minHeight: 230, color: colorScheme === 'dark' ? '#fafafa' : '#18181b' }}
                />
              </View>

              {/* Character Count Indicator */}
              <View className="mt-3 flex-row items-center justify-between">
                <Text className="text-sm text-muted-foreground">
                  Minimum {MIN_CHARACTERS} caractères
                </Text>
                <Text className={`text-sm ${isValid ? 'text-green-600' : 'text-muted-foreground'}`}>
                  {characterCount}/{MIN_CHARACTERS}
                </Text>
              </View>
            </View>
          </View>

          {/* Continue Button */}
          <View className="px-5 pb-8 pt-4">
            <Button
              onPress={handleContinue}
              disabled={!isValid}
              className={`h-14 rounded-xl ${isValid ? 'bg-primary' : 'bg-muted'}`}
            >
              <Text className={`text-lg font-semibold ${isValid ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                Continuer
              </Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
