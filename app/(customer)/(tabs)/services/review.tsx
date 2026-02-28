import { PageHeader } from '@/components/custom/shared';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useServiceRequestStore } from '@/lib/stores';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PROVIDER_LABELS: Record<string, string> = {
  all: 'Individuals & professionals',
  professionals_only: 'Professionals only',
};

const TITLE_MAX = 50;
const DESC_MAX = 750;

function ReviewRow({
  label,
  value,
  count,
  max,
  last = false,
}: {
  label: string;
  value: string;
  count?: number;
  max?: number;
  last?: boolean;
}) {
  return (
    <View className={`px-4 py-3 ${!last ? 'border-b border-border' : ''}`}>
      <Text className="mb-0.5 text-xs text-muted-foreground">{label}</Text>
      <View className="flex-row items-end justify-between">
        <Text className="flex-1 pr-4 text-base text-foreground">{value}</Text>
        {count !== undefined && max !== undefined && (
          <Text className="text-xs text-muted-foreground">
            {count} / {max}
          </Text>
        )}
      </View>
    </View>
  );
}

export default function ReviewScreen() {
  const router = useRouter();
  const store = useServiceRequestStore();

  const handleConfirm = () => {
    // TODO: POST to API with store.getRequestData()
    console.log('Submitting request:', store.getRequestData());
    store.resetRequest();
    router.replace('/(customer)/(tabs)/services/success');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={[]}>
      <PageHeader title="New Request" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 32, gap: 12 }}
      >
        <Text className="mb-2 text-center text-base text-muted-foreground">
          Review your request
        </Text>

        {/* Title + Description */}
        <View className="overflow-hidden rounded-2xl border border-border bg-card">
          <ReviewRow
            label="Title"
            value={store.title}
            count={store.title.length}
            max={TITLE_MAX}
          />
          <ReviewRow
            label="Description"
            value={store.description || '—'}
            count={store.description.length}
            max={DESC_MAX}
            last
          />
        </View>

        {/* Category + Subcategory */}
        <View className="overflow-hidden rounded-2xl border border-border bg-card">
          <ReviewRow label="Category" value={store.categoryName ?? '—'} />
          <ReviewRow label="Sub-category" value={store.subcategoryName ?? '—'} last />
        </View>

        {/* Provider type */}
        <View className="overflow-hidden rounded-2xl border border-border bg-card">
          <ReviewRow
            label="Provider type"
            value={PROVIDER_LABELS[store.providerType]}
            last
          />
        </View>

        {/* Address */}
        <View className="overflow-hidden rounded-2xl border border-border bg-card">
          <ReviewRow label="Service address" value={store.address || '—'} last />
        </View>

        {/* Photos */}
        {store.photos.length > 0 && (
          <View className="overflow-hidden rounded-2xl border border-border bg-card">
            <View className="px-4 pb-3 pt-3">
              <Text className="mb-3 text-xs text-muted-foreground">Photos</Text>
              <View className="flex-row gap-3">
                {store.photos.map((uri, index) => (
                  <View
                    key={index}
                    className="overflow-hidden rounded-xl"
                    style={{ flex: 1, aspectRatio: 1 }}
                  >
                    <Image source={{ uri }} style={{ flex: 1 }} resizeMode="cover" />
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View className="px-4 pb-6 pt-3">
        <Button onPress={handleConfirm}>
          <Text className="font-semibold text-primary-foreground">Confirm request</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
