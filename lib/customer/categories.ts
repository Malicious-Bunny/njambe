// Service categories for customer home screen
export interface Category {
  id: number;
  name: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  { id: 1, name: 'Cleaning', icon: '🧹' },
  { id: 2, name: 'Gardening', icon: '🌱' },
  { id: 3, name: 'Pet Care', icon: '🐕' },
  { id: 4, name: 'Repairs', icon: '🔧' },
  { id: 5, name: 'Moving', icon: '📦' },
  { id: 6, name: 'Tutoring', icon: '📚' },
  { id: 7, name: 'Cooking', icon: '🍳' },
  { id: 8, name: 'Tech Help', icon: '💻' },
];
