import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { fetchRequestById } from '@/lib/customer/requests';
import { useEditRequestStore, type ProviderTypeEdit } from '@/lib/stores';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import {
  ArrowLeftIcon,
  BabyCarriageIcon,
  BookOpenIcon,
  BroomIcon,
  HeartIcon,
  LeafIcon,
  PawPrintIcon,
  MarkerCircleIcon,
  TruckIcon,
  WrenchIcon,
  XIcon,
} from 'phosphor-react-native';
import * as React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TITLE_MAX = 50;
const DESC_MAX = 750;

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

const PROVIDER_OPTIONS: { id: ProviderTypeEdit; label: string; description: string }[] = [
  {
    id: 'all',
    label: 'Individuals & professionals',
    description:
      'Access to our wide selection of qualified providers. Receipt available in your account.',
  },
  {
    id: 'professionals_only',
    label: 'Professionals only',
    description:
      'For requests requiring a VAT invoice. (e.g. business, insurance claim, subsidized work...)',
  },
];

export default function EditRequestIndexScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const iconColor = isDark ? '#a1a1aa' : '#71717a';
  const inputColor = isDark ? '#fafafa' : '#18181b';
  const placeholderColor = isDark ? '#71717a' : '#a1a1aa';

  const store = useEditRequestStore();
  const [loading, setLoading] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [tempProviderType, setTempProviderType] = React.useState<ProviderTypeEdit>('all');

  React.useEffect(() => {
    if (!id) return;
    fetchRequestById(id)
      .then((req) => {
        if (req) store.initFromRequest(req);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const IconComponent = store.categoryIcon ? ICON_MAP[store.categoryIcon] : null;
  const selectedOption = PROVIDER_OPTIONS.find((o) => o.id === store.providerType)!;

  const handleOpenProviderModal = () => {
    setTempProviderType(store.providerType);
    setModalVisible(true);
  };

  const handleConfirmProviderModal = () => {
    store.setProviderType(tempProviderType);
    setModalVisible(false);
  };

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

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 16 }}
        >

          {/* Title + Description card */}
          <View className="overflow-hidden rounded-2xl border border-border bg-card">
            {/* Title */}
            <View className="border-b border-border px-4 pb-3 pt-4">
              <Text className="mb-1.5 text-xs text-muted-foreground">Title</Text>
              <TextInput
                value={store.title}
                onChangeText={(t) => store.setTitle(t.slice(0, TITLE_MAX))}
                placeholder="Request title..."
                placeholderTextColor={placeholderColor}
                style={{ color: inputColor, fontSize: 15, paddingVertical: 0 }}
                maxLength={TITLE_MAX}
                returnKeyType="next"
              />
              <Text className="mt-2 text-right text-xs text-muted-foreground">
                {store.title.length} / {TITLE_MAX}
              </Text>
            </View>

            {/* Description */}
            <View className="px-4 pb-3 pt-4">
              <Text className="mb-1.5 text-xs text-muted-foreground">Additional information</Text>
              <TextInput
                value={store.description}
                onChangeText={(t) => store.setDescription(t.slice(0, DESC_MAX))}
                placeholder="Describe what you need..."
                placeholderTextColor={placeholderColor}
                style={{
                  color: inputColor,
                  fontSize: 15,
                  minHeight: 100,
                  textAlignVertical: 'top',
                  paddingVertical: 0,
                }}
                multiline
                maxLength={DESC_MAX}
              />
              <Text className="mt-2 text-right text-xs text-muted-foreground">
                {store.description.length} / {DESC_MAX}
              </Text>
            </View>
          </View>

          {/* Category card */}
          <View className="overflow-hidden rounded-2xl border border-border bg-card">
            {/* Edit icon */}
            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/(customer)/(tabs)/requests/edit/category' as any,
                  params: { id },
                })
              }
              className="absolute right-4 top-4 z-10 h-8 w-8 items-center justify-center rounded-lg active:bg-secondary"
            >
              <MarkerCircleIcon size={18} color={iconColor} weight="regular" />
            </Pressable>

            {/* Category row */}
            <View className="border-b border-border px-4 pb-3 pt-4">
              <Text className="mb-1 text-xs text-muted-foreground">Category</Text>
              <View className="flex-row items-center gap-2.5">
                {IconComponent && store.categoryColor && (
                  <View
                    className="h-7 w-7 items-center justify-center rounded-lg"
                    style={{ backgroundColor: store.categoryColor }}
                  >
                    <IconComponent size={15} color="#ffffff" weight="regular" />
                  </View>
                )}
                <Text className="text-base font-medium text-foreground">
                  {store.categoryName ?? '—'}
                </Text>
              </View>
            </View>

            {/* Subcategory row */}
            <View className="px-4 pb-3 pt-3">
              <Text className="mb-1 text-xs text-muted-foreground">Sub-category</Text>
              <Text className="text-base font-medium text-foreground">
                {store.subcategoryName || '—'}
              </Text>
            </View>
          </View>

          {/* Provider type */}
          <Pressable
            onPress={handleOpenProviderModal}
            className="overflow-hidden rounded-2xl border border-border bg-card px-4 py-4 active:bg-secondary"
          >
            <Text className="mb-1 text-xs text-muted-foreground">Provider type</Text>
            <View className="flex-row items-center justify-between">
              <Text className="flex-1 pr-3 text-base font-medium text-foreground">
                {selectedOption?.label ?? '—'}
              </Text>
              <MarkerCircleIcon size={17} color={iconColor} weight="regular" />
            </View>
          </Pressable>

          {/* Address card */}
          <View className="overflow-hidden rounded-2xl border border-border bg-card">
            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/(customer)/(tabs)/requests/edit/address' as any,
                  params: { id },
                })
              }
              className="absolute right-4 top-4 z-10 h-8 w-8 items-center justify-center rounded-lg active:bg-secondary"
            >
              <MarkerCircleIcon size={18} color={iconColor} weight="regular" />
            </Pressable>

            <View className="px-4 pb-3 pt-4">
              <Text className="mb-1 text-xs text-muted-foreground">Service address</Text>
              <Text className="pr-10 text-base font-medium text-foreground" numberOfLines={2}>
                {store.address || 'No address set'}
              </Text>
            </View>
          </View>

          {/* Photos card */}
          <View className="overflow-hidden rounded-2xl border border-border bg-card">
            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/(customer)/(tabs)/requests/edit/photos' as any,
                  params: { id },
                })
              }
              className="absolute right-4 top-4 z-10 h-8 w-8 items-center justify-center rounded-lg active:bg-secondary"
            >
              <MarkerCircleIcon size={18} color={iconColor} weight="regular" />
            </Pressable>

            <View className="px-4 pb-3 pt-4">
              <Text className="mb-1 text-xs text-muted-foreground">Photos</Text>
              <Text className="text-base font-medium text-foreground">
                {store.photos.length > 0
                  ? `${store.photos.length} photo${store.photos.length > 1 ? 's' : ''}`
                  : '—'}
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Fixed bottom action bar */}
      <View className="gap-3 border-t border-border px-4 pb-6 pt-3">
        <Pressable className="items-center rounded-2xl bg-primary py-3.5 active:opacity-90">
          <Text className="font-semibold text-primary-foreground">Save changes</Text>
        </Pressable>
        <Pressable className="items-center rounded-2xl bg-red-500 py-3.5 active:opacity-80">
          <Text className="font-semibold text-white">Delete request</Text>
        </Pressable>
      </View>

      {/* Provider type bottom sheet */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        statusBarTranslucent
      >
        <View className="flex-1 justify-end">
          <Pressable
            className="absolute inset-0 bg-black/50"
            onPress={() => setModalVisible(false)}
          />
          <View className="rounded-t-3xl bg-card px-6 pb-10 pt-6">
            <View className="mb-6 flex-row items-start justify-between">
              <Text className="flex-1 pr-4 text-xl font-bold text-foreground">
                Your request will be sent to:
              </Text>
              <Pressable onPress={() => setModalVisible(false)} hitSlop={8}>
                <XIcon size={22} color={isDark ? '#fafafa' : '#18181b'} weight="regular" />
              </Pressable>
            </View>

            <View className="mb-6 gap-5">
              {PROVIDER_OPTIONS.map((option) => {
                const selected = tempProviderType === option.id;
                return (
                  <Pressable
                    key={option.id}
                    onPress={() => setTempProviderType(option.id)}
                    className="flex-row items-start gap-3"
                  >
                    <View
                      className={`mt-0.5 h-5 w-5 items-center justify-center rounded-full border-2 ${
                        selected ? 'border-primary bg-primary' : 'border-muted-foreground'
                      }`}
                    >
                      {selected && <View className="h-2 w-2 rounded-full bg-primary-foreground" />}
                    </View>
                    <View className="flex-1">
                      <Text className="mb-0.5 font-medium text-foreground">{option.label}</Text>
                      <Text className="text-sm leading-relaxed text-muted-foreground">
                        {option.description}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>

            <Button onPress={handleConfirmProviderModal}>
              <Text className="font-semibold text-primary-foreground">Confirm</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
