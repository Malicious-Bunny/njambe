import { QuickActions, StatsRow } from '@/components/custom/provider';
import { EmptyState, Header, LocationSelector } from '@/components/custom/shared';
import { Text } from '@/components/ui/text';
import { Briefcase } from 'iconoir-react-native';
import * as React from 'react';
import { ScrollView, View } from 'react-native';

export default function ProviderHomeScreen() {
  const handleAddService = () => {
    // TODO: Navigate to add service screen
    console.log('Add service pressed');
  };

  const handleBrowseJobs = () => {
    // TODO: Navigate to browse jobs screen
    console.log('Browse jobs pressed');
  };

  const handleAddFirstService = () => {
    // TODO: Navigate to add service screen
    console.log('Add first service pressed');
  };

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 24 }}>
      {/* Header */}
      <Header />

      {/* Location */}
      <LocationSelector />

      {/* Welcome Section */}
      <View className="px-5 pb-6">
        <Text className="text-2xl font-bold text-foreground">Welcome, Provider!</Text>
        <Text className="mt-1 text-muted-foreground">
          Find jobs and offer your services to neighbors
        </Text>
      </View>

      {/* Stats */}
      <StatsRow activeJobs={0} earnings="XAF 0" />

      {/* Quick Actions */}
      <QuickActions onAddService={handleAddService} onBrowseJobs={handleBrowseJobs} />

      {/* Available Jobs Section */}
      <View className="px-5">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-foreground">Available Jobs Near You</Text>
          <Text className="text-sm text-primary">See all</Text>
        </View>
        <View className="mt-4">
          <EmptyState
            icon={Briefcase}
            title="No jobs available yet"
            subtitle="New jobs will appear here"
          />
        </View>
      </View>

      {/* My Services Section */}
      <View className="mt-8 px-5">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-foreground">My Services</Text>
          <Text className="text-sm text-primary">Manage</Text>
        </View>
        <View className="mt-4">
          <EmptyState
            title="You haven't added any services yet"
            actionLabel="Add your first service"
            onActionPress={handleAddFirstService}
          />
        </View>
      </View>
    </ScrollView>
  );
}
