// simple hello world page 
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProviderHomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-primary">Welcome, Provider!</Text>
        <Text className="mt-4 text-base text-secondary">This is your home screen.</Text>
      </View>      
    </SafeAreaView>
  );
}