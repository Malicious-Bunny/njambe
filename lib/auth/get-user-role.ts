import { supabase } from '@/lib/supabase';

export type UserRole = 'customer' | 'provider';

/**
 * Fetch user role from user_metadata or users table
 * Priority:
 * 1. user_metadata.role (set during signup)
 * 2. users table query
 * 3. Default to 'customer'
 */
export async function getUserRole(userId: string, userMetadata?: Record<string, unknown>): Promise<UserRole> {
  // First try to get role from user_metadata (set during signup)
  if (userMetadata?.role && (userMetadata.role === 'customer' || userMetadata.role === 'provider')) {
    console.log('Role from user_metadata:', userMetadata.role);
    return userMetadata.role as UserRole;
  }

  // Fallback: query the users table
  try {
    const { data: profile, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (!error && profile?.role) {
      console.log('Role from users table:', profile.role);
      return profile.role as UserRole;
    }
  } catch (error) {
    console.error('Error fetching user role from database:', error);
  }

  // Default to customer if no role found
  console.log('No role found, defaulting to customer');
  return 'customer';
}

/**
 * Get the route path for a given user role
 */
export function getRouteForRole(role: UserRole): string {
  return role === 'provider' ? '/(provider)/(tabs)/' : '/(customer)/(tabs)/';
}
