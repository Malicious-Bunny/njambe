import { Text } from '@/components/ui/text';
import { useProviderOnboardingStore, WorkType } from '@/lib/stores';
import { ArrowLeftIcon, ArrowRightIcon } from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, Pressable, View, useWindowDimensions } from 'react-native';

// Scattered profile images and colored dots for visual interest
const PROFILE_CIRCLES: {
  id: number;
  type: 'image' | 'dot';
  uri?: string;
  color?: string;
  topPercent: number;
  leftPercent: number;
  size: number;
}[] = [
  { id: 1, type: 'image', uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', topPercent: 5, leftPercent: 10, size: 70 },
  { id: 2, type: 'dot', color: 'bg-pink-400', topPercent: 12, leftPercent: 35, size: 24 },
  { id: 3, type: 'image', uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', topPercent: 2, leftPercent: 45, size: 60 },
  { id: 4, type: 'image', uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', topPercent: 8, leftPercent: 60, size: 55 },
  { id: 5, type: 'dot', color: 'bg-amber-300', topPercent: 3, leftPercent: 82, size: 50 },
  { id: 6, type: 'image', uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', topPercent: 18, leftPercent: 78, size: 65 },
  { id: 7, type: 'image', uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', topPercent: 25, leftPercent: 5, size: 60 },
  { id: 8, type: 'image', uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop', topPercent: 30, leftPercent: 40, size: 70 },
  { id: 9, type: 'image', uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop', topPercent: 22, leftPercent: 68, size: 55 },
  { id: 10, type: 'dot', color: 'bg-pink-400', topPercent: 42, leftPercent: 0, size: 40 },
  { id: 11, type: 'image', uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', topPercent: 45, leftPercent: 20, size: 65 },
  { id: 12, type: 'image', uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', topPercent: 38, leftPercent: 55, size: 50 },
  { id: 13, type: 'dot', color: 'bg-amber-300', topPercent: 50, leftPercent: 72, size: 35 },
  { id: 14, type: 'image', uri: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop', topPercent: 55, leftPercent: 85, size: 60 },
  { id: 15, type: 'image', uri: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=100&h=100&fit=crop', topPercent: 60, leftPercent: 35, size: 55 },
];

interface WorkTypeOptionProps {
  title: string;
  description: string;
  onPress: () => void;
}

function WorkTypeOption({ title, description, onPress }: WorkTypeOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-4 flex-row items-center justify-between rounded-2xl border border-border bg-card p-5 active:opacity-80"
    >
      <View className="flex-1 pr-4">
        <Text className="text-xl font-bold text-foreground">{title}</Text>
        <Text className="mt-1 text-base text-muted-foreground">{description}</Text>
      </View>
      <View className="h-12 w-12 items-center justify-center rounded-full bg-primary">
        <ArrowRightIcon size={24} color="#ffffff" weight="regular" />
      </View>
    </Pressable>
  );
}

export default function WorkTypeScreen() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const { setWorkType } = useProviderOnboardingStore();
  const { width: screenWidth } = useWindowDimensions();

  const handleBack = () => {
    router.back();
  };

  const handleSelectWorkType = (type: WorkType) => {
    setWorkType(type);
    router.push('/(provider)/onboarding/welcome-address');
  };

  const iconColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';

  return (
    <View className="flex-1 bg-background">
      {/* Header - Back Button Only */}
      <View className="flex-row items-center px-2 py-2">
        <Pressable
          onPress={handleBack}
          className="p-3 active:opacity-70"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeftIcon size={24} color={iconColor} weight="regular" />
        </Pressable>
      </View>

      {/* Scattered Profile Images and Dots */}
      <View className="h-80 overflow-hidden">
        {PROFILE_CIRCLES.map((circle) => (
          <View
            key={circle.id}
            style={{
              position: 'absolute',
              top: `${circle.topPercent}%`,
              left: circle.leftPercent > 50
                ? undefined
                : (screenWidth * circle.leftPercent) / 100,
              right: circle.leftPercent > 50
                ? screenWidth - (screenWidth * circle.leftPercent) / 100 - circle.size
                : undefined,
              width: circle.size,
              height: circle.size,
              borderRadius: circle.size / 2,
              overflow: 'hidden',
            }}
          >
            {circle.type === 'image' ? (
              <Image
                source={{ uri: circle.uri }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            ) : (
              <View className={`h-full w-full ${circle.color}`} />
            )}
          </View>
        ))}
      </View>

      {/* Content */}
      <View className="flex-1 px-5">
        <Text className="mb-8 text-2xl font-normal text-foreground">
          Je souhaite{'\n'}travailler en tant que ...
        </Text>

        <WorkTypeOption
          title="Particulier"
          description="Travailler légalement comme particulier"
          onPress={() => handleSelectWorkType('individual')}
        />

        <WorkTypeOption
          title="Indépendant"
          description="Travailler avec mon numéro d'entreprise"
          onPress={() => handleSelectWorkType('independent')}
        />
      </View>
    </View>
  );
}
