import type { CategoryIconName } from './categories';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CustomerRequest {
  id: string;
  title: string;
  categoryId: string;
  categoryName: string;
  categoryIcon: CategoryIconName;
  categoryColor: string;
  subcategoryName: string;
  providerType: 'all' | 'professionals_only';
  status: 'active' | 'closed';
  offerCount: number;
  conversationCount: number;
  createdAt: string; // ISO date string
  address: string;
  description: string;
}

export interface CustomerConversation {
  id: string;
  requestId: string;
  providerName: string;
  providerInitials: string;
  providerAvatarColor: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface CustomerOffer {
  id: string;
  requestId: string;
  providerName: string;
  providerInitials: string;
  providerAvatarColor: string;
  rating: number;
  reviewCount: number;
  distanceKm: number;
  hourlyRateFCFA: number;
  message: string;
  createdAt: string; // ISO date string
}

// ─── Mock API ─────────────────────────────────────────────────────────────────

export const fetchCustomerRequests = async (): Promise<CustomerRequest[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return MOCK_REQUESTS;
};

export const fetchRequestById = async (id: string): Promise<CustomerRequest | null> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MOCK_REQUESTS.find((r) => r.id === id) ?? null;
};

export const fetchRequestOffers = async (requestId: string): Promise<CustomerOffer[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return MOCK_OFFERS.filter((o) => o.requestId === requestId);
};

export const fetchRequestConversations = async (
  requestId: string
): Promise<CustomerConversation[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_CONVERSATIONS.filter((c) => c.requestId === requestId);
};

// ─── Mock data ────────────────────────────────────────────────────────────────

export const MOCK_REQUESTS: CustomerRequest[] = [
  {
    id: '1',
    title: 'Need a house cleaner for weekly deep clean',
    categoryId: 'cleaning',
    categoryName: 'Cleaning',
    categoryIcon: 'BroomIcon',
    categoryColor: '#3B82F6',
    subcategoryName: 'House Cleaning',
    providerType: 'all',
    status: 'active',
    offerCount: 4,
    conversationCount: 1,
    createdAt: '2026-02-27T10:00:00Z',
    address: 'Bastos, Yaoundé',
    description:
      'Looking for a reliable cleaner to do a thorough deep clean of my 3-bedroom apartment every week. Must bring their own cleaning supplies. I am flexible on timing but prefer weekday mornings. The apartment is about 90m².',
  },
  {
    id: '2',
    title: 'Math tutor for my 10-year-old son',
    categoryId: 'tutoring',
    categoryName: 'Tutoring',
    categoryIcon: 'BookOpenIcon',
    categoryColor: '#EC4899',
    subcategoryName: 'Mathematics',
    providerType: 'professionals_only',
    status: 'active',
    offerCount: 3,
    conversationCount: 2,
    createdAt: '2026-02-25T14:30:00Z',
    address: 'Omnisports, Yaoundé',
    description:
      'My son is in CM2 and struggling with multiplication, division, and fractions. We need a patient tutor who can help him improve his confidence and results before end-of-year exams. Sessions 2 times per week, about 1.5 hours each.',
  },
  {
    id: '3',
    title: 'Garden maintenance every 2 weeks',
    categoryId: 'gardening',
    categoryName: 'Gardening',
    categoryIcon: 'LeafIcon',
    categoryColor: '#22C55E',
    subcategoryName: 'Garden Maintenance',
    providerType: 'all',
    status: 'closed',
    offerCount: 2,
    conversationCount: 2,
    createdAt: '2026-02-10T09:00:00Z',
    address: 'Melen, Yaoundé',
    description:
      'Garden with a large lawn, flower beds, and a few fruit trees. Need someone to mow the lawn, trim the hedges, and clear debris every 2 weeks. Previous gardener moved away so looking for a long-term arrangement.',
  },
  {
    id: '4',
    title: 'Babysitter needed on weekends',
    categoryId: 'childcare',
    categoryName: 'Childcare',
    categoryIcon: 'BabyCarriageIcon',
    categoryColor: '#14B8A6',
    subcategoryName: 'Babysitter',
    providerType: 'all',
    status: 'closed',
    offerCount: 5,
    conversationCount: 3,
    createdAt: '2026-01-20T11:00:00Z',
    address: 'Bastos, Yaoundé',
    description:
      'We need a babysitter for our 2 kids (ages 4 and 7) on Saturday mornings and occasionally Sunday afternoons. Mainly supervision and light activities at home. Previous babysitting experience required.',
  },
];

export const MOCK_OFFERS: CustomerOffer[] = [
  {
    id: 'o4',
    requestId: '1',
    providerName: 'Astrid K.',
    providerInitials: 'AK',
    providerAvatarColor: '#8B5CF6',
    rating: 5,
    reviewCount: 27,
    distanceKm: 0.9,
    hourlyRateFCFA: 4000,
    message:
      'Hi! I offer thorough deep cleaning services for homes and apartments. I bring my own supplies and take pride in leaving every corner spotless. Available weekly.',
    createdAt: '2026-02-28T07:30:00Z',
  },
  {
    id: 'o5',
    requestId: '1',
    providerName: 'Paul E.',
    providerInitials: 'PE',
    providerAvatarColor: '#EF4444',
    rating: 4,
    reviewCount: 14,
    distanceKm: 2.4,
    hourlyRateFCFA: 3000,
    message:
      'I have been doing professional home cleaning for 6 years. I am reliable, discreet, and very thorough. I can come every week at the time that suits you best.',
    createdAt: '2026-02-27T15:00:00Z',
  },
  {
    id: 'o6',
    requestId: '1',
    providerName: 'Sandra B.',
    providerInitials: 'SB',
    providerAvatarColor: '#F59E0B',
    rating: 5,
    reviewCount: 41,
    distanceKm: 1.5,
    hourlyRateFCFA: 4500,
    message:
      'Top-rated cleaner in Bastos area. I specialize in deep cleaning, including kitchen and bathroom sanitizing. 10+ years of experience. Happy to discuss your needs.',
    createdAt: '2026-02-27T11:00:00Z',
  },
  {
    id: 'o7',
    requestId: '1',
    providerName: 'Brigitte N.',
    providerInitials: 'BN',
    providerAvatarColor: '#06B6D4',
    rating: 4,
    reviewCount: 6,
    distanceKm: 3.2,
    hourlyRateFCFA: 2500,
    message:
      'I am a hard-working and detail-oriented cleaner. I recently moved to Bastos and am building my client base. Great rates and quality service guaranteed.',
    createdAt: '2026-02-27T10:45:00Z',
  },
  {
    id: 'o1',
    requestId: '2',
    providerName: 'Valerie N.',
    providerInitials: 'VN',
    providerAvatarColor: '#F97316',
    rating: 5,
    reviewCount: 3,
    distanceKm: 2.3,
    hourlyRateFCFA: 5000,
    message:
      "Hello! I have 5 years of experience tutoring children in mathematics. I can start right away and adapt to your son's level and school curriculum.",
    createdAt: '2026-02-26T08:00:00Z',
  },
  {
    id: 'o2',
    requestId: '2',
    providerName: 'Jean-Paul M.',
    providerInitials: 'JP',
    providerAvatarColor: '#3B82F6',
    rating: 4,
    reviewCount: 8,
    distanceKm: 5.1,
    hourlyRateFCFA: 3500,
    message:
      "I offer private math lessons tailored to your son's curriculum and pace. I have helped over 50 students with great results. References available on request.",
    createdAt: '2026-02-25T16:00:00Z',
  },
  {
    id: 'o3',
    requestId: '2',
    providerName: 'Marie T.',
    providerInitials: 'MT',
    providerAvatarColor: '#22C55E',
    rating: 5,
    reviewCount: 12,
    distanceKm: 1.8,
    hourlyRateFCFA: 6000,
    message:
      'Certified math teacher with 10 years of experience. I specialize in making difficult concepts easy and fun for kids. Available evenings and weekends.',
    createdAt: '2026-02-25T12:00:00Z',
  },
];

export const MOCK_CONVERSATIONS: CustomerConversation[] = [
  {
    id: 'c1',
    requestId: '1',
    providerName: 'Astrid K.',
    providerInitials: 'AK',
    providerAvatarColor: '#8B5CF6',
    lastMessage: 'Do you have a preferred day of the week for the cleaning?',
    lastMessageAt: '2026-02-28T09:15:00Z',
    unreadCount: 1,
  },
  {
    id: 'c2',
    requestId: '2',
    providerName: 'Valerie N.',
    providerInitials: 'VN',
    providerAvatarColor: '#F97316',
    lastMessage: 'What school does your son attend? I can align with the curriculum.',
    lastMessageAt: '2026-02-26T11:00:00Z',
    unreadCount: 0,
  },
  {
    id: 'c3',
    requestId: '2',
    providerName: 'Jean-Paul M.',
    providerInitials: 'JP',
    providerAvatarColor: '#3B82F6',
    lastMessage: 'I am available Tuesday and Thursday evenings. Would that work?',
    lastMessageAt: '2026-02-25T18:30:00Z',
    unreadCount: 2,
  },
];
