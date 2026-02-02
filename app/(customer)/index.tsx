import { Redirect } from 'expo-router';

export default function CustomerIndex() {
  // Redirect to onboarding when entering customer flow
  return <Redirect href="/(customer)/onboarding" />;
}
