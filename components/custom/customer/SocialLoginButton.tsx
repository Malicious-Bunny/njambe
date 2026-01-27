import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import * as React from 'react';

interface SocialLoginButtonProps {
  icon: React.ComponentType<{ width?: number; height?: number; color?: string }> | (() => React.ReactNode);
  label: string;
  onPress?: () => void;
}

export function SocialLoginButton({ icon: Icon, label, onPress }: SocialLoginButtonProps) {
  // Check if Icon is a render function (returns ReactNode) or a component
  const iconElement = typeof Icon === 'function' && Icon.length === 0
    ? (Icon as () => React.ReactNode)()
    : null;

  return (
    <Button
      variant="outline"
      onPress={onPress}
      className="h-14 flex-row items-center justify-center gap-3 rounded-xl border-2 border-primary bg-card active:bg-accent dark:border-primary dark:bg-card dark:active:bg-accent"
    >
      {iconElement}
      <Text className="text-base font-medium text-primary dark:text-primary">{label}</Text>
    </Button>
  );
}
