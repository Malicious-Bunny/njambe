import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

// Zinc color palette for easy theme customization
// To change the theme, update these values
export const COLORS = {
  zinc: {
    50: 'hsl(0 0% 98%)',
    100: 'hsl(240 5% 96%)',
    200: 'hsl(240 6% 90%)',
    300: 'hsl(240 5% 84%)',
    400: 'hsl(240 5% 65%)',
    500: 'hsl(240 4% 46%)',
    600: 'hsl(240 5% 34%)',
    700: 'hsl(240 5% 26%)',
    800: 'hsl(240 4% 16%)',
    900: 'hsl(240 6% 10%)',
    950: 'hsl(240 10% 4%)',
  },
  white: 'hsl(0 0% 100%)',
  destructive: {
    light: 'hsl(0 84.2% 60.2%)',
    dark: 'hsl(0 62.8% 30.6%)',
  },
};

export const THEME = {
  light: {
    // Zinc Light Theme
    background: COLORS.zinc[50],
    foreground: COLORS.zinc[950],
    card: COLORS.white,
    cardForeground: COLORS.zinc[950],
    popover: COLORS.white,
    popoverForeground: COLORS.zinc[950],
    primary: COLORS.zinc[900],
    primaryForeground: COLORS.zinc[50],
    secondary: COLORS.zinc[100],
    secondaryForeground: COLORS.zinc[900],
    muted: COLORS.zinc[100],
    mutedForeground: COLORS.zinc[500],
    accent: COLORS.zinc[100],
    accentForeground: COLORS.zinc[900],
    destructive: COLORS.destructive.light,
    destructiveForeground: COLORS.zinc[50],
    border: COLORS.zinc[200],
    input: COLORS.zinc[200],
    ring: COLORS.zinc[950],
    radius: '0.625rem',
    // Chart colors
    chart1: 'hsl(12 76% 61%)',
    chart2: 'hsl(173 58% 39%)',
    chart3: 'hsl(197 37% 24%)',
    chart4: 'hsl(43 74% 66%)',
    chart5: 'hsl(27 87% 67%)',
  },
  dark: {
    // Zinc Dark Theme
    background: COLORS.zinc[950],
    foreground: COLORS.zinc[50],
    card: COLORS.zinc[900],
    cardForeground: COLORS.zinc[50],
    popover: COLORS.zinc[900],
    popoverForeground: COLORS.zinc[50],
    primary: COLORS.zinc[50],
    primaryForeground: COLORS.zinc[900],
    secondary: COLORS.zinc[800],
    secondaryForeground: COLORS.zinc[50],
    muted: COLORS.zinc[800],
    mutedForeground: COLORS.zinc[400],
    accent: COLORS.zinc[800],
    accentForeground: COLORS.zinc[50],
    destructive: COLORS.destructive.dark,
    destructiveForeground: COLORS.zinc[50],
    border: COLORS.zinc[800],
    input: COLORS.zinc[800],
    ring: COLORS.zinc[300],
    radius: '0.625rem',
    // Chart colors - Dark mode
    chart1: 'hsl(220 70% 50%)',
    chart2: 'hsl(160 60% 45%)',
    chart3: 'hsl(30 80% 55%)',
    chart4: 'hsl(280 65% 60%)',
    chart5: 'hsl(340 75% 55%)',
  },
};

export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};
