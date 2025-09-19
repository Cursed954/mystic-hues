import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { stateData } from '@/data/stateData';
import { MapPin, ArrowRight, Search, Filter, Heart } from 'lucide-react';
import { motion as motionDiv } from 'framer-motion';
import { useSupabaseAuthContext } from '@/context/SupabaseAuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import LazyImage from '@/components/ui/lazy-image';
import ContentSkeleton, { CardSkeleton } from '@/components/ui/content-skeleton';

const AllStates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredStates, setFilteredStates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSupabaseAuthContext();
  const isAuthenticated = !!user;
  const { toast } = useToast();

  // First show the page layout, then load data
  useEffect(() => {
    // Short timeout to let the page layout render first
    const timer = setTimeout(() => {
      let filtered = [...stateData];
      
      if (searchTerm) {
        filtered = filtered.filter(state => 
          state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          state.region.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (activeFilter !== 'All') {
        filtered = filtered.filter(state => state.region === activeFilter);
      }

      setFilteredStates(filtered);
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [searchTerm, activeFilter]);

  const regions = ['All', ...Array.from(new Set(stateData.map(state => state.region)))];

  const handleFavoriteToggle = async (stateId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save your favorite states.",
        variant: "destructive"
      });
      return;
    }

    try {
      // TODO: Implement favorite toggle with Supabase
      toast({
        title: "Feature Coming Soon",
        description: "Favorites functionality will be available soon!",
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: "Failed to update favorite states. Please try again.",
        variant: "destructive"
      });
    }
  };

  const isStateFavorite = (stateId: string) => {
    // TODO: Check against user profile data from Supabase
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-gray-900 dark:to-slate-800">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 dark:from-indigo-900/30 dark:to-purple-900/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
                Explore All <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">States</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Discover the rich cultural heritage, stunning landscapes, and unique experiences across all Indian states
              </p>
              
              {/* Search and Filter */}
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search states or regions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => setActiveFilter(region)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                        activeFilter === region
                          ? "bg-indigo-600 text-white shadow-lg"
                          : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-gray-700"
                      )}
                    >
                      <Filter className="w-4 h-4 inline mr-2" />
                      {region}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* States Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing {filteredStates.length} of {stateData.length} states
                  {activeFilter !== 'All' && ` in ${activeFilter}`}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredStates.map((state, index) => (
                  <ScrollReveal key={state.id} delay={index * 0.1}>
                    <Link to={`/state/${state.id}`}>
                      <motionDiv.div
                        className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                        whileHover={{ y: -8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <LazyImage
                            src={state.bannerImage}
                            alt={state.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          
                          {/* Favorite Button */}
                          <button
                            onClick={(e) => handleFavoriteToggle(state.id, e)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-all duration-300 group shadow-lg"
                            disabled={!isAuthenticated}
                          >
                            <Heart 
                              className={cn(
                                "w-5 h-5 transition-colors duration-300",
                                isStateFavorite(state.id) 
                                  ? "text-red-500 fill-current" 
                                  : "text-gray-600 hover:text-red-500"
                              )} 
                            />
                          </button>
                          
                          <div className="absolute bottom-4 left-4 text-white">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm font-medium">{state.region}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                            {state.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                            {state.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {state.famousFor?.length > 0 && state.famousFor[0]}
                            </div>
                            <ArrowRight className="w-5 h-5 text-indigo-600 group-hover:translate-x-2 transition-transform duration-300" />
                          </div>
                        </div>
                      </motionDiv.div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>

              {filteredStates.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto mb-4" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                    No states found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your search criteria or filters.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AllStates;