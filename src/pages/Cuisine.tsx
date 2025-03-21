
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Card, CardContent } from '@/components/ui/card';
import { stateData } from '@/data/stateData';
import { MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cuisine = () => {
  const [selectedDish, setSelectedDish] = useState<any | null>(null);

  // Extract all dishes from all states
  const allDishes = stateData.flatMap(state => 
    state.cuisine?.dishes?.map(dish => ({
      ...dish, 
      stateName: state.name,
      stateId: state.id
    })) || []
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative h-[40vh] flex items-center">
          <div 
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070)' }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Indian Cuisine</h1>
              <p className="text-white/90 max-w-2xl">
                Explore the rich tapestry of flavors that make up India's diverse and delectable culinary traditions.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Cuisine Grid */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allDishes.map((dish, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card 
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedDish(dish)}
                    >
                      <div className="h-48">
                        <img 
                          src={dish.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"} 
                          alt={dish.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-medium mb-2">{dish.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                          <MapPin size={16} className="mr-1" />
                          <span>{dish.stateName}</span>
                        </div>
                        <p className="line-clamp-3 text-foreground/80">
                          {dish.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* Dish Detail Modal */}
      <AnimatePresence>
        {selectedDish && (
          <motion.div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-background rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="relative h-60">
                <img 
                  src={selectedDish.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"} 
                  alt={selectedDish.name}
                  className="w-full h-full object-cover"
                />
                <button 
                  className="absolute top-4 right-4 bg-black/50 rounded-full p-2 text-white"
                  onClick={() => setSelectedDish(null)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-medium mb-2">{selectedDish.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">From {selectedDish.stateName}</p>
                <p className="mb-6">{selectedDish.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-mystic-50 p-3 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Cuisine Type</h4>
                    <p className="text-sm">{stateData.find(s => s.id === selectedDish.stateId)?.cuisineType || 'Traditional'}</p>
                  </div>
                  <div className="bg-mystic-50 p-3 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Region</h4>
                    <p className="text-sm">{stateData.find(s => s.id === selectedDish.stateId)?.region || 'India'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Cuisine;
