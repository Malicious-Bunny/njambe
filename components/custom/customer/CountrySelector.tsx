import { Text } from '@/components/ui/text';
import { COUNTRIES, type Country } from '@/lib/customer/countries';
import { NavArrowDown, Xmark } from 'iconoir-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import {
  Modal,
  Pressable,
  View,
  ScrollView,
} from 'react-native';
import { CountryFlag } from './CountryFlag';

interface CountrySelectorProps {
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
}

export function CountrySelector({
  selectedCountry,
  onCountryChange,
}: CountrySelectorProps) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [tempSelectedCountry, setTempSelectedCountry] = React.useState(selectedCountry);
  const { colorScheme } = useColorScheme();

  const iconColor = colorScheme === 'dark' ? '#a1a1aa' : '#71717a';
  const borderColor = colorScheme === 'dark' ? '#3f3f46' : '#e4e4e7';
  const modalBgColor = colorScheme === 'dark' ? '#18181b' : '#ffffff';

  const handleOpenModal = () => {
    setTempSelectedCountry(selectedCountry);
    setIsModalVisible(true);
  };

  const handleConfirm = () => {
    onCountryChange(tempSelectedCountry);
    setIsModalVisible(false);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {/* Country Field */}
      <Pressable onPress={handleOpenModal} className="mb-6">
        <Text className="text-sm text-muted-foreground mb-2">Country</Text>
        <View
          className="flex-row items-center justify-between pb-3 border-b"
          style={{ borderBottomColor: borderColor, borderBottomWidth: 1 }}
        >
          <View className="flex-row items-center gap-3">
            <CountryFlag country={selectedCountry} size="md" />
            <Text className="text-base text-foreground">{selectedCountry.name}</Text>
          </View>
          <NavArrowDown width={20} height={20} color={iconColor} />
        </View>
      </Pressable>

      {/* Country Selection Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleClose}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View
            className="rounded-t-3xl px-6 pt-6 pb-8"
            style={{ backgroundColor: modalBgColor }}
          >
            {/* Modal Header */}
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-lg font-semibold text-foreground">
                Choose a country
              </Text>
              <Pressable
                onPress={handleClose}
                className="w-10 h-10 items-center justify-center"
              >
                <Xmark width={24} height={24} color={iconColor} />
              </Pressable>
            </View>

            {/* Country List */}
            <ScrollView className="max-h-64 mb-6">
              {COUNTRIES.map((country) => (
                <Pressable
                  key={country.code}
                  onPress={() => setTempSelectedCountry(country)}
                  className="flex-row items-center py-4"
                >
                  {/* Radio Button */}
                  <View
                    className="w-5 h-5 rounded-full border-2 mr-4 items-center justify-center"
                    style={{
                      borderColor:
                        tempSelectedCountry.code === country.code
                          ? colorScheme === 'dark'
                            ? '#fafafa'
                            : '#18181b'
                          : borderColor,
                    }}
                  >
                    {tempSelectedCountry.code === country.code && (
                      <View
                        className="w-2.5 h-2.5 rounded-full bg-primary"
                      />
                    )}
                  </View>

                  {/* Flag and Name */}
                  <CountryFlag country={country} size="md" />
                  <Text className="ml-3 text-base text-foreground">
                    {country.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            {/* Confirm Button */}
            <Pressable
              onPress={handleConfirm}
              className="h-14 items-center justify-center rounded-xl bg-primary active:bg-primary/90"
            >
              <Text className="text-base font-semibold text-primary-foreground">
                Confirm
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}
