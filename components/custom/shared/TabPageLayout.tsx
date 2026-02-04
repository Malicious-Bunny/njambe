import { Text } from '@/components/ui/text';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from './Header';

interface TabPageLayoutProps {
  title: string;
  subtitle: string;
  showBackButton?: boolean;
  showNotification?: boolean;
  children: React.ReactNode;
}

export function TabPageLayout({
  title,
  subtitle,
  showBackButton = false,
  showNotification = true,
  children,
}: TabPageLayoutProps) {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 100 }}>
        <Header showBackButton={showBackButton} showNotification={showNotification} />

        <View className="px-5 pb-6">
          <Text className="text-2xl font-bold text-foreground">{title}</Text>
          <Text className="mt-1 text-muted-foreground">{subtitle}</Text>
        </View>

        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
