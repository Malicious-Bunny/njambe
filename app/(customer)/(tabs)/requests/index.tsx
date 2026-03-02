import { RequestCard } from '@/components/custom/customer';
import { EmptyState } from '@/components/custom/shared';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { fetchCustomerRequests, type CustomerRequest } from '@/lib/customer/requests';
import { useRouter } from 'expo-router';
import { HandshakeIcon } from 'phosphor-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TabType = 'active' | 'closed';

function RequestList({
  requests,
  tabType,
  loading,
  onPress,
}: {
  requests: CustomerRequest[];
  tabType: TabType;
  loading: boolean;
  onPress: (request: CustomerRequest) => void;
}) {
  if (loading) {
    return (
      <>
        {[1, 2].map((i) => (
          <View key={i} className="h-[70px] rounded-2xl bg-card opacity-40" />
        ))}
      </>
    );
  }
  if (requests.length === 0) {
    return (
      <EmptyState
        icon={HandshakeIcon as any}
        title={tabType === 'active' ? 'No active requests' : 'No closed requests'}
        subtitle={
          tabType === 'active'
            ? 'Post a request to get offers from local providers.'
            : 'Your completed requests will appear here.'
        }
      />
    );
  }
  return (
    <>
      {requests.map((request) => (
        <RequestCard key={request.id} request={request} onPress={() => onPress(request)} />
      ))}
    </>
  );
}

export default function RequestsScreen() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const [tab, setTab] = React.useState<TabType>('active');
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

  const indicatorColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';
  const activeRequests = requests.filter((r) => r.status === 'active');
  const closedRequests = requests.filter((r) => r.status === 'closed');

  return (
    <SafeAreaView className="flex-1 bg-background" edges={[]}>
      {/* Centered title */}
      <View className="items-center px-5 pb-3 pt-4">
        <Text className="text-xl font-bold text-foreground">Requests</Text>
      </View>

      {/* Tabs — Reusables manages content switching, custom bar for underline style */}
      <Tabs value={tab} onValueChange={(v) => setTab(v as TabType)} className="flex-1">
        {/* Full-width underline tab bar */}
        <View className="flex-row border-b border-border">
          {(['active', 'closed'] as TabType[]).map((t) => (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              className="flex-1 items-center pb-3 pt-2"
              style={{
                borderBottomWidth: 2,
                borderBottomColor: tab === t ? indicatorColor : 'transparent',
                marginBottom: -1,
              }}
            >
              <Text
                className={`text-sm font-semibold ${
                  tab === t ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {t === 'active' ? 'Active requests' : 'Closed requests'}
              </Text>
            </Pressable>
          ))}
        </View>

        <TabsContent value="active" className="flex-1">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: 32 }}
          >
            <RequestList
              requests={activeRequests}
              tabType="active"
              loading={loading}
              onPress={handlePress}
            />
          </ScrollView>
        </TabsContent>

        <TabsContent value="closed" className="flex-1">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: 32 }}
          >
            <RequestList
              requests={closedRequests}
              tabType="closed"
              loading={loading}
              onPress={handlePress}
            />
          </ScrollView>
        </TabsContent>
      </Tabs>
    </SafeAreaView>
  );
}
