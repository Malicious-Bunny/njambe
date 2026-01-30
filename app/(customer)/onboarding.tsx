import { CUSTOMER_ONBOARDING_SLIDES, type CustomerOnboardingSlide } from '@/lib/customer/onboarding-data';
import { useRouter } from 'expo-router';
import { NavArrowRight } from 'iconoir-react-native';
import * as React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  useColorScheme,
  View,
  type ViewToken,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CustomerOnboardingScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const flatListRef = React.useRef<FlatList>(null);
  const totalSlides = CUSTOMER_ONBOARDING_SLIDES.length;

  // Dynamic colors based on theme - arrow is inside primary button, needs primaryForeground color
  const arrowColor = isDark ? THEME.dark.primaryForeground : THEME.light.primaryForeground;

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentSlide + 1,
        animated: true,
      });
    } else {
      // Navigate to customer signup screen
      router.push('/(customer)/signup');
    }
  };

  const handleSkip = () => {
    // Skip onboarding and go directly to signup
    router.push('/(customer)/signup');
  };

  const onViewableItemsChanged = React.useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentSlide(viewableItems[0].index);
      }
    },
    []
  );

  const viewabilityConfig = React.useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderSlide = ({ item }: { item: CustomerOnboardingSlide }) => {
    return (
      <View style={{ width: SCREEN_WIDTH }} className="flex-1">
        {/* Image Container - takes 50% of screen */}
        <View className="flex-1 px-4 pt-4">
          <Image
            source={{ uri: item.image }}
            className="w-full h-full rounded-3xl"
            resizeMode="cover"
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      {/* Swipeable Image Content */}
      <View className="flex-1" style={{ maxHeight: '55%' }}>
        <FlatList
          ref={flatListRef}
          data={CUSTOMER_ONBOARDING_SLIDES}
          renderItem={renderSlide}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          getItemLayout={(_, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
          })}
          keyExtractor={(item) => item.id.toString()}
          className="flex-1"
        />
      </View>

      {/* Bottom Content - flex-1 to fill remaining space, justify-between to push buttons to bottom */}
      <View className="flex-1 px-6 pt-6 pb-4 justify-between">
        {/* Top section: Pagination + Title + Description */}
        <View>
          {/* Pagination Dots */}
          <View className="flex-row items-center mb-6">
            {CUSTOMER_ONBOARDING_SLIDES.map((_, index) => (
              <View
                key={index}
                className={`h-1.5 rounded-full mr-2 ${
                  index === currentSlide
                    ? 'w-8'
                    : 'w-2'
                }`}
                style={{
                  backgroundColor: index === currentSlide
                    ? (isDark ? '#FFFFFF' : '#18181B')
                    : (isDark ? '#3F3F46' : '#D4D4D8')
                }}
              />
            ))}
          </View>

          {/* Title Text */}
          <View className="mb-3">
            <Text className="text-4xl font-bold text-foreground leading-tight">
              {CUSTOMER_ONBOARDING_SLIDES[currentSlide].title}
            </Text>
            {CUSTOMER_ONBOARDING_SLIDES[currentSlide].highlightedWord && (
              <Text className="text-4xl font-bold text-foreground leading-tight">
                {CUSTOMER_ONBOARDING_SLIDES[currentSlide].highlightedWord}
              </Text>
            )}
          </View>

          {/* Description Paragraph */}
          <Text className="text-base text-muted-foreground leading-relaxed">
            {CUSTOMER_ONBOARDING_SLIDES[currentSlide].description}
          </Text>
        </View>

        {/* Navigation Buttons - locked at bottom */}
        <View className="flex-row items-center justify-between">
          {/* Skip Button */}
          <Pressable
            onPress={handleSkip}
            className="py-3 px-4 rounded-full bg-secondary active:opacity-80"
          >
            <Text className="text-base font-medium text-foreground">Skip</Text>
          </Pressable>

          {/* Next Button */}
          <Pressable
            onPress={handleNext}
            className="flex-row items-center py-3 px-8 rounded-full bg-primary active:opacity-90"
          >
            <Text className="text-base font-semibold text-primary-foreground mr-2">
              Next
            </Text>
            <View className="flex-row">
              <NavArrowRight width={18} height={18} color={arrowColor} strokeWidth={2} />
              <NavArrowRight width={18} height={18} color={arrowColor} strokeWidth={2} style={{ marginLeft: -8 }} />
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
