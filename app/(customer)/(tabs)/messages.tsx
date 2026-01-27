import { EmptyState, Header } from '@/components/custom/shared';
import { Text } from '@/components/ui/text';
import { ChatBubble } from 'iconoir-react-native';
import * as React from 'react';
import { ScrollView, View } from 'react-native';

export default function MessagesScreen() {
  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <Header showBackButton={false} />

      {/* Title */}
      <View className="px-5 pb-6">
        <Text className="text-2xl font-bold text-foreground">Messages</Text>
        <Text className="mt-1 text-muted-foreground">
          Chat with service providers
        </Text>
      </View>

      {/* Empty State */}
      <View className="px-5">
        <EmptyState
          icon={ChatBubble}
          title="No messages yet"
          subtitle="Start a conversation with a service provider"
        />
      </View>
    </ScrollView>
  );
}
