import type { Country } from '@/lib/customer/countries';
import * as React from 'react';
import { View } from 'react-native';

interface CountryFlagProps {
  country: Country;
  size?: 'sm' | 'md' | 'lg';
}

export function CountryFlag({ country, size = 'md' }: CountryFlagProps) {
  const dimensions = {
    sm: { width: 20, height: 14 },
    md: { width: 28, height: 20 },
    lg: { width: 36, height: 26 },
  };

  const { width, height } = dimensions[size];
  const stripeWidth = width / country.flag.stripes.length;

  return (
    <View
      style={{ width, height, borderRadius: 2, overflow: 'hidden' }}
      className="flex-row"
    >
      {country.flag.stripes.map((color, index) => (
        <View
          key={index}
          style={{
            width: stripeWidth,
            height,
            backgroundColor: color,
          }}
        />
      ))}
      {/* Star symbol for Cameroon flag */}
      {country.flag.hasSymbol && country.code === 'CM' && (
        <View
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{ translateX: -4 }, { translateY: -4 }],
          }}
        >
          <View
            style={{
              width: 8,
              height: 8,
              backgroundColor: country.flag.symbolColor,
            }}
            className="items-center justify-center"
          >
            {/* Simple star representation */}
            <View
              style={{
                width: 0,
                height: 0,
                borderLeftWidth: 4,
                borderRightWidth: 4,
                borderBottomWidth: 6,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: country.flag.symbolColor,
                position: 'absolute',
                top: -1,
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}
