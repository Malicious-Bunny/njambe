import { Text } from '@/components/ui/text';
import { Briefcase, Plus } from 'iconoir-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useColorScheme } from 'nativewind';

interface QuickActionsProps {
  onAddService?: () => void;
  onBrowseJobs?: () => void;
}

export function QuickActions({ onAddService, onBrowseJobs }: QuickActionsProps) {
  const { colorScheme } = useColorScheme();
  const primaryForeground = colorScheme === 'dark' ? '#18181b' : '#fafafa';
  const primary = colorScheme === 'dark' ? '#fafafa' : '#18181b';

  return (
    <View className="px-5 pb-6">
      <Text className="mb-4 text-lg font-semibold text-foreground dark:text-foreground">Quick Actions</Text>
      <View className="flex-row gap-3">
        <Pressable
          onPress={onAddService}
          className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl bg-primary py-4 shadow-lg active:bg-primary/90 dark:bg-primary dark:active:bg-primary/90">
          <Plus width={20} height={20} color={primaryForeground} />
          <Text className="font-semibold text-primary-foreground dark:text-primary-foreground">Add Service</Text>
        </Pressable>
        <Pressable
          onPress={onBrowseJobs}
          className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-card py-4 active:bg-accent dark:border-primary dark:bg-card dark:active:bg-accent">
          <Briefcase width={20} height={20} color={primary} />
          <Text className="font-semibold text-primary dark:text-primary">Browse Jobs</Text>
        </Pressable>
      </View>
    </View>
  );
}
