import { EmptyState, Header, LocationSelector } from '@/components/custom/shared';
import { QuickActions, StatsRow } from '@/components/custom/provider';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProviderHomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <Header showBack={false} showNotification={true} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Location Selector */}
        <View className="px-4 pt-2">
          <LocationSelector />
        </View>

        {/* Welcome Section */}
        <View className="px-6 pt-6">
          <Text className="text-2xl font-bold text-foreground">
            Welcome back!
          </Text>
          <Text className="text-base text-muted-foreground mt-1">
            Here's what's happening today
          </Text>
        </View>

        {/* Stats Row */}
        <View className="mt-6">
          <StatsRow />
        </View>

        {/* Quick Actions */}
        <View className="px-4 mt-6">
          <Text className="text-lg font-semibold text-foreground mb-4 px-2">
            Quick Actions
          </Text>
          <QuickActions />
        </View>

        {/* Available Jobs Section */}
        <View className="px-6 mt-8">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Available Jobs
          </Text>
          <EmptyState
            icon="briefcase"
            title="No jobs yet"
            description="New job opportunities will appear here"
          />
        </View>

        {/* My Services Section */}
        <View className="px-6 mt-8">
          <Text className="text-lg font-semibold text-foreground mb-4">
            My Services
          </Text>
          <EmptyState
            icon="wrench"
            title="No services added"
            description="Add services to start receiving job requests"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
