
import { useState, useEffect } from 'react';
import { authService } from '@/lib/auth';

export function useAuthState() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize user state from localStorage
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);

    // Set up listener for storage events to sync across tabs
    const handleStorageChange = () => {
      const newUser = authService.getCurrentUser();
      setUser(newUser);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await authService.login(email, password);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = async (provider: 'google' | 'github') => {
    setLoading(true);
    try {
      const result = await authService.socialLogin(provider);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    // Dispatch a storage event to sync across tabs
    window.dispatchEvent(new Event('storage'));
  };

  return { 
    user, 
    loading, 
    login, 
    socialLogin, 
    logout, 
    isAuthenticated: !!user 
  };
}
