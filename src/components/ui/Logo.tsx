
import React from 'react';
import { useTheme } from '@/components/theme/ThemeProvider';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`flex items-center ${className}`}>
      <svg width="36" height="36" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M32 4C16.536 4 4 16.536 4 32C4 47.464 16.536 60 32 60C47.464 60 60 47.464 60 32C60 16.536 47.464 4 32 4Z" 
          fill={theme === 'dark' ? '#1A1A1A' : '#F5F0E6'} 
          stroke={theme === 'dark' ? '#FF7E11' : '#FF7E11'} 
          strokeWidth="2" 
        />
        <path 
          d="M32 12V52M22 22H42M22 42H42" 
          stroke={theme === 'dark' ? '#FF7E11' : '#FF7E11'} 
          strokeWidth="3" 
          strokeLinecap="round" 
        />
        <path 
          d="M32 12C35.866 12 39 15.134 39 19M32 52C28.134 52 25 48.866 25 45M22 22C22 18.134 25.134 15 29 15M42 22C42 18.134 38.866 15 35 15M22 42C22 45.866 25.134 49 29 49M42 42C42 45.866 38.866 49 35 49" 
          stroke={theme === 'dark' ? '#FF7E11' : '#FF7E11'} 
          strokeWidth="2" 
          strokeLinecap="round" 
        />
      </svg>
      <div className="ml-2 flex flex-col items-start">
        <span className="font-serif text-lg font-medium text-foreground">Mystic</span>
        <span className="text-xs text-spice-500 -mt-1">INDIA</span>
      </div>
    </div>
  );
};
