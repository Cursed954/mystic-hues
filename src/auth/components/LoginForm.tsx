import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Chrome, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '../AuthProvider';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  
  const { signIn, signInWithOAuth } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn(email, password);
      
      if (result.success) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        onSuccess?.();
      } else {
        toast({
          title: "Login Failed",
          description: result.error || "Invalid credentials",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setOauthLoading(provider);
    
    try {
      const result = await signInWithOAuth(provider);
      
      if (!result.success) {
        toast({
          title: "Login Failed",
          description: result.error || `Failed to login with ${provider}`,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `An error occurred while logging in with ${provider}`,
        variant: "destructive"
      });
    } finally {
      setOauthLoading(null);
    }
  };

  return (
    <motion.div 
      className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
            Email Address
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-400 w-5 h-5" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800/50 backdrop-blur-sm text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 border border-violet-500/30 transition-all duration-300"
              placeholder="Enter your email"
              required
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
            Password
          </label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-400 w-5 h-5" />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800/50 backdrop-blur-sm text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 border border-violet-500/30 transition-all duration-300"
              placeholder="Enter your password"
              required
            />
          </div>
        </motion.div>

        <motion.div 
          className="flex items-center justify-between"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-violet-500 focus:ring-violet-500"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-400">
              Remember me
            </label>
          </div>
          <button type="button" className="text-sm text-violet-400 hover:text-violet-300 transition-colors duration-300">
            Forgot password?
          </button>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group shadow-lg shadow-violet-900/30"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </Button>
        </motion.div>
      </form>

      <motion.div 
        className="mt-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
      >
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700/50" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 backdrop-blur-md bg-gray-900/50 text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button 
            type="button"
            variant="outline"
            className="flex items-center justify-center gap-2 border-violet-500/30 bg-gray-800/30 backdrop-blur-sm hover:bg-gray-700/50"
            onClick={() => handleOAuthLogin('google')}
            disabled={!!oauthLoading}
          >
            {oauthLoading === 'google' ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Chrome className="w-5 h-5 text-white" />
                <span className="text-sm font-medium text-gray-300">Google</span>
              </>
            )}
          </Button>
          
          <Button 
            type="button"
            variant="outline"
            className="flex items-center justify-center gap-2 border-violet-500/30 bg-gray-800/30 backdrop-blur-sm hover:bg-gray-700/50"
            onClick={() => handleOAuthLogin('github')}
            disabled={!!oauthLoading}
          >
            {oauthLoading === 'github' ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Github className="w-5 h-5 text-white" />
                <span className="text-sm font-medium text-gray-300">GitHub</span>
              </>
            )}
          </Button>
        </div>
      </motion.div>

      <motion.p 
        className="mt-8 text-center text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        Don't have an account?{' '}
        <Link
          to="/signup"
          className="text-violet-400 font-medium hover:text-violet-300 transition-colors duration-300"
        >
          Sign Up
        </Link>
      </motion.p>
    </motion.div>
  );
};