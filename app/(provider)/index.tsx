import { Redirect } from 'expo-router';

export default function ProviderIndex() {
  // Redirect to the onboarding flow
  return <Redirect href="/(provider)/onboarding/" />;
}
