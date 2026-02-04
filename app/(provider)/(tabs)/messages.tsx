import { EmptyState, TabPageLayout } from '@/components/custom/shared';
import * as React from 'react';

export default function ProviderMessagesScreen() {
  return (
    <TabPageLayout title="Messages" subtitle="Chat with your customers">
      <EmptyState
        title="No messages"
        subtitle="Your conversations with customers will appear here"
      />
    </TabPageLayout>
  );
}
