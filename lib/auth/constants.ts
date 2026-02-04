// Auth-related constants

export const RESEND_COOLDOWN_SECONDS = 60;

export const PASSWORD_MIN_LENGTH = 8;

// Deep link URL for password reset
export const PASSWORD_RESET_REDIRECT_URL = 'njambe://auth/reset-password';

// Password strength thresholds
export const PASSWORD_STRENGTH = {
  WEAK_MAX_LENGTH: 6,
  FAIR_MAX_LENGTH: 8,
  STRONG_MIN_CRITERIA: 3, // out of 4: uppercase, lowercase, number, special
} as const;

// Validation patterns
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
