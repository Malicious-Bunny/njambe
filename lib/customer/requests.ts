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
  budgetFCFA?: number;
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

export interface ProviderReview {
  id: string;
  serviceName: string;
  rating: number;
  comment: string;
  date: string; // ISO date
  reviewerName: string;
}

export interface ProviderSkill {
  categoryName: string;
  categoryIcon: CategoryIconName;
  categoryColor: string;
  servicesCompleted: number;
  description: string;
}

export interface CustomerOfferDetail extends CustomerOffer {
  bio: string;
  location: string;
  lastSeenAt: string; // ISO date
  ratingBreakdown: {
    serviceQuality: number;
    communication: number;
    punctuality: number;
    valueForMoney: number;
  };
  reviews: ProviderReview[];
  skills: ProviderSkill[];
  verifications: {
    emailVerified: boolean;
    phoneVerified: boolean;
    idVerified: boolean;
  };
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

export const fetchOfferById = async (offerId: string): Promise<CustomerOfferDetail | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_OFFER_DETAILS.find((o) => o.id === offerId) ?? null;
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
    budgetFCFA: 15000,
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
    budgetFCFA: 10000,
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
    budgetFCFA: 8000,
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
    budgetFCFA: 12000,
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

export const MOCK_OFFER_DETAILS: CustomerOfferDetail[] = [
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
    bio: "Hello! I'm Astrid, a professional home cleaner with 8 years of experience in Yaoundé. I take pride in leaving every space spotless and always bring my own eco-friendly supplies. I adapt fully to my clients' schedules and preferences, and discretion is guaranteed.",
    location: 'Bastos, Yaoundé',
    lastSeenAt: '2026-03-02T10:30:00Z',
    ratingBreakdown: { serviceQuality: 5, communication: 5, punctuality: 5, valueForMoney: 5 },
    reviews: [
      {
        id: 'r1',
        serviceName: 'House Cleaning',
        rating: 5,
        comment:
          'Astrid is amazing! My apartment has never been this clean. Very thorough and incredibly professional. I will definitely book her again.',
        date: '2026-02-15T00:00:00Z',
        reviewerName: 'Sophie D.',
      },
      {
        id: 'r2',
        serviceName: 'Deep Cleaning',
        rating: 5,
        comment:
          'I have been using Astrid for 3 months now. Always on time, always perfect work. She pays attention to every detail and the results are outstanding.',
        date: '2026-01-28T00:00:00Z',
        reviewerName: 'Martin K.',
      },
      {
        id: 'r3',
        serviceName: 'House Cleaning',
        rating: 5,
        comment:
          'Excellent service! The bathroom and kitchen were spotless. Astrid is reliable and honest. Highly recommended to everyone looking for a cleaner.',
        date: '2025-12-20T00:00:00Z',
        reviewerName: 'Patricia N.',
      },
    ],
    skills: [
      {
        categoryName: 'House Cleaning',
        categoryIcon: 'BroomIcon',
        categoryColor: '#3B82F6',
        servicesCompleted: 27,
        description:
          'Deep cleaning, regular weekly cleaning, post-move cleaning, and end-of-tenancy cleans. I use eco-friendly products and bring all equipment needed.',
      },
    ],
    verifications: { emailVerified: true, phoneVerified: true, idVerified: true },
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
    bio: "I'm Paul, a home cleaning professional with 6 years of experience. I'm reliable, discreet, and adapt easily to each client's needs. I can come at any time of day that works for you and guarantee a job well done every time.",
    location: 'Omnisports, Yaoundé',
    lastSeenAt: '2026-03-01T14:00:00Z',
    ratingBreakdown: { serviceQuality: 4, communication: 4, punctuality: 5, valueForMoney: 5 },
    reviews: [
      {
        id: 'r4',
        serviceName: 'House Cleaning',
        rating: 4,
        comment:
          "Paul does a good job overall. Very punctual and friendly. The cleaning was thorough on the first visit. I'd recommend him for regular cleaning needs.",
        date: '2026-02-10T00:00:00Z',
        reviewerName: 'Carine M.',
      },
      {
        id: 'r5',
        serviceName: 'House Cleaning',
        rating: 5,
        comment:
          'Great value for money. Paul is hardworking and very affordable. My apartment was cleaned to a very high standard.',
        date: '2026-01-05T00:00:00Z',
        reviewerName: 'Eric T.',
      },
      {
        id: 'r6',
        serviceName: 'Deep Cleaning',
        rating: 4,
        comment:
          'Good service, very affordable. A few small areas were missed but overall a clean result. Would use again.',
        date: '2025-11-18T00:00:00Z',
        reviewerName: 'Lucie B.',
      },
    ],
    skills: [
      {
        categoryName: 'House Cleaning',
        categoryIcon: 'BroomIcon',
        categoryColor: '#3B82F6',
        servicesCompleted: 14,
        description:
          'Regular and deep cleaning of apartments and houses. Flexible schedule and competitive rates. I bring my own supplies on request.',
      },
    ],
    verifications: { emailVerified: true, phoneVerified: false, idVerified: false },
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
    bio: "I'm Sandra, the most reviewed cleaner in the Bastos area with 10+ years of experience. I specialize in deep cleaning, kitchen sanitizing, and bathroom restoration. My clients trust me with their homes — and I take that seriously.",
    location: 'Bastos, Yaoundé',
    lastSeenAt: '2026-03-02T08:00:00Z',
    ratingBreakdown: { serviceQuality: 5, communication: 5, punctuality: 5, valueForMoney: 4 },
    reviews: [
      {
        id: 'r7',
        serviceName: 'Deep Cleaning',
        rating: 5,
        comment:
          "Sandra transformed my kitchen — it looks brand new! She is incredibly thorough and professional. Best cleaner I've ever hired, without any doubt.",
        date: '2026-02-20T00:00:00Z',
        reviewerName: 'Nathalie F.',
      },
      {
        id: 'r8',
        serviceName: 'House Cleaning',
        rating: 5,
        comment:
          'Exceptional work. Sandra is meticulous, fast, and very professional. My home smells wonderful and everything is spotless. Highly recommended!',
        date: '2026-01-14T00:00:00Z',
        reviewerName: 'Thomas A.',
      },
      {
        id: 'r9',
        serviceName: 'Deep Cleaning',
        rating: 5,
        comment:
          'The best cleaning service I have ever used. Sandra is organized, communicates clearly, and the results are always perfect. Worth every franc.',
        date: '2025-12-05T00:00:00Z',
        reviewerName: 'Chantal O.',
      },
    ],
    skills: [
      {
        categoryName: 'House Cleaning',
        categoryIcon: 'BroomIcon',
        categoryColor: '#3B82F6',
        servicesCompleted: 41,
        description:
          'Full deep cleaning, regular maintenance, kitchen and bathroom specialization. I use professional-grade products and guarantee results.',
      },
    ],
    verifications: { emailVerified: true, phoneVerified: true, idVerified: true },
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
    bio: "Hi, I'm Brigitte! I recently relocated to Bastos and I'm building my reputation as a professional cleaner. I am detail-oriented, punctual, and offer the best rates in the area. Give me a chance and you won't be disappointed!",
    location: 'Bastos, Yaoundé',
    lastSeenAt: '2026-03-02T07:15:00Z',
    ratingBreakdown: { serviceQuality: 4, communication: 4, punctuality: 4, valueForMoney: 5 },
    reviews: [
      {
        id: 'r10',
        serviceName: 'House Cleaning',
        rating: 4,
        comment:
          'Brigitte is hardworking and pleasant to deal with. The cleaning was good and very affordable. I will use her services again.',
        date: '2026-02-05T00:00:00Z',
        reviewerName: 'Roger E.',
      },
      {
        id: 'r11',
        serviceName: 'House Cleaning',
        rating: 4,
        comment:
          'Good job overall. Brigitte is friendly and hardworking. A few spots could have been more thorough but for the price it is excellent value.',
        date: '2025-12-28T00:00:00Z',
        reviewerName: 'Isabelle T.',
      },
      {
        id: 'r12',
        serviceName: 'House Cleaning',
        rating: 5,
        comment:
          'Very satisfied! Brigitte was professional and very thorough. Will definitely book again. Great rates and excellent work ethic.',
        date: '2025-11-30T00:00:00Z',
        reviewerName: 'Alex M.',
      },
    ],
    skills: [
      {
        categoryName: 'House Cleaning',
        categoryIcon: 'BroomIcon',
        categoryColor: '#3B82F6',
        servicesCompleted: 6,
        description:
          'Regular and deep cleaning for apartments and houses. Very competitive pricing as I build my reputation in the Bastos area.',
      },
    ],
    verifications: { emailVerified: true, phoneVerified: false, idVerified: false },
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
    bio: "I'm Valerie, a passionate educator with 5 years of private tutoring experience. I specialize in primary and secondary mathematics and adapt my teaching style to each child's needs. Patience and encouragement are at the heart of my approach.",
    location: 'Mvog-Ada, Yaoundé',
    lastSeenAt: '2026-03-02T09:45:00Z',
    ratingBreakdown: { serviceQuality: 5, communication: 5, punctuality: 5, valueForMoney: 5 },
    reviews: [
      {
        id: 'r13',
        serviceName: 'Mathematics',
        rating: 5,
        comment:
          "Valerie is an incredible tutor. My daughter's grades went from average to excellent in just two months. She is patient, clear, and very encouraging.",
        date: '2026-01-20T00:00:00Z',
        reviewerName: 'Nadège K.',
      },
      {
        id: 'r14',
        serviceName: 'Mathematics',
        rating: 5,
        comment:
          "Very professional and dedicated. Valerie always comes prepared and tracks my son's progress carefully. Highly recommended for any parent needing a tutor.",
        date: '2025-12-10T00:00:00Z',
        reviewerName: 'Pierre L.',
      },
      {
        id: 'r15',
        serviceName: 'Mathematics',
        rating: 5,
        comment:
          "Excellent tutor! My child loves the lessons. Valerie makes math fun and accessible. She's the best tutoring investment we've made.",
        date: '2025-10-05T00:00:00Z',
        reviewerName: 'Céline D.',
      },
    ],
    skills: [
      {
        categoryName: 'Tutoring',
        categoryIcon: 'BookOpenIcon',
        categoryColor: '#EC4899',
        servicesCompleted: 3,
        description:
          'Private mathematics tutoring for primary and secondary school students. I follow the Cameroonian national curriculum and prepare students for exams.',
      },
    ],
    verifications: { emailVerified: true, phoneVerified: true, idVerified: false },
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
    bio: "I'm Jean-Paul, a mathematics tutor with a degree in applied mathematics and 7 years of experience. I have helped over 50 students from CM1 to Terminale improve their grades and confidence. I believe every child can succeed with the right guidance.",
    location: 'Nlongkak, Yaoundé',
    lastSeenAt: '2026-03-01T11:00:00Z',
    ratingBreakdown: { serviceQuality: 4, communication: 5, punctuality: 4, valueForMoney: 5 },
    reviews: [
      {
        id: 'r16',
        serviceName: 'Mathematics',
        rating: 4,
        comment:
          "Jean-Paul is knowledgeable and explains things clearly. My son improved in just a few sessions. Good tutor, very affordable for the quality provided.",
        date: '2026-01-30T00:00:00Z',
        reviewerName: 'Armelle F.',
      },
      {
        id: 'r17',
        serviceName: 'Mathematics',
        rating: 4,
        comment:
          'Solid tutor with real expertise. Very communicative and flexible with scheduling. My daughter is doing much better in class since we started sessions.',
        date: '2025-11-22T00:00:00Z',
        reviewerName: 'Denis A.',
      },
      {
        id: 'r18',
        serviceName: 'Mathematics',
        rating: 5,
        comment:
          "Excellent work! Jean-Paul is patient and methodical. He identified my son's exact weaknesses and addressed them systematically. Great results in 6 weeks.",
        date: '2025-09-15T00:00:00Z',
        reviewerName: 'Hélène M.',
      },
    ],
    skills: [
      {
        categoryName: 'Tutoring',
        categoryIcon: 'BookOpenIcon',
        categoryColor: '#EC4899',
        servicesCompleted: 8,
        description:
          'Mathematics tutoring for all levels from primary to high school. I use proven methods to make abstract concepts concrete and accessible for every student.',
      },
    ],
    verifications: { emailVerified: true, phoneVerified: true, idVerified: true },
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
    bio: "I'm Marie, a certified mathematics teacher with 10 years of experience in both public schools and private tutoring. I have a gift for breaking down complex concepts into simple, fun lessons. My students consistently achieve excellent results.",
    location: 'Melen, Yaoundé',
    lastSeenAt: '2026-03-02T06:00:00Z',
    ratingBreakdown: { serviceQuality: 5, communication: 5, punctuality: 5, valueForMoney: 4 },
    reviews: [
      {
        id: 'r19',
        serviceName: 'Mathematics',
        rating: 5,
        comment:
          'Marie is outstanding. My son went from failing to passing with distinction in just one term. She is worth every franc. A true professional educator.',
        date: '2026-02-01T00:00:00Z',
        reviewerName: 'Samuel N.',
      },
      {
        id: 'r20',
        serviceName: 'Mathematics',
        rating: 5,
        comment:
          'Incredible tutor. Marie has a unique ability to make my daughter love mathematics. Her results have improved dramatically. Cannot recommend her enough.',
        date: '2025-12-18T00:00:00Z',
        reviewerName: 'Grace O.',
      },
      {
        id: 'r21',
        serviceName: 'Mathematics',
        rating: 5,
        comment:
          'The best math tutor in Yaoundé, hands down. Marie is patient, creative, and gets real results. My son is now among the top students in his class.',
        date: '2025-10-30T00:00:00Z',
        reviewerName: 'Robert P.',
      },
    ],
    skills: [
      {
        categoryName: 'Tutoring',
        categoryIcon: 'BookOpenIcon',
        categoryColor: '#EC4899',
        servicesCompleted: 12,
        description:
          'Certified teacher with 10 years of classroom and tutoring experience. I cover all math topics from primary through Terminale and prepare students for national exams.',
      },
    ],
    verifications: { emailVerified: true, phoneVerified: true, idVerified: true },
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
