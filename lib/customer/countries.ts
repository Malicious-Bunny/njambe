// Country data for customer signup
// Add more countries to this list as needed

export interface Country {
  code: string;
  name: string;
  flag: {
    // Colors for the flag (vertical stripes for most African/European flags)
    stripes: string[];
    // Optional: for flags with symbols
    hasSymbol?: boolean;
    symbolColor?: string;
  };
  phoneCode: string;
}

// Currently only Cameroon is available
// To add more countries, simply add them to this array
export const COUNTRIES: Country[] = [
  {
    code: 'CM',
    name: 'Cameroon',
    flag: {
      stripes: ['#007A5E', '#CE1126', '#FCD116'], // Green, Red, Yellow (vertical)
      hasSymbol: true,
      symbolColor: '#FCD116', // Yellow star
    },
    phoneCode: '+237',
  },
  // Uncomment to add more countries:
  // {
  //   code: 'NG',
  //   name: 'Nigeria',
  //   flag: {
  //     stripes: ['#008751', '#FFFFFF', '#008751'], // Green, White, Green
  //   },
  //   phoneCode: '+234',
  // },
  // {
  //   code: 'GH',
  //   name: 'Ghana',
  //   flag: {
  //     stripes: ['#EF3340', '#FCD116', '#006B3F'], // Red, Yellow, Green
  //     hasSymbol: true,
  //     symbolColor: '#000000', // Black star
  //   },
  //   phoneCode: '+233',
  // },
];

// Default country
export const DEFAULT_COUNTRY = COUNTRIES[0];
