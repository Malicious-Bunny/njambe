import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { ArrowLeftIcon } from 'phosphor-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BalanceScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#a1a1aa' : '#71717a';

  return (
    <SafeAreaView className="flex-1 bg-background" edges={[]}>
      <View className="flex-row items-center border-b border-border px-4 py-3">
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-xl active:bg-secondary"
        >
          <ArrowLeftIcon size={22} color={iconColor} weight="regular" />
        </Pressable>
        <Text className="flex-1 text-center text-lg font-bold text-foreground">Balance</Text>
        <View className="h-10 w-10" />
      </View>
      <View className="flex-1" />
    </SafeAreaView>
  );
}
