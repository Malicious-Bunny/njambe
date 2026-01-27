import { SERVICE_PROVIDERS } from '@/lib/start/service-providers';
import * as React from 'react';
import { View } from 'react-native';
import { ServiceProviderCard } from './ServiceProviderCard';

export function ServiceProvidersCarousel() {
  return (
    <View className="h-80 flex-row items-center justify-center px-2">
      {/* Left card */}
      <ServiceProviderCard
        provider={SERVICE_PROVIDERS[0]}
        style={{ transform: [{ rotate: '-6deg' }], zIndex: 1, marginRight: -30 }}
      />
      {/* Middle card */}
      <ServiceProviderCard
        provider={SERVICE_PROVIDERS[1]}
        style={{ zIndex: 2, marginTop: 20 }}
      />
      {/* Right card */}
      <ServiceProviderCard
        provider={SERVICE_PROVIDERS[2]}
        style={{ transform: [{ rotate: '6deg' }], zIndex: 1, marginLeft: -30, marginTop: 40 }}
      />
    </View>
  );
}
