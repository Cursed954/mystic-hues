
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/optimized.css'; // Import optimized CSS

// Preload critical assets for home page
const preloadHomeAssets = () => {
  const heroVideoUrl = "https://player.vimeo.com/progressive_redirect/playback/921376317/rendition/1080p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=81fe3100ce7a792e4a2487a6a6a26a72df29adc0cfe19bf09dcae05be11dce97";
  
  // Preload hero video
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = heroVideoUrl;
  link.as = 'video';
  document.head.appendChild(link);
};

// Call preload function
preloadHomeAssets();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
