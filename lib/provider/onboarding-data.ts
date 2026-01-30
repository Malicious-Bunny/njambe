// Onboarding slides data for provider section
// Structure: image + title + description

export interface OnboardingSlide {
  id: number;
  image: string;
  title: string;
  highlightedWord?: string;
  description: string;
}

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=1000&fit=crop',
    title: 'Find Local Jobs',
    highlightedWord: 'Near You',
    description: 'Discover job opportunities in your neighborhood. Connect with customers who need your skills right in your community.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=1000&fit=crop',
    title: 'Grow Your',
    highlightedWord: 'Business',
    description: 'Build your reputation with reviews and ratings. Expand your client base and take on more jobs as you grow.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=1000&fit=crop',
    title: 'Get Paid',
    highlightedWord: 'Securely',
    description: 'Receive payments directly and securely. Track your earnings and manage your income all in one place.',
  },
];
