
// Discover Indian States
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../ui/ScrollReveal';
import ParallaxSection from '../ui/ParallaxSection';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Users, Calendar, ArrowRight, Globe, Filter } from 'lucide-react';
import { stateData } from '@/data/stateData';
import { regions } from '@/data/cultural';

const States: React.FC = () => {
  // States data
  const [activeTab, setActiveTab] = useState<string>('');
  const [activeRegionFilter, setActiveRegionFilter] = useState<string>('all');
  const [filteredStates, setFilteredStates] = useState(stateData.slice(0, 5));

  // Function to get region name for a state
  const getRegionName = (stateId: string): string => {
    for (const region of regions) {
      if (region.states.includes(stateId)) {
        return region.name;
      }
    }
    return "";
  };

  // Filter states by region
  useEffect(() => {
    let filtered = stateData;
    
    if (activeRegionFilter !== 'all') {
      const region = regions.find(r => r.id === activeRegionFilter);
      if (region) {
        filtered = stateData.filter(state => region.states.includes(state.id));
      }
    }
    
    // Limit to 5 states
    const limitedStates = filtered.slice(0, 5);
    setFilteredStates(limitedStates);
    
    // Set active tab to first state in filtered list if not already set or if current state isn't in filtered list
    if (!activeTab || !limitedStates.find(state => state.id === activeTab)) {
      setActiveTab(limitedStates[0]?.id || '');
    }
  }, [activeRegionFilter]);

  return (
    <section id="states" className="py-24 px-6 relative">
      {/* Translucent Background Layer */}
      <div className="absolute inset-0 bg-white/70 dark:bg-black/50 backdrop-blur-sm"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="subtitle mb-3">Explore India</p>
            <h2 className="section-title after:left-1/2 after:-translate-x-1/2">
              Discover Indian States
            </h2>
            <p className="mt-8 max-w-2xl mx-auto text-foreground/70">
              India's diverse states offer unique cultural experiences, from royal palaces to serene backwaters,
              each with its own distinct heritage, cuisine, and traditions.
            </p>
          </div>
        </ScrollReveal>

        {/* Region filter */}
        <ScrollReveal delay={1}>
          <div className="mb-8 bg-background/80 p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-spice-500" />
              <span className="text-sm font-medium">Filter by Region:</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2">
              <button
                className={`p-2 rounded-md text-sm font-medium transition-colors ${activeRegionFilter === 'all' 
                  ? 'bg-spice-500 text-white' 
                  : 'bg-secondary/50 hover:bg-secondary'}`}
                onClick={() => setActiveRegionFilter('all')}
              >
                All Regions
              </button>
              {regions.map(region => (
                <button
                  key={region.id}
                  className={`p-2 rounded-md text-sm font-medium transition-colors ${activeRegionFilter === region.id 
                    ? 'bg-spice-500 text-white' 
                    : 'bg-secondary/50 hover:bg-secondary'}`}
                  onClick={() => setActiveRegionFilter(region.id)}
                >
                  {region.name}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* State Tabs - Limited to 5 */}
        <ScrollReveal delay={2}>
          {filteredStates.length > 0 ? (
            <Tabs defaultValue={filteredStates[0]?.id} value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full flex mb-8 bg-transparent p-0 space-x-2 overflow-x-auto">
                {filteredStates.map((state) => (
                  <TabsTrigger 
                    key={state.id} 
                    value={state.id}
                    className="px-6 py-3 data-[state=active]:bg-spice-50 data-[state=active]:text-spice-600 data-[state=active]:border-b-2 data-[state=active]:border-spice-500 data-[state=active]:shadow-none rounded-none"
                  >
                    {state.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {filteredStates.map((state) => (
                <TabsContent key={state.id} value={state.id} className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3">
                      <ParallaxSection speed={0.05} className="h-full">
                        <div className="rounded-xl overflow-hidden h-full shadow-md">
                          <img 
                            src={state.bannerImage} 
                            alt={state.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </ParallaxSection>
                    </div>
                    
                    <div className="lg:col-span-2 space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center text-2xl">
                            <MapPin className="mr-2 text-spice-500" size={20} />
                            {state.name}
                          </CardTitle>
                          <CardDescription>Capital: {state.capital}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Users size={16} className="mr-1" />
                              {state.population}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar size={16} className="mr-1" />
                              {state.language}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Globe size={16} className="mr-1" />
                              {state.region || getRegionName(state.id)}
                            </div>
                          </div>
                          
                          <p className="text-foreground/80 leading-relaxed">
                            {state.description}
                          </p>
                          
                          <div className="pt-2">
                            <p className="font-medium mb-2">Famous For:</p>
                            <div className="flex flex-wrap gap-2">
                              {state.famousFor.map((item, index) => (
                                <span 
                                  key={index} 
                                  className="px-3 py-1 bg-mystic-100 text-foreground/70 rounded-full text-sm text-black"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Link 
                        to={`/state/${state.id}`} 
                        className="btn-primary w-full justify-center inline-flex items-center "
                      >
                        Explore {state.name} <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="text-center py-8">
              <p className="text-foreground/80">No states found for the selected region.</p>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default States;
