import { LanguageSelector } from '@/components/custom/start';
import { Text } from '@/components/ui/text';
import { useAuthStore } from '@/lib/stores';
import { router } from 'expo-router';
import { NavArrowLeft, Eye, EyeClosed, Google, Linkedin, AppleMac } from 'iconoir-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { ActivityIndicator, Pressable, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const { colorScheme } = useColorScheme();
  const { login, socialLogin, isLoading } = useAuthStore();

  const textColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';
  const placeholderColor = colorScheme === 'dark' ? '#71717a' : '#a1a1aa';
  const iconColor = colorScheme === 'dark' ? '#a1a1aa' : '#71717a';
  const borderColor = colorScheme === 'dark' ? '#3f3f46' : '#e4e4e7';

  const handleLogin = async () => {
    await login(email, password);
    router.replace('/(customer)/(tabs)');
  };

  const handleSocialLogin = async (provider: 'google' | 'linkedin' | 'apple') => {
    await socialLogin(provider);
    router.replace('/(customer)/(tabs)');
  };

  const handleCreateAccount = () => {
    router.push('/(customer)');
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password
    console.log('Forgot password');
  };

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
        {/* Email Input - Underline Style */}
        <View className="mb-6">
          <Text className="text-sm text-muted-foreground mb-2">Email address</Text>
          <TextInput
            className="text-base pb-3 border-b"
            style={{
              color: textColor,
              borderBottomColor: borderColor,
              borderBottomWidth: 1,
            }}
            placeholder=""
            placeholderTextColor={placeholderColor}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
          />
        </View>

        {/* Password Input - Underline Style */}
        <View className="mb-4">
          <Text className="text-sm text-muted-foreground mb-2">Password</Text>
          <View className="flex-row items-center border-b" style={{ borderBottomColor: borderColor, borderBottomWidth: 1 }}>
            <TextInput
              className="flex-1 text-base pb-3"
              style={{ color: textColor }}
              placeholder=""
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
          disabled={isLoading}
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
            onPress={() => handleSocialLogin('google')}
            disabled={isLoading}
            className="h-12 w-12 items-center justify-center rounded-xl bg-secondary active:bg-accent"
          >
            <Google width={22} height={22} color={textColor} />
          </Pressable>
          <Pressable
            onPress={() => handleSocialLogin('linkedin')}
            disabled={isLoading}
            className="h-12 w-12 items-center justify-center rounded-xl bg-secondary active:bg-accent"
          >
            <Linkedin width={22} height={22} color={textColor} />
          </Pressable>
          <Pressable
            onPress={() => handleSocialLogin('apple')}
            disabled={isLoading}
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
          disabled={isLoading}
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
