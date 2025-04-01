
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Palette, Music, Globe, Book } from 'lucide-react';
import { regions } from '@/data/cultural/regions';
import { artForms } from '@/data/cultural/artForms';
import { festivals } from '@/data/cultural/festivals';
import { heritageSites } from '@/data/cultural/heritageSites';
import SectionHeader from '@/components/ui/SectionHeader';

const Culture = () => {
  const [filter, setFilter] = useState<'all' | 'north' | 'south' | 'east' | 'west' | 'central'>('all');
  const [category, setCategory] = useState<'regions' | 'artforms' | 'festivals' | 'heritage'>('regions');
  
  const categoryData = {
    regions: regions,
    artforms: artForms,
    festivals: festivals,
    heritage: heritageSites
  };

  const filteredData = category === 'regions' 
    ? filter === 'all' 
      ? regions 
      : regions.filter(region => region.location === filter)
    : categoryData[category];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <SectionHeader 
          subtitle="Discover the soul of India"
          title="Cultural Heritage"
          description="Immerse yourself in a land where every ritual, dance, and craft tells a story thousands of years in the making."
        />

        {/* Category Tabs - Horizontal scrolling on mobile */}
        <div className="mt-8 flex space-x-4 overflow-x-auto pb-2 scrollbar-none">
          <CategoryTab 
            icon={<Globe className="w-5 h-5" />}
            title="Regions"
            active={category === 'regions'}
            onClick={() => setCategory('regions')}
          />
          <CategoryTab 
            icon={<Palette className="w-5 h-5" />}
            title="Art Forms"
            active={category === 'artforms'}
            onClick={() => setCategory('artforms')}
          />
          <CategoryTab 
            icon={<Music className="w-5 h-5" />}
            title="Festivals"
            active={category === 'festivals'}
            onClick={() => setCategory('festivals')}
          />
          <CategoryTab 
            icon={<Book className="w-5 h-5" />}
            title="Heritage Sites"
            active={category === 'heritage'}
            onClick={() => setCategory('heritage')}
          />
        </div>

        {/* Region Filters - Only show when category is regions */}
        {category === 'regions' && (
          <div className="mt-6 flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
            <FilterButton 
              label="All Regions" 
              active={filter === 'all'} 
              onClick={() => setFilter('all')} 
            />
            <FilterButton 
              label="North India" 
              active={filter === 'north'} 
              onClick={() => setFilter('north')} 
            />
            <FilterButton 
              label="South India" 
              active={filter === 'south'} 
              onClick={() => setFilter('south')} 
            />
            <FilterButton 
              label="East India" 
              active={filter === 'east'} 
              onClick={() => setFilter('east')} 
            />
            <FilterButton 
              label="West India" 
              active={filter === 'west'} 
              onClick={() => setFilter('west')} 
            />
            <FilterButton 
              label="Central India" 
              active={filter === 'central'} 
              onClick={() => setFilter('central')} 
            />
          </div>
        )}

        {/* Grid Layout - Horizontal scroll on mobile */}
        <div className="mt-8 mobile-grid-scroll">
          {filteredData.map((item) => (
            <div key={item.id} className="card-scroll">
              <motion.div
                className="h-full rounded-xl overflow-hidden shadow-lg"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-64 object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-serif font-medium">{item.name}</h3>
                    <p className="text-sm text-white/90 mt-1">{item.description}</p>
                    
                    {/* Associated States */}
                    {item.states && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.states.slice(0, 3).map((state, index) => (
                          <span 
                            key={index}
                            className="text-xs px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full"
                          >
                            {state}
                          </span>
                        ))}
                        {item.states.length > 3 && (
                          <span className="text-xs px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full">
                            +{item.states.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

// Helper components
const CategoryTab = ({ icon, title, active, onClick }: { 
  icon: React.ReactNode; 
  title: string; 
  active: boolean; 
  onClick: () => void 
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all whitespace-nowrap ${
      active 
        ? 'bg-spice-500 text-white shadow-md shadow-spice-500/20' 
        : 'bg-secondary hover:bg-secondary/80 text-foreground'
    }`}
  >
    {icon}
    <span className="font-medium">{title}</span>
  </button>
);

const FilterButton = ({ label, active, onClick }: { 
  label: string; 
  active: boolean; 
  onClick: () => void 
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
      active 
        ? 'bg-spice-500 text-white' 
        : 'bg-secondary/70 hover:bg-secondary text-foreground'
    }`}
  >
    {label}
  </button>
);

export default Culture;
