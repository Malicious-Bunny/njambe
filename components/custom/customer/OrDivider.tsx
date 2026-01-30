import { Text } from '@/components/ui/text';
import { Separator } from '@/components/ui/separator';
import * as React from 'react';
import { View } from 'react-native';

interface OrDividerProps {
  text?: string;
}

export function OrDivider({ text = 'or' }: OrDividerProps) {
  return (
    <View className="flex-row items-center gap-4">
      <Separator className="flex-1 bg-border dark:bg-border" />
      <Text className="text-base text-muted-foreground dark:text-muted-foreground">{text}</Text>
      <Separator className="flex-1 bg-border dark:bg-border" />
    </View>
  );
}
