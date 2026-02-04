import { EMAIL_REGEX, PASSWORD_MIN_LENGTH, PASSWORD_STRENGTH } from './constants';

/**
 * Validate email format
 */
export function validateEmail(email: string): string | null {
  if (!email.trim()) {
    return 'Please enter your email address';
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return 'Please enter a valid email address';
  }

  return null;
}

/**
 * Validate password for reset/signup
 */
export function validatePassword(password: string, confirmPassword?: string): string | null {
  if (!password.trim()) {
    return 'Please enter a new password';
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
  }

  if (confirmPassword !== undefined) {
    if (!confirmPassword.trim()) {
      return 'Please confirm your password';
    }

    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
  }

  return null;
}

export interface PasswordStrength {
  label: string;
  color: string;
  width: string;
}

/**
 * Calculate password strength indicator
 */
export function getPasswordStrength(password: string, borderColor: string): PasswordStrength {
  if (password.length === 0) {
    return { label: '', color: borderColor, width: '0%' };
  }

  if (password.length < PASSWORD_STRENGTH.WEAK_MAX_LENGTH) {
    return { label: 'Weak', color: '#ef4444', width: '25%' };
  }

  if (password.length < PASSWORD_STRENGTH.FAIR_MAX_LENGTH) {
    return { label: 'Fair', color: '#f59e0b', width: '50%' };
  }

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const strength = [hasUppercase, hasLowercase, hasNumber, hasSpecial].filter(Boolean).length;

  if (strength >= PASSWORD_STRENGTH.STRONG_MIN_CRITERIA) {
    return { label: 'Strong', color: '#22c55e', width: '100%' };
  }

  return { label: 'Good', color: '#22c55e', width: '75%' };
}
