import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Only throw error if both are missing in production
if ((!supabaseUrl || !supabaseAnonKey) && import.meta.env.PROD) {
  throw new Error('Missing Supabase environment variables');
}

// For development, we'll use a mock mode if env vars are missing
const isSupabaseConfigured = supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key';

export const supabase = isSupabaseConfigured 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : null; // Will be handled by fallback logic

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  
  if (error?.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

// Helper function to get current user profile
export const getCurrentUserProfile = async () => {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No authenticated user');
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    throw new Error(handleSupabaseError(error));
  }

  return profile;
};

// Check if Supabase is properly configured
export const isSupabaseReady = () => isSupabaseConfigured;