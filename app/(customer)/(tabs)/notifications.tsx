import { EmptyState, Header } from '@/components/custom/shared';
import { Text } from '@/components/ui/text';
import { Bell } from 'iconoir-react-native';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <Header showBackButton={false} showNotification={false} />

        {/* Title */}
        <View className="px-5 pb-6">
          <Text className="text-2xl font-bold text-foreground">Notifications</Text>
          <Text className="mt-1 text-muted-foreground">
            Stay updated on your activity
          </Text>
        </View>

        {/* Empty State */}
        <View className="px-5">
          <EmptyState
            icon={Bell}
            title="No notifications"
            subtitle="You're all caught up!"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
