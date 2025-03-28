
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { ThemeToggle } from '../theme/ThemeToggle';
import useMobile from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

// Define types for nav items
type BaseNavItem = {
  name: string;
  path: string;
};

type NavItemWithIcon = BaseNavItem & {
  icon: React.FC<{ className?: string }>;
};

type NavItem = BaseNavItem | NavItemWithIcon;

// Type guard to check if item has icon
const hasIcon = (item: NavItem): item is NavItemWithIcon => {
  return 'icon' in item;
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const isMobile = useMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = location.pathname === '/';
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Dynamic navigation items based on authentication status
  const getNavItems = (): NavItem[] => {
    const baseItems: NavItem[] = [
      { name: 'States', path: '/states' },
      { name: 'Cuisine', path: '/cuisine' },
      { name: 'Culture', path: '/culture' },
    ];
    
    if (isAuthenticated) {
      return [...baseItems, { name: 'Profile', path: '/profile', icon: User }];
    } else {
      return [...baseItems, { name: 'Login', path: '/login' }];
    }
  };

  const navItems = getNavItems();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    className={`fixed top-4 left-[2.5%] transform -translate-x-1/2 w-[90%] md:w-[95%] z-40 transition-all duration-300 rounded-full shadow-lg backdrop-blur-md border border-white/20 dark:border-white/20 ${
        isScrolled || !isHome
          ? 'py-2.5 bg-white/60 dark:bg-black/50'
          : 'py-4 bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="z-10">
          <Logo className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center space-x-1"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
              >
                <Link
                  to={item.path}
                  className={`nav-item ${
                    location.pathname === item.path ? 'text-spice-500' : ''
                  } ${hasIcon(item) ? 'flex items-center' : ''}`}
                >
                  {hasIcon(item) && <item.icon className="mr-1 h-4 w-4" />}
                  {item.name}
                </Link>
              </motion.div>
            ))}

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.3 }}
              className="ml-4"
            >
              <ThemeToggle />
            </motion.div>
          </motion.div>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <div className="flex items-center">
            <ThemeToggle />
            <button
              className="ml-2 p-2 text-foreground"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col items-center">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.05 + 0.1 } 
                  }}
                >
                  <Link
                    to={item.path}
                    className={`py-3 text-lg font-medium hover:text-spice-500 transition-colors flex items-center ${
                      location.pathname === item.path ? 'text-spice-500' : 'text-foreground'
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    {hasIcon(item) && <item.icon className="mr-2 h-5 w-5" />}
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
