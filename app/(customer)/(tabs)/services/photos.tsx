import { PageHeader } from '@/components/custom/shared';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useServiceRequestStore } from '@/lib/stores';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { CameraIcon, XIcon } from 'phosphor-react-native';
import * as React from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MAX_PHOTOS = 3;

interface PhotoItem {
  localUri: string;
  uploadedUrl: string | null;
  uploading: boolean;
}

// Simulates uploading to bucket storage and returning a URL
const mockUploadPhoto = async (localUri: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  const filename = localUri.split('/').pop() ?? 'photo.jpg';
  return `https://storage.njambe.app/requests/${Date.now()}-${filename}`;
};

export default function PhotosScreen() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const addPhoto = useServiceRequestStore((s) => s.addPhoto);
  const removePhoto = useServiceRequestStore((s) => s.removePhoto);

  const [photos, setPhotos] = React.useState<PhotoItem[]>([]);

  const canAddMore = photos.length < MAX_PHOTOS;
  const iconColor = colorScheme === 'dark' ? '#71717a' : '#a1a1aa';

  const handleAddPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.85,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.canceled || !result.assets[0]) return;

    const localUri = result.assets[0].uri;

    setPhotos((prev) => [...prev, { localUri, uploadedUrl: null, uploading: true }]);

    try {
      const uploadedUrl = await mockUploadPhoto(localUri);
      setPhotos((prev) =>
        prev.map((p) => (p.localUri === localUri ? { ...p, uploadedUrl, uploading: false } : p))
      );
      addPhoto(uploadedUrl);
    } catch {
      // Remove failed photo
      setPhotos((prev) => prev.filter((p) => p.localUri !== localUri));
    }
  };

  const handleRemove = (photo: PhotoItem) => {
    setPhotos((prev) => prev.filter((p) => p.localUri !== photo.localUri));
    if (photo.uploadedUrl) {
      removePhoto(photo.uploadedUrl);
    }
  };

  const handleContinue = () => {
    router.push('/(customer)/(tabs)/services/review');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={[]}>
      <PageHeader title="New Request" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 32, gap: 16 }}
      >
        {/* Header */}
        <View className="items-center gap-1 pt-2">
          <Text className="text-base text-muted-foreground">Add photos (optional)</Text>
          <Text className="text-sm text-muted-foreground">{MAX_PHOTOS} photos maximum</Text>
        </View>

        {/* Add photo button */}
        {canAddMore && (
          <Pressable
            onPress={handleAddPhoto}
            className="items-center justify-center rounded-2xl border border-border bg-card py-12 active:bg-secondary"
          >
            <CameraIcon size={40} color={iconColor} weight="regular" />
            <Text className="mt-3 text-sm text-muted-foreground">Add a photo</Text>
          </Pressable>
        )}

        {/* Photos stacked below the button */}
        {photos.map((photo) => (
          <View
            key={photo.localUri}
            className="overflow-hidden rounded-2xl border border-border"
            style={{ aspectRatio: 4 / 3 }}
          >
            <Image source={{ uri: photo.localUri }} style={{ flex: 1 }} resizeMode="cover" />

            {/* Upload overlay */}
            {photo.uploading && (
              <View className="absolute inset-0 items-center justify-center bg-black/40">
                <ActivityIndicator size="large" color="#fafafa" />
                <Text className="mt-2 text-sm text-white">Uploading...</Text>
              </View>
            )}

            {/* Remove button */}
            {!photo.uploading && (
              <Pressable
                onPress={() => handleRemove(photo)}
                className="absolute right-3 top-3 h-9 w-9 items-center justify-center rounded-full bg-black/60"
                hitSlop={8}
              >
                <XIcon size={16} color="#fafafa" weight="bold" />
              </Pressable>
            )}
          </View>
        ))}
      </ScrollView>

      <View className="px-4 pb-6 pt-3">
        <Button onPress={handleContinue}>
          <Text className="font-semibold text-primary-foreground">Continue</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
