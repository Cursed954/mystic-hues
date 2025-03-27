
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
        isAuthenticated: true
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
