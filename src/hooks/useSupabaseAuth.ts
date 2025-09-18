import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

export interface AuthActions {
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: any }>;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signInWithOAuth: (provider: 'google' | 'github') => Promise<{ error?: any }>;
  signOut: () => Promise<{ error?: any }>;
  updateProfile: (updates: any) => Promise<{ error?: any }>;
}

export function useSupabaseAuth(): AuthState & AuthActions {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Create or update profile when user signs up/in
        if (session?.user && event === 'SIGNED_IN') {
          setTimeout(() => {
            createOrUpdateProfile(session.user);
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const createOrUpdateProfile = async (user: User) => {
    try {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!existingProfile) {
        const { error } = await supabase
          .from('profiles')
          .insert({
            user_id: user.id,
            full_name: user.user_metadata?.full_name || '',
            email: user.email,
            avatar_url: user.user_metadata?.avatar_url || ''
          });

        if (error) console.error('Error creating profile:', error);
      }
    } catch (error) {
      console.error('Error with profile:', error);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName
        }
      }
    });

    setLoading(false);
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);
    return { error };
  };

  const signInWithOAuth = async (provider: 'google' | 'github') => {
    setLoading(true);
    
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl
      }
    });

    setLoading(false);
    return { error };
  };

  const signOut = async () => {
    setLoading(true);
    
    const { error } = await supabase.auth.signOut();
    
    setLoading(false);
    return { error };
  };

  const updateProfile = async (updates: any) => {
    if (!user) return { error: 'No user found' };

    setLoading(true);
    
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', user.id);

    setLoading(false);
    return { error };
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithOAuth,
    signOut,
    updateProfile
  };
}