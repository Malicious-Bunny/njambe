import { Badge } from '@/components/ui/badge';
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
  const starColor = colorScheme === 'dark' ? '#a1a1aa' : '#71717a';

  return (
    <View className="flex-1 px-6">
      {/* Provider Avatar with Badge */}
      <View className="items-center mb-8">
        <View className="relative">
          {/* Avatar Circle */}
          <View className="w-48 h-48 rounded-full overflow-hidden border-4 border-border dark:border-border">
            <Image
              source={{ uri: PROVIDER_AVATAR_URL }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          {/* Name and Rating Badge */}
          <View className="absolute -left-4 top-8 bg-card dark:bg-card rounded-lg px-3 py-2 shadow-lg shadow-black/10">
            <View className="flex-row items-center gap-1">
              <Text className="font-semibold text-foreground dark:text-foreground">{data.providerName}</Text>
              <View className="w-4 h-4 rounded-full bg-primary dark:bg-primary items-center justify-center">
                <Check width={10} height={10} color={colorScheme === 'dark' ? '#18181b' : '#fafafa'} strokeWidth={3} />
              </View>
            </View>
            <View className="flex-row items-center gap-1 mt-0.5">
              <StarSolid width={14} height={14} color={starColor} />
              <Text className="text-sm text-muted-foreground dark:text-muted-foreground">{data.providerRating}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Title */}
      <Text className="text-3xl font-bold text-foreground dark:text-foreground mb-6">{data.title}</Text>

      {/* Individual Benefits Section */}
      <View className="mb-5">
        <Text className="text-lg font-semibold text-foreground dark:text-foreground mb-3">As an individual</Text>
        {data.individualBenefits.map((benefit, index) => (
          <View key={index} className="flex-row items-start gap-3 mb-2.5">
            <Check width={20} height={20} color={primaryColor} strokeWidth={2.5} />
            <Text className="text-muted-foreground dark:text-muted-foreground flex-1">
              {benefit.text}
              {benefit.boldText && <Text className="font-semibold text-foreground dark:text-foreground">{benefit.boldText}</Text>}
            </Text>
          </View>
        ))}
      </View>

      {/* Professional Benefits Section */}
      <View>
        <Text className="text-lg font-semibold text-foreground dark:text-foreground mb-3">As a professional</Text>
        {data.professionalBenefits.map((benefit, index) => (
          <View key={index} className="flex-row items-start gap-3 mb-2.5">
            <Check width={20} height={20} color={primaryColor} strokeWidth={2.5} />
            <Text className="text-muted-foreground dark:text-muted-foreground flex-1">
              {benefit.text}
              {benefit.boldText && <Text className="font-semibold text-foreground dark:text-foreground">{benefit.boldText}</Text>}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
