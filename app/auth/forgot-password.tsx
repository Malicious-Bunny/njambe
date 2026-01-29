import { Text } from '@/components/ui/text';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { NavArrowLeft, Mail } from 'iconoir-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RESEND_COOLDOWN_SECONDS = 60;

export default function ForgotPasswordScreen() {
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [countdown, setCountdown] = React.useState(0);
  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === 'dark';
  const textColor = isDark ? '#fafafa' : '#18181b';
  const placeholderColor = isDark ? '#71717a' : '#a1a1aa';
  const borderColor = isDark ? '#3f3f46' : '#e4e4e7';
  const iconColor = isDark ? '#a1a1aa' : '#71717a';

  // Clear error when email changes
  React.useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [email]);

  // Countdown timer effect
  React.useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          // This is the URL that will be in the email link
          // Supabase will append the token as a hash fragment
          redirectTo: 'njambe://auth/reset-password',
        }
      );

      if (resetError) {
        setError(resetError.message);
        return;
      }

      // Show success state and start countdown
      setIsSuccess(true);
      setCountdown(RESEND_COOLDOWN_SECONDS);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (countdown > 0 || isLoading) return;

    setIsLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: 'njambe://auth/reset-password',
        }
      );

      if (resetError) {
        setError(resetError.message);
        return;
      }

      // Reset countdown after successful resend
      setCountdown(RESEND_COOLDOWN_SECONDS);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.replace('/auth/login');
  };

  // Success state - show confirmation message
  if (isSuccess) {
    const canResend = countdown === 0 && !isLoading;

    return (
      <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
        {/* Header */}
        <View className="flex-row items-center px-5 py-3">
          <Pressable
            onPress={() => router.back()}
            className="flex-row items-center gap-1"
          >
            <NavArrowLeft width={20} height={20} color={textColor} />
            <Text className="text-base text-foreground">Back</Text>
          </Pressable>
        </View>

        {/* Success Content */}
        <View className="flex-1 px-6 pt-16 items-center">
          {/* Email Icon */}
          <View className="w-20 h-20 rounded-full bg-primary/10 items-center justify-center mb-6">
            <Mail width={40} height={40} color={textColor} />
          </View>

          <Text className="text-2xl font-bold text-foreground text-center mb-4">
            Check your email
          </Text>

          <Text className="text-base text-muted-foreground text-center mb-2">
            We've sent a password reset link to:
          </Text>

          <Text className="text-base font-semibold text-foreground text-center mb-8">
            {email}
          </Text>

          <Text className="text-sm text-muted-foreground text-center leading-6 px-4">
            Click the link in the email to reset your password. If you don't see it, check your spam folder.
          </Text>

          {/* Resend Button with Countdown */}
          <Pressable
            onPress={handleResendEmail}
            disabled={!canResend}
            className="mt-8"
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={textColor} />
            ) : countdown > 0 ? (
              <Text className="text-base text-muted-foreground">
                Resend in {countdown}s
              </Text>
            ) : (
              <Text className="text-base text-foreground underline">
                Didn't receive it? Send again
              </Text>
            )}
          </Pressable>
        </View>

        {/* Bottom Button */}
        <View className="px-6 pb-4">
          <Pressable
            onPress={handleBackToLogin}
            className="h-14 items-center justify-center rounded-full bg-primary active:bg-primary/90"
          >
            <Text className="text-base font-semibold text-primary-foreground">
              Back to Sign In
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // Default state - email input form
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      {/* Header */}
      <View className="flex-row items-center px-5 py-3">
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center gap-1"
        >
          <NavArrowLeft width={20} height={20} color={textColor} />
          <Text className="text-base text-foreground">Back</Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Form Content */}
        <View className="flex-1 px-6 pt-12">
          <Text className="text-2xl font-bold text-foreground mb-3">
            Forgot password?
          </Text>

          <Text className="text-base text-muted-foreground mb-8 leading-6">
            No worries! Enter the email address associated with your account and we'll send you a link to reset your password.
          </Text>

          {/* Error Banner */}
          {error && (
            <View className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
              <Text className="text-sm text-red-600 dark:text-red-400 text-center">
                {error}
              </Text>
            </View>
          )}

          {/* Email Input */}
          <View className="mb-8">
            <Text className="text-sm text-muted-foreground mb-2">Email address</Text>
            <View
              className="flex-row items-end border-b"
              style={{
                borderBottomColor: error ? '#ef4444' : borderColor,
                borderBottomWidth: 1,
              }}
            >
              <TextInput
                className="flex-1 text-base"
                style={{
                  color: textColor,
                  paddingTop: 4,
                  paddingBottom: 12,
                  lineHeight: 22,
                }}
                placeholderTextColor={placeholderColor}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoFocus
                editable={!isLoading}
              />
              <View className="pb-3">
                <Mail width={20} height={20} color={iconColor} />
              </View>
            </View>
          </View>

          {/* Reset Password Button */}
          <Pressable
            onPress={handleResetPassword}
            disabled={isLoading || !email.trim()}
            className={`h-14 items-center justify-center rounded-full ${
              email.trim() && !isLoading
                ? 'bg-primary active:bg-primary/90'
                : 'bg-muted'
            }`}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={isDark ? '#18181b' : '#fafafa'} />
            ) : (
              <Text
                className={`text-base font-semibold ${
                  email.trim() ? 'text-primary-foreground' : 'text-muted-foreground'
                }`}
              >
                Send Reset Link
              </Text>
            )}
          </Pressable>

          {/* Back to Sign In Link */}
          <View className="items-center mt-8">
            <Pressable onPress={handleBackToLogin}>
              <Text className="text-sm text-muted-foreground">
                Remember your password?{' '}
                <Text className="text-primary underline">sign in</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
