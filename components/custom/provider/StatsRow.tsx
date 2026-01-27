import * as React from 'react';
import { View } from 'react-native';
import { StatCard } from './StatCard';

interface StatsRowProps {
  activeJobs?: number;
  earnings?: string;
}

export function StatsRow({ activeJobs = 0, earnings = 'XAF 0' }: StatsRowProps) {
  return (
    <View className="flex-row gap-3 px-5 pb-6">
      <StatCard title="Active Jobs" value={String(activeJobs)} subtitle="This week" />
      <StatCard title="Earnings" value={earnings} subtitle="This month" />
    </View>
  );
}
