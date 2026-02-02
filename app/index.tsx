import {
  LanguageSelector,
  NjambeLogo,
  ServiceProvidersCarousel,
} from '@/components/custom/start';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StartScreen() {
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
    <SafeAreaView className="flex-1 bg-background dark:bg-background" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
          <NjambeLogo size="lg" />
          <LanguageSelector />
        </View>

        {/* Service Providers Cards */}
        <View className="mt-2">
          <ServiceProvidersCarousel />
        </View>

        {/* Tagline */}
        <View className="mt-8 px-6">
          <Text className="text-3xl font-semibold leading-tight text-foreground dark:text-foreground">
            Skilled neighbors,
          </Text>
          <Text className="text-3xl font-bold italic text-primary dark:text-primary">
            right next door!
          </Text>
        </View>

        {/* CTA Buttons */}
        <View className="mt-10 gap-4 px-5">
          {/* Primary button - Need a service */}
          <Button
            onPress={handleCustomerMode}
            className="h-14 rounded-2xl bg-primary shadow-lg active:bg-primary/90 dark:bg-primary dark:active:bg-primary/90">
            <Text className="text-base font-semibold text-primary-foreground dark:text-primary-foreground">I need a service</Text>
          </Button>

          {/* Secondary button - Looking for jobs */}
          <Button
            variant="outline"
            onPress={handleProviderMode}
            className="h-14 rounded-2xl border-2 border-primary bg-card active:bg-accent dark:border-primary dark:bg-card dark:active:bg-accent">
            <Text className="text-base font-semibold text-primary dark:text-primary">I'm looking for jobs</Text>
          </Button>

          {/* Login link */}
          <Pressable
            onPress={handleLogin}
            className="mt-4 items-center py-2">
            <Text className="text-base font-medium text-primary dark:text-primary">
              Or sign in to your account
            </Text>
          </Pressable>
        </View>

        {/* Bottom spacing */}
        <View className="h-12" />
      </ScrollView>
    </SafeAreaView>
  );
}
