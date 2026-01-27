import { cn } from '@/lib/utils';
import { View } from 'react-native';

interface OnboardingPaginationProps {
  totalSlides: number;
  currentSlide: number;
}

export function OnboardingPagination({ totalSlides, currentSlide }: OnboardingPaginationProps) {
  return (
    <View className="flex-row items-center justify-center gap-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <View
          key={index}
          className={cn(
            'h-2.5 rounded-full transition-all',
            index === currentSlide
              ? 'w-2.5 bg-primary dark:bg-primary'
              : 'w-2.5 bg-muted dark:bg-muted'
          )}
        />
      ))}
    </View>
  );
}
