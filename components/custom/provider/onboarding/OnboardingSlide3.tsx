import { Text } from '@/components/ui/text';
import { HOW_IT_WORKS_URL, type OnboardingSlide3Data } from '@/lib/provider/onboarding-data';
import { Bell, Check, Minus, Plus } from 'iconoir-react-native';
import { useColorScheme } from 'nativewind';
import { Image, View } from 'react-native';

interface OnboardingSlide3Props {
  data: OnboardingSlide3Data;
}

export function OnboardingSlide3({ data }: OnboardingSlide3Props) {
  const { colorScheme } = useColorScheme();
  const primaryColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';
  const mutedColor = colorScheme === 'dark' ? '#71717a' : '#a1a1aa';
  const starColor = colorScheme === 'dark' ? '#a1a1aa' : '#71717a';

  return (
    <View className="flex-1 px-6">
      {/* Illustration with floating UI elements */}
      <View className="items-center mb-8 relative h-64">
        {/* Main image */}
        <View className="w-48 h-48 rounded-full overflow-hidden border-4 border-border dark:border-border mt-6">
          <Image
            source={{ uri: HOW_IT_WORKS_URL }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* New Job notification - Top */}
        <View className="absolute top-0 left-8 bg-card dark:bg-card rounded-lg px-3 py-2 shadow-lg shadow-black/10 flex-row items-center gap-2">
          <Bell size={16} color={starColor} fill={starColor} />
          <Text className="font-semibold text-foreground dark:text-foreground text-sm">New job!</Text>
        </View>

        {/* Rate adjuster - Right */}
        <View className="absolute top-28 right-0 bg-card dark:bg-card rounded-lg px-3 py-2 shadow-lg shadow-black/10 flex-row items-center gap-2">
          <Text className="text-muted-foreground dark:text-muted-foreground text-sm">Rate</Text>
          <View className="flex-row items-center gap-1">
            <Minus size={14} color={mutedColor} />
            <Text className="font-bold text-primary dark:text-primary text-lg">24</Text>
            <Plus size={14} color={mutedColor} />
          </View>
          <Text className="text-muted-foreground dark:text-muted-foreground text-sm">XAF</Text>
        </View>

        {/* Payment received - Bottom Left */}
        <View className="absolute bottom-2 left-0 bg-card dark:bg-card rounded-lg px-3 py-2 shadow-lg shadow-black/10">
          <View className="flex-row items-center gap-2">
            <Check size={18} color={primaryColor} strokeWidth={3} />
            <Text className="font-semibold text-foreground dark:text-foreground text-sm">Payment received</Text>
          </View>
          <Text className="font-bold text-primary dark:text-primary text-xl mt-1">XAF 150</Text>
        </View>
      </View>

      {/* Title */}
      <Text className="text-3xl font-bold text-foreground dark:text-foreground mb-6">{data.title}</Text>

      {/* Steps List */}
      <View className="gap-4">
        {data.steps.map((step) => (
          <View key={step.number} className="flex-row items-start gap-3">
            <Text className="text-lg font-bold text-primary dark:text-primary">{step.number}.</Text>
            <Text className="text-muted-foreground dark:text-muted-foreground text-lg flex-1">
              {step.text}
              {step.boldText && <Text className="font-semibold text-foreground dark:text-foreground">{step.boldText}</Text>}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
