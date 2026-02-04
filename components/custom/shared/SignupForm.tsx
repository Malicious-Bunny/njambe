import { CountrySelector, OrDivider } from '@/components/custom/customer';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { signUpWithGoogle } from '@/lib/auth/google-auth';
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
  View,
} from 'react-native';
import { z } from 'zod';

// Validation schema with phone number
const signupSchema = z.object({
  firstName: z.string().min(2, 'Min 2 characters'),
  lastName: z.string().min(2, 'Min 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
  phone: z
    .string()
    .min(9, 'Phone number must be 9 digits')
    .max(9, 'Phone number must be 9 digits')
    .regex(/^[67]\d{8}$/, 'Invalid Cameroon phone number (must start with 6 or 7)'),
});

export type UserRole = 'customer' | 'provider';

interface SignupFormProps {
  role: UserRole;
  successRoute: string;
}

export function SignupForm({ role, successRoute }: SignupFormProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Form state with phone
  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState<Country>(DEFAULT_COUNTRY);
  const [acceptsPromos, setAcceptsPromos] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const [authError, setAuthError] = React.useState<string | null>(null);

  // Phone country code (Cameroon default)
  const phoneCountryCode = '+237';

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
  }, [form.email, form.password, form.phone]);

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

  // Handle phone input - only allow digits
  const handlePhoneChange = (value: string) => {
    // Remove any non-digit characters
    const digitsOnly = value.replace(/\D/g, '');
    // Limit to 9 digits
    const limited = digitsOnly.slice(0, 9);
    updateField('phone', limited);
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

    // Format full phone number with country code
    const fullPhoneNumber = `${phoneCountryCode}${form.phone}`;
    // log the datatype of fullPhoneNumber for debugging
    console.log('Full Phone Number Type:', typeof fullPhoneNumber);

    try {
      // Sign up with Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
        options: {
          data: {
            first_name: form.firstName,
            last_name: form.lastName,
            role
          },
        },
      });

      if (signUpError) {
        setAuthError(signUpError.message);
        // console log full error details for debugging

        Alert.alert('Signup Failed', signUpError.message, [{ text: 'OK' }]);
        return;
      }

      if (authData.user) {
        // Create user profile in database
        const { error: profileError } = await supabase.from('global.users').upsert({
          id: authData.user.id,
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email.trim(),
          
          phone: fullPhoneNumber,
          role,
          accept_promo: acceptsPromos,
          updated_at: new Date().toISOString(),
        });

        if (profileError) {
          console.error('Error creating profile:', profileError);
          Alert.alert("Failed to set user profile",profileError.message,[{ text: 'OK' }]);
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
    setIsGoogleLoading(true);

    try {
      // Use signUpWithGoogle which handles OAuth flow and profile creation
      const result = await signUpWithGoogle(role);

      if (!result.success) {
        if (result.error !== 'Authentication was cancelled') {
          Alert.alert('Google Signup Failed', result.error || 'Failed to sign up with Google', [
            { text: 'OK' },
          ]);
        }
        return;
      }

      // Navigate on success
      router.replace(successRoute as any);
    } catch (error) {
      Alert.alert(
        'Google Signup Failed',
        error instanceof Error ? error.message : 'Failed to sign up with Google',
        [{ text: 'OK' }]
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const hasInput = Object.values(form).some((v) => v.trim() !== '');
  const anyLoading = isLoading || isGoogleLoading;

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
            <Input
              value={form.firstName}
              onChangeText={(v) => updateField('firstName', v)}
              autoCapitalize="words"
              editable={!anyLoading}
              hasError={submitted && !!errors.firstName}
            />
            {submitted && errors.firstName && (
              <Text className="text-xs text-red-500 mt-1">{errors.firstName}</Text>
            )}
          </View>

          {/* Last Name */}
          <View className="mb-6">
            <Text className="text-sm text-muted-foreground mb-2">Last name</Text>
            <Input
              value={form.lastName}
              onChangeText={(v) => updateField('lastName', v)}
              autoCapitalize="words"
              editable={!anyLoading}
              hasError={submitted && !!errors.lastName}
            />
            {submitted && errors.lastName && (
              <Text className="text-xs text-red-500 mt-1">{errors.lastName}</Text>
            )}
          </View>

          {/* Email */}
          <View className="mb-6">
            <Text className="text-sm text-muted-foreground mb-2">Email address</Text>
            <Input
              value={form.email}
              onChangeText={(v) => updateField('email', v)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              editable={!anyLoading}
              hasError={submitted && !!errors.email}
            />
            {submitted && errors.email && (
              <Text className="text-xs text-red-500 mt-1">{errors.email}</Text>
            )}
          </View>

          {/* Phone Number */}
          <View className="mb-6">
            <Text className="text-sm text-muted-foreground mb-2">Phone number</Text>
            <View
              className="flex-row"
              style={{ borderBottomColor: submitted && errors.phone ? '#ef4444' : borderColor, borderBottomWidth: 1 }}
            >
              {/* Country Code Prefix */}
             <View
                  className="flex-row pr-3 border-r border-border"
                  style={{ paddingTop: 4, paddingBottom: 12, minHeight: 44 }}
                >
                  <Text
                    className="text-base ml-2"
                    style={{ color: textColor, fontSize: 16, lineHeight: 22 }}
                  >
                    {phoneCountryCode}
                  </Text>
                </View>

                {/* Phone Input */}
                <Input
                  style={{
                    flex: 1,
                    paddingLeft: 12,
                    borderBottomWidth: 0,
                  }}
                  value={form.phone}
                  onChangeText={handlePhoneChange}
                  keyboardType="phone-pad"
                  maxLength={9}
                  editable={!anyLoading}
                  hasError={false}
                />
            </View>
            {submitted && errors.phone && (
              <Text className="text-xs text-red-500 mt-1">{errors.phone}</Text>
            )}
          </View>

          {/* Password */}
          <View className="mb-6">
            <Text className="text-sm text-muted-foreground mb-2">Password</Text>
            <View
              className="flex-row items-center"
              style={{ borderBottomColor: submitted && errors.password ? '#ef4444' : borderColor, borderBottomWidth: 1 }}
            >
              <Input
                style={{
                  flex: 1,
                  borderBottomWidth: 0,
                }}
                value={form.password}
                onChangeText={(v) => updateField('password', v)}
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
            disabled={anyLoading}
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
            disabled={anyLoading}
            className="h-14 flex-row items-center justify-center rounded-xl border-2 border-border bg-background mt-6 active:bg-secondary"
          >
            {isGoogleLoading ? (
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
          disabled={!hasInput || anyLoading}
          className={`h-14 items-center justify-center rounded-xl ${
            hasInput && !anyLoading ? 'bg-primary active:bg-primary/90' : 'bg-muted'
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
