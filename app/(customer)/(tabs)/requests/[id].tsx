import { OfferCard } from '@/components/custom/customer';
import { Text } from '@/components/ui/text';
import {
  fetchRequestById,
  fetchRequestOffers,
  type CustomerOffer,
  type CustomerRequest,
} from '@/lib/customer/requests';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import {
  ArrowLeftIcon,
  BabyCarriageIcon,
  BookOpenIcon,
  BroomIcon,
  CaretDownIcon,
  HeartIcon,
  LeafIcon,
  PawPrintIcon,
  MarkerCircleIcon,
  TruckIcon,
  WrenchIcon,
} from 'phosphor-react-native';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ICON_MAP = {
  WrenchIcon,
  BroomIcon,
  LeafIcon,
  PawPrintIcon,
  TruckIcon,
  BookOpenIcon,
  BabyCarriageIcon,
  HeartIcon,
} as const;

const PROVIDER_LABELS: Record<string, string> = {
  all: 'Individuals & professionals',
  professionals_only: 'Professionals only',
};

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function RequestDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colorScheme } = useColorScheme();

  const [request, setRequest] = React.useState<CustomerRequest | null>(null);
  const [offers, setOffers] = React.useState<CustomerOffer[]>([]);
  const [loading, setLoading] = React.useState(true);

  const iconColor = colorScheme === 'dark' ? '#a1a1aa' : '#71717a';

  React.useEffect(() => {
    Promise.all([fetchRequestById(id), fetchRequestOffers(id)])
      .then(([req, offs]) => {
        setRequest(req);
        setOffers(offs);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const IconComponent = request ? ICON_MAP[request.categoryIcon] : null;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={[]}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3">
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-xl active:bg-secondary"
        >
          <ArrowLeftIcon size={22} color={iconColor} weight="regular" />
        </Pressable>
        <Text className="flex-1 text-center text-lg font-bold text-foreground">Request</Text>
        <Pressable
          onPress={() =>
            router.push({
              pathname: '/(customer)/(tabs)/requests/edit' as any,
              params: { id },
            })
          }
          className="h-10 w-10 items-center justify-center rounded-xl active:bg-secondary"
        >
          <MarkerCircleIcon size={20} color={iconColor} weight="regular" />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 32 }}
      >
        {loading || !request ? (
          <>
            <View className="h-32 rounded-2xl border border-border bg-card opacity-40" />
            <View className="h-20 rounded-2xl border border-border bg-card opacity-40" />
          </>
        ) : (
          <>
            {/* Request info card */}
            <View className="overflow-hidden rounded-2xl border border-border bg-card">
              <View className="flex-row px-4 pb-4 pt-4">
                <View
                  className="mr-3 h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: request.categoryColor }}
                >
                  {IconComponent && (
                    <IconComponent size={22} color="#ffffff" weight="regular" />
                  )}
                </View>
                <View className="flex-1">
                  <Text className="mb-0.5 text-xs text-muted-foreground">You</Text>
                  <Text className="text-base font-bold text-foreground" numberOfLines={2}>
                    {request.title}
                  </Text>
                  <Text className="mt-0.5 text-xs text-muted-foreground">
                    {request.subcategoryName}
                  </Text>
                </View>
              </View>

              <View className="mx-4 h-px bg-border" />

              <View className="px-4 py-3">
                <Text className="mb-0.5 text-xs text-muted-foreground">Provider type</Text>
                <Text className="text-sm font-semibold text-foreground">
                  {PROVIDER_LABELS[request.providerType]}
                </Text>
              </View>

              <View className="mx-4 h-px bg-border" />

              <View className="flex-row px-4 py-3">
                <View className="flex-1">
                  <Text className="mb-0.5 text-xs text-muted-foreground">Service address</Text>
                  <Text className="text-sm font-semibold text-foreground">{request.address}</Text>
                </View>
                <View className="items-end">
                  <Text className="mb-0.5 text-xs text-muted-foreground">Posted on</Text>
                  <Text className="text-sm font-semibold text-foreground">
                    {formatDate(request.createdAt)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Candidates section */}
            <View>
              <View className="mb-3 flex-row items-center justify-between">
                <Text className="text-xl font-bold text-foreground">
                  Candidates ({offers.length})
                </Text>
                {offers.length > 1 && (
                  <Pressable className="flex-row items-center gap-1.5 rounded-xl bg-secondary px-3 py-2 active:bg-muted">
                    <Text className="text-sm text-foreground">Recommended</Text>
                    <CaretDownIcon size={13} color={iconColor} weight="bold" />
                  </Pressable>
                )}
              </View>

              {offers.length === 0 ? (
                <View className="items-center rounded-2xl border border-border bg-card py-10">
                  <Text className="text-sm font-medium text-foreground">No offers yet</Text>
                  <Text className="mt-1 text-xs text-muted-foreground">
                    Providers will reach out to you shortly.
                  </Text>
                </View>
              ) : (
                <View className="gap-3">
                  {offers.map((offer) => (
                    <OfferCard
                      key={offer.id}
                      offer={offer}
                      onPress={() =>
                        router.push(
                          `/(customer)/(tabs)/requests/offer/${offer.id}` as any
                        )
                      }
                    />
                  ))}
                </View>
              )}
            </View>

            {/* Description section */}
            <View>
              <Text className="mb-3 text-xl font-bold text-foreground">Description</Text>
              <View className="rounded-2xl border border-border bg-card px-4 py-4">
                <Text className="text-sm leading-relaxed text-foreground">
                  {request.description}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
