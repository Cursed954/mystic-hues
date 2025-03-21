
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Card, CardContent } from '@/components/ui/card';
import { stateData } from '@/data/stateData';
import { MapPin, ArrowRight, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

// Define regions for filtering
const regions = [
  "All",
  "North",
  "South", 
  "East",
  "West",
  "Central",
  "Northeast"
];

const AllStates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredStates, setFilteredStates] = useState(stateData);

  useEffect(() => {
    // Filter states based on search term and active filter
    const results = stateData.filter(state => {
      const matchesSearch = state.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           state.capital.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           state.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRegion = activeFilter === 'All' || state.region === activeFilter;
      
      return matchesSearch && matchesRegion;
    });
    
    setFilteredStates(results);
  }, [searchTerm, activeFilter]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative h-[40vh] flex items-center">
          <div 
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1524613032530-449a5d94c285?q=80&w=2070)' }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Explore Indian States</h1>
              <p className="text-white/90 max-w-2xl">
                Discover the rich tapestry of India's diverse states, each with its unique culture, heritage, cuisine, and traditions.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 px-6 bg-secondary dark:bg-secondary">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" />
                <input
                  type="text"
                  placeholder="Search states..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-box pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-foreground/70" />
                <span className="text-sm font-medium text-foreground/70">Filter by region:</span>
              </div>
              
              <div className="filter-container">
                {regions.map(region => (
                  <button
                    key={region}
                    className={`filter-tag ${activeFilter === region ? 'active' : ''}`}
                    onClick={() => setActiveFilter(region)}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* States Grid */}
        <section className="py-12 px-6">
          <div className="container mx-auto">
            <ScrollReveal>
              {filteredStates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredStates.map((state, index) => (
                    <motion.div
                      key={state.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="h-full"
                    >
                      <Link to={`/state/${state.id}`} className="block h-full">
                        <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                          <div className="relative h-48">
                            <img 
                              src={state.bannerImage} 
                              alt={state.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                              <h3 className="text-white text-xl font-medium">{state.name}</h3>
                            </div>
                          </div>
                          <CardContent className="p-6">
                            <div className="flex items-center text-sm text-muted-foreground mb-4">
                              <MapPin size={16} className="mr-1" />
                              <span>Capital: {state.capital}</span>
                            </div>
                            <p className="line-clamp-3 text-foreground/80 mb-4">
                              {state.description}
                            </p>
                            <div className="mt-auto flex items-center text-spice-500 font-medium">
                              Explore <ArrowRight size={16} className="ml-1" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-medium mb-2">No states found</h3>
                  <p className="text-foreground/70">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AllStates;
