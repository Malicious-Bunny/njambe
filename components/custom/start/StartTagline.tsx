import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View } from 'react-native';

export function StartTagline() {
  return (
    <View className="mt-8 px-6">
      <Text className="text-3xl font-semibold leading-tight text-foreground dark:text-foreground">
        Skilled neighbors,
      </Text>
      <Text className="text-3xl font-bold italic text-primary dark:text-primary">
        right next door!
      </Text>
    </View>
  );
}
