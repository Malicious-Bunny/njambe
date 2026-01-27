// Onboarding slides data for provider section
// Adapted for njambe (Cameroon context)

export interface BenefitItem {
  text: string;
  boldText?: string;
}

export interface OnboardingSlide1Data {
  type: 'join';
  title: string;
  providerName: string;
  providerRating: number;
  individualBenefits: BenefitItem[];
  professionalBenefits: BenefitItem[];
}

export interface ServiceCard {
  title: string;
  priceRange: string;
  isPro?: boolean;
}

export interface StatItem {
  icon: string;
  text: string;
  boldText?: string;
}

export interface OnboardingSlide2Data {
  type: 'stats';
  title: string;
  serviceCards: ServiceCard[];
  stats: StatItem[];
}

export interface StepItem {
  number: number;
  text: string;
  boldText?: string;
}

export interface OnboardingSlide3Data {
  type: 'howItWorks';
  title: string;
  steps: StepItem[];
}

export type OnboardingSlideData = OnboardingSlide1Data | OnboardingSlide2Data | OnboardingSlide3Data;

export const ONBOARDING_SLIDES: OnboardingSlideData[] = [
  {
    type: 'join',
    title: 'Join Us!',
    providerName: 'Kwame',
    providerRating: 4.95,
    individualBenefits: [
      { text: 'Earn up to ', boldText: 'XAF 5,000,000 per year' },
      { text: 'Jobs insured and ', boldText: 'protected' },
      { text: 'Flexible work ', boldText: 'on your schedule' },
    ],
    professionalBenefits: [
      { text: 'Jobs reserved for ', boldText: 'PROs' },
      { text: 'Unlimited ', boldText: 'quotes' },
      { text: 'Automatic ', boldText: 'invoicing' },
    ],
  },
  {
    type: 'stats',
    title: '1,000+ jobs per week',
    serviceCards: [
      { title: 'Home Cleaning', priceRange: 'XAF 10,000 - XAF 20,000' },
      { title: 'Lawn Mowing', priceRange: 'XAF 8,000 - XAF 15,000' },
      { title: 'AC Repair', priceRange: 'XAF 25,000 - XAF 40,000', isPro: true },
    ],
    stats: [
      { icon: 'grid', text: 'In more than ', boldText: '80 categories' },
      { icon: 'bell', text: 'Notifications ', boldText: 'in real-time' },
      { icon: 'mapPin', text: 'Everywhere in ', boldText: 'Cameroon' },
      { icon: 'users', text: '', boldText: '50,000+ clients' },
    ],
  },
  {
    type: 'howItWorks',
    title: 'How does it work?',
    steps: [
      { number: 1, text: 'Discover ', boldText: 'thousands of jobs' },
      { number: 2, text: 'Set your ', boldText: 'rates' },
      { number: 3, text: '', boldText: 'Complete the job' },
      { number: 4, text: 'Receive your ', boldText: 'payment online' },
    ],
  },
];

// Provider avatar image URL (placeholder)
export const PROVIDER_AVATAR_URL = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face';

// Job illustration images
export const JOB_ILLUSTRATION_URL = 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=400&h=400&fit=crop';

// How it works illustration
export const HOW_IT_WORKS_URL = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop';
