import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useProviderOnboardingStore } from '@/lib/stores';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from 'react-native';

interface PersonalDescriptionStepProps {
  onComplete: () => void;
}

export function PersonalDescriptionStep({ onComplete }: PersonalDescriptionStepProps) {
  const { personalDescription, setPersonalDescription } = useProviderOnboardingStore();
  const [localDescription, setLocalDescription] = React.useState(personalDescription);

  const handleContinue = () => {
    setPersonalDescription(localDescription);
    onComplete();
  };

  // Description is optional, but we'll require at least some text
  const isValid = localDescription.trim().length >= 10;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#FFF8F0] dark:bg-zinc-950"
    >
      <ScrollView
        className="flex-1 bg-[#FFF8F0] dark:bg-zinc-950"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-5 pt-6">
          {/* Title */}
          <Text className="text-2xl font-bold text-foreground">
            Dites-nous en plus sur vous ! <Text className="text-2xl">😊</Text>
          </Text>

          {/* Subtitle */}
          <Text className="mt-3 text-base leading-6 text-muted-foreground">
            C'est le moment d'expliquer à vos futurs clients{' '}
            <Text className="font-bold text-foreground">qui vous êtes.</Text>
          </Text>

          {/* Text Area */}
          <View className="mt-6 flex-1">
            <View className="min-h-[250px] rounded-2xl bg-white p-4 dark:bg-zinc-900">
              <TextInput
                placeholder="Écrivez votre description personnelle"
                placeholderTextColor="#9ca3af"
                value={localDescription}
                onChangeText={setLocalDescription}
                multiline
                textAlignVertical="top"
                className="flex-1 text-base text-foreground"
                style={{ minHeight: 230 }}
              />
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <View className="px-5 pb-8 pt-4">
          <Button
            onPress={handleContinue}
            disabled={!isValid}
            className={`h-14 rounded-xl ${isValid ? 'bg-emerald-500' : 'bg-emerald-300'}`}
          >
            <Text className="text-lg font-semibold text-white">Continuer</Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
