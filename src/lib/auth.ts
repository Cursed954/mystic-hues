
/**
 * Authentication service for handling login functionality
 */

// In a real implementation, this would connect to a backend service like Supabase or Firebase
export const authService = {
  login: async (email: string, password: string): Promise<{ success: boolean; message: string; user?: any }> => {
    try {
      // This is a simulated login flow
      // In a real app, this would make an API call to your authentication service
      
      console.log("Login attempt with:", { email });
      
      // Simple validation
      if (!email || !password) {
        return { success: false, message: "Email and password are required" };
      }
      
      if (password.length < 6) {
        return { success: false, message: "Password must be at least 6 characters" };
      }
      
      // Simulate successful login with a mock user
      // In a real implementation, this would come from your backend
      const mockUser = {
        id: "user-123",
        email,
        name: email.split('@')[0],
        isAuthenticated: true,
        profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        trips: [
          { id: 1, destination: "Rajasthan", date: "2024-05-15", status: "Upcoming" },
          { id: 2, destination: "Kerala", date: "2023-12-10", status: "Completed" }
        ]
      };
      
      // Simulate network delay for realism
      await new Promise(resolve => setTimeout(resolve, 800));

      // Store user in localStorage to persist login state
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return { 
        success: true, 
        message: "Login successful!",
        user: mockUser
      };
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        message: "An error occurred during login. Please try again."
      };
    }
  },
  
  socialLogin: async (provider: 'google' | 'github'): Promise<{ success: boolean; message: string; user?: any }> => {
    try {
      // This is a mock implementation for social login
      // In a real implementation, this would integrate with OAuth providers
      
      console.log(`Social login attempt with ${provider}`);
      
      // Create a random email for demo purposes
      const randomEmail = `user${Math.floor(Math.random() * 1000)}@${provider}.com`;
      
      // Mock user data
      const mockUser = {
        id: `${provider}-user-${Math.floor(Math.random() * 1000)}`,
        email: randomEmail,
        name: randomEmail.split('@')[0],
        isAuthenticated: true,
        provider: provider,
        profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomEmail}`,
        trips: [
          { id: 1, destination: "Himalayas", date: "2024-06-20", status: "Upcoming" }
        ]
      };
      
      // Simulate network delay for realism
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return {
        success: true,
        message: `Successfully logged in with ${provider}!`,
        user: mockUser
      };
    } catch (error) {
      console.error(`${provider} login error:`, error);
      return {
        success: false,
        message: `An error occurred during ${provider} login. Please try again.`
      };
    }
  },
  
  logout: () => {
    localStorage.removeItem('user');
    // In a real implementation, this would also invalidate any tokens with your backend
  },
  
  getCurrentUser: () => {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('user');
  }
};
