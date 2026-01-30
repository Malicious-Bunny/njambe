import { Text } from '@/components/ui/text';
import * as React from 'react';
import { Pressable, View } from 'react-native';

type Language = 'EN' | 'FR';

interface LanguageSelectorProps {
  onLanguageChange?: (language: Language) => void;
}

// USA Flag Component
function USAFlag() {
  return (
    <View className="h-6 w-6 overflow-hidden rounded-full">
      {/* Simplified USA flag with stripes and blue canton */}
      <View className="flex-1">
        {/* Red and white stripes */}
        <View className="h-[8%] bg-red-600" />
        <View className="h-[8%] bg-white" />
        <View className="h-[8%] bg-red-600" />
        <View className="h-[8%] bg-white" />
        <View className="h-[8%] bg-red-600" />
        <View className="h-[8%] bg-white" />
        <View className="h-[8%] bg-red-600" />
        <View className="h-[8%] bg-white" />
        <View className="h-[8%] bg-red-600" />
        <View className="h-[8%] bg-white" />
        <View className="h-[8%] bg-red-600" />
        <View className="h-[8%] bg-white" />
        <View className="h-[4%] bg-red-600" />
        {/* Blue canton overlay */}
        <View className="absolute left-0 top-0 h-[54%] w-[40%] bg-blue-800" />
      </View>
    </View>
  );
}

// French Flag Component
function FrenchFlag() {
  return (
    <View className="h-6 w-6 overflow-hidden rounded-full flex-row">
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
      className="flex-row items-center gap-2 rounded-full bg-background px-3 py-2 active:opacity-70"
    >
      {language === 'EN' ? <USAFlag /> : <FrenchFlag />}
      <Text className="text-sm font-semibold text-foreground">{language}</Text>
    </Pressable>
  );
}
