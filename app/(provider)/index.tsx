import {
  PersonalDescriptionStep,
  ProgressBar,
  WelcomeAddressStep,
  WorkTypeStep,
} from '@/components/custom/provider';
import { supabase } from '@/lib/supabase';
import { useProviderOnboardingStore } from '@/lib/stores';
import { ArrowLeft } from 'lucide-react-native';
import * as React from 'react';
import { ActivityIndicator, Alert, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';

export default function ProviderOnboardingScreen() {
  const { colorScheme } = useColorScheme();
  const { currentStep, totalSteps, prevStep, getOnboardingData, resetOnboarding } =
    useProviderOnboardingStore();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleBack = () => {
    if (currentStep === 0) {
      // Go back to start screen or signup
      router.back();
    } else {
      prevStep();
    }
  };

  const handleComplete = async () => {
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

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WorkTypeStep />;
      case 1:
        return <WelcomeAddressStep />;
      case 2:
        return <PersonalDescriptionStep onComplete={handleComplete} />;
      default:
        return <WorkTypeStep />;
    }
  };

  if (isSubmitting) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#FFF8F0]">
        <ActivityIndicator size="large" color="#10b981" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8F0] dark:bg-zinc-950" edges={['top']}>
      {/* Header with Back Button and Progress Bar */}
      <View className="flex-row items-center px-2">
        <Pressable
          onPress={handleBack}
          className="p-3 active:opacity-70"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={24} color={colorScheme === 'dark' ? '#fafafa' : '#18181b'} />
        </Pressable>

        {/* Progress Bar - only show after step 0 */}
        {currentStep > 0 && (
          <View className="flex-1 pr-12">
            <ProgressBar currentStep={currentStep - 1} totalSteps={totalSteps - 1} />
          </View>
        )}
      </View>

      {/* Step Content */}
      {renderStep()}
    </SafeAreaView>
  );
}
