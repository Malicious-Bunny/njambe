import { ONBOARDING_SLIDES, type OnboardingSlide } from '@/lib/provider/onboarding-data';
import { useRouter } from 'expo-router';
import { NavArrowRight } from 'iconoir-react-native';
import * as React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  View,
  type ViewToken,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProviderOnboardingScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const flatListRef = React.useRef<FlatList>(null);
  const totalSlides = ONBOARDING_SLIDES.length;

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentSlide + 1,
        animated: true,
      });
    } else {
      // Navigate to provider signup screen
      router.push('/(provider)/signup');
    }
  };

  const handleSkip = () => {
    // Skip onboarding and go directly to signup
    router.push('/(provider)/signup');
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

  const renderSlide = ({ item }: { item: OnboardingSlide }) => {
    return (
      <View style={{ width: SCREEN_WIDTH }} className="flex-1">
        {/* Image Container - takes about 60% of screen */}
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
    <SafeAreaView className="flex-1 bg-zinc-950" edges={['top', 'bottom']}>
      {/* Swipeable Image Content */}
      <View className="flex-1" style={{ maxHeight: '60%' }}>
        <FlatList
          ref={flatListRef}
          data={ONBOARDING_SLIDES}
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

      {/* Bottom Content */}
      <View className="px-6 pt-6 pb-4">
        {/* Pagination Dots */}
        <View className="flex-row items-center mb-6">
          {ONBOARDING_SLIDES.map((_, index) => (
            <View
              key={index}
              className={`h-1 rounded-full mr-2 ${
                index === currentSlide
                  ? 'w-8 bg-zinc-100'
                  : 'w-2 bg-zinc-700'
              }`}
            />
          ))}
        </View>

        {/* Title Text */}
        <View className="mb-8">
          <Text className="text-4xl font-bold text-zinc-100 leading-tight">
            {ONBOARDING_SLIDES[currentSlide].title}
          </Text>
          {ONBOARDING_SLIDES[currentSlide].highlightedWord && (
            <Text className="text-4xl font-bold text-zinc-100 leading-tight">
              {ONBOARDING_SLIDES[currentSlide].highlightedWord}
            </Text>
          )}
        </View>

        {/* Navigation Buttons */}
        <View className="flex-row items-center justify-between">
          {/* Skip Button */}
          <Pressable
            onPress={handleSkip}
            className="py-3 px-4 rounded-full bg-zinc-800 active:bg-zinc-700"
          >
            <Text className="text-base font-medium text-zinc-100">Skip</Text>
          </Pressable>

          {/* Next Button */}
          <Pressable
            onPress={handleNext}
            className="flex-row items-center py-3 px-8 rounded-full bg-zinc-100 active:bg-zinc-300"
          >
            <Text className="text-base font-semibold text-zinc-900 mr-2">
              Next
            </Text>
            <View className="flex-row">
              <NavArrowRight width={18} height={18} color="#18181b" strokeWidth={2} />
              <NavArrowRight width={18} height={18} color="#18181b" strokeWidth={2} style={{ marginLeft: -8 }} />
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
