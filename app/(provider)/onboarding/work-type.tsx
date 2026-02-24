import { Text } from '@/components/ui/text';
import { useProviderOnboardingStore, WorkType } from '@/lib/stores';
import { ArrowLeft, ChevronRight, Briefcase, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Scattered profile images for visual interest
const PROFILE_CIRCLES = [
  { id: 1, uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', top: 40, left: 20, size: 64 },
  { id: 2, uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', top: 20, left: 120, size: 56 },
  { id: 3, uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', top: 60, left: 200, size: 52 },
  { id: 4, uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', top: 30, left: 280, size: 60 },
  { id: 5, uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', top: 110, left: 60, size: 58 },
  { id: 6, uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop', top: 130, left: 160, size: 66 },
  { id: 7, uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop', top: 100, left: 260, size: 54 },
  { id: 8, uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', top: 180, left: 30, size: 62 },
  { id: 9, uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', top: 200, left: 130, size: 50 },
  { id: 10, uri: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop', top: 190, left: 230, size: 58 },
  { id: 11, uri: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=100&h=100&fit=crop', top: 170, left: 320, size: 48 },
];

interface WorkTypeOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onPress: () => void;
}

function WorkTypeOption({ icon, title, description, onPress }: WorkTypeOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-4 flex-row items-center rounded-2xl border border-border bg-card p-5 active:bg-secondary"
    >
      <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-secondary">
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-lg font-semibold text-foreground">{title}</Text>
        <Text className="mt-0.5 text-sm text-muted-foreground">{description}</Text>
      </View>
      <ChevronRight size={20} className="text-muted-foreground" />
    </Pressable>
  );
}

export default function WorkTypeScreen() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const { setWorkType } = useProviderOnboardingStore();

  const handleBack = () => {
    router.back();
  };

  const handleSelectWorkType = (type: WorkType) => {
    setWorkType(type);
    router.push('/(provider)/onboarding/welcome-address');
  };

  const iconColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-2 py-2">
        <Pressable
          onPress={handleBack}
          className="p-3 active:opacity-70"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={24} color={iconColor} />
        </Pressable>
      </View>

      {/* Scattered Profile Images */}
      <View className="h-72 overflow-hidden">
        {PROFILE_CIRCLES.map((circle) => (
          <View
            key={circle.id}
            style={{
              position: 'absolute',
              top: circle.top,
              left: circle.left,
              width: circle.size,
              height: circle.size,
              borderRadius: circle.size / 2,
              overflow: 'hidden',
            }}
            className="border-2 border-border"
          >
            <Image
              source={{ uri: circle.uri }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
        ))}
      </View>

      {/* Content */}
      <View className="flex-1 px-6">
        <Text className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Step 1 of 3
        </Text>
        <Text className="mb-8 text-2xl font-bold text-foreground">
          How would you like to work?
        </Text>

        <WorkTypeOption
          icon={<User size={24} color={iconColor} />}
          title="As an Individual"
          description="Work legally as a private individual"
          onPress={() => handleSelectWorkType('individual')}
        />

        <WorkTypeOption
          icon={<Briefcase size={24} color={iconColor} />}
          title="As a Professional"
          description="Work with your business registration"
          onPress={() => handleSelectWorkType('independent')}
        />
      </View>
    </SafeAreaView>
  );
}
