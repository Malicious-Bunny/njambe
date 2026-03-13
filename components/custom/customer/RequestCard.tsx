import { Text } from '@/components/ui/text';
import type { CustomerRequest } from '@/lib/customer/requests';
import { useColorScheme } from 'nativewind';
import { CalendarBlankIcon, MapPinIcon, UserCircleIcon } from 'phosphor-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export interface RequestCardProps {
  request: CustomerRequest;
  onPress?: () => void;
}

export function RequestCard({ request, onPress }: RequestCardProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#71717a' : '#a1a1aa';
  const isActive = request.status === 'active';

  return (
    <Pressable
      onPress={onPress}
      className="rounded-2xl border border-border bg-card px-4 py-4 active:opacity-80"
    >
      {/* Title row + avatar icon */}
      <View className="mb-2 flex-row items-start justify-between gap-3">
        <Text className="flex-1 text-base font-bold text-foreground" numberOfLines={2}>
          {request.title}
        </Text>
        <UserCircleIcon size={30} color={iconColor} weight="regular" />
      </View>

      {/* Location */}
      <View className="mb-1.5 flex-row items-center gap-1.5">
        <MapPinIcon size={13} color={iconColor} weight="regular" />
        <Text className="text-xs text-muted-foreground" numberOfLines={1}>
          {request.address}
        </Text>
      </View>

      {/* Date posted */}
      <View className="mb-3 flex-row items-center gap-1.5">
        <CalendarBlankIcon size={13} color={iconColor} weight="regular" />
        <Text className="text-xs text-muted-foreground">{formatDate(request.createdAt)}</Text>
      </View>

      {/* Bottom row: status + offers (left) | price (right) */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View
            className="rounded-full px-2.5 py-1"
            style={{
              backgroundColor: isActive
                ? colorScheme === 'dark'
                  ? 'rgba(34,197,94,0.15)'
                  : '#dcfce7'
                : colorScheme === 'dark'
                  ? '#27272a'
                  : '#f4f4f5',
            }}
          >
            <Text
              className="text-xs font-semibold"
              style={{
                color: isActive
                  ? colorScheme === 'dark'
                    ? '#4ade80'
                    : '#16a34a'
                  : colorScheme === 'dark'
                    ? '#a1a1aa'
                    : '#71717a',
              }}
            >
              {isActive ? 'Posted' : 'Closed'}
            </Text>
          </View>
          {request.offerCount > 0 && (
            <Text className="text-xs text-muted-foreground">
              · {request.offerCount} {request.offerCount === 1 ? 'offer' : 'offers'}
            </Text>
          )}
        </View>

        {request.budgetFCFA != null && (
          <Text className="text-sm font-bold text-foreground">
            {request.budgetFCFA.toLocaleString()} FCFA
          </Text>
        )}
      </View>
    </Pressable>
  );
}
