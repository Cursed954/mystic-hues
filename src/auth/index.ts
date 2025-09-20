// Main exports for the auth module
export { AuthProvider, useAuth } from './AuthProvider';
export { useAuthGuard, useGuestGuard } from './hooks/useAuthGuard';
export { LoginForm } from './components/LoginForm';
export { SignUpForm } from './components/SignUpForm';
export type { AuthContextType, UserProfile } from './types';