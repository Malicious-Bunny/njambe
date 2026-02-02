import { Text } from '@/components/ui/text';
import { supabase } from '@/lib/supabase';
import { router, useLocalSearchParams } from 'expo-router';
import { NavArrowLeft, Eye, EyeClosed, Lock, CheckCircle } from 'iconoir-react-native';
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

export default function ResetPasswordScreen() {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === 'dark';
  const textColor = isDark ? '#fafafa' : '#18181b';
  const placeholderColor = isDark ? '#71717a' : '#a1a1aa';
  const borderColor = isDark ? '#3f3f46' : '#e4e4e7';
  const iconColor = isDark ? '#a1a1aa' : '#71717a';
  const successColor = '#22c55e';

  // Clear error when passwords change
  React.useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [password, confirmPassword]);

  // Password validation
  const validatePassword = (): string | null => {
    if (!password.trim()) {
      return 'Please enter a new password';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!confirmPassword.trim()) {
      return 'Please confirm your password';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  };

  const handleResetPassword = async () => {
    const validationError = validatePassword();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Update the user's password
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      // Show success state
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

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

  // Password strength indicator
  const getPasswordStrength = (): { label: string; color: string; width: string } => {
    if (password.length === 0) return { label: '', color: borderColor, width: '0%' };
    if (password.length < 6) return { label: 'Weak', color: '#ef4444', width: '25%' };
    if (password.length < 8) return { label: 'Fair', color: '#f59e0b', width: '50%' };

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const strength = [hasUppercase, hasLowercase, hasNumber, hasSpecial].filter(Boolean).length;

    if (strength >= 3) return { label: 'Strong', color: '#22c55e', width: '100%' };
    return { label: 'Good', color: '#22c55e', width: '75%' };
  };

  const passwordStrength = getPasswordStrength();

  // Success state
  if (isSuccess) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
        {/* Success Content */}
        <View className="flex-1 px-6 pt-24 items-center">
          {/* Success Icon */}
          <View className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 items-center justify-center mb-6">
            <CheckCircle width={48} height={48} color={successColor} />
          </View>

          <Text className="text-2xl font-bold text-foreground text-center mb-4">
            Password Reset!
          </Text>

          <Text className="text-base text-muted-foreground text-center leading-6 px-4">
            Your password has been successfully reset. You can now use your new password to sign in.
          </Text>
        </View>

        {/* Bottom Buttons */}
        <View className="px-6 pb-4 gap-3">
          <Pressable
            onPress={handleContinue}
            className="h-14 items-center justify-center rounded-full bg-primary active:bg-primary/90"
          >
            <Text className="text-base font-semibold text-primary-foreground">
              Continue to App
            </Text>
          </Pressable>

          <Pressable
            onPress={handleBackToLogin}
            className="h-14 items-center justify-center rounded-full border-2 border-primary bg-background active:bg-secondary"
          >
            <Text className="text-base font-semibold text-primary">
              Back to Sign In
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // Default state - password input form
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
        <View className="flex-1 px-6 pt-8">
          {/* Lock Icon */}
          <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center mb-6 self-center">
            <Lock width={32} height={32} color={textColor} />
          </View>

          <Text className="text-2xl font-bold text-foreground text-center mb-3">
            Create new password
          </Text>

          <Text className="text-base text-muted-foreground text-center mb-8 leading-6">
            Your new password must be different from your previously used password.
          </Text>

          {/* Error Banner */}
          {error && (
            <View className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
              <Text className="text-sm text-red-600 dark:text-red-400 text-center">
                {error}
              </Text>
            </View>
          )}

          {/* New Password Input */}
          <View className="mb-2">
            <Text className="text-sm text-muted-foreground mb-2">New password</Text>
            <View
              className="flex-row items-end border-b"
              style={{
                borderBottomColor: error && !password ? '#ef4444' : borderColor,
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
                placeholder="Enter new password"
                placeholderTextColor={placeholderColor}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={!isLoading}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)} className="pb-3">
                {showPassword ? (
                  <Eye width={20} height={20} color={iconColor} />
                ) : (
                  <EyeClosed width={20} height={20} color={iconColor} />
                )}
              </Pressable>
            </View>
          </View>

          {/* Password Strength Indicator */}
          {password.length > 0 && (
            <View className="mb-6">
              <View className="h-1 bg-muted rounded-full overflow-hidden mt-2">
                <View
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: passwordStrength.color,
                    width: passwordStrength.width,
                  }}
                />
              </View>
              <Text className="text-xs mt-1" style={{ color: passwordStrength.color }}>
                {passwordStrength.label}
              </Text>
            </View>
          )}

          {password.length === 0 && <View className="mb-6" />}

          {/* Confirm Password Input */}
          <View className="mb-8">
            <Text className="text-sm text-muted-foreground mb-2">Confirm password</Text>
            <View
              className="flex-row items-end border-b"
              style={{
                borderBottomColor:
                  error && confirmPassword && password !== confirmPassword
                    ? '#ef4444'
                    : borderColor,
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
                placeholder="Confirm new password"
                placeholderTextColor={placeholderColor}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                editable={!isLoading}
              />
              <Pressable
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                className="pb-3"
              >
                {showConfirmPassword ? (
                  <Eye width={20} height={20} color={iconColor} />
                ) : (
                  <EyeClosed width={20} height={20} color={iconColor} />
                )}
              </Pressable>
            </View>
            {/* Match indicator */}
            {confirmPassword.length > 0 && password === confirmPassword && (
              <Text className="text-xs text-green-500 mt-1">Passwords match</Text>
            )}
          </View>

          {/* Reset Password Button */}
          <Pressable
            onPress={handleResetPassword}
            disabled={isLoading || !password.trim() || !confirmPassword.trim()}
            className={`h-14 items-center justify-center rounded-full ${
              password.trim() && confirmPassword.trim() && !isLoading
                ? 'bg-primary active:bg-primary/90'
                : 'bg-muted'
            }`}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={isDark ? '#18181b' : '#fafafa'} />
            ) : (
              <Text
                className={`text-base font-semibold ${
                  password.trim() && confirmPassword.trim()
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                Reset Password
              </Text>
            )}
          </Pressable>

          {/* Password Requirements */}
          <View className="mt-6 px-2">
            <Text className="text-xs text-muted-foreground mb-2">
              Password requirements:
            </Text>
            <Text className="text-xs text-muted-foreground leading-5">
              • At least 8 characters{'\n'}
              • Mix of uppercase and lowercase letters{'\n'}
              • Include numbers for extra security
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
