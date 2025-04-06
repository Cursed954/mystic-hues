
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
      
      // Apply theme-specific styles
      if (theme === 'dark') {
        // Apply dark theme styles with bg.webm video background
        document.body.style.background = '#0a0920';
        
        // Add video background for dark mode only
        let videoBackground = document.getElementById('theme-background-video');
        if (!videoBackground) {
          videoBackground = document.createElement('div');
          videoBackground.id = 'theme-background-video';
          videoBackground.style.position = 'fixed';
          videoBackground.style.top = '0';
          videoBackground.style.left = '0';
          videoBackground.style.width = '100%';
          videoBackground.style.height = '100%';
          videoBackground.style.zIndex = '-2';
          videoBackground.style.opacity = '0.5';
          videoBackground.style.pointerEvents = 'none';
          
          const video = document.createElement('video');
          video.autoplay = true;
          video.loop = true;
          video.muted = true;
          video.playsInline = true;
          video.style.width = '100%';
          video.style.height = '100%';
          video.style.objectFit = 'cover';
          
          const source = document.createElement('source');
          source.src = '/src/components/layout/videos/bg.webm';
          source.type = 'video/webm';
          
          video.appendChild(source);
          videoBackground.appendChild(video);
          document.body.appendChild(videoBackground);
          
          // Try to play the video
          video.play().catch(e => console.error('Background video play failed:', e));
        } else {
          videoBackground.style.display = 'block';
        }
        
        // Initialize all videos with proper settings for dark mode
        initializeVideos();
      } else {
        // Reset to light theme styles
        document.body.style.background = '';
        document.body.style.backgroundImage = "url('https://plus.unsplash.com/premium_photo-1675798510636-a5e567897254?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODl8fGFic3RyYWN0JTIwd2hpdGV8ZW58MHx8MHx8fDA%3D')";
        document.body.style.backgroundSize = '';
        document.body.style.backgroundAttachment = '';
        document.body.style.backgroundPosition = '';
        document.body.style.backgroundRepeat = '';
        document.body.style.backgroundBlendMode = '';
        
        // Hide video background in light mode
        const videoBackground = document.getElementById('theme-background-video');
        if (videoBackground) {
          videoBackground.style.display = 'none';
        }
        
        // Still initialize videos for light mode
        initializeVideos();
      }
    }
  }, [theme]);

  // Helper function to initialize videos with proper settings
  const initializeVideos = () => {
    setTimeout(() => {
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
        
        // Play video and handle errors
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
          overlay.style.backgroundColor = theme === 'dark' 
            ? 'rgba(10, 9, 32, 0.5)' 
            : 'rgba(0, 0, 0, 0.3)';
        }
      });
    }, 100);
  };

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
