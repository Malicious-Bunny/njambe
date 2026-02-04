import {
  LanguageSelector,
  NjambeLogo,
  ServiceProvidersCarousel,
  StartCTAButtons,
  StartTagline,
} from '@/components/custom/start';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StartScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
          <NjambeLogo size="lg" />
          <LanguageSelector />
        </View>

        {/* Service Providers Cards */}
        <View className="mt-2">
          <ServiceProvidersCarousel />
        </View>

        {/* Tagline */}
        <StartTagline />

        {/* CTA Buttons */}
        <StartCTAButtons />

        {/* Bottom spacing */}
        <View className="h-12" />
      </ScrollView>
    </SafeAreaView>
  );
}
