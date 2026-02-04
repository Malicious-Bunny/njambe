import { OnboardingCarousel } from '@/components/custom/shared';
import { CUSTOMER_ONBOARDING_SLIDES } from '@/lib/customer/onboarding-data';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CustomerOnboardingScreen() {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/(customer)/signup');
  };

  const handleSkip = () => {
    router.push('/(customer)/signup');
  };
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <OnboardingCarousel
        slides={CUSTOMER_ONBOARDING_SLIDES}
        onComplete={handleComplete}
        onSkip={handleSkip}
      />
    </SafeAreaView>
  );
}
