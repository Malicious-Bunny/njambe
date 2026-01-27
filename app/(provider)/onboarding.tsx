import {
  OnboardingNavButton,
  OnboardingPagination,
  OnboardingSlide1,
  OnboardingSlide2,
  OnboardingSlide3,
} from '@/components/custom/provider/onboarding';
import {
  ONBOARDING_SLIDES,
  type OnboardingSlide1Data,
  type OnboardingSlide2Data,
  type OnboardingSlide3Data,
} from '@/lib/provider/onboarding-data';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  View,
  type ViewToken,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProviderOnboardingScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const flatListRef = React.useRef<FlatList>(null);
  const totalSlides = ONBOARDING_SLIDES.length;

  const arrowColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentSlide + 1,
        animated: true,
      });
    } else {
      // Navigate to provider signup/join screen
      router.push('/(provider)');
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentSlide - 1,
        animated: true,
      });
    } else {
      router.back();
    }
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

  const renderSlide = ({ item }: { item: (typeof ONBOARDING_SLIDES)[number] }) => {
    return (
      <View style={{ width: SCREEN_WIDTH }} className="flex-1 pt-8">
        {item.type === 'join' && <OnboardingSlide1 data={item as OnboardingSlide1Data} />}
        {item.type === 'stats' && <OnboardingSlide2 data={item as OnboardingSlide2Data} />}
        {item.type === 'howItWorks' && <OnboardingSlide3 data={item as OnboardingSlide3Data} />}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background">
      {/* Back Button */}
      <View className="px-4 py-2">
        <Pressable
          onPress={handleBack}
          className="w-10 h-10 items-center justify-center"
        >
          <ArrowLeft size={24} color={arrowColor} />
        </Pressable>
      </View>

      {/* Swipeable Slide Content */}
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
        keyExtractor={(_, index) => index.toString()}
        className="flex-1"
      />

      {/* Bottom Navigation */}
      <View className="px-6 pb-6 flex-row items-center justify-between">
        <View className="flex-1" />
        <OnboardingPagination
          totalSlides={totalSlides}
          currentSlide={currentSlide}
        />
        <View className="flex-1 items-end">
          <OnboardingNavButton onPress={handleNext} />
        </View>
      </View>
    </SafeAreaView>
  );
}
