import { EmptyState, Header } from '@/components/custom/shared';
import { Text } from '@/components/ui/text';
import { Heart } from 'iconoir-react-native';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RequestsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <Header showBackButton={false} />

        {/* Title */}
        <View className="px-5 pb-6">
          <Text className="text-2xl font-bold text-foreground">My Requests</Text>
          <Text className="mt-1 text-muted-foreground">
            Track your service requests and offers
          </Text>
        </View>

        {/* Empty State */}
        <View className="px-5">
          <EmptyState
            icon={Heart}
            title="No requests yet"
            subtitle="Your service requests will appear here"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
