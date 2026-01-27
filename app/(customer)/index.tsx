import { OrDivider, SocialLoginButton } from '@/components/custom/customer';
import { PageHeader } from '@/components/custom/shared';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { Google, Facebook, AppleMac } from 'iconoir-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CustomerSignupScreen() {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';

  const handleEmailSignup = () => {
    // Navigate to tabs after signup
    router.replace('/(customer)/(tabs)');
  };

  const handleGoogleSignup = () => {
    // TODO: Implement Google OAuth
    router.replace('/(customer)/(tabs)');
  };

  const handleFacebookSignup = () => {
    // TODO: Implement Facebook OAuth
    router.replace('/(customer)/(tabs)');
  };

  const handleAppleSignup = () => {
    // TODO: Implement Apple Sign In
    router.replace('/(customer)/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <PageHeader title="Join njambe!" />

      {/* Subtle divider line */}
      <View className="h-px bg-border" />

      {/* Content */}
      <View className="flex-1 px-6 pt-8">
        {/* Welcome Text */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-foreground">
            Let's get to know each other
          </Text>
          <Text className="mt-2 text-base leading-relaxed text-muted-foreground">
            Create an account to request services and quickly receive multiple offers.
          </Text>
        </View>

        {/* Email Signup Button */}
        <Button
          onPress={handleEmailSignup}
          className="h-14 rounded-xl bg-primary shadow-lg shadow-primary/30 active:bg-primary/90"
        >
          <Text className="text-base font-semibold text-primary-foreground">Sign up with email</Text>
        </Button>

        {/* Or Divider */}
        <View className="my-6">
          <OrDivider />
        </View>

        {/* Social Login Buttons */}
        <View className="gap-3">
          <SocialLoginButton
            icon={() => <Google width={20} height={20} color={iconColor} />}
            label="Sign up with Google"
            onPress={handleGoogleSignup}
          />
          <SocialLoginButton
            icon={() => <Facebook width={20} height={20} color={iconColor} />}
            label="Sign up with Facebook"
            onPress={handleFacebookSignup}
          />
          <SocialLoginButton
            icon={() => <AppleMac width={20} height={20} color={iconColor} />}
            label="Sign up with Apple"
            onPress={handleAppleSignup}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
