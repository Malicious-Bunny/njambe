import * as React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path, Rect, G, Defs, LinearGradient, Stop } from 'react-native-svg';

interface EmailSuccessIllustrationProps {
  size?: number;
  colorScheme?: 'light' | 'dark';
}

export function EmailSuccessIllustration({
  size = 200,
  colorScheme = 'light'
}: EmailSuccessIllustrationProps) {
  // Theme-aware colors
  const cursorColor = colorScheme === 'dark' ? '#fafafa' : '#18181b';
  const sparkleColor = colorScheme === 'dark' ? '#71717a' : '#D1D5DB';

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 200 200">
        <Defs>
          {/* Envelope gradient */}
          <LinearGradient id="envelopeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FEF3E2" />
            <Stop offset="100%" stopColor="#F5E6D3" />
          </LinearGradient>
          {/* Letter gradient */}
          <LinearGradient id="letterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="100%" stopColor="#F8F8F8" />
          </LinearGradient>
        </Defs>

        {/* Stars - orange/gold decorations */}
        {/* Star top left */}
        <Path
          d="M75 45 L77 50 L82 50 L78 53 L80 58 L75 55 L70 58 L72 53 L68 50 L73 50 Z"
          fill="#F97316"
        />
        {/* Star top center */}
        <Path
          d="M105 35 L107 40 L112 40 L108 43 L110 48 L105 45 L100 48 L102 43 L98 40 L103 40 Z"
          fill="#F97316"
        />
        {/* Star top right */}
        <Path
          d="M130 50 L131.5 53 L135 53 L132 55.5 L133.5 59 L130 56.5 L126.5 59 L128 55.5 L125 53 L128.5 53 Z"
          fill="#F97316"
        />
        {/* Small dot decorations */}
        <Circle cx="85" cy="55" r="2" fill="#F97316" />
        <Circle cx="120" cy="45" r="1.5" fill="#F97316" />
        <Circle cx="140" cy="60" r="2" fill="#F97316" />

        {/* Envelope body (back) */}
        <Rect
          x="50"
          y="90"
          width="100"
          height="70"
          rx="6"
          fill="url(#envelopeGradient)"
        />

        {/* Letter paper coming out of envelope */}
        <G>
          {/* Letter shadow */}
          <Rect
            x="58"
            y="55"
            width="84"
            height="70"
            rx="4"
            fill="#E5E5E5"
            opacity="0.5"
          />
          {/* Letter main */}
          <Rect
            x="55"
            y="52"
            width="84"
            height="70"
            rx="4"
            fill="url(#letterGradient)"
          />

          {/* Green checkmark circle */}
          <Circle cx="97" cy="87" r="20" fill="#22C55E" />
          {/* White checkmark */}
          <Path
            d="M88 87 L94 93 L106 81"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </G>

        {/* Envelope flap (front) */}
        <Path
          d="M50 96 L100 130 L150 96 L150 90 L100 124 L50 90 Z"
          fill="#E8D9C5"
        />

        {/* Envelope front fold line */}
        <Path
          d="M50 90 L100 120 L150 90"
          stroke="#D4C4B0"
          strokeWidth="1"
          fill="none"
        />

        {/* Cursor icon - theme aware */}
        <G transform="translate(130, 120)">
          {/* Cursor shadow */}
          <Path
            d="M5 5 L5 35 L13 27 L21 40 L26 37 L18 24 L28 24 Z"
            fill="#00000020"
          />
          {/* Cursor main */}
          <Path
            d="M3 3 L3 33 L11 25 L19 38 L24 35 L16 22 L26 22 Z"
            fill={cursorColor}
            stroke={cursorColor}
            strokeWidth="1"
          />
          {/* Cursor inner highlight */}
          <Path
            d="M6 8 L6 26 L11 21 L15 28"
            stroke={colorScheme === 'dark' ? '#18181b' : '#FFFFFF'}
            strokeWidth="1.5"
            fill="none"
            opacity="0.3"
          />
        </G>

        {/* Sparkle lines around cursor - theme aware */}
        <Path
          d="M155 130 L165 130"
          stroke={sparkleColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Path
          d="M160 125 L160 135"
          stroke={sparkleColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Path
          d="M165 140 L170 145"
          stroke={sparkleColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <Path
          d="M165 145 L170 140"
          stroke={sparkleColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}
