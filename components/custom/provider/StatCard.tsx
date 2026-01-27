import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View } from 'react-native';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
}

export function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <View className="flex-1 rounded-2xl bg-card p-4 shadow-sm">
      <Text className="text-xs text-muted-foreground">{title}</Text>
      <Text className="mt-1 text-2xl font-bold text-foreground">{value}</Text>
      <Text className="text-xs text-muted-foreground">{subtitle}</Text>
    </View>
  );
}
