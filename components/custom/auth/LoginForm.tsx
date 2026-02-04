import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { getUserRole, type UserRole } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { Eye, EyeClosed } from 'iconoir-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { ErrorBanner } from './ErrorBanner';

// Re-export UserRole for backward compatibility
export type { UserRole } from '@/lib/auth';

interface LoginFormProps {
  onSuccess: (role: UserRole) => void;
  onForgotPassword: () => void;
}

export function LoginForm({ onSuccess, onForgotPassword }: LoginFormProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginError, setLoginError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { colorScheme } = useColorScheme();

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
        // Handle email not confirmed error specifically
        if (error.message.includes('Email not confirmed')) {
          setLoginError('Please confirm your email address before signing in.');
        } else {
          setLoginError(error.message);
        }
        return;
      }

      if (data.user) {
        // Fetch user role and route accordingly
        const role = await getUserRole(data.user.id, data.user.user_metadata);
        onSuccess(role);
      }
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <ErrorBanner message={loginError} />

      {/* Email Input */}
      <View className="mb-6">
        <Text className="text-sm text-muted-foreground mb-2">Email address</Text>
        <Input
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          editable={!isLoading}
          hasError={!!loginError}
        />
      </View>

      {/* Password Input */}
      <View className="mb-4">
        <Text className="text-sm text-muted-foreground mb-2">Password</Text>
        <View
          className="flex-row items-center"
          style={{
            borderBottomColor: loginError ? '#ef4444' : borderColor,
            borderBottomWidth: 1,
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
            editable={!isLoading}
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

      {/* Forgot Password */}
      <View className="items-center mb-6">
        <Pressable onPress={onForgotPassword}>
          <Text className="text-sm text-muted-foreground underline">Forgot password?</Text>
        </Pressable>
      </View>

      {/* Login Button */}
      <Pressable
        onPress={handleLogin}
        disabled={isLoading}
        className="h-14 items-center justify-center rounded-full bg-primary active:bg-primary/90"
      >
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={colorScheme === 'dark' ? '#18181b' : '#fafafa'}
          />
        ) : (
          <Text className="text-base font-semibold text-primary-foreground">Sign In</Text>
        )}
      </Pressable>
    </View>
  );
}
