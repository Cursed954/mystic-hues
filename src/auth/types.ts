import { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  user_id: string;
  full_name?: string;
  email?: string;
  avatar_url?: string;
  bio?: string;
  phone?: string;
  date_of_birth?: string;
  address?: Record<string, any>;
  preferences?: Record<string, any>;
  trips?: any[];
  recent_activities?: any[];
  saved_states?: string[];
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  signInWithOAuth: (provider: 'google' | 'github') => Promise<{ success: boolean; error?: string; data?: any }>;
  signOut: () => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string; profile?: UserProfile }>;
  isAuthenticated: boolean;
}