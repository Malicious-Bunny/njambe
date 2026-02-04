import { EmptyState, TabPageLayout } from '@/components/custom/shared';
import * as React from 'react';

export default function ProviderNotificationsScreen() {
  return (
    <TabPageLayout title="Notifications" subtitle="Stay updated on your services">
      <EmptyState
        title="No notifications"
        subtitle="You'll receive updates about job requests and messages here"
      />
    </TabPageLayout>
  );
}
