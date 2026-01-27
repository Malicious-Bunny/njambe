import { Text } from '@/components/ui/text';
import * as React from 'react';
import { Pressable, View } from 'react-native';

type Language = 'EN' | 'FR';

interface LanguageSelectorProps {
  onLanguageChange?: (language: Language) => void;
}

// UK Flag Component
function UKFlag() {
  return (
    <View className="h-6 w-6 overflow-hidden rounded-full border border-border bg-blue-800">
      {/* Simplified UK flag */}
      <View className="absolute inset-0 items-center justify-center">
        {/* White diagonal cross */}
        <View className="absolute h-full w-1 bg-white" />
        <View className="absolute h-1 w-full bg-white" />
        {/* Red cross */}
        <View className="absolute h-full w-0.5 bg-red-600" />
        <View className="absolute h-0.5 w-full bg-red-600" />
      </View>
    </View>
  );
}

// French Flag Component
function FrenchFlag() {
  return (
    <View className="h-6 w-6 overflow-hidden rounded-full border border-border flex-row">
      <View className="w-1/3 bg-blue-700" />
      <View className="w-1/3 bg-white" />
      <View className="w-1/3 bg-red-600" />
    </View>
  );
}

export function LanguageSelector({ onLanguageChange }: LanguageSelectorProps) {
  const [language, setLanguage] = React.useState<Language>('EN');

  const toggleLanguage = () => {
    const newLanguage = language === 'EN' ? 'FR' : 'EN';
    setLanguage(newLanguage);
    onLanguageChange?.(newLanguage);
  };

  return (
    <Pressable
      onPress={toggleLanguage}
      className="flex-row items-center gap-2 rounded-full bg-secondary px-3 py-2 shadow-sm active:bg-accent"
    >
      {language === 'EN' ? <UKFlag /> : <FrenchFlag />}
      <Text className="text-sm font-semibold text-foreground">{language}</Text>
    </Pressable>
  );
}
