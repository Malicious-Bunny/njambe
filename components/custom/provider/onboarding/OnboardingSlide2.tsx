import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { JOB_ILLUSTRATION_URL, type OnboardingSlide2Data } from '@/lib/provider/onboarding-data';
import { Bell, ViewGrid, MapPin, Group } from 'iconoir-react-native';
import { useColorScheme } from 'nativewind';
import { Image, View } from 'react-native';

interface OnboardingSlide2Props {
  data: OnboardingSlide2Data;
}

const STAT_ICONS = {
  grid: ViewGrid,
  bell: Bell,
  mapPin: MapPin,
  users: Group,
};

export function OnboardingSlide2({ data }: OnboardingSlide2Props) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#a1a1aa' : '#71717a';

  return (
    <View className="flex-1 px-6">
      {/* Illustration with floating cards */}
      <View className="items-center mb-6 relative h-56">
        {/* Main image */}
        <View className="w-40 h-40 rounded-full overflow-hidden border-4 border-border mt-6">
          <Image
            source={{ uri: JOB_ILLUSTRATION_URL }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* Service Card 1 - Top Left */}
        <View className="absolute top-0 left-0 bg-card rounded-xl px-3 py-2 shadow-md">
          <Text className="text-sm font-medium text-foreground">{data.serviceCards[0].title}</Text>
          <Text className="text-xs text-muted-foreground mt-0.5">
            Avg price: <Text className="text-xs font-semibold text-foreground">{data.serviceCards[0].priceRange}</Text>
          </Text>
        </View>

        {/* Service Card 2 - Right */}
        <View className="absolute top-20 right-0 bg-card rounded-xl px-3 py-2 shadow-md">
          <Text className="text-sm font-medium text-foreground">{data.serviceCards[1].title}</Text>
          <Text className="text-xs text-muted-foreground mt-0.5">
            Avg price: <Text className="text-xs font-semibold text-foreground">{data.serviceCards[1].priceRange}</Text>
          </Text>
        </View>

        {/* Service Card 3 - Bottom Left with PRO badge */}
        <View className="absolute bottom-0 left-0 bg-card rounded-xl px-3 py-2 shadow-md">
          <View className="flex-row items-center gap-2">
            <Text className="text-sm font-medium text-foreground">{data.serviceCards[2].title}</Text>
            {data.serviceCards[2].isPro && (
              <Badge variant="default" className="bg-primary px-1.5 py-0 rounded">
                <Text className="text-[10px] font-bold text-primary-foreground">PRO</Text>
              </Badge>
            )}
          </View>
          <Text className="text-xs text-muted-foreground mt-0.5">
            Avg price: <Text className="text-xs font-semibold text-foreground">{data.serviceCards[2].priceRange}</Text>
          </Text>
        </View>
      </View>

      {/* Title */}
      <Text className="text-2xl font-bold text-foreground mb-5 leading-tight">{data.title}</Text>

      {/* Stats List */}
      <View className="gap-3">
        {data.stats.map((stat, index) => {
          const IconComponent = STAT_ICONS[stat.icon as keyof typeof STAT_ICONS] || ViewGrid;
          return (
            <View key={index} className="flex-row items-center gap-3">
              <IconComponent width={20} height={20} color={iconColor} />
              <Text className="text-base text-foreground">
                {stat.text}
                {stat.boldText && <Text className="text-base font-bold text-foreground">{stat.boldText}</Text>}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
