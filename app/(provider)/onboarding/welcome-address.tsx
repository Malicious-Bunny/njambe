import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { ProgressBar } from '@/components/custom/provider/onboarding';
import { useProviderOnboardingStore } from '@/lib/stores';
import { ArrowLeft, MapPin } from 'lucide-react-native';
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
            <ProgressBar currentStep={0} totalSteps={2} />
          </View>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Image */}
          <View className="items-center py-8">
            <View className="h-32 w-32 overflow-hidden rounded-full border-4 border-border bg-secondary">
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
          <View className="px-6">
            <Text className="mb-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Step 2 of 3
            </Text>
            <Text className="text-3xl font-bold text-foreground">
              Welcome aboard!
            </Text>

            <Text className="mt-4 text-base leading-relaxed text-muted-foreground">
              We're thrilled to have you join our community of service providers. To help connect you with customers nearby, please share your location.
            </Text>
          </View>

          {/* Spacer */}
          <View className="flex-1 min-h-[40px]" />

          {/* Address Input Section */}
          <View className="border-t border-border bg-card px-6 py-5">
            <View className="flex-row items-center mb-3">
              <MapPin size={18} color={iconColor} />
              <Text className="ml-2 text-sm font-medium text-foreground">Your Address</Text>
            </View>
            <Input
              placeholder="Enter your address"
              value={localAddress}
              onChangeText={setLocalAddress}
              className="bg-secondary border-0"
              placeholderClassName="text-muted-foreground"
            />
          </View>

          {/* Continue Button */}
          <View className="px-6 pb-8 pt-4">
            <Button
              onPress={handleContinue}
              disabled={!isValid}
              className={`h-14 rounded-xl ${isValid ? 'bg-primary' : 'bg-muted'}`}
            >
              <Text className={`text-lg font-semibold ${isValid ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                Continue
              </Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
