import { Text } from '@/components/ui/text';
import { PROVIDER_AVATAR_URL, type OnboardingSlide1Data } from '@/lib/provider/onboarding-data';
import { Check, StarSolid } from 'iconoir-react-native';
import { useColorScheme } from 'nativewind';
import { Image, View } from 'react-native';

interface OnboardingSlide1Props {
  data: OnboardingSlide1Data;
}

export function OnboardingSlide1({ data }: OnboardingSlide1Props) {
  const { colorScheme } = useColorScheme();
  const primaryColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';
  const starColor = colorScheme === 'dark' ? '#fbbf24' : '#f59e0b';

  return (
    <View className="flex-1 px-6">
      {/* Provider Avatar with Badge */}
      <View className="items-center mb-6">
        <View className="relative">
          <View className="w-40 h-40 rounded-full overflow-hidden border-4 border-border">
            <Image
              source={{ uri: PROVIDER_AVATAR_URL }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          {/* Name and Rating Badge */}
          <View className="absolute -left-2 top-6 bg-card rounded-xl px-3 py-2 shadow-md">
            <View className="flex-row items-center gap-1.5">
              <Text className="text-sm font-semibold text-foreground">{data.providerName}</Text>
              <View className="w-4 h-4 rounded-full bg-primary items-center justify-center">
                <Check width={10} height={10} color={colorScheme === 'dark' ? '#18181b' : '#fafafa'} strokeWidth={3} />
              </View>
            </View>
            <View className="flex-row items-center gap-1 mt-0.5">
              <StarSolid width={12} height={12} color={starColor} />
              <Text className="text-xs text-muted-foreground">{data.providerRating}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Title */}
      <Text className="text-2xl font-bold text-foreground mb-5 leading-tight">{data.title}</Text>

      {/* Individual Benefits Section */}
      <View className="mb-4">
        <Text className="text-base font-semibold text-foreground mb-3">As an individual</Text>
        {data.individualBenefits.map((benefit, index) => (
          <View key={index} className="flex-row items-start gap-2.5 mb-2">
            <Check width={18} height={18} color={primaryColor} strokeWidth={2.5} className="mt-0.5" />
            <Text className="text-sm text-muted-foreground flex-1 leading-5">
              {benefit.text}
              {benefit.boldText && <Text className="text-sm font-semibold text-foreground">{benefit.boldText}</Text>}
            </Text>
          </View>
        ))}
      </View>

      {/* Professional Benefits Section */}
      <View>
        <Text className="text-base font-semibold text-foreground mb-3">As a professional</Text>
        {data.professionalBenefits.map((benefit, index) => (
          <View key={index} className="flex-row items-start gap-2.5 mb-2">
            <Check width={18} height={18} color={primaryColor} strokeWidth={2.5} className="mt-0.5" />
            <Text className="text-sm text-muted-foreground flex-1 leading-5">
              {benefit.text}
              {benefit.boldText && <Text className="text-sm font-semibold text-foreground">{benefit.boldText}</Text>}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
