
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeLoaded: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const LIGHT_BG_URL = "https://images.unsplash.com/photo-1740137660661-96c8ec7bc92e?q=80&w=2268&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const DARK_BG_URL = "https://r4.wallpaperflare.com/wallpaper/684/422/438/abstract-3d-digital-art-stu-ballinger-wallpaper-2b965cfd43817fe9f584cbf97d1cfc40.jpg";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [themeLoaded, setThemeLoaded] = useState(false);

  // Preload images immediately when component mounts
  useEffect(() => {
    const darkBg = new Image();
    darkBg.src = DARK_BG_URL;
    
    const lightBg = new Image();
    lightBg.src = LIGHT_BG_URL;
    
    // Mark images as loading
    Promise.all([
      new Promise(resolve => {
        darkBg.onload = resolve;
        darkBg.onerror = resolve; // Continue even if load fails
      }),
      new Promise(resolve => {
        lightBg.onload = resolve;
        lightBg.onerror = resolve; // Continue even if load fails
      })
    ]).then(() => {
      console.log('Background images preloaded');
    });
  }, []);

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set theme based on priority: saved preference > system preference > default
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    
    // Apply theme immediately to avoid flash
    applyTheme(initialTheme);
    
    // Set theme as loaded after a short delay to ensure animations start properly
    setTimeout(() => {
      setThemeLoaded(true);
    }, 100);

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Use separate effect for theme changes after initial load
  useEffect(() => {
    if (themeLoaded) {
      localStorage.setItem('theme', theme);
      applyTheme(theme);
    }
  }, [theme, themeLoaded]);

  // Apply theme to document and handle background
  const applyTheme = (activeTheme: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(activeTheme);
    
    // Apply theme-specific background styles with improved performance
    document.body.style.backgroundImage = `url(${activeTheme === 'dark' ? DARK_BG_URL : LIGHT_BG_URL})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(activeTheme === 'dark' ? 'dark-theme' : 'light-theme');

    // Initialize videos with requestAnimationFrame to improve performance
    requestAnimationFrame(() => {
      initializeVideos(activeTheme);
    });
  };

  // Helper function to initialize videos with proper settings
  const initializeVideos = (activeTheme: Theme) => {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      // Set video properties
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      
      // Force video to play with high quality
      if (video.dataset.src) {
        video.src = video.dataset.src;
      }
      
      // Play video and handle errors with improved error handling
      video.play().catch(e => {
        console.warn("Auto-play was prevented. Will try after user interaction.", e);
        
        // Setup event listeners to play after user interaction
        const playVideoOnInteraction = () => {
          video.play().catch(err => console.error("Video play failed:", err));
          
          // Remove event listeners after first interaction
          document.removeEventListener('click', playVideoOnInteraction);
          document.removeEventListener('touchstart', playVideoOnInteraction);
          document.removeEventListener('scroll', playVideoOnInteraction);
        };
        
        document.addEventListener('click', playVideoOnInteraction, { once: true });
        document.addEventListener('touchstart', playVideoOnInteraction, { once: true });
        document.addEventListener('scroll', playVideoOnInteraction, { once: true });
      });
      
      // Set video overlay based on theme
      const parent = video.parentElement;
      const overlay = parent?.querySelector('.video-overlay') as HTMLElement | null;
      if (overlay) {
        overlay.style.backgroundColor = activeTheme === 'dark' 
          ? 'rgba(10, 9, 32, 0.5)' 
          : 'rgba(0, 0, 0, 0.3)';
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeLoaded }}>
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
