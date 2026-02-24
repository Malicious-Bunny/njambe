import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useProviderOnboardingStore } from '@/lib/stores';
import * as React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

export function WelcomeAddressStep() {
  const { address, setAddress, nextStep } = useProviderOnboardingStore();
  const [localAddress, setLocalAddress] = React.useState(address);

  const handleContinue = () => {
    setAddress(localAddress);
    nextStep();
  };

  const isValid = localAddress.trim().length > 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <ScrollView
        className="flex-1 bg-background"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Profile Image */}
        <View className="items-center pt-10 pb-8">
          <View className="h-40 w-40 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop',
              }}
              className="h-full w-full"
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Welcome Text */}
        <View className="px-5">
          <Text className="text-3xl font-bold text-foreground">
            Bienvenue ! <Text className="text-3xl">👋</Text>
          </Text>

          <Text className="mt-4 text-lg leading-7 text-foreground">
            Nous sommes super heureux de vous compter parmi notre communauté de prestataires de
            service !
          </Text>

          <Text className="mt-4 text-lg leading-7 text-foreground">
            Pour pouvoir vous envoyer des offres de jobs, veuillez compléter votre adresse
            ci-dessous.
          </Text>
        </View>

        {/* Spacer */}
        <View className="flex-1" />

        {/* Address Input */}
        <View className="border-t border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <Input
            placeholder="Indiquez votre adresse"
            value={localAddress}
            onChangeText={setLocalAddress}
            className="border-0 bg-transparent text-base"
            placeholderClassName="text-muted-foreground"
          />
        </View>

        {/* Continue Button */}
        <View className="px-5 pb-8 pt-4">
          <Button
            onPress={handleContinue}
            disabled={!isValid}
            className={`h-14 rounded-xl ${isValid ? 'bg-primary' : 'bg-muted'}`}
          >
            <Text className={`text-lg font-semibold ${isValid ? 'text-primary-foreground' : 'text-muted-foreground'}`}>Continue</Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
