import { Text } from '@/components/ui/text';
import type { CustomerRequest } from '@/lib/customer/requests';
import { useColorScheme } from 'nativewind';
import {
  BabyCarriageIcon,
  BookOpenIcon,
  BroomIcon,
  CaretRightIcon,
  HeartIcon,
  LeafIcon,
  PawPrintIcon,
  TruckIcon,
  WrenchIcon,
} from 'phosphor-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';

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

export interface RequestCardProps {
  request: CustomerRequest;
  onPress?: () => void;
}

export function RequestCard({ request, onPress }: RequestCardProps) {
  const { colorScheme } = useColorScheme();
  const chevronColor = colorScheme === 'dark' ? '#52525b' : '#a1a1aa';

  const IconComponent = ICON_MAP[request.categoryIcon];

  const subtitle =
    request.offerCount === 0
      ? 'No offers yet'
      : `${request.offerCount} ${request.offerCount === 1 ? 'offer' : 'offers'} · ${request.conversationCount} ${request.conversationCount === 1 ? 'conversation' : 'conversations'}`;

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center rounded-2xl bg-card px-4 py-4 active:opacity-80"
    >
      {/* Category icon */}
      <View className="mr-4 h-11 w-11 items-center justify-center rounded-xl bg-zinc-800">
        <IconComponent size={22} color="#ffffff" weight="regular" />
      </View>

      {/* Text content */}
      <View className="flex-1">
        <Text className="text-sm font-semibold text-foreground" numberOfLines={1}>
          {request.title}
        </Text>
        <Text className="mt-0.5 text-xs text-muted-foreground">{subtitle}</Text>
      </View>

      {/* Chevron */}
      <CaretRightIcon size={16} color={chevronColor} weight="bold" />
    </Pressable>
  );
}
