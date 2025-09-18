import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/optimized.css';
import { SupabaseAuthProvider } from '@/context/SupabaseAuthContext';
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SupabaseAuthProvider>
        <AuthProvider>
          <ThemeProvider>
            <App />
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </SupabaseAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);