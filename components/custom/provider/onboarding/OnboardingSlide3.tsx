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
  const accentColor = colorScheme === 'dark' ? '#fbbf24' : '#f59e0b';

  return (
    <View className="flex-1 px-6">
      {/* Illustration with floating UI elements */}
      <View className="items-center mb-6 relative h-56">
        {/* Main image */}
        <View className="w-40 h-40 rounded-full overflow-hidden border-4 border-border mt-4">
          <Image
            source={{ uri: HOW_IT_WORKS_URL }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* New Job notification - Top */}
        <View className="absolute top-0 left-6 bg-card rounded-xl px-3 py-2 shadow-md flex-row items-center gap-2">
          <Bell size={14} color={accentColor} fill={accentColor} />
          <Text className="text-sm font-medium text-foreground">New job!</Text>
        </View>

        {/* Rate adjuster - Right */}
        <View className="absolute top-24 right-0 bg-card rounded-xl px-3 py-2 shadow-md flex-row items-center gap-2">
          <Text className="text-xs text-muted-foreground">Rate</Text>
          <View className="flex-row items-center gap-1">
            <Minus size={12} color={mutedColor} />
            <Text className="text-base font-bold text-foreground">24</Text>
            <Plus size={12} color={mutedColor} />
          </View>
          <Text className="text-xs text-muted-foreground">XAF</Text>
        </View>

        {/* Payment received - Bottom Left */}
        <View className="absolute bottom-0 left-0 bg-card rounded-xl px-3 py-2 shadow-md">
          <View className="flex-row items-center gap-1.5">
            <Check size={14} color={primaryColor} strokeWidth={3} />
            <Text className="text-sm font-medium text-foreground">Payment received</Text>
          </View>
          <Text className="text-lg font-bold text-primary mt-0.5">XAF 150</Text>
        </View>
      </View>

      {/* Title */}
      <Text className="text-2xl font-bold text-foreground mb-5 leading-tight">{data.title}</Text>

      {/* Steps List */}
      <View className="gap-3">
        {data.steps.map((step) => (
          <View key={step.number} className="flex-row items-start gap-2">
            <Text className="text-base font-bold text-primary w-5">{step.number}.</Text>
            <Text className="text-base text-foreground flex-1 leading-6">
              {step.text}
              {step.boldText && <Text className="text-base font-bold text-foreground">{step.boldText}</Text>}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
