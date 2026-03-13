export type CategoryIconName =
  | 'WrenchIcon'
  | 'BroomIcon'
  | 'LeafIcon'
  | 'PawPrintIcon'
  | 'TruckIcon'
  | 'BookOpenIcon'
  | 'BabyCarriageIcon'
  | 'HeartIcon';

export interface ServiceSubcategory {
  id: string;
  name: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: CategoryIconName;
  color: string;
  image: string;
  subcategories: ServiceSubcategory[];
}

// Mock API — replace with Supabase call in production
export const fetchServiceCategories = async (): Promise<ServiceCategory[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return SERVICE_CATEGORIES;
};

export const fetchSubcategories = async (
  categoryId: string
): Promise<ServiceSubcategory[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const category = SERVICE_CATEGORIES.find((c) => c.id === categoryId);
  return category?.subcategories ?? [];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'home-repairs',
    name: 'Home Repairs',
    description: 'Painting, electrical, plumbing, small fixes',
    icon: 'WrenchIcon',
    color: '#F97316',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&fit=crop',
    subcategories: [
      { id: 'painter', name: 'Painter' },
      { id: 'electrician', name: 'Electrician' },
      { id: 'carpenter', name: 'Carpenter' },
      { id: 'plumber', name: 'Plumber' },
      { id: 'handyman', name: 'Handyman' },
      { id: 'appliance-repair', name: 'Appliance Repair' },
    ],
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    description: 'House cleaning, ironing, cooking, laundry',
    icon: 'BroomIcon',
    color: '#3B82F6',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80&fit=crop',
    subcategories: [
      { id: 'house-cleaning', name: 'House Cleaning' },
      { id: 'ironing', name: 'Ironing' },
      { id: 'cooking', name: 'Cooking' },
      { id: 'laundry', name: 'Laundry' },
    ],
  },
  {
    id: 'gardening',
    name: 'Gardening',
    description: 'Lawn mowing, hedge trimming, maintenance',
    icon: 'LeafIcon',
    color: '#22C55E',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&fit=crop',
    subcategories: [
      { id: 'lawn-mowing', name: 'Lawn Mowing' },
      { id: 'hedge-trimming', name: 'Hedge Trimming' },
      { id: 'garden-maintenance', name: 'Garden Maintenance' },
    ],
  },
  {
    id: 'pet-care',
    name: 'Pet Care',
    description: 'Pet sitting, dog walking, grooming',
    icon: 'PawPrintIcon',
    color: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&q=80&fit=crop',
    subcategories: [
      { id: 'pet-sitting', name: 'Pet Sitting' },
      { id: 'dog-walking', name: 'Dog Walking' },
      { id: 'grooming', name: 'Grooming' },
      { id: 'home-visit', name: 'Home Visit' },
    ],
  },
  {
    id: 'transport',
    name: 'Transport',
    description: 'Moving, delivery, rides',
    icon: 'TruckIcon',
    color: '#6366F1',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop',
    subcategories: [
      { id: 'moving', name: 'Moving' },
      { id: 'delivery', name: 'Delivery' },
      { id: 'ride', name: 'Ride' },
    ],
  },
  {
    id: 'tutoring',
    name: 'Tutoring',
    description: 'Private lessons, languages, music',
    icon: 'BookOpenIcon',
    color: '#EC4899',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80&fit=crop',
    subcategories: [
      { id: 'math', name: 'Mathematics' },
      { id: 'languages', name: 'Languages' },
      { id: 'music', name: 'Music' },
      { id: 'computer-science', name: 'Computer Science' },
    ],
  },
  {
    id: 'childcare',
    name: 'Childcare',
    description: 'Babysitting, nanny, homework help',
    icon: 'BabyCarriageIcon',
    color: '#14B8A6',
    image: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=600&q=80&fit=crop',
    subcategories: [
      { id: 'babysitter', name: 'Babysitter' },
      { id: 'nanny', name: 'Nanny' },
      { id: 'homework-help', name: 'Homework Help' },
    ],
  },
  {
    id: 'senior-care',
    name: 'Senior Care',
    description: 'Companionship, daily assistance',
    icon: 'HeartIcon',
    color: '#EF4444',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&q=80&fit=crop',
    subcategories: [
      { id: 'companionship', name: 'Companionship' },
      { id: 'daily-assistance', name: 'Daily Assistance' },
      { id: 'accompaniment', name: 'Accompaniment' },
    ],
  },
];
