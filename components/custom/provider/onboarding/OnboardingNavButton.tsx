import { NavArrowRight } from 'iconoir-react-native';
import { useColorScheme } from 'nativewind';
import { Pressable, type PressableProps } from 'react-native';

interface OnboardingNavButtonProps extends PressableProps {
  onPress: () => void;
}

export function OnboardingNavButton({ onPress, ...props }: OnboardingNavButtonProps) {
  const { colorScheme } = useColorScheme();
  const arrowColor = colorScheme === 'dark' ? '#18181b' : '#fafafa';

  return (
    <Pressable
      onPress={onPress}
      className="w-14 h-14 rounded-full bg-primary dark:bg-primary items-center justify-center active:bg-primary/90 dark:active:bg-primary/90"
      {...props}
    >
      <NavArrowRight width={24} height={24} color={arrowColor} />
    </Pressable>
  );
}
