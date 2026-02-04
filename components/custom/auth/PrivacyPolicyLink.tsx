import { Text } from '@/components/ui/text';
import * as React from 'react';
import { Pressable, View } from 'react-native';

interface PrivacyPolicyLinkProps {
  onPress?: () => void;
}

export function PrivacyPolicyLink({ onPress }: PrivacyPolicyLinkProps) {
  return (
    <View className="items-center mt-10">
      <Pressable onPress={onPress}>
        <Text className="text-sm text-muted-foreground underline">Privacy Policy</Text>
      </Pressable>
    </View>
  );
}
