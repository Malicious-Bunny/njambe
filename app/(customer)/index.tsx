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

// Zod schema for form validation
const signupSchema = z.object({
  firstName: z.string().min(1, 'First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

type SignupFormData = z.infer<typeof signupSchema>;

type FormErrors = Partial<Record<keyof SignupFormData, string>>;

export default function CustomerSignupScreen() {
  const { colorScheme } = useColorScheme();

  // Form state
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState<Country>(DEFAULT_COUNTRY);
  const [acceptsPromos, setAcceptsPromos] = React.useState(false);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [touched, setTouched] = React.useState<Partial<Record<keyof SignupFormData, boolean>>>({});

  // Theme colors
  const textColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';
  const placeholderColor = colorScheme === 'dark' ? '#71717a' : '#a1a1aa';
  const iconColor = colorScheme === 'dark' ? '#a1a1aa' : '#71717a';
  const borderColor = colorScheme === 'dark' ? '#3f3f46' : '#e4e4e7';
  const errorBorderColor = '#ef4444';
  const checkboxBorderColor = colorScheme === 'dark' ? '#52525b' : '#d4d4d8';

  // Validate form data
  const validateForm = (): boolean => {
    const result = signupSchema.safeParse({ firstName, lastName, email, password });

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof SignupFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = error.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  // Validate single field on blur
  const validateField = (field: keyof SignupFormData, value: string) => {
    const fieldSchema = signupSchema.shape[field];
    const result = fieldSchema.safeParse(value);

    if (!result.success) {
      setErrors(prev => ({ ...prev, [field]: result.error.errors[0].message }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: keyof SignupFormData, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, value);
  };

  const handleSignup = () => {
    // Mark all fields as touched
    setTouched({ firstName: true, lastName: true, email: true, password: true });

    if (validateForm()) {
      // TODO: Implement signup logic
      router.replace('/(customer)/(tabs)');
    }
  };

  const handleGoogleSignup = () => {
    // TODO: Implement Google OAuth
    router.replace('/(customer)/(tabs)');
  };

  // Check if form is valid (for button state)
  const isFormValid = React.useMemo(() => {
    const result = signupSchema.safeParse({ firstName, lastName, email, password });
    return result.success;
  }, [firstName, lastName, email, password]);

  const getInputBorderColor = (field: keyof SignupFormData) => {
    if (touched[field] && errors[field]) {
      return errorBorderColor;
    }
    return borderColor;
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <PageHeader title="Join njambe!" />

        {/* Subtle divider line */}
        <View className="h-px bg-border" />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Form Content */}
          <View className="px-6 pt-8">
            {/* First Name Input */}
            <View className="mb-6">
              <Text className="text-sm text-muted-foreground mb-2">First name</Text>
              <TextInput
                className="text-base pb-3"
                style={{
                  color: textColor,
                  borderBottomColor: getInputBorderColor('firstName'),
                  borderBottomWidth: 1,
                }}
                placeholder=""
                placeholderTextColor={placeholderColor}
                value={firstName}
                onChangeText={setFirstName}
                onBlur={() => handleBlur('firstName', firstName)}
                autoCapitalize="words"
              />
              {touched.firstName && errors.firstName && (
                <Text className="text-xs text-red-500 mt-1">{errors.firstName}</Text>
              )}
            </View>

            {/* Last Name Input */}
            <View className="mb-6">
              <Text className="text-sm text-muted-foreground mb-2">Last name</Text>
              <TextInput
                className="text-base pb-3"
                style={{
                  color: textColor,
                  borderBottomColor: getInputBorderColor('lastName'),
                  borderBottomWidth: 1,
                }}
                placeholder=""
                placeholderTextColor={placeholderColor}
                value={lastName}
                onChangeText={setLastName}
                onBlur={() => handleBlur('lastName', lastName)}
                autoCapitalize="words"
              />
              {touched.lastName && errors.lastName && (
                <Text className="text-xs text-red-500 mt-1">{errors.lastName}</Text>
              )}
            </View>

            {/* Email Input */}
            <View className="mb-6">
              <Text className="text-sm text-muted-foreground mb-2">Email address</Text>
              <TextInput
                className="text-base pb-3"
                style={{
                  color: textColor,
                  borderBottomColor: getInputBorderColor('email'),
                  borderBottomWidth: 1,
                }}
                placeholder=""
                placeholderTextColor={placeholderColor}
                value={email}
                onChangeText={setEmail}
                onBlur={() => handleBlur('email', email)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text className="text-xs text-red-500 mt-1">{errors.email}</Text>
              )}
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <Text className="text-sm text-muted-foreground mb-2">Password</Text>
              <View
                className="flex-row items-center border-b"
                style={{ borderBottomColor: getInputBorderColor('password'), borderBottomWidth: 1 }}
              >
                <TextInput
                  className="flex-1 text-base pb-3"
                  style={{ color: textColor }}
                  placeholder=""
                  placeholderTextColor={placeholderColor}
                  value={password}
                  onChangeText={setPassword}
                  onBlur={() => handleBlur('password', password)}
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
              {touched.password && errors.password && (
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
                  borderColor: acceptsPromos
                    ? colorScheme === 'dark' ? '#fafafa' : '#18181b'
                    : checkboxBorderColor,
                  backgroundColor: acceptsPromos
                    ? colorScheme === 'dark' ? '#fafafa' : '#18181b'
                    : 'transparent',
                }}
              >
                {acceptsPromos && (
                  <Check width={14} height={14} color={colorScheme === 'dark' ? '#18181b' : '#fafafa'} />
                )}
              </View>
              <Text className="flex-1 text-sm text-muted-foreground leading-5">
                I'd like to receive information and promotions. We promise not to spam!
              </Text>
            </Pressable>

            {/* Or Divider */}
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

        {/* Bottom Section - Fixed */}
        <View className="px-6 pb-4 bg-background">
          {/* Signup Button */}
          <Pressable
            onPress={handleSignup}
            disabled={!isFormValid}
            className={`h-14 items-center justify-center rounded-xl ${
              isFormValid
                ? 'bg-primary active:bg-primary/90'
                : 'bg-muted'
            }`}
          >
            <Text className={`text-base font-semibold ${
              isFormValid ? 'text-primary-foreground' : 'text-muted-foreground'
            }`}>
              Sign up
            </Text>
          </Pressable>

          {/* Terms and Conditions */}
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
