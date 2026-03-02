import { Text } from '@/components/ui/text';
import type { CustomerOffer } from '@/lib/customer/requests';
import { useColorScheme } from 'nativewind';
import { CaretRightIcon, MapPinIcon, StarIcon, XIcon } from 'phosphor-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';

function relativeTime(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
}

export interface OfferCardProps {
  offer: CustomerOffer;
  onChoose?: (offer: CustomerOffer) => void;
  onDecline?: (offer: CustomerOffer) => void;
}

export function OfferCard({ offer, onChoose, onDecline }: OfferCardProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#a1a1aa' : '#71717a';
  const xColor = colorScheme === 'dark' ? '#a1a1aa' : '#52525b';

  const firstName = offer.providerName.split(' ')[0];

  return (
    <View className="overflow-hidden rounded-2xl border border-border bg-card">
      {/* Avatar + name + rate */}
      <View className="flex-row items-center px-4 pb-3 pt-4">
        <View
          className="h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: offer.providerAvatarColor }}
        >
          <Text className="text-sm font-bold" style={{ color: '#ffffff' }}>
            {offer.providerInitials}
          </Text>
        </View>

        <View className="ml-3 flex-1">
          <Text className="text-base font-bold text-foreground">{offer.providerName}</Text>
          <View className="mt-0.5 flex-row items-center gap-1.5">
            <StarIcon size={12} color="#F59E0B" weight="fill" />
            <Text className="text-xs text-muted-foreground">
              {offer.rating} ({offer.reviewCount})
            </Text>
            <Text className="text-xs text-muted-foreground">·</Text>
            <MapPinIcon size={11} color={iconColor} weight="regular" />
            <Text className="text-xs text-muted-foreground">{offer.distanceKm} km</Text>
          </View>
        </View>

        <View className="items-end">
          <Text className="text-base font-bold text-foreground">
            {offer.hourlyRateFCFA.toLocaleString()} FCFA
          </Text>
          <Text className="text-xs text-muted-foreground">per hour</Text>
        </View>
      </View>

      {/* Message box */}
      <View className="mx-4 mb-3 rounded-xl bg-secondary px-4 py-3">
        <Text className="text-sm text-foreground" numberOfLines={4}>
          {offer.message}
        </Text>
        <View className="mt-3 flex-row items-center justify-between">
          <Text className="text-xs text-muted-foreground">{relativeTime(offer.createdAt)}</Text>
          <Pressable className="flex-row items-center gap-1">
            <Text className="text-xs font-semibold text-foreground">View discussion</Text>
            <CaretRightIcon size={11} color={iconColor} weight="bold" />
          </Pressable>
        </View>
      </View>

      {/* Action buttons */}
      <View className="flex-row gap-2 px-4 pb-4">
        <Pressable
          onPress={() => onDecline?.(offer)}
          className="h-11 w-11 items-center justify-center rounded-xl border border-border bg-secondary active:bg-muted"
        >
          <XIcon size={17} color={xColor} weight="bold" />
        </Pressable>
        <Pressable
          onPress={() => onChoose?.(offer)}
          className="h-11 flex-1 items-center justify-center rounded-xl bg-primary active:opacity-90"
        >
          <Text className="font-semibold text-primary-foreground">Choose {firstName}</Text>
        </Pressable>
      </View>
    </View>
  );
}
