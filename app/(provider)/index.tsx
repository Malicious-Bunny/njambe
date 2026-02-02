import { Redirect } from 'expo-router';

export default function ProviderIndex() {
  // Redirect to onboarding when entering provider flow
  return <Redirect href="/(provider)/onboarding" />;
}
