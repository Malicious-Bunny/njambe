import { Text } from '@/components/ui/text';
import * as React from 'react';
import { Pressable, View } from 'react-native';

interface CreateAccountButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export function CreateAccountButton({ onPress, disabled = false }: CreateAccountButtonProps) {
  return (
    <View className="px-6 pb-4">
      <View className="h-px bg-border mb-4" />
      <Pressable
        onPress={onPress}
        disabled={disabled}
        className="h-14 items-center justify-center rounded-full border-2 border-primary bg-background active:bg-secondary"
      >
        <Text className="text-base font-semibold text-primary">Create an account</Text>
      </Pressable>
    </View>
  );
}
