import { BackHeader, ForgotPasswordForm } from '@/components/custom/auth';
import { router } from 'expo-router';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const handleBackToLogin = () => {
    router.replace('/auth/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      {/* Header */}
      <BackHeader />

      {/* Forgot Password Form */}
      <ForgotPasswordForm onBackToLogin={handleBackToLogin} />
    </SafeAreaView>
  );
}
