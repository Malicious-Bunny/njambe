import { Text } from '@/components/ui/text';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import {
  BriefcaseIcon,
  CaretRightIcon,
  HeadphonesIcon,
  IdentificationCardIcon,
  SignOutIcon,
  SlidersHorizontalIcon,
  UsersThreeIcon,
  WalletIcon,
} from 'phosphor-react-native';
import * as React from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function MenuRow({
  icon,
  label,
  onPress,
  destructive = false,
}: {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  destructive?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center py-4 active:opacity-60"
    >
      <View className="mr-4 w-6 items-center">{icon}</View>
      <Text
        className={`flex-1 text-base ${destructive ? '' : 'text-foreground'}`}
        style={destructive ? { color: '#ef4444' } : undefined}
      >
        {label}
      </Text>
      {!destructive && <CaretRightIcon size={16} color="#a1a1aa" weight="bold" />}
    </Pressable>
  );
}

const MENU_ITEMS = [
  { label: 'Personal information', icon: IdentificationCardIcon, route: '/(customer)/(tabs)/account/personal-information' },
  { label: 'Balance', icon: WalletIcon, route: '/(customer)/(tabs)/account/balance' },
  { label: 'Preferences', icon: SlidersHorizontalIcon, route: '/(customer)/(tabs)/account/preferences' },
  { label: 'Support', icon: HeadphonesIcon, route: '/(customer)/(tabs)/account/support' },
  { label: 'Refer a friend', icon: UsersThreeIcon, route: '/(customer)/(tabs)/account/refer-a-friend' },
] as const;

export default function AccountScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#a1a1aa' : '#71717a';

  const handleSignOut = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: () => supabase.auth.signOut(),
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#18181b' }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Dark header */}
        <View className="items-center px-5 pb-12 pt-8">
          {/* Avatar circle */}
          <View
            className="mb-4 h-20 w-20 items-center justify-center rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
          >
            <Text className="text-3xl font-bold" style={{ color: '#ffffff' }}>
              JS
            </Text>
          </View>

          {/* Name */}
          <Text className="text-2xl font-bold" style={{ color: '#ffffff' }}>
            Joshua S.
          </Text>

          {/* Location */}
          <Text className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Yaoundé, Cameroon
          </Text>

        </View>

        {/* White card */}
        <View className="min-h-screen rounded-t-3xl bg-background px-5 pb-10 pt-6">
          {MENU_ITEMS.map(({ label, icon: Icon, route }, index) => (
            <React.Fragment key={label}>
              <MenuRow
                icon={<Icon size={22} color={iconColor} weight="regular" />}
                label={label}
                onPress={() => router.push(route as any)}
              />
              {index < MENU_ITEMS.length - 1 && <View className="h-px bg-border" />}
            </React.Fragment>
          ))}

          <View className="h-px bg-border" />
          <MenuRow
            icon={<BriefcaseIcon size={22} color={iconColor} weight="regular" />}
            label="Become a tasker"
            onPress={() => {}}
          />

          <View className="h-px bg-border" />
          <MenuRow
            icon={<SignOutIcon size={22} color="#ef4444" weight="regular" />}
            label="Log out"
            onPress={handleSignOut}
            destructive
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
