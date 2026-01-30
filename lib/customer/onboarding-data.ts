// Onboarding slides data for customer section
// Structure: image + title + description

export interface CustomerOnboardingSlide {
  id: number;
  image: string;
  title: string;
  highlightedWord?: string;
  description: string;
}

export const CUSTOMER_ONBOARDING_SLIDES: CustomerOnboardingSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=1000&fit=crop',
    title: 'Find Trusted',
    highlightedWord: 'Neighbors',
    description: 'Discover skilled service providers right in your community. From cleaning to repairs, find help that\'s just around the corner.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=800&h=1000&fit=crop',
    title: 'Book With',
    highlightedWord: 'Confidence',
    description: 'Read reviews from real customers in your area. Every provider is verified and rated by your neighbors.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?w=800&h=1000&fit=crop',
    title: 'Pay',
    highlightedWord: 'Securely',
    description: 'Safe and easy payments through the app. Only pay when you\'re satisfied with the service.',
  },
];
