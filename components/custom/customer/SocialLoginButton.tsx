import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import type { LucideIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

interface SocialLoginButtonProps {
  icon: LucideIcon | React.ComponentType<{ size?: number; color?: string }>;
  label: string;
  onPress?: () => void;
}

export function SocialLoginButton({ icon: Icon, label, onPress }: SocialLoginButtonProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';

  return (
    <Button
      variant="outline"
      onPress={onPress}
      className="h-14 flex-row items-center justify-center gap-3 rounded-xl border-2 border-primary bg-card active:bg-accent dark:border-primary dark:bg-card dark:active:bg-accent"
    >
      <Icon size={20} color={iconColor} />
      <Text className="text-base font-medium text-primary dark:text-primary">{label}</Text>
    </Button>
  );
}
