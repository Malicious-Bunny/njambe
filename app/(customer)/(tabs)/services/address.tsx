import { PageHeader } from '@/components/custom/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useServiceRequestStore } from '@/lib/stores';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';
import MapView, { Marker, type MapEvent } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

const CAMEROON_COORDS = { latitude: 3.848, longitude: 11.502 };
const DEFAULT_DELTA = { latitudeDelta: 0.01, longitudeDelta: 0.01 };

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

export default function AddressScreen() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const setAddress = useServiceRequestStore((s) => s.setAddress);
  const mapRef = React.useRef<MapView>(null);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const [addressText, setAddressText] = React.useState('');
  const [markerCoords, setMarkerCoords] = React.useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationLoading, setLocationLoading] = React.useState(true);
  const [geocoding, setGeocoding] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<NominatimResult[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = React.useState(false);

  // Reverse geocode coords → human-readable address string
  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (place) {
        const parts = [place.streetNumber, place.street, place.city, place.region].filter(
          (s): s is string => Boolean(s)
        );
        setAddressText(parts.join(', '));
      }
    } catch {
      // keep existing text
    }
  };

  // Animate map + reposition marker
  const flyTo = (latitude: number, longitude: number) => {
    setMarkerCoords({ latitude, longitude });
    mapRef.current?.animateToRegion({ latitude, longitude, ...DEFAULT_DELTA }, 600);
  };

  // On mount: request permission + get GPS location
  React.useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setMarkerCoords(CAMEROON_COORDS);
          return;
        }
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        const { latitude, longitude } = position.coords;
        flyTo(latitude, longitude);
        await reverseGeocode(latitude, longitude);
      } catch {
        setMarkerCoords(CAMEROON_COORDS);
      } finally {
        setLocationLoading(false);
      }
    })();
  }, []);

  // Fetch autocomplete suggestions from Nominatim (debounced)
  const fetchSuggestions = async (query: string) => {
    if (query.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    setSuggestionsLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1`,
        { headers: { Accept: 'application/json' } }
      );
      const data: NominatimResult[] = await res.json();
      setSuggestions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('[address] suggestions fetch error:', err);
      setSuggestions([]);
    } finally {
      setSuggestionsLoading(false);
    }
  };

  const handleTextChange = (text: string) => {
    setAddressText(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (text.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    debounceRef.current = setTimeout(() => fetchSuggestions(text), 350);
  };

  // User picks a suggestion → fill input, move map, dismiss list
  const handleSuggestionSelect = (item: NominatimResult) => {
    setAddressText(item.display_name);
    setSuggestions([]);
    flyTo(parseFloat(item.lat), parseFloat(item.lon));
  };

  // User drags the pin → update marker + reverse geocode
  const handleDragEnd = async (e: MapEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerCoords({ latitude, longitude });
    setSuggestions([]);
    setGeocoding(true);
    try {
      await reverseGeocode(latitude, longitude);
    } finally {
      setGeocoding(false);
    }
  };

  const handleContinue = () => {
    setAddress(addressText);
    setSuggestions([]);
    router.push('/(customer)/(tabs)/services/description');
  };

  const showSuggestions = suggestionsLoading || suggestions.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={[]}>
      <PageHeader title="New Request" />

      <View className="flex-1 gap-4 px-4">
        {/* Address input */}
        <View>
          <Text className="mb-2 text-sm text-muted-foreground">
            Where should the service be performed?
          </Text>
          <Input
            value={addressText}
            onChangeText={handleTextChange}
            onSubmitEditing={() => {
              if (debounceRef.current) clearTimeout(debounceRef.current);
              fetchSuggestions(addressText);
            }}
            placeholder="Search address..."
            returnKeyType="search"
          />
        </View>

        {/* Suggestions list (replaces map while searching) */}
        {showSuggestions ? (
          <View className="flex-1 overflow-hidden rounded-2xl border border-border bg-card">
            {suggestionsLoading ? (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator
                  size="small"
                  color={colorScheme === 'dark' ? '#fafafa' : '#18181b'}
                />
              </View>
            ) : (
              <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                {suggestions.map((item, index) => {
                  const parts = item.display_name.split(', ');
                  const primary = parts[0];
                  const secondary = parts.slice(1).join(', ');
                  return (
                    <Pressable
                      key={item.place_id}
                      onPress={() => handleSuggestionSelect(item)}
                      className={`px-4 py-3 active:bg-secondary ${index > 0 ? 'border-t border-border' : ''}`}
                    >
                      <Text className="text-sm font-medium text-foreground" numberOfLines={1}>
                        {primary}
                      </Text>
                      {secondary.length > 0 && (
                        <Text className="mt-0.5 text-xs text-muted-foreground" numberOfLines={1}>
                          {secondary}
                        </Text>
                      )}
                    </Pressable>
                  );
                })}
              </ScrollView>
            )}
          </View>
        ) : (
          /* Map (default state) */
          <View className="flex-1 overflow-hidden rounded-2xl border border-border">
            {locationLoading ? (
              <View className="flex-1 items-center justify-center bg-muted">
                <ActivityIndicator
                  size="large"
                  color={colorScheme === 'dark' ? '#fafafa' : '#18181b'}
                />
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <MapView
                  ref={mapRef}
                  style={{ flex: 1 }}
                  initialRegion={{ ...(markerCoords ?? CAMEROON_COORDS), ...DEFAULT_DELTA }}
                  showsUserLocation
                >
                  {markerCoords && (
                    <Marker coordinate={markerCoords} draggable onDragEnd={handleDragEnd} />
                  )}
                </MapView>
                {geocoding && (
                  <View className="absolute right-3 top-3 items-center justify-center rounded-xl bg-card p-2 shadow-sm">
                    <ActivityIndicator
                      size="small"
                      color={colorScheme === 'dark' ? '#fafafa' : '#18181b'}
                    />
                  </View>
                )}
              </View>
            )}
          </View>
        )}
      </View>

      <View className="px-4 pb-6 pt-3">
        <Button onPress={handleContinue} disabled={!addressText}>
          <Text className="font-semibold text-primary-foreground">Continue</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
