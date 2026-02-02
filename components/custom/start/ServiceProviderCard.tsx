import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import type { ServiceProvider } from '@/lib/start/service-providers';
import { StarSolid } from 'iconoir-react-native';
import * as React from 'react';
import { Image, View, type ViewStyle } from 'react-native';
import { useColorScheme } from 'nativewind';

interface ServiceProviderCardProps {
  provider: ServiceProvider;
  style?: ViewStyle;
}

export function ServiceProviderCard({ provider, style }: ServiceProviderCardProps) {
  const { colorScheme } = useColorScheme();
  const starColor = colorScheme === 'dark' ? '#a1a1aa' : '#71717a';

  return (
    <View
      className="h-72 w-44 overflow-hidden rounded-3xl bg-card shadow-xl dark:bg-card"
      style={style}>
      <Image
        source={{ uri: provider.image }}
        className="h-full w-full"
        resizeMode="cover"
      />
      {/* Overlay card info */}
      <View className="absolute bottom-0 left-0 right-0 p-3">
        <View className="rounded-2xl bg-card/95 p-3 shadow-sm backdrop-blur-sm dark:bg-card/95">
          <View className="flex-row items-center gap-2">
            <Text className="text-lg font-bold text-foreground">{provider.name}</Text>
            {provider.isPro && (
              <Badge className="rounded-md bg-primary px-1.5 py-0.5 border-transparent">
                <Text className="text-[10px] font-bold text-primary-foreground">PRO</Text>
              </Badge>
            )}
          </View>
          <View className="mt-1 flex-row items-center gap-1">
            <StarSolid width={14} height={14} color={starColor} />
            <Text className="text-sm text-muted-foreground">{provider.rating}/5</Text>
          </View>
          <View className="mt-2">
            <Badge variant="outline" className="self-start rounded-full border-primary bg-secondary px-3 py-1 dark:border-primary dark:bg-secondary">
              <Text className="text-xs font-medium text-primary dark:text-primary">{provider.category}</Text>
            </Badge>
          </View>
        </View>
      </View>
    </View>
  );
}
