import {
  BackHeader,
  CreateAccountButton,
  LoginForm,
  PrivacyPolicyLink,
  SocialLoginButtons,
} from '@/components/custom/auth';
import { router } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  // Navigation handlers
  const handleLoginSuccess = () => {
    router.replace('/(customer)/(tabs)');
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  const handleCreateAccount = () => {
    router.push('/(customer)');
  };

  const handlePrivacyPolicy = () => {
    // TODO: Navigate to privacy policy screen or open URL
    console.log('Privacy policy pressed');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      {/* Header */}
      <BackHeader showLanguageSelector />

      {/* Form Content */}
      <View className="flex-1 px-6 pt-12">
        {/* Login Form */}
        <LoginForm onSuccess={handleLoginSuccess} onForgotPassword={handleForgotPassword} />

        {/* Social Login Section */}
        <View className="mt-10">
          <SocialLoginButtons onSuccess={handleLoginSuccess} />
        </View>

        {/* Privacy Policy Link */}
        <PrivacyPolicyLink onPress={handlePrivacyPolicy} />
      </View>

      {/* Bottom Create Account Button */}
      <CreateAccountButton onPress={handleCreateAccount} />
    </SafeAreaView>
  );
}
