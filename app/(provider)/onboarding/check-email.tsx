import { Text } from '@/components/ui/text';
import { EmailSuccessIllustration } from '@/components/custom/provider/onboarding';
import { useProviderOnboardingStore } from '@/lib/stores';
import { supabase } from '@/lib/supabase';
import { ArrowLeft } from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Pressable, View } from 'react-native';

// Zinc theme colors matching the app's design system
const THEME_COLORS = {
  light: {
    background: '#fafafa', // zinc-50
    foreground: '#09090b', // zinc-950
    mutedForeground: '#71717a', // zinc-500
    accent: '#18181b', // zinc-900 (primary)
    muted: '#f4f4f5', // zinc-100
  },
  dark: {
    background: '#09090b', // zinc-950
    foreground: '#fafafa', // zinc-50
    mutedForeground: '#a1a1aa', // zinc-400
    accent: '#fafafa', // zinc-50 (primary in dark mode)
    muted: '#27272a', // zinc-800
  },
};

export default function CheckEmailScreen() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const { resetOnboarding } = useProviderOnboardingStore();
  const [userEmail, setUserEmail] = React.useState<string>('');

  const colors = THEME_COLORS[colorScheme ?? 'light'];

  // Get current user's email
  React.useEffect(() => {
    const fetchUserEmail = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
      }
    };
    fetchUserEmail();
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleLater = () => {
    // Reset onboarding store and navigate to tabs
    resetOnboarding();
    router.replace('/(provider)/(tabs)');
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* Header with Back Button */}
      <View className="flex-row items-center px-2 py-2">
        <Pressable
          onPress={handleBack}
          className="p-3 active:opacity-70"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={24} color={colors.foreground} weight="regular" />
        </Pressable>
      </View>

      {/* Main Content */}
      <View className="flex-1 items-center justify-center px-6">
        {/* Illustration */}
        <View className="mb-8">
          <EmailSuccessIllustration size={180} colorScheme={colorScheme ?? 'light'} />
        </View>

        {/* Title */}
        <Text
          className="text-center text-2xl font-bold"
          style={{ color: colors.foreground }}
        >
          Finalisez votre inscription
        </Text>

        {/* Email sent message */}
        <View className="mt-6 items-center">
          <Text
            className="text-center text-base"
            style={{ color: colors.foreground }}
          >
            Nous avons envoyé un mail à
          </Text>
          <Text
            className="mt-1 text-center text-base font-bold"
            style={{ color: colors.foreground }}
          >
            {userEmail || 'votre adresse email'}.
          </Text>
        </View>

        {/* Instruction */}
        <Text
          className="mt-6 text-center text-lg font-semibold"
          style={{ color: colors.foreground }}
        >
          Ouvrez ce mail et cliquez sur le lien de confirmation.
        </Text>

        {/* Spam note */}
        <Text
          className="mt-8 px-4 text-center text-sm leading-5"
          style={{ color: colors.mutedForeground }}
        >
          Pas reçu ? Attendez quelques minutes et vérifiez vos spams.
        </Text>
      </View>

      {/* Bottom "Plus tard" button */}
      <View className="items-center pb-12 pt-6">
        <Pressable
          onPress={handleLater}
          className="rounded-full px-8 py-3 active:opacity-70"
          style={{ backgroundColor: colors.muted }}
          hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
        >
          <Text
            className="text-base font-medium"
            style={{ color: colors.accent }}
          >
            Plus tard
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
