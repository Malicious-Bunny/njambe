import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface OnboardingSlide {
  id: number;
  image: string;
  title: string;
  highlightedWord?: string;
  description: string;
}

interface OnboardingCarouselProps {
  slides: OnboardingSlide[];
  onComplete: () => void;
  onSkip: () => void;
}

export function OnboardingCarousel({ slides, onComplete, onSkip }: OnboardingCarouselProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const flatListRef = React.useRef<FlatList>(null);
  const totalSlides = slides.length;

  const arrowColor = isDark ? THEME.dark.primaryForeground : THEME.light.primaryForeground;

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentSlide + 1,
        animated: true,
      });
    } else {
      onComplete();
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

  const renderSlide = ({ item }: { item: OnboardingSlide }) => {
    return (
      <View style={{ width: SCREEN_WIDTH }} className="flex-1">
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
    <>
      {/* Swipeable Image Content */}
      <View className="flex-1" style={{ maxHeight: '55%' }}>
        <FlatList
          ref={flatListRef}
          data={slides}
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
      <View className="flex-1 px-6 pt-6 pb-4 justify-between">
        {/* Top section: Pagination + Title + Description */}
        <View>
          {/* Pagination Dots */}
          <PaginationDots
            total={totalSlides}
            current={currentSlide}
            isDark={isDark}
          />

          {/* Title Text */}
          <View className="mb-3">
            <Text className="text-4xl font-bold text-foreground leading-tight">
              {slides[currentSlide].title}
            </Text>
            {slides[currentSlide].highlightedWord && (
              <Text className="text-4xl font-bold text-foreground leading-tight">
                {slides[currentSlide].highlightedWord}
              </Text>
            )}
          </View>

          {/* Description */}
          <Text className="text-base text-muted-foreground leading-relaxed">
            {slides[currentSlide].description}
          </Text>
        </View>

        {/* Navigation Buttons */}
        <NavigationButtons
          onSkip={onSkip}
          onNext={handleNext}
          arrowColor={arrowColor}
        />
      </View>
    </>
  );
}

interface PaginationDotsProps {
  total: number;
  current: number;
  isDark: boolean;
}

function PaginationDots({ total, current, isDark }: PaginationDotsProps) {
  return (
    <View className="flex-row items-center mb-6">
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          className={`h-1.5 rounded-full mr-2 ${
            index === current ? 'w-8' : 'w-2'
          }`}
          style={{
            backgroundColor:
              index === current
                ? isDark
                  ? '#FFFFFF'
                  : '#18181B'
                : isDark
                  ? '#3F3F46'
                  : '#D4D4D8',
          }}
        />
      ))}
    </View>
  );
}

interface NavigationButtonsProps {
  onSkip: () => void;
  onNext: () => void;
  arrowColor: string;
}

function NavigationButtons({ onSkip, onNext, arrowColor }: NavigationButtonsProps) {
  return (
    <View className="flex-row items-center justify-between">
      {/* Skip Button */}
      <Pressable
        onPress={onSkip}
        className="py-3 px-4 rounded-full bg-secondary active:opacity-80"
      >
        <Text className="text-base font-medium text-foreground">Skip</Text>
      </Pressable>

      {/* Next Button */}
      <Pressable
        onPress={onNext}
        className="flex-row items-center py-3 px-8 rounded-full bg-primary active:opacity-90"
      >
        <Text className="text-base font-semibold text-primary-foreground mr-2">
          Next
        </Text>
        <View className="flex-row">
          <NavArrowRight width={18} height={18} color={arrowColor} strokeWidth={2} />
        </View>
      </Pressable>
    </View>
  );
}
