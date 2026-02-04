import { Text } from '@/components/ui/text';
import { getUserRole, signInWithGoogle, type UserRole } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { Google, Linkedin, AppleMac } from 'iconoir-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { ActivityIndicator, Alert, Pressable, View } from 'react-native';

interface SocialLoginButtonsProps {
  onSuccess: (role: UserRole) => void;
  disabled?: boolean;
}

export function SocialLoginButtons({ onSuccess, disabled = false }: SocialLoginButtonsProps) {
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const { colorScheme } = useColorScheme();
  const textColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);

    try {
      const result = await signInWithGoogle();

      if (!result.success) {
        if (result.error !== 'Authentication was cancelled') {
          Alert.alert('Login Failed', result.error || 'Google login failed', [{ text: 'OK' }]);
        }
        return;
      }

      // Get user role after successful login
      if (result.user) {
        const role = await getUserRole(result.user.id, result.user.user_metadata);
        onSuccess(role);
      } else {
        // If no user returned but success, try to get current session
        const { data: session } = await supabase.auth.getSession();
        if (session?.session?.user) {
          const role = await getUserRole(session.session.user.id, session.session.user.user_metadata);
          onSuccess(role);
        } else {
          onSuccess('customer'); // Default fallback
        }
      }
    } catch (error) {
      Alert.alert('Login Failed', error instanceof Error ? error.message : 'Google login failed', [
        { text: 'OK' },
      ]);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'linkedin' | 'apple') => {
    Alert.alert(
      'Coming Soon',
      `${provider === 'linkedin' ? 'LinkedIn' : 'Apple'} login will be available soon.`,
      [{ text: 'OK' }]
    );
  };

  const isDisabled = disabled || isGoogleLoading;

  return (
    <View>
      <View className="items-center mb-6">
        <Text className="text-sm text-muted-foreground">Or continue with</Text>
      </View>

      <View className="flex-row justify-center gap-4">
        <Pressable
          onPress={handleGoogleLogin}
          disabled={isDisabled}
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
          disabled={isDisabled}
          className="h-12 w-12 items-center justify-center rounded-xl bg-secondary active:bg-accent"
        >
          <Linkedin width={22} height={22} color={textColor} />
        </Pressable>
        <Pressable
          onPress={() => handleSocialLogin('apple')}
          disabled={isDisabled}
          className="h-12 w-12 items-center justify-center rounded-xl bg-secondary active:bg-accent"
        >
          <AppleMac width={22} height={22} color={textColor} />
        </Pressable>
      </View>
    </View>
  );
}
