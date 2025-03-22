
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme preference or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme) return savedTheme;
      
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    return 'light'; // Default theme
  });

  useEffect(() => {
    // Update localStorage and document class when theme changes
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      const root = window.document.documentElement;
      
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      
      // Add custom background for dark mode
      if (theme === 'dark') {
        document.body.style.background = 'linear-gradient(135deg, #0a0920 0%, #2b0e3e 50%, #1a1258 100%)';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundImage = "url('/lovable-uploads/4b4279e6-d26c-4c95-98fc-8b4b73073286.png')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundBlendMode = 'soft-light';
        
        // Make sure video elements have proper overlay for dark mode
        const videoOverlays = document.querySelectorAll('.video-overlay');
        videoOverlays.forEach(overlay => {
          (overlay as HTMLElement).style.backgroundColor = 'rgba(10, 9, 32, 0.5)';
        });
      } else {
        document.body.style.background = '';
        document.body.style.backgroundAttachment = '';
        document.body.style.backgroundImage = '';
        document.body.style.backgroundSize = '';
        document.body.style.backgroundBlendMode = '';
        
        // Reset video overlays for light mode
        const videoOverlays = document.querySelectorAll('.video-overlay');
        videoOverlays.forEach(overlay => {
          (overlay as HTMLElement).style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        });
      }
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
