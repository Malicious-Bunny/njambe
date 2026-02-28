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
    subcategories: [
      { id: 'companionship', name: 'Companionship' },
      { id: 'daily-assistance', name: 'Daily Assistance' },
      { id: 'accompaniment', name: 'Accompaniment' },
    ],
  },
];
