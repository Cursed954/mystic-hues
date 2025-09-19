# Authentication System Documentation

## Overview
This document provides comprehensive documentation for the Supabase-based authentication system implementation in Mystic India. The system was migrated from a mock authentication system to a fully functional Supabase authentication with user profiles, session management, and secure data access.

## Architecture Overview

### Authentication Flow
```
User Registration/Login → Supabase Auth → Profile Creation → Session Management → Protected Routes
```

### Key Components
1. **Supabase Authentication**: Email/password auth with OAuth support
2. **User Profiles**: Extended user data stored in public.profiles table
3. **Session Management**: Automatic token refresh and persistence
4. **Row Level Security (RLS)**: Database-level access control

## Files Structure

### Core Authentication Files

#### 1. Context & Hooks
- **`src/context/SupabaseAuthContext.tsx`** - Main authentication context provider
- **`src/hooks/useSupabaseAuth.ts`** - Custom hook for auth state management

#### 2. Authentication Pages
- **`src/pages/Login.tsx`** - User login interface with email/password and OAuth
- **`src/pages/SignUp.tsx`** - User registration interface
- **`src/pages/Profile.tsx`** - User profile management page
- **`src/pages/AccountSettings.tsx`** - Account settings and profile editing

#### 3. Supabase Integration
- **`src/integrations/supabase/client.ts`** - Supabase client configuration (auto-generated)
- **`src/integrations/supabase/types.ts`** - TypeScript types for database (auto-generated)

#### 4. Database Migration
- **`supabase/migrations/[timestamp]_create_profiles_table.sql`** - Database schema for user profiles

#### 5. Configuration Files
- **`.env`** - Environment variables for Supabase connection (auto-managed)
- **`supabase/config.toml`** - Supabase project configuration

### Updated Components (migrated from old auth)
- **`src/components/layout/Navbar.tsx`** - Navigation with auth state
- **`src/components/sections/Experience.tsx`** - Experience section with auth integration
- **`src/pages/AllStates.tsx`** - States page with user context
- **`src/pages/JourneyDetail.tsx`** - Journey details with auth checks
- **`src/pages/JourneyPlanner.tsx`** - Trip planning with user association

### Removed Files (old auth system)
- ~~`src/context/AuthContext.tsx`~~ - Old mock authentication context
- ~~`src/hooks/useAuthState.ts`~~ - Old auth state management
- ~~`src/lib/auth.ts`~~ - Old authentication utilities

## Implementation Details

### 1. Supabase Authentication Context (`src/context/SupabaseAuthContext.tsx`)

```tsx
// Key features:
- User state management (user, session, loading)
- Authentication actions (signUp, signIn, signOut)
- OAuth support (Google, GitHub)
- Profile management
- Session persistence
```

### 2. Custom Authentication Hook (`src/hooks/useSupabaseAuth.ts`)

```tsx
// Core functionality:
- Real-time auth state changes
- Automatic profile creation/update
- Session management with auto-refresh
- Error handling for auth operations
- Profile synchronization
```

### 3. Database Schema

#### Profiles Table Structure
```sql
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  bio TEXT,
  phone TEXT,
  address JSONB,
  preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

#### Row Level Security Policies
```sql
-- Users can view their own profile
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own profile  
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 4. Authentication Features

#### Email/Password Authentication
- User registration with email verification
- Secure password-based login
- Password reset functionality (configurable)

#### OAuth Support
- Google OAuth integration
- GitHub OAuth integration
- Extensible for additional providers

#### Session Management
- Automatic token refresh
- Persistent sessions across browser sessions
- Secure logout with session cleanup

#### Profile Management
- Automatic profile creation on signup
- Profile updates and customization
- Extended user data storage

## Setup and Configuration

### 1. Environment Variables
```env
VITE_SUPABASE_URL=https://[project-id].supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=[anon-key]
VITE_SUPABASE_PROJECT_ID=[project-id]
```

### 2. Supabase Configuration
```toml
# supabase/config.toml
project_id = "[project-id]"
```

### 3. Provider Setup (`src/main.tsx`)
```tsx
<SupabaseAuthProvider>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</SupabaseAuthProvider>
```

## Usage Examples

### 1. Using Authentication in Components
```tsx
import { useSupabaseAuthContext } from '@/context/SupabaseAuthContext';

const MyComponent = () => {
  const { user, isAuthenticated, signOut } = useSupabaseAuthContext();
  
  if (!isAuthenticated) {
    return <LoginPrompt />;
  }
  
  return (
    <div>
      <p>Welcome, {user?.email}</p>
      <button onClick={signOut}>Logout</button>
    </div>
  );
};
```

### 2. Protected Routes
```tsx
// Automatic redirect in components
useEffect(() => {
  if (!user) {
    navigate('/login');
  }
}, [user, navigate]);
```

### 3. Profile Management
```tsx
const { updateProfile } = useSupabaseAuthContext();

const handleUpdateProfile = async (updates) => {
  try {
    await updateProfile(updates);
    toast({ title: "Profile updated successfully" });
  } catch (error) {
    toast({ title: "Error updating profile", variant: "destructive" });
  }
};
```

## Security Features

### 1. Row Level Security (RLS)
- Database-level access control
- User-specific data isolation
- Automatic policy enforcement

### 2. Session Security
- Automatic token refresh
- Secure storage in localStorage
- Session expiration handling

### 3. API Security
- Authenticated requests only
- User-scoped data access
- Protected routes and actions

## Migration Summary

### Changes Made
1. **Removed Mock Authentication**
   - Deleted old AuthContext and related files
   - Removed mock user data and state management

2. **Implemented Supabase Auth**
   - Created new authentication context with Supabase
   - Set up real user registration and login
   - Implemented session management

3. **Database Setup**
   - Created profiles table with proper schema
   - Implemented Row Level Security policies
   - Set up automatic profile creation triggers

4. **Component Updates**
   - Updated all components to use new auth context
   - Fixed compilation errors and type issues
   - Maintained existing UI/UX while adding real functionality

5. **Security Implementation**
   - Added proper authentication checks
   - Implemented protected routes
   - Set up secure data access patterns

### Testing Checklist
- [ ] User can register with email/password
- [ ] User can login with existing credentials
- [ ] User sessions persist across browser refreshes
- [ ] User can logout successfully
- [ ] Profile data is created and accessible
- [ ] Protected routes redirect unauthenticated users
- [ ] OAuth providers work (if configured)

## Future Enhancements

### Potential Additions
1. **Email Verification**
   - Configurable email confirmation
   - Email change verification

2. **Password Reset**
   - Forgot password functionality
   - Secure password reset flow

3. **Multi-Factor Authentication**
   - SMS or app-based 2FA
   - Enhanced security options

4. **Social Profiles**
   - Extended OAuth data sync
   - Social profile integration

5. **Analytics**
   - User activity tracking
   - Authentication metrics

## Troubleshooting

### Common Issues
1. **Session not persisting**: Check localStorage and client configuration
2. **Profile not created**: Verify trigger and RLS policies
3. **OAuth not working**: Check provider configuration in Supabase
4. **Type errors**: Ensure types are up to date with database schema

### Debugging Tips
- Check browser console for auth errors
- Verify Supabase connection in network tab
- Test RLS policies with different user contexts
- Use Supabase dashboard for direct database access

## Support

For issues or questions:
1. Check Supabase documentation
2. Review component implementation
3. Test with different user scenarios
4. Verify database policies and triggers