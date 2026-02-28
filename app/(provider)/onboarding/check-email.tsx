import { Text } from '@/components/ui/text';
import { EmailSuccessIllustration } from '@/components/custom/provider/onboarding';
import { useProviderOnboardingStore } from '@/lib/stores';
import { RESEND_COOLDOWN_SECONDS } from '@/lib/auth/constants';
import { supabase } from '@/lib/supabase';
import { ArrowLeftIcon } from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';

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
  const [isSendingEmail, setIsSendingEmail] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState(false);
  const [sendError, setSendError] = React.useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = React.useState(0);

  const cooldownRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const colors = THEME_COLORS[colorScheme ?? 'light'];

  const sendVerificationEmail = React.useCallback(async (email: string) => {
    setIsSendingEmail(true);
    setSendError(null);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      if (error) {
        setSendError(error.message);
      } else {
        setEmailSent(true);
        setResendCooldown(RESEND_COOLDOWN_SECONDS);
      }
    } catch {
      setSendError('Failed to send email');
    } finally {
      setIsSendingEmail(false);
    }
  }, []);

  // Fetch user email then auto-send verification email on mount
  React.useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
        await sendVerificationEmail(user.email);
      }
    };
    init();
  }, [sendVerificationEmail]);

  // Cooldown countdown
  React.useEffect(() => {
    if (resendCooldown > 0) {
      cooldownRef.current = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(cooldownRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    };
  }, [resendCooldown]);

  const handleResend = () => {
    if (userEmail && resendCooldown === 0 && !isSendingEmail) {
      sendVerificationEmail(userEmail);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleLater = () => {
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
          <ArrowLeftIcon size={24} color={colors.foreground} weight="regular" />
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

        {/* Error note */}
        {sendError && (
          <Text
            className="mt-3 text-center text-sm"
            style={{ color: '#ef4444' }}
          >
            {sendError}
          </Text>
        )}

        {/* Resend button */}
        <Pressable
          onPress={handleResend}
          disabled={resendCooldown > 0 || isSendingEmail}
          className="mt-6 px-8 py-3 active:opacity-70"
          hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
        >
          {isSendingEmail ? (
            <ActivityIndicator size="small" color={colors.mutedForeground} />
          ) : (
            <Text
              className="text-sm font-medium"
              style={{
                color: resendCooldown > 0 ? colors.mutedForeground : colors.accent,
              }}
            >
              {resendCooldown > 0
                ? `Renvoyer dans ${resendCooldown}s`
                : emailSent
                ? 'Renvoyer l\'email'
                : 'Envoyer l\'email'}
            </Text>
          )}
        </Pressable>
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
