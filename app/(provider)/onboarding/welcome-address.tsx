import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useProviderOnboardingStore } from '@/lib/stores';
import { NavArrowLeft } from 'iconoir-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeAddressScreen() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const { address, setAddress } = useProviderOnboardingStore();
  const [localAddress, setLocalAddress] = React.useState(address);

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    setAddress(localAddress);
    router.push('/(provider)/onboarding/personal-description');
  };

  const isValid = localAddress.trim().length > 0;
  const iconColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
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
          {/* Profile Image */}
          <View className="items-center pt-6 pb-12">
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
              Bienvenue !{' '}
              <Text className="text-3xl">👋</Text>
            </Text>

            <Text className="mt-5 text-lg leading-7 text-foreground">
              Nous sommes super heureux de vous compter parmi notre communauté de prestataires de service !
            </Text>

            <Text className="mt-4 text-lg leading-7 text-foreground">
              Pour pouvoir vous envoyer des offres de jobs, veuillez compléter votre adresse ci-dessous.
            </Text>
          </View>

          {/* Spacer */}
          <View className="flex-1 min-h-[60px]" />

          {/* Address Input Section */}
          <View className="border-t border-border bg-card px-5 py-4">
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
