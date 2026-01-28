import { CountrySelector, OrDivider } from '@/components/custom/customer';
import { PageHeader } from '@/components/custom/shared';
import { Text } from '@/components/ui/text';
import { DEFAULT_COUNTRY, type Country } from '@/lib/customer/countries';
import { router } from 'expo-router';
import { EyeClosed, Eye, Google, Check } from 'iconoir-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Pressable, ScrollView, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

// Simple validation schema
const signupSchema = z.object({
  firstName: z.string().min(2, 'Min 2 characters'),
  lastName: z.string().min(2, 'Min 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
});

export default function ProviderSignupScreen() {
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

  // Theme colors
  const textColor = isDark ? '#fafafa' : '#18181b';
  const placeholderColor = isDark ? '#71717a' : '#a1a1aa';
  const iconColor = isDark ? '#a1a1aa' : '#71717a';
  const borderColor = isDark ? '#3f3f46' : '#e4e4e7';
  const checkboxBorderColor = isDark ? '#52525b' : '#d4d4d8';

  // Update form field
  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error when typing
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Validate and submit
  const handleSignup = () => {
    setSubmitted(true);
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

    // Success - navigate
    router.replace('/(provider)');
  };

  const handleGoogleSignup = () => {
    router.replace('/(provider)');
  };

  const hasInput = Object.values(form).some(v => v.trim() !== '');

  const getBorderColor = (field: string) => {
    return submitted && errors[field] ? '#ef4444' : borderColor;
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <PageHeader title="Join njambe!" />
        <View className="h-px bg-border" />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-6 pt-8">
            {/* First Name */}
            <View className="mb-6">
              <Text className="text-sm text-muted-foreground mb-2">First name</Text>
              <TextInput
                className="text-base pb-3"
                style={{ color: textColor, borderBottomColor: getBorderColor('firstName'), borderBottomWidth: 1 }}
                value={form.firstName}
                onChangeText={(v) => updateField('firstName', v)}
                autoCapitalize="words"
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
                style={{ color: textColor, borderBottomColor: getBorderColor('lastName'), borderBottomWidth: 1 }}
                value={form.lastName}
                onChangeText={(v) => updateField('lastName', v)}
                autoCapitalize="words"
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
                style={{ color: textColor, borderBottomColor: getBorderColor('email'), borderBottomWidth: 1 }}
                value={form.email}
                onChangeText={(v) => updateField('email', v)}
                keyboardType="email-address"
                autoCapitalize="none"
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
              className="h-14 flex-row items-center justify-center rounded-xl border-2 border-border bg-background mt-6 active:bg-secondary"
            >
              <Google width={20} height={20} color={textColor} />
              <Text className="ml-3 text-base font-semibold text-foreground">
                Sign up with Google
              </Text>
            </Pressable>
          </View>
        </ScrollView>

        {/* Bottom Section */}
        <View className="px-6 pb-4 bg-background">
          <Pressable
            onPress={handleSignup}
            disabled={!hasInput}
            className={`h-14 items-center justify-center rounded-xl ${
              hasInput ? 'bg-primary active:bg-primary/90' : 'bg-muted'
            }`}
          >
            <Text className={`text-base font-semibold ${
              hasInput ? 'text-primary-foreground' : 'text-muted-foreground'
            }`}>
              Sign up
            </Text>
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
    </SafeAreaView>
  );
}
