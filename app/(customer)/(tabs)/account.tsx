import { EmptyState, Header } from '@/components/custom/shared';
import { Text } from '@/components/ui/text';
import { User } from 'iconoir-react-native';
import * as React from 'react';
import { ScrollView, View } from 'react-native';

export default function AccountScreen() {
  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <Header showBackButton={false} />

      {/* Title */}
      <View className="px-5 pb-6">
        <Text className="text-2xl font-bold text-foreground">My Account</Text>
        <Text className="mt-1 text-muted-foreground">
          Manage your profile and settings
        </Text>
      </View>

      {/* Empty State */}
      <View className="px-5">
        <EmptyState
          icon={User}
          title="Account settings"
          subtitle="Profile settings will appear here"
        />
      </View>
    </ScrollView>
  );
}
