import type { Country } from '@/lib/customer/countries';
import * as React from 'react';
import { Text } from 'react-native';

interface CountryFlagProps {
  country: Country;
  size?: 'sm' | 'md' | 'lg';
}

export function CountryFlag({ country, size = 'md' }: CountryFlagProps) {
  const fontSize = {
    sm: 16,
    md: 22,
    lg: 28,
  };

  return (
    <Text style={{ fontSize: fontSize[size] }}>
      {country.emoji}
    </Text>
  );
}
