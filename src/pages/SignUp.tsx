import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, User, Github, Chrome } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, socialLogin, isAuthenticated } = useAuth();
  
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (values: SignUpFormValues) => {
    setIsLoading(true);

    try {
      const result = await signUp(values.name, values.email, values.password);
      
      if (result.success) {
        toast({
          title: "Account Created Successfully",
          description: "Welcome to Mystic India! You are now registered.",
        });
        navigate('/profile');
      } else {
        toast({
          title: "Registration Failed",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setSocialLoading(provider);
    
    try {
      const result = await socialLogin(provider);
      
      if (result.success) {
        toast({
          title: "Account Created Successfully",
          description: `You have been registered with ${provider}.`,
        });
        navigate('/profile');
      } else {
        toast({
          title: "Registration Failed",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error(`${provider} registration error:`, error);
      toast({
        title: "Registration Error",
        description: `An error occurred while registering with ${provider}.`,
        variant: "destructive"
      });
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-emerald-600/30 rounded-full filter blur-3xl opacity-40 animate-float" />
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-teal-600/20 rounded-full filter blur-3xl opacity-40 animate-pulse-slow" />
      </div>

      <div className="absolute inset-0 -z-5">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-emerald-500/20 rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 border border-teal-500/20 rounded-full" />
        <div className="absolute top-1/3 left-1/3 w-24 h-24 border border-emerald-500/30 rounded-full" />
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]" />
      </div>

      <motion.div 
        className="max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">
            Create Account
          </h1>
          <p className="text-gray-400">Sign up to start your journey through India</p>
        </div>

        <motion.div 
          className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-400">Full Name</FormLabel>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 w-5 h-5" />
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full bg-gray-800/50 backdrop-blur-sm text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-emerald-500/30 transition-all duration-300"
                            placeholder="Enter your full name"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-sm mt-1" />
                      </div>
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-400">Email Address</FormLabel>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 w-5 h-5" />
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="w-full bg-gray-800/50 backdrop-blur-sm text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-emerald-500/30 transition-all duration-300"
                            placeholder="Enter your email"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-sm mt-1" />
                      </div>
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-400">Password</FormLabel>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 w-5 h-5" />
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            className="w-full bg-gray-800/50 backdrop-blur-sm text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-emerald-500/30 transition-all duration-300"
                            placeholder="Create a password"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-sm mt-1" />
                      </div>
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-400">Confirm Password</FormLabel>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 w-5 h-5" />
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            className="w-full bg-gray-800/50 backdrop-blur-sm text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-emerald-500/30 transition-all duration-300"
                            placeholder="Confirm your password"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-sm mt-1" />
                      </div>
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group shadow-lg shadow-emerald-900/30"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Sign Up
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </motion.button>
            </form>
          </Form>

          <motion.div 
            className="mt-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 backdrop-blur-md bg-gray-900/50 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <motion.button 
                className="flex items-center justify-center gap-2 px-4 py-3 border border-emerald-500/30 rounded-lg bg-gray-800/30 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSocialLogin('google')}
                disabled={!!socialLoading}
              >
                {socialLoading === 'google' ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Chrome className="w-5 h-5 text-white" />
                    <span className="text-sm font-medium text-gray-300">Google</span>
                  </>
                )}
              </motion.button>
              <motion.button 
                className="flex items-center justify-center gap-2 px-4 py-3 border border-emerald-500/30 rounded-lg bg-gray-800/30 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSocialLogin('github')}
                disabled={!!socialLoading}
              >
                {socialLoading === 'github' ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Github className="w-5 h-5 text-white" />
                    <span className="text-sm font-medium text-gray-300">GitHub</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        <motion.p 
          className="mt-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          Already have an account?{' '}
          <Link 
            to="/login"
            className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 font-medium transition-all duration-300 hover:scale-105 inline-block"
          >
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignUp;
