import * as React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

interface AnimatedTabIconProps {
  icon: React.ComponentType<any>;
  color: string;
  size: number;
  focused: boolean;
}

export function AnimatedTabIcon({ icon: Icon, color, size, focused }: AnimatedTabIconProps) {
  const scale = useSharedValue(1);

  React.useEffect(() => {
    if (focused) {
      scale.value = withSequence(
        withTiming(1.25, { duration: 80 }),
        withSpring(1, { damping: 5, stiffness: 250 })
      );
    }
  }, [focused, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Icon size={size} color={color} weight={focused ? 'fill' : 'regular'} />
    </Animated.View>
  );
}
