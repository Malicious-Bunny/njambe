// Country data for customer signup
// Add more countries to this list as needed

export interface Country {
  code: string;
  name: string;
  emoji: string; // Flag emoji
  phoneCode: string;
}

// Currently only Cameroon is available
// To add more countries, simply add them to this array
export const COUNTRIES: Country[] = [
  {
    code: 'CM',
    name: 'Cameroon',
    emoji: '🇨🇲',
    phoneCode: '+237',
  },
  // Uncomment to add more countries:
  // {
  //   code: 'NG',
  //   name: 'Nigeria',
  //   emoji: '🇳🇬',
  //   phoneCode: '+234',
  // },
  // {
  //   code: 'GH',
  //   name: 'Ghana',
  //   emoji: '🇬🇭',
  //   phoneCode: '+233',
  // },
];

// Default country
export const DEFAULT_COUNTRY = COUNTRIES[0];
