// Mock data for service categories and subcategories
// In production, this would be fetched from an API

export interface ServiceSubcategory {
  id: string;
  name: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: 'Hammer' | 'Broom' | 'Leaf' | 'PawPrint' | 'Car' | 'GraduationCap' | 'BabyCarriage' | 'House';
  subcategories: ServiceSubcategory[];
}

export interface ServiceCategoriesResponse {
  categories: ServiceCategory[];
}

// Mock API function - simulates fetching from backend
export const fetchServiceCategories = async (): Promise<ServiceCategoriesResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    categories: MOCK_CATEGORIES,
  };
};

// Mock categories data
export const MOCK_CATEGORIES: ServiceCategory[] = [
  {
    id: 'bricolage',
    name: 'Bricolage',
    icon: 'Hammer',
    subcategories: [
      { id: 'peintre', name: 'Peintre' },
      { id: 'electricien', name: 'Electricien' },
      { id: 'menuisier', name: 'Menuisier' },
      { id: 'reparateur-electromenager', name: 'Réparateur électroménager' },
      { id: 'plombier', name: 'Plombier' },
      { id: 'homme-tout-faire', name: 'Homme à tout faire' },
    ],
  },
  {
    id: 'aide-menagere',
    name: 'Aide ménagère',
    icon: 'Broom',
    subcategories: [
      { id: 'nettoyage', name: 'Nettoyage' },
      { id: 'cuisine', name: 'Cuisine' },
      { id: 'couture', name: 'Couture' },
      { id: 'repassage', name: 'Repassage' },
    ],
  },
  {
    id: 'jardinage',
    name: 'Jardinage',
    icon: 'Leaf',
    subcategories: [
      { id: 'jardinier', name: 'Jardinier' },
      { id: 'gros-travaux-jardinage', name: 'Gros travaux de jardinage' },
    ],
  },
  {
    id: 'animaux',
    name: 'Animaux',
    icon: 'PawPrint',
    subcategories: [
      { id: 'garde-petsitter', name: 'Garde chez le petsitter' },
      { id: 'promenade-chien', name: 'Promenade chien' },
      { id: 'toilettage', name: 'Toilettage' },
      { id: 'garde-domicile', name: 'Garde à domicile' },
    ],
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: 'Car',
    subcategories: [
      { id: 'demenagement', name: 'Déménagement' },
      { id: 'livraison', name: 'Livraison' },
      { id: 'covoiturage', name: 'Covoiturage' },
    ],
  },
  {
    id: 'cours-particuliers',
    name: 'Cours particuliers',
    icon: 'GraduationCap',
    subcategories: [
      { id: 'maths', name: 'Mathématiques' },
      { id: 'langues', name: 'Langues' },
      { id: 'musique', name: 'Musique' },
      { id: 'informatique', name: 'Informatique' },
    ],
  },
  {
    id: 'garde-enfants',
    name: 'Garde d\'enfants',
    icon: 'BabyCarriage',
    subcategories: [
      { id: 'babysitter', name: 'Babysitter' },
      { id: 'aide-devoirs', name: 'Aide aux devoirs' },
      { id: 'nounou', name: 'Nounou' },
    ],
  },
  {
    id: 'services-seniors',
    name: 'Services seniors',
    icon: 'House',
    subcategories: [
      { id: 'compagnie', name: 'Compagnie' },
      { id: 'aide-quotidienne', name: 'Aide quotidienne' },
      { id: 'accompagnement', name: 'Accompagnement' },
    ],
  },
];
