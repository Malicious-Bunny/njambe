import { RequestCard } from '@/components/custom/customer';
import { Text } from '@/components/ui/text';
import { fetchCustomerRequests, type CustomerRequest } from '@/lib/customer/requests';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgUri } from 'react-native-svg';

export default function RequestsScreen() {
  const router = useRouter();
  const [requests, setRequests] = React.useState<CustomerRequest[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchCustomerRequests()
      .then(setRequests)
      .finally(() => setLoading(false));
  }, []);

  const handlePress = (request: CustomerRequest) => {
    router.push({
      pathname: '/(customer)/(tabs)/requests/[id]',
      params: { id: request.id },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={[]}>
      {/* Header */}
      <View className="items-center px-5 pb-3 pt-4">
        <Text className="text-xl font-bold text-foreground">Requests</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: 32, flexGrow: 1 }}
      >
        {loading ? (
          <>
            {[1, 2, 3].map((i) => (
              <View key={i} className="h-36 rounded-2xl border border-border bg-card opacity-40" />
            ))}
          </>
        ) : requests.length === 0 ? (
          <View className="flex-1 items-center justify-center px-6 py-16">
            <SvgUri
              uri="https://illustrations.popsy.co/amber/shaking-hands.svg"
              width={220}
              height={220}
            />
            <Text className="mt-6 text-lg font-bold text-foreground">No requests yet</Text>
            <Text className="mt-2 text-center text-sm text-muted-foreground">
              Post a request and get offers from local providers in your area.
            </Text>
          </View>
        ) : (
          requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onPress={() => handlePress(request)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
