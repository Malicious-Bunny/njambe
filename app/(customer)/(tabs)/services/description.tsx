import { PageHeader } from '@/components/custom/shared';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useServiceRequestStore, type ProviderType } from '@/lib/stores';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { MarkerCircleIcon, XIcon } from 'phosphor-react-native';
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

const PROVIDER_OPTIONS: { id: ProviderType; label: string; description: string }[] = [
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

export default function DescriptionScreen() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();

  const setTitleStore = useServiceRequestStore((s) => s.setTitle);
  const setDescriptionStore = useServiceRequestStore((s) => s.setDescription);
  const setProviderTypeStore = useServiceRequestStore((s) => s.setProviderType);

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [providerType, setProviderType] = React.useState<ProviderType>('all');
  const [tempProviderType, setTempProviderType] = React.useState<ProviderType>('all');
  const [modalVisible, setModalVisible] = React.useState(false);

  const inputColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';
  const placeholderColor = colorScheme === 'dark' ? '#71717a' : '#a1a1aa';

  const selectedOption = PROVIDER_OPTIONS.find((o) => o.id === providerType)!;

  const handleOpenModal = () => {
    setTempProviderType(providerType);
    setModalVisible(true);
  };

  const handleConfirmModal = () => {
    setProviderType(tempProviderType);
    setModalVisible(false);
  };

  const handleContinue = () => {
    setTitleStore(title);
    setDescriptionStore(description);
    setProviderTypeStore(providerType);
    router.push('/(customer)/(tabs)/services/photos');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={[]}>
      <PageHeader title="New Request" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: 32, gap: 12 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text className="mb-2 text-center text-base text-muted-foreground">
            Describe what you need
          </Text>

          {/* Title + Description card */}
          <View className="overflow-hidden rounded-2xl border border-border bg-card">
            {/* Title field */}
            <View className="border-b border-border px-4 pb-3 pt-4">
              <Text className="mb-1.5 text-xs text-muted-foreground">Title</Text>
              <TextInput
                value={title}
                onChangeText={(t) => setTitle(t.slice(0, TITLE_MAX))}
                placeholder="Title"
                placeholderTextColor={placeholderColor}
                style={{ color: inputColor, fontSize: 15, paddingVertical: 0 }}
                maxLength={TITLE_MAX}
                returnKeyType="next"
              />
              <Text className="mt-2 text-right text-xs text-muted-foreground">
                {title.length} / {TITLE_MAX}
              </Text>
            </View>

            {/* Description field */}
            <View className="px-4 pb-3 pt-4">
              <Text className="mb-1.5 text-xs text-muted-foreground">Additional information</Text>
              <TextInput
                value={description}
                onChangeText={(t) => setDescription(t.slice(0, DESC_MAX))}
                placeholder="Additional information"
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
                {description.length} / {DESC_MAX}
              </Text>
            </View>
          </View>

          {/* Provider type selector */}
          <Pressable
            onPress={handleOpenModal}
            className="overflow-hidden rounded-2xl border border-border bg-card px-4 py-4 active:bg-secondary"
          >
            <Text className="mb-1 text-xs text-muted-foreground">Request sent to</Text>
            <View className="flex-row items-center justify-between">
              <Text className="flex-1 pr-3 text-base font-medium text-foreground">
                {selectedOption.label}
              </Text>
              <MarkerCircleIcon size={18} color={placeholderColor} weight="regular" />
            </View>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

      <View className="px-4 pb-6 pt-3">
        <Button onPress={handleContinue} disabled={!title.trim()}>
          <Text className="font-semibold text-primary-foreground">Continue</Text>
        </Button>
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
            {/* Header */}
            <View className="mb-6 flex-row items-start justify-between">
              <Text className="flex-1 pr-4 text-xl font-bold text-foreground">
                Your request will be sent to:
              </Text>
              <Pressable onPress={() => setModalVisible(false)} hitSlop={8}>
                <XIcon
                  size={22}
                  color={colorScheme === 'dark' ? '#fafafa' : '#18181b'}
                  weight="regular"
                />
              </Pressable>
            </View>

            {/* Radio options */}
            <View className="mb-6 gap-5">
              {PROVIDER_OPTIONS.map((option) => {
                const selected = tempProviderType === option.id;
                return (
                  <Pressable
                    key={option.id}
                    onPress={() => setTempProviderType(option.id)}
                    className="flex-row items-start gap-3"
                  >
                    {/* Radio circle */}
                    <View
                      className={`mt-0.5 h-5 w-5 items-center justify-center rounded-full border-2 ${
                        selected ? 'border-primary bg-primary' : 'border-muted-foreground'
                      }`}
                    >
                      {selected && <View className="h-2 w-2 rounded-full bg-primary-foreground" />}
                    </View>

                    {/* Label + description */}
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

            <Button onPress={handleConfirmModal}>
              <Text className="font-semibold text-primary-foreground">Confirm</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
