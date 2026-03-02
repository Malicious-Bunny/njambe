import { Text } from '@/components/ui/text';
import { fetchRequestById } from '@/lib/customer/requests';
import { useEditRequestStore } from '@/lib/stores';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import {
  ArrowLeftIcon,
  BabyCarriageIcon,
  BookOpenIcon,
  BroomIcon,
  CameraIcon,
  CaretRightIcon,
  HeartIcon,
  LeafIcon,
  MapPinIcon,
  PawPrintIcon,
  TruckIcon,
  WrenchIcon,
} from 'phosphor-react-native';
import * as React from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
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

export default function EditRequestIndexScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const iconColor = isDark ? '#a1a1aa' : '#71717a';

  const store = useEditRequestStore();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!id) return;
    fetchRequestById(id)
      .then((req) => {
        if (req) store.initFromRequest(req);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const IconComponent = store.categoryIcon ? ICON_MAP[store.categoryIcon] : null;

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={[]}>
        <View className="flex-row items-center px-4 py-3">
          <View className="h-10 w-10" />
          <View className="flex-1" />
          <View className="h-10 w-10" />
        </View>
        <View className="m-4 h-48 rounded-2xl border border-border bg-card opacity-40" />
        <View className="mx-4 h-20 rounded-2xl border border-border bg-card opacity-40" />
      </SafeAreaView>
    );
  }

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
        <Text className="flex-1 text-center text-lg font-bold text-foreground">Edit request</Text>
        <View className="h-10 w-10" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 16 }}
      >
        {/* Title */}
        <View>
          <Text className="mb-2 text-sm text-muted-foreground">Title</Text>
          <View className="rounded-2xl border border-border bg-card px-4 py-3">
            <TextInput
              value={store.title}
              onChangeText={store.setTitle}
              multiline
              placeholder="Request title..."
              placeholderTextColor={isDark ? '#71717a' : '#a1a1aa'}
              style={{
                color: isDark ? '#fafafa' : '#18181b',
                fontSize: 15,
                lineHeight: 22,
              }}
            />
          </View>
        </View>

        {/* Category */}
        <View>
          <Text className="mb-2 text-sm text-muted-foreground">Category</Text>
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/(customer)/(tabs)/requests/edit/category' as any,
                params: { id },
              })
            }
            className="flex-row items-center rounded-2xl border border-border bg-card px-4 py-3 active:bg-secondary"
          >
            <View
              className="mr-3 h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: store.categoryColor ?? '#18181b' }}
            >
              {IconComponent && <IconComponent size={20} color="#ffffff" weight="regular" />}
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-foreground">
                {store.categoryName ?? '—'}
              </Text>
              <Text className="mt-0.5 text-xs text-muted-foreground">
                {store.subcategoryName || '—'}
              </Text>
            </View>
            <CaretRightIcon size={16} color={iconColor} weight="regular" />
          </Pressable>
        </View>

        {/* Provider type */}
        <View>
          <Text className="mb-2 text-sm text-muted-foreground">Provider type</Text>
          <View className="flex-row gap-2">
            {(['all', 'professionals_only'] as const).map((type) => {
              const active = store.providerType === type;
              return (
                <Pressable
                  key={type}
                  onPress={() => store.setProviderType(type)}
                  className={`flex-1 items-center rounded-xl border px-3 py-3 ${
                    active
                      ? 'border-foreground bg-foreground'
                      : 'border-border bg-card active:bg-secondary'
                  }`}
                >
                  <Text
                    className={`text-center text-xs font-semibold ${
                      active ? 'text-background' : 'text-foreground'
                    }`}
                    numberOfLines={2}
                  >
                    {PROVIDER_LABELS[type]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Address */}
        <View>
          <Text className="mb-2 text-sm text-muted-foreground">Service address</Text>
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/(customer)/(tabs)/requests/edit/address' as any,
                params: { id },
              })
            }
            className="flex-row items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 active:bg-secondary"
          >
            <MapPinIcon size={18} color={iconColor} weight="regular" />
            <Text className="flex-1 text-base text-foreground" numberOfLines={2}>
              {store.address || 'No address set'}
            </Text>
            <CaretRightIcon size={16} color={iconColor} weight="regular" />
          </Pressable>
        </View>

        {/* Photos */}
        <View>
          <Text className="mb-2 text-sm text-muted-foreground">Photos</Text>
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/(customer)/(tabs)/requests/edit/photos' as any,
                params: { id },
              })
            }
            className="flex-row items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 active:bg-secondary"
          >
            <CameraIcon size={18} color={iconColor} weight="regular" />
            <Text className="flex-1 text-base text-foreground">
              {store.photos.length > 0
                ? `${store.photos.length} photo${store.photos.length > 1 ? 's' : ''}`
                : 'No photos added'}
            </Text>
            <CaretRightIcon size={16} color={iconColor} weight="regular" />
          </Pressable>
        </View>

        {/* Description */}
        <View>
          <Text className="mb-2 text-sm text-muted-foreground">Description</Text>
          <View className="rounded-2xl border border-border bg-card px-4 py-3">
            <TextInput
              value={store.description}
              onChangeText={store.setDescription}
              multiline
              placeholder="Describe what you need..."
              placeholderTextColor={isDark ? '#71717a' : '#a1a1aa'}
              style={{
                color: isDark ? '#fafafa' : '#18181b',
                fontSize: 14,
                lineHeight: 21,
                minHeight: 100,
                textAlignVertical: 'top',
              }}
            />
          </View>
        </View>

      </ScrollView>

      {/* Fixed bottom action bar */}
      <View className="gap-3 border-t border-border px-4 pb-6 pt-3">
        <Pressable className="items-center rounded-2xl bg-primary py-3.5 active:opacity-90">
          <Text className="font-semibold text-primary-foreground">Save changes</Text>
        </Pressable>
        <Pressable className="items-center rounded-2xl border border-border py-3.5 active:bg-secondary">
          <Text className="font-semibold text-red-500">Delete request</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
