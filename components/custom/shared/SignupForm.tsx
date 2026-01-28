import { CountrySelector, OrDivider } from '@/components/custom/customer';
import { Text } from '@/components/ui/text';
import { DEFAULT_COUNTRY, type Country } from '@/lib/customer/countries';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { EyeClosed, Eye, Google, Check } from 'iconoir-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { z } from 'zod';

// Validation schema
const signupSchema = z.object({
  firstName: z.string().min(2, 'Min 2 characters'),
  lastName: z.string().min(2, 'Min 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
});

export type UserRole = 'customer' | 'provider';

interface SignupFormProps {
  role: UserRole;
  successRoute: string;
}

export function SignupForm({ role, successRoute }: SignupFormProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Form state
  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState<Country>(DEFAULT_COUNTRY);
  const [acceptsPromos, setAcceptsPromos] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [authError, setAuthError] = React.useState<string | null>(null);

  // Theme colors
  const textColor = isDark ? '#fafafa' : '#18181b';
  const iconColor = isDark ? '#a1a1aa' : '#71717a';
  const borderColor = isDark ? '#3f3f46' : '#e4e4e7';
  const checkboxBorderColor = isDark ? '#52525b' : '#d4d4d8';

  // Clear auth error when form changes
  React.useEffect(() => {
    if (authError) {
      setAuthError(null);
    }
  }, [form.email, form.password]);

  // Update form field
  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error when typing
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Validate and submit
  const handleSignup = async () => {
    setSubmitted(true);
    setAuthError(null);

    const result = signupSchema.safeParse(form);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!newErrors[field]) {
          newErrors[field] = issue.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Sign up with Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
        options: {
          data: {
            first_name: form.firstName,
            last_name: form.lastName,
            role,
          },
        },
      });

      if (signUpError) {
        setAuthError(signUpError.message);
        Alert.alert('Signup Failed', signUpError.message, [{ text: 'OK' }]);
        return;
      }

      if (authData.user) {
        // Create user profile in database
        const { error: profileError } = await supabase.from('profiles').upsert({
          id: authData.user.id,
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email.trim(),
          country_code: selectedCountry.code,
          country_name: selectedCountry.name,
          role,
          accepts_promos: acceptsPromos,
          updated_at: new Date().toISOString(),
        });

        if (profileError) {
          console.error('Error creating profile:', profileError);
          // Don't fail signup if profile creation fails - user can update later
        }

        // Navigate on success
        router.replace(successRoute as any);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed';
      setAuthError(errorMessage);
      Alert.alert('Signup Failed', errorMessage, [{ text: 'OK' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setAuthError(null);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          skipBrowserRedirect: true,
        },
      });

      if (error) {
        Alert.alert('Google Signup Failed', error.message, [{ text: 'OK' }]);
      }
    } catch (error) {
      Alert.alert('Google Signup Failed', error instanceof Error ? error.message : 'Failed', [{ text: 'OK' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const hasInput = Object.values(form).some((v) => v.trim() !== '');

  const getBorderColor = (field: string) => {
    return submitted && errors[field] ? '#ef4444' : borderColor;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="px-6 pt-8">
          {/* Auth Error Banner */}
          {authError && (
            <View className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
              <Text className="text-sm text-red-600 dark:text-red-400 text-center">
                {authError}
              </Text>
            </View>
          )}

          {/* First Name */}
          <View className="mb-6">
            <Text className="text-sm text-muted-foreground mb-2">First name</Text>
            <TextInput
              className="text-base pb-3"
              style={{
                color: textColor,
                borderBottomColor: getBorderColor('firstName'),
                borderBottomWidth: 1,
              }}
              value={form.firstName}
              onChangeText={(v) => updateField('firstName', v)}
              autoCapitalize="words"
              editable={!isLoading}
              placeholder="Enter your first name"
              placeholderTextColor={iconColor}
            />
            {submitted && errors.firstName && (
              <Text className="text-xs text-red-500 mt-1">{errors.firstName}</Text>
            )}
          </View>

          {/* Last Name */}
          <View className="mb-6">
            <Text className="text-sm text-muted-foreground mb-2">Last name</Text>
            <TextInput
              className="text-base pb-3"
              style={{
                color: textColor,
                borderBottomColor: getBorderColor('lastName'),
                borderBottomWidth: 1,
              }}
              value={form.lastName}
              onChangeText={(v) => updateField('lastName', v)}
              autoCapitalize="words"
              editable={!isLoading}
              placeholder="Enter your last name"
              placeholderTextColor={iconColor}
            />
            {submitted && errors.lastName && (
              <Text className="text-xs text-red-500 mt-1">{errors.lastName}</Text>
            )}
          </View>

          {/* Email */}
          <View className="mb-6">
            <Text className="text-sm text-muted-foreground mb-2">Email address</Text>
            <TextInput
              className="text-base pb-3"
              style={{
                color: textColor,
                borderBottomColor: getBorderColor('email'),
                borderBottomWidth: 1,
              }}
              value={form.email}
              onChangeText={(v) => updateField('email', v)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              editable={!isLoading}
              placeholder="Enter your email"
              placeholderTextColor={iconColor}
            />
            {submitted && errors.email && (
              <Text className="text-xs text-red-500 mt-1">{errors.email}</Text>
            )}
          </View>

          {/* Password */}
          <View className="mb-6">
            <Text className="text-sm text-muted-foreground mb-2">Password</Text>
            <View
              className="flex-row items-center"
              style={{ borderBottomColor: getBorderColor('password'), borderBottomWidth: 1 }}
            >
              <TextInput
                className="flex-1 text-base pb-3"
                style={{ color: textColor }}
                value={form.password}
                onChangeText={(v) => updateField('password', v)}
                secureTextEntry={!showPassword}
                editable={!isLoading}
                placeholder="Create a password"
                placeholderTextColor={iconColor}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)} className="pb-3">
                {showPassword ? (
                  <Eye width={20} height={20} color={iconColor} />
                ) : (
                  <EyeClosed width={20} height={20} color={iconColor} />
                )}
              </Pressable>
            </View>
            {submitted && errors.password && (
              <Text className="text-xs text-red-500 mt-1">{errors.password}</Text>
            )}
            <Text className="text-xs text-muted-foreground mt-2">
              Must be at least 8 characters
            </Text>
          </View>

          {/* Country Selector */}
          <CountrySelector
            selectedCountry={selectedCountry}
            onCountryChange={setSelectedCountry}
          />

          {/* Promotions Checkbox */}
          <Pressable
            onPress={() => setAcceptsPromos(!acceptsPromos)}
            className="flex-row items-start mb-8"
            disabled={isLoading}
          >
            <View
              className="w-5 h-5 rounded border-2 mr-3 mt-0.5 items-center justify-center"
              style={{
                borderColor: acceptsPromos ? textColor : checkboxBorderColor,
                backgroundColor: acceptsPromos ? textColor : 'transparent',
              }}
            >
              {acceptsPromos && (
                <Check width={14} height={14} color={isDark ? '#18181b' : '#fafafa'} />
              )}
            </View>
            <Text className="flex-1 text-sm text-muted-foreground leading-5">
              I'd like to receive information and promotions. We promise not to spam!
            </Text>
          </Pressable>

          <OrDivider />

          {/* Google Signup Button */}
          <Pressable
            onPress={handleGoogleSignup}
            disabled={isLoading}
            className="h-14 flex-row items-center justify-center rounded-xl border-2 border-border bg-background mt-6 active:bg-secondary"
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={textColor} />
            ) : (
              <>
                <Google width={20} height={20} color={textColor} />
                <Text className="ml-3 text-base font-semibold text-foreground">
                  Sign up with Google
                </Text>
              </>
            )}
          </Pressable>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View className="px-6 pb-4 bg-background">
        <Pressable
          onPress={handleSignup}
          disabled={!hasInput || isLoading}
          className={`h-14 items-center justify-center rounded-xl ${
            hasInput && !isLoading ? 'bg-primary active:bg-primary/90' : 'bg-muted'
          }`}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={isDark ? '#18181b' : '#fafafa'} />
          ) : (
            <Text
              className={`text-base font-semibold ${
                hasInput ? 'text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              Sign up
            </Text>
          )}
        </Pressable>

        <View className="mt-4 items-center">
          <Text className="text-xs text-muted-foreground text-center leading-5">
            By clicking "Sign up", you confirm you are over 16 years old.{'\n'}
            You also accept our{' '}
            <Text className="text-xs text-primary underline">Terms & Conditions</Text>
            {' '}and our{' '}
            <Text className="text-xs text-primary underline">Privacy Policy</Text>.
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
