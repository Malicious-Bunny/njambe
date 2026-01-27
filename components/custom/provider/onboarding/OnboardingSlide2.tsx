import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { JOB_ILLUSTRATION_URL, type OnboardingSlide2Data } from '@/lib/provider/onboarding-data';
import { Bell, Grid3X3, MapPin, Users } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Image, View } from 'react-native';

interface OnboardingSlide2Props {
  data: OnboardingSlide2Data;
}

const STAT_ICONS = {
  grid: Grid3X3,
  bell: Bell,
  mapPin: MapPin,
  users: Users,
};

export function OnboardingSlide2({ data }: OnboardingSlide2Props) {
  const { colorScheme } = useColorScheme();
  const primaryColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';

  return (
    <View className="flex-1 px-6">
      {/* Illustration with floating cards */}
      <View className="items-center mb-8 relative h-64">
        {/* Main image */}
        <View className="w-48 h-48 rounded-full overflow-hidden border-4 border-border dark:border-border mt-8">
          <Image
            source={{ uri: JOB_ILLUSTRATION_URL }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* Service Card 1 - Top Left */}
        <View className="absolute top-0 left-0 bg-card dark:bg-card rounded-lg px-3 py-2 shadow-lg shadow-black/10">
          <Text className="font-semibold text-foreground dark:text-foreground text-sm">{data.serviceCards[0].title}</Text>
          <Text className="text-xs text-muted-foreground dark:text-muted-foreground">
            Avg price: <Text className="font-semibold text-foreground dark:text-foreground">{data.serviceCards[0].priceRange}</Text>
          </Text>
        </View>

        {/* Service Card 2 - Right */}
        <View className="absolute top-24 right-0 bg-card dark:bg-card rounded-lg px-3 py-2 shadow-lg shadow-black/10">
          <Text className="font-semibold text-foreground dark:text-foreground text-sm">{data.serviceCards[1].title}</Text>
          <Text className="text-xs text-muted-foreground dark:text-muted-foreground">
            Avg price: <Text className="font-semibold text-foreground dark:text-foreground">{data.serviceCards[1].priceRange}</Text>
          </Text>
        </View>

        {/* Service Card 3 - Bottom Left with PRO badge */}
        <View className="absolute bottom-0 left-0 bg-card dark:bg-card rounded-lg px-3 py-2 shadow-lg shadow-black/10">
          <View className="flex-row items-center gap-2">
            <Text className="font-semibold text-foreground dark:text-foreground text-sm">{data.serviceCards[2].title}</Text>
            {data.serviceCards[2].isPro && (
              <Badge variant="default" className="bg-primary dark:bg-primary px-1.5 py-0.5 border-transparent">
                <Text className="text-xs font-semibold text-primary-foreground dark:text-primary-foreground">PRO</Text>
              </Badge>
            )}
          </View>
          <Text className="text-xs text-muted-foreground dark:text-muted-foreground">
            Avg price: <Text className="font-semibold text-foreground dark:text-foreground">{data.serviceCards[2].priceRange}</Text>
          </Text>
        </View>
      </View>

      {/* Title */}
      <Text className="text-3xl font-bold text-foreground dark:text-foreground mb-6">{data.title}</Text>

      {/* Stats List */}
      <View className="gap-4">
        {data.stats.map((stat, index) => {
          const IconComponent = STAT_ICONS[stat.icon as keyof typeof STAT_ICONS] || Grid3X3;
          return (
            <View key={index} className="flex-row items-center gap-3">
              <IconComponent size={22} color={primaryColor} />
              <Text className="text-muted-foreground dark:text-muted-foreground">
                {stat.text}
                {stat.boldText && <Text className="font-semibold text-foreground dark:text-foreground">{stat.boldText}</Text>}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
