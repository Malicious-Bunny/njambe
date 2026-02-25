import * as React from 'react';
import { View } from 'react-native';
import { EnvelopeSimple, CheckCircle, CursorClick } from 'phosphor-react-native';

interface EmailSuccessIllustrationProps {
  size?: number;
  colorScheme?: 'light' | 'dark';
}

// Zinc theme colors
const COLORS = {
  light: {
    background: '#fafafa', // zinc-50
    foreground: '#09090b', // zinc-950
    muted: '#f4f4f5', // zinc-100
    mutedForeground: '#71717a', // zinc-500
    border: '#e4e4e7', // zinc-200
    success: '#22c55e', // green-500
  },
  dark: {
    background: '#09090b', // zinc-950
    foreground: '#fafafa', // zinc-50
    muted: '#27272a', // zinc-800
    mutedForeground: '#a1a1aa', // zinc-400
    border: '#27272a', // zinc-800
    success: '#22c55e', // green-500
  },
};

export function EmailSuccessIllustration({
  size = 200,
  colorScheme = 'light'
}: EmailSuccessIllustrationProps) {
  const colors = COLORS[colorScheme];
  const iconSize = size * 0.5;
  const checkSize = size * 0.22;
  const cursorSize = size * 0.2;

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background circle */}
      <View
        style={{
          width: size * 0.85,
          height: size * 0.85,
          borderRadius: size * 0.425,
          backgroundColor: colors.muted,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Envelope icon */}
        <EnvelopeSimple
          size={iconSize}
          color={colors.foreground}
          weight="duotone"
        />

        {/* Success checkmark - positioned at top right of envelope */}
        <View
          style={{
            position: 'absolute',
            top: size * 0.15,
            right: size * 0.12,
            backgroundColor: colors.success,
            borderRadius: checkSize / 2,
            padding: 2,
          }}
        >
          <CheckCircle
            size={checkSize}
            color="#ffffff"
            weight="fill"
          />
        </View>

        {/* Cursor click - positioned at bottom right */}
        <View
          style={{
            position: 'absolute',
            bottom: size * 0.12,
            right: size * 0.08,
          }}
        >
          <CursorClick
            size={cursorSize}
            color={colors.mutedForeground}
            weight="duotone"
          />
        </View>
      </View>
    </View>
  );
}
