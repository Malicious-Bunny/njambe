import { LanguageSelector } from '@/components/custom/start';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { signInWithGoogle } from '@/lib/auth/google-auth';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { NavArrowLeft, Eye, EyeClosed, Google, Linkedin, AppleMac } from 'iconoir-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { ActivityIndicator, Alert, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginError, setLoginError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const { colorScheme } = useColorScheme();

  const textColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';
  const placeholderColor = colorScheme === 'dark' ? '#71717a' : '#a1a1aa';
  const iconColor = colorScheme === 'dark' ? '#a1a1aa' : '#71717a';
  const borderColor = colorScheme === 'dark' ? '#3f3f46' : '#e4e4e7';

  // Clear errors when form changes
  React.useEffect(() => {
    if (loginError) {
      setLoginError(null);
    }
  }, [email, password]);

  const handleLogin = async () => {
    if (!email.trim()) {
      setLoginError('Please enter your email');
      return;
    }
    if (!password.trim()) {
      setLoginError('Please enter your password');
      return;
    }

    setIsLoading(true);
    setLoginError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setLoginError(error.message);
        return;
      }

      if (data.user) {
        router.replace('/(customer)/(tabs)');
      }
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setLoginError(null);

    try {
      const result = await signInWithGoogle();

      if (!result.success) {
        if (result.error !== 'Authentication was cancelled') {
          Alert.alert('Login Failed', result.error || 'Google login failed', [{ text: 'OK' }]);
        }
        return;
      }

      // Successfully authenticated - navigate to customer tabs
      router.replace('/(customer)/(tabs)');
    } catch (error) {
      Alert.alert('Login Failed', error instanceof Error ? error.message : 'Google login failed', [
        { text: 'OK' },
      ]);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'linkedin' | 'apple') => {
    // LinkedIn and Apple OAuth not yet implemented
    Alert.alert(
      'Coming Soon',
      `${provider === 'linkedin' ? 'LinkedIn' : 'Apple'} login will be available soon.`,
      [{ text: 'OK' }]
    );
  };

  const handleCreateAccount = () => {
    router.push('/(customer)');
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  const anyLoading = isLoading || isGoogleLoading;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-3">
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center gap-1"
        >
          <NavArrowLeft width={20} height={20} color={textColor} />
          <Text className="text-base text-foreground">Back</Text>
        </Pressable>
        <LanguageSelector />
      </View>

      {/* Form Content */}
      <View className="flex-1 px-6 pt-12">
        {/* Error Banner */}
        {loginError && (
          <View className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
            <Text className="text-sm text-red-600 dark:text-red-400 text-center">
              {loginError}
            </Text>
          </View>
        )}

        {/* Email Input - Underline Style */}
        <View className="mb-6">
          <Text className="text-sm text-muted-foreground mb-2">Email address</Text>
          <Input
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            editable={!anyLoading}
            hasError={!!loginError}
          />
        </View>

        {/* Password Input - Underline Style */}
        <View className="mb-4">
          <Text className="text-sm text-muted-foreground mb-2">Password</Text>
          <View
            className="flex-row items-center"
            style={{
              borderBottomColor: loginError ? '#ef4444' : borderColor,
              borderBottomWidth: 1
            }}
          >
            <Input
              style={{
                flex: 1,
                borderBottomWidth: 0,
              }}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!anyLoading}
              hasError={false}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)} className="p-2">
              {showPassword ? (
                <Eye width={20} height={20} color={iconColor} />
              ) : (
                <EyeClosed width={20} height={20} color={iconColor} />
              )}
            </Pressable>
          </View>
        </View>

        {/* Forgot Password - Centered */}
        <View className="items-center mb-6">
          <Pressable onPress={handleForgotPassword}>
            <Text className="text-sm text-muted-foreground underline">
              Forgot password?
            </Text>
          </Pressable>
        </View>

        {/* Login Button */}
        <Pressable
          onPress={handleLogin}
          disabled={anyLoading}
          className="h-14 items-center justify-center rounded-full bg-primary active:bg-primary/90"
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={colorScheme === 'dark' ? '#18181b' : '#fafafa'} />
          ) : (
            <Text className="text-base font-semibold text-primary-foreground">
              Sign In
            </Text>
          )}
        </Pressable>

        {/* Or Continue With */}
        <View className="items-center mt-10 mb-6">
          <Text className="text-sm text-muted-foreground">Or continue with</Text>
        </View>

        {/* Social Login Icons */}
        <View className="flex-row justify-center gap-4">
          <Pressable
            onPress={handleGoogleLogin}
            disabled={anyLoading}
            className="h-12 w-12 items-center justify-center rounded-xl bg-secondary active:bg-accent"
          >
            {isGoogleLoading ? (
              <ActivityIndicator size="small" color={textColor} />
            ) : (
              <Google width={22} height={22} color={textColor} />
            )}
          </Pressable>
          <Pressable
            onPress={() => handleSocialLogin('linkedin')}
            disabled={anyLoading}
            className="h-12 w-12 items-center justify-center rounded-xl bg-secondary active:bg-accent"
          >
            <Linkedin width={22} height={22} color={textColor} />
          </Pressable>
          <Pressable
            onPress={() => handleSocialLogin('apple')}
            disabled={anyLoading}
            className="h-12 w-12 items-center justify-center rounded-xl bg-secondary active:bg-accent"
          >
            <AppleMac width={22} height={22} color={textColor} />
          </Pressable>
        </View>

        {/* Privacy Policy Link */}
        <View className="items-center mt-10">
          <Pressable>
            <Text className="text-sm text-muted-foreground underline">
              Privacy Policy
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Bottom Create Account Button */}
      <View className="px-6 pb-4">
        <View className="h-px bg-border mb-4" />
        <Pressable
          onPress={handleCreateAccount}
          disabled={anyLoading}
          className="h-14 items-center justify-center rounded-full border-2 border-primary bg-background active:bg-secondary"
        >
          <Text className="text-base font-semibold text-primary">
            Create an account
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
