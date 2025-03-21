
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ParallaxSection from '@/components/ui/ParallaxSection';
import { Card, CardContent } from '@/components/ui/card';
import { stateData } from '@/data/stateData';
import { MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AllStates = () => {
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

        {/* States Grid */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stateData.map((state, index) => (
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
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AllStates;
