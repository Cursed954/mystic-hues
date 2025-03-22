
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
        document.body.style.backgroundImage = "url('https://img.freepik.com/free-photo/magical-mystical-landscape-wallpaper-purple-tones_23-2150293331.jpg?w=2000')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundBlendMode = 'soft-light';
        
        // Make sure video elements have proper overlay for dark mode
        const videoOverlays = document.querySelectorAll('.video-overlay');
        videoOverlays.forEach(overlay => {
          (overlay as HTMLElement).style.backgroundColor = 'rgba(10, 9, 32, 0.5)';
        });

        // Ensure videos autoplay with appropriate quality
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
          video.autoplay = true;
          video.muted = true;
          video.loop = true;
          video.playsInline = true;
          video.play().catch(e => console.error("Video autoplay failed:", e));
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
