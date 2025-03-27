
import React, { createContext, useContext } from 'react';
import { useAuthState } from '@/hooks/useAuthState';

type AuthContextType = {
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  socialLogin: (provider: 'google' | 'github') => Promise<any>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuthState();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
