import { Text } from '@/components/ui/text';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useColorScheme } from 'nativewind';

// Generic icon component type compatible with iconoir icons
type IconComponent = React.ComponentType<{ width?: number; height?: number; color?: string }>;

interface EmptyStateProps {
  icon?: IconComponent;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  subtitle,
  actionLabel,
  onActionPress,
}: EmptyStateProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#71717a' : '#a1a1aa';

  return (
    <View className="items-center justify-center rounded-2xl bg-card py-12 shadow-sm dark:bg-card">
      {Icon && <Icon width={48} height={48} color={iconColor} />}
      <Text className={`${Icon ? 'mt-3' : ''} text-muted-foreground dark:text-muted-foreground`}>{title}</Text>
      {subtitle && <Text className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">{subtitle}</Text>}
      {actionLabel && onActionPress && (
        <Pressable onPress={onActionPress} className="mt-3 rounded-xl bg-secondary px-4 py-2 dark:bg-secondary">
          <Text className="font-medium text-primary dark:text-primary">{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}
