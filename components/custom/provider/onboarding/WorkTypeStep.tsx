import { Text } from '@/components/ui/text';
import { useProviderOnboardingStore, WorkType } from '@/lib/stores';
import { ArrowRight } from 'lucide-react-native';
import * as React from 'react';
import { Image, Pressable, View } from 'react-native';

// Sample profile images for the scattered background
const PROFILE_CIRCLES = [
  { id: 1, type: 'image', uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', top: 60, left: 20, size: 70 },
  { id: 2, type: 'dot', color: 'bg-pink-400', top: 100, left: 100, size: 24 },
  { id: 3, type: 'image', uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', top: 40, left: 150, size: 60 },
  { id: 4, type: 'image', uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', top: 80, left: 230, size: 55 },
  { id: 5, type: 'dot', color: 'bg-amber-300', top: 30, left: 320, size: 50 },
  { id: 6, type: 'image', uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', top: 100, left: 300, size: 65 },
  { id: 7, type: 'image', uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', top: 150, left: 50, size: 60 },
  { id: 8, type: 'image', uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop', top: 180, left: 180, size: 70 },
  { id: 9, type: 'image', uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop', top: 160, left: 280, size: 55 },
  { id: 10, type: 'dot', color: 'bg-pink-400', top: 230, left: 10, size: 40 },
  { id: 11, type: 'image', uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', top: 250, left: 100, size: 65 },
  { id: 12, type: 'image', uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', top: 220, left: 200, size: 50 },
  { id: 13, type: 'dot', color: 'bg-amber-300', top: 280, left: 280, size: 35 },
  { id: 14, type: 'image', uri: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop', top: 300, left: 340, size: 60 },
  { id: 15, type: 'image', uri: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=100&h=100&fit=crop', top: 320, left: 150, size: 55 },
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
      className="mb-4 flex-row items-center justify-between rounded-2xl bg-white p-5 shadow-sm active:opacity-80 dark:bg-zinc-900"
    >
      <View className="flex-1 pr-4">
        <Text className="text-xl font-bold text-foreground">{title}</Text>
        <Text className="mt-1 text-base text-muted-foreground">{description}</Text>
      </View>
      <View className="h-12 w-12 items-center justify-center rounded-full bg-emerald-500">
        <ArrowRight size={24} color="white" />
      </View>
    </Pressable>
  );
}

export function WorkTypeStep() {
  const { setWorkType, nextStep } = useProviderOnboardingStore();

  const handleSelectWorkType = (type: WorkType) => {
    setWorkType(type);
    nextStep();
  };

  return (
    <View className="flex-1 bg-[#FFF8F0] dark:bg-zinc-950">
      {/* Scattered Profile Circles Background */}
      <View className="h-96 overflow-hidden">
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
