import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotFoundScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text>This screen doesn't exist.</Text>

        <Link href="/">
          <Text className="mt-4 text-primary">Go to home screen!</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
