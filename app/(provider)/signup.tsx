import { PageHeader, SignupForm } from '@/components/custom/shared';
import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProviderSignupScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <PageHeader title="Become a Provider" />
      <View className="h-px bg-border" />

      <SignupForm
        role="provider"
        title="Start Earning!"
        subtitle="Create your account to offer your services to neighbors in your area."
        successRoute="/(provider)"
      />
    </SafeAreaView>
  );
}
