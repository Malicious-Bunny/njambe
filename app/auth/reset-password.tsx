import { BackHeader, ResetPasswordForm } from '@/components/custom/auth';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResetPasswordScreen() {
  const handleBackToLogin = () => {
    // Sign out to clear the recovery session and go to login
    supabase.auth.signOut().then(() => {
      router.replace('/auth/login');
    });
  };

  const handleContinue = () => {
    // User is already logged in after password reset, go to main app
    router.replace('/(customer)/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      {/* Header */}
      <BackHeader />

      {/* Reset Password Form */}
      <ResetPasswordForm onBackToLogin={handleBackToLogin} onContinue={handleContinue} />
    </SafeAreaView>
  );
}
