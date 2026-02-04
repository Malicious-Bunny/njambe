import { QuickActions, StatsRow } from '@/components/custom/provider';
import { Header } from '@/components/custom/shared';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProviderDashboardScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <Header showBackButton={false} />

        {/* Welcome Section */}
        <View className="px-5 pb-6 pt-4">
          <Text className="text-2xl font-bold text-foreground">Welcome back!</Text>
          <Text className="mt-1 text-muted-foreground">
            Here's an overview of your service activity
          </Text>
        </View>

        {/* Stats Row */}
        <StatsRow />

        {/* Quick Actions */}
        <View className="mt-8 px-5">
          <Text className="mb-4 text-lg font-semibold text-foreground">Quick Actions</Text>
          <QuickActions />
        </View>

        {/* Recent Activity Placeholder */}
        <View className="mt-8 px-5">
          <Text className="mb-4 text-lg font-semibold text-foreground">Recent Activity</Text>
          <View className="items-center justify-center rounded-xl border border-border bg-card p-8">
            <Text className="text-muted-foreground">No recent activity</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
