
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo authentication feedback
    toast({
      title: isLogin ? "Login successful!" : "Account created!",
      description: "This is a demo without actual authentication.",
    });
    
    // Redirect after successful login/signup (demo purposes)
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/80">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="dark:glass-card border-spice-100 dark:border-purple-800/30 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-serif text-center">
                {isLogin ? 'Welcome Back' : 'Join Us'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="dark:bg-mystic-800 dark:border-mystic-700"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="dark:bg-mystic-800 dark:border-mystic-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter your password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="dark:bg-mystic-800 dark:border-mystic-700 pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>
                
                {isLogin && (
                  <div className="text-right">
                    <Link to="/forgot-password" className="text-sm text-spice-500 hover:text-spice-600 dark:text-purple-400 dark:hover:text-purple-300">
                      Forgot password?
                    </Link>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full mt-6 dark:bg-purple-700 dark:hover:bg-purple-600 dark:text-white"
                >
                  {isLogin ? (
                    <>
                      <LogIn size={18} className="mr-2" />
                      Sign In
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} className="mr-2" />
                      Create Account
                    </>
                  )}
                </Button>
                
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    className="text-spice-500 hover:text-spice-600 dark:text-purple-400 dark:hover:text-purple-300 text-sm"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
