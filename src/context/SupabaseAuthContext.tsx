import React, { createContext, useContext, ReactNode } from 'react';
import { useSupabaseAuth, AuthState, AuthActions } from '@/hooks/useSupabaseAuth';

type SupabaseAuthContextType = AuthState & AuthActions & {
  isAuthenticated: boolean;
};

const SupabaseAuthContext = createContext<SupabaseAuthContextType | undefined>(undefined);

export const SupabaseAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useSupabaseAuth();
  
  const value = {
    ...auth,
    isAuthenticated: !!auth.user
  };
  
  return (
    <SupabaseAuthContext.Provider value={value}>
      {children}
    </SupabaseAuthContext.Provider>
  );
};

export const useSupabaseAuthContext = () => {
  const context = useContext(SupabaseAuthContext);
  if (context === undefined) {
    throw new Error('useSupabaseAuthContext must be used within a SupabaseAuthProvider');
  }
  return context;
};