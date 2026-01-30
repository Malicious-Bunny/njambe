// Service provider data for the start screen
export interface ServiceProvider {
  id: number;
  name: string;
  rating: number;
  category: string;
  isPro: boolean;
  image: string;
}

export const SERVICE_PROVIDERS: ServiceProvider[] = [
  {
    id: 1,
    name: 'Kwame',
    rating: 4.94,
    category: 'Electrician',
    isPro: true,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=500&fit=crop',
  },
  {
    id: 2,
    name: 'Adwoa',
    rating: 4.92,
    category: 'Pet Care',
    isPro: false,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=500&fit=crop',
  },
  {
    id: 3,
    name: 'Kofi',
    rating: 4.98,
    category: 'Gardener',
    isPro: false,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=500&fit=crop',
  },
];
