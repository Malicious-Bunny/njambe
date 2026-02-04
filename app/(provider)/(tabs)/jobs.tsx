import { EmptyState, TabPageLayout } from '@/components/custom/shared';
import * as React from 'react';

export default function ProviderJobsScreen() {
  return (
    <TabPageLayout title="Jobs" subtitle="Manage your service requests">
      <EmptyState
        title="No jobs yet"
        subtitle="When customers request your services, they'll appear here"
      />
    </TabPageLayout>
  );
}
