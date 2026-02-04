import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import * as React from 'react';
import { Pressable, View } from 'react-native';

export function StartCTAButtons() {
  const handleCustomerMode = () => {
    router.push('/(customer)/onboarding');
  };

  const handleProviderMode = () => {
    router.push('/(provider)/onboarding');
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <View className="mt-10 gap-4 px-5">
      {/* Primary button - Need a service */}
      <Button
        onPress={handleCustomerMode}
        className="h-14 rounded-2xl bg-primary shadow-lg active:bg-primary/90 dark:bg-primary dark:active:bg-primary/90"
      >
        <Text className="text-base font-semibold text-primary-foreground dark:text-primary-foreground">
          I need a service
        </Text>
      </Button>

      {/* Secondary button - Looking for jobs */}
      <Button
        variant="outline"
        onPress={handleProviderMode}
        className="h-14 rounded-2xl border-2 border-primary bg-card active:bg-accent dark:border-primary dark:bg-card dark:active:bg-accent"
      >
        <Text className="text-base font-semibold text-primary dark:text-primary">
          I'm looking for jobs
        </Text>
      </Button>

      {/* Login link */}
      <Pressable onPress={handleLogin} className="mt-4 items-center py-2">
        <Text className="text-base font-medium text-primary dark:text-primary">
          Or sign in to your account
        </Text>
      </Pressable>
    </View>
  );
}
