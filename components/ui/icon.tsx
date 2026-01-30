import { cn } from '@/lib/utils';
import type { SvgProps } from 'react-native-svg';
import { cssInterop } from 'nativewind';
import * as React from 'react';

type IconoirIconComponent = React.ComponentType<SvgProps & { color?: string; width?: number; height?: number }>;

type IconProps = SvgProps & {
  as: IconoirIconComponent;
  size?: number;
  className?: string;
};

function IconImpl({ as: IconComponent, size, ...props }: IconProps) {
  return <IconComponent width={size} height={size} {...props} />;
}

cssInterop(IconImpl, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      height: 'size',
      width: 'size',
    },
  },
});

/**
 * A wrapper component for Iconoir icons with Nativewind `className` support via `cssInterop`.
 *
 * This component allows you to render any Iconoir icon while applying utility classes
 * using `nativewind`. It avoids the need to wrap or configure each icon individually.
 *
 * @component
 * @example
 * ```tsx
 * import { NavArrowRight } from 'iconoir-react-native';
 * import { Icon } from '@/components/ui/icon';
 *
 * <Icon as={NavArrowRight} className="text-red-500" size={16} />
 * ```
 *
 * @param {IconoirIconComponent} as - The Iconoir icon component to render.
 * @param {string} className - Utility classes to style the icon using Nativewind.
 * @param {number} size - Icon size (defaults to 14).
 * @param {...SvgProps} ...props - Additional SVG props passed to the icon.
 */
function Icon({ as: IconComponent, className, size = 14, ...props }: IconProps) {
  return (
    <IconImpl
      as={IconComponent}
      className={cn('text-foreground', className)}
      size={size}
      {...props}
    />
  );
}

export { Icon };
export type { IconoirIconComponent };
