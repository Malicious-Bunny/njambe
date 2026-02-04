import { OnboardingCarousel } from '@/components/custom/shared';
import { ONBOARDING_SLIDES } from '@/lib/provider/onboarding-data';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProviderOnboardingScreen() {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/(provider)/signup');
  };

  const handleSkip = () => {
    router.push('/(provider)/signup');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <OnboardingCarousel
        slides={ONBOARDING_SLIDES}
        onComplete={handleComplete}
        onSkip={handleSkip}
      />
    </SafeAreaView>
  );
}
