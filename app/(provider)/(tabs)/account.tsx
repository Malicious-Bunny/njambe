import { TabPageLayout } from '@/components/custom/shared';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { LogOut, Settings, User } from 'iconoir-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Alert, Pressable, View } from 'react-native';

export default function ProviderAccountScreen() {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';

  const handleLogout = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await supabase.auth.signOut();
            router.replace('/');
          },
        },
      ]
    );
  };

  return (
    <TabPageLayout title="Account" subtitle="Manage your provider profile">
      <View className="mt-4 gap-4">
        {/* Profile Section */}
        <View className="rounded-xl border border-border bg-card p-4">
          <View className="flex-row items-center gap-4">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <User width={32} height={32} color={iconColor} />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-foreground">Provider Account</Text>
              <Text className="text-sm text-muted-foreground">Manage your profile and services</Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <Pressable className="flex-row items-center gap-4 rounded-xl border border-border bg-card p-4 active:bg-accent">
          <Settings width={24} height={24} color={iconColor} />
          <Text className="flex-1 text-base text-foreground">Settings</Text>
        </Pressable>

        {/* Sign Out */}
        <Pressable
          onPress={handleLogout}
          className="flex-row items-center gap-4 rounded-xl border border-destructive bg-card p-4 active:bg-destructive/10"
        >
          <LogOut width={24} height={24} color="#ef4444" />
          <Text className="flex-1 text-base text-destructive">Sign Out</Text>
        </Pressable>
      </View>
    </TabPageLayout>
  );
}
