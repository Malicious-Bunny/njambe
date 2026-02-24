import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { ProgressBar } from '@/components/custom/provider/onboarding';
import { useProviderOnboardingStore } from '@/lib/stores';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Sparkles } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PersonalDescriptionScreen() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const { personalDescription, setPersonalDescription, getOnboardingData, resetOnboarding } =
    useProviderOnboardingStore();
  const [localDescription, setLocalDescription] = React.useState(personalDescription);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      setPersonalDescription(localDescription);
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
          personal_description: localDescription,
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
        'Error',
        'There was a problem saving your information. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = localDescription.trim().length >= 10;
  const iconColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';
  const placeholderColor = colorScheme === 'dark' ? '#71717a' : '#a1a1aa';

  if (isSubmitting) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={iconColor} />
        <Text className="mt-4 text-muted-foreground">Saving your profile...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header with Back Button and Progress */}
        <View className="flex-row items-center px-2 py-2">
          <Pressable
            onPress={handleBack}
            className="p-3 active:opacity-70"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeft size={24} color={iconColor} />
          </Pressable>
          <View className="flex-1 pr-12">
            <ProgressBar currentStep={1} totalSteps={2} />
          </View>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pt-4">
            {/* Header */}
            <View className="flex-row items-center mb-2">
              <Sparkles size={20} color={iconColor} />
              <Text className="ml-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Step 3 of 3
              </Text>
            </View>

            <Text className="text-2xl font-bold text-foreground">
              Tell us about yourself
            </Text>

            <Text className="mt-3 text-base leading-relaxed text-muted-foreground">
              Share a bit about who you are. This helps potential clients get to know you better before they book.
            </Text>

            {/* Text Area */}
            <View className="mt-6 flex-1">
              <View className="min-h-[200px] rounded-2xl border border-border bg-card p-4">
                <TextInput
                  placeholder="Write a brief description about yourself, your experience, and what makes you great at what you do..."
                  placeholderTextColor={placeholderColor}
                  value={localDescription}
                  onChangeText={setLocalDescription}
                  multiline
                  textAlignVertical="top"
                  className="flex-1 text-base text-foreground"
                  style={{ minHeight: 180, color: colorScheme === 'dark' ? '#fafafa' : '#18181b' }}
                />
              </View>
              <Text className="mt-2 text-sm text-muted-foreground">
                {localDescription.length < 10
                  ? `At least ${10 - localDescription.length} more characters needed`
                  : `${localDescription.length} characters`}
              </Text>
            </View>
          </View>

          {/* Complete Button */}
          <View className="px-6 pb-8 pt-4">
            <Button
              onPress={handleComplete}
              disabled={!isValid}
              className={`h-14 rounded-xl ${isValid ? 'bg-primary' : 'bg-muted'}`}
            >
              <Text className={`text-lg font-semibold ${isValid ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                Complete Profile
              </Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
