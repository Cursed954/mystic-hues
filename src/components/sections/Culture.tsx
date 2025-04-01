import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../ui/ScrollReveal';
import ParallaxSection from '../ui/ParallaxSection';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Users, Calendar, ArrowRight, Globe, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { culturalData } from '@/data/culturalData';
import { regions, getStateRegion } from '@/data/cultural';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const Culture: React.FC = () => {
  // Cultural data
  const [activeTab, setActiveTab] = useState<string>('');
  const [activeRegionFilter, setActiveRegionFilter] = useState<string>('all');
  const [filteredItems, setFilteredItems] = useState(culturalData.slice(0, 5));
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Function to get region name for a cultural item
  const getRegionName = (itemId: string): string => {
    const regionId = getStateRegion(itemId);
    const region = regions.find(r => r.id === regionId);
    return region ? region.name : "";
  };

  // Filter cultural items by region
  useEffect(() => {
    let filtered = [...culturalData];
    
    if (activeRegionFilter !== 'all') {
      const region = regions.find(r => r.id === activeRegionFilter);
      if (region) {
        filtered = culturalData.filter(item => {
          const itemStateId = item.id.split('-')[0];
          return region.states.includes(itemStateId);
        });
      }
    }
    
    // Limit to 5 items
    const limitedItems = filtered.slice(0, 5);
    setFilteredItems(limitedItems);
    
    // Set active tab to first item in filtered list if not already set or if current item isn't in filtered list
    if (!activeTab || !limitedItems.find(item => item.id === activeTab)) {
      setActiveTab(limitedItems[0]?.id || '');
    }
  }, [activeRegionFilter, activeTab]);

  return (
    <section id="culture" className="py-24 px-6 relative">
      {/* Translucent Background Layer */}
      <div className="absolute inset-12 rounded-3xl bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/50 dark:border-white/10 z-0"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="subtitle mb-3">Explore Culture</p>
            <h2 className="section-title after:left-1/2 after:-translate-x-1/2">
              Discover Indian Culture
            </h2>
            <p className="mt-8 max-w-2xl mx-auto text-foreground/70">
              India's diverse culture offers unique experiences, from traditional dances to vibrant festivals,
              each with its own distinct heritage, cuisine, and traditions.
            </p>
          </div>
        </ScrollReveal>

        {/* Collapsible Region filter */}
        <ScrollReveal delay={1}>
          <Collapsible 
            open={isFilterOpen} 
            onOpenChange={setIsFilterOpen}
            className="mb-8 bg-background/80 rounded-lg shadow-sm overflow-hidden border border-border/50"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-spice-500" />
                <span className="text-sm font-medium">Filter by Region</span>
              </div>
              {isFilterOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 border-t border-border/50">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2 pt-4">
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
            </CollapsibleContent>
          </Collapsible>
        </ScrollReveal>

        {/* Cultural Tabs - Limited to 5 */}
        <ScrollReveal delay={2}>
          {filteredItems.length > 0 ? (
            <Tabs defaultValue={filteredItems[0]?.id} value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full flex mb-8 bg-transparent p-0 space-x-2 overflow-x-auto">
                {filteredItems.map((item) => (
                  <TabsTrigger 
                    key={item.id} 
                    value={item.id}
                    className="px-6 py-3 data-[state=active]:bg-spice-50 data-[state=active]:text-spice-600 data-[state=active]:border-b-2 data-[state=active]:border-spice-500 data-[state=active]:shadow-none rounded-none"
                  >
                    {item.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {filteredItems.map((item) => (
                <TabsContent key={item.id} value={item.id} className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3">
                      <ParallaxSection speed={0.05} className="h-full">
                        <div className="rounded-xl overflow-hidden h-full shadow-md">
                          <img 
                            src={item.bannerImage} 
                            alt={item.name} 
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
                            {item.name}
                          </CardTitle>
                          <CardDescription>Region: {getRegionName(item.id)}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Users size={16} className="mr-1" />
                              {item.population}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar size={16} className="mr-1" />
                              {item.language}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Globe size={16} className="mr-1" />
                              {getRegionName(item.id)}
                            </div>
                          </div>
                          
                          <p className="text-foreground/80 leading-relaxed">
                            {item.description}
                          </p>
                          
                          <div className="pt-2">
                            <p className="font-medium mb-2">Famous For:</p>
                            <div className="flex flex-wrap gap-2">
                              {item.famousFor.map((item, index) => (
                                <span 
                                  key={index} 
                                  className="px-3 py-1 bg-white/40 dark:bg-white/10 backdrop-blur-sm text-foreground/80 rounded-full text-sm"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Link 
                        to={`/culture/${item.id}`} 
                        className="btn-primary w-full justify-center inline-flex items-center "
                      >
                        Explore {item.name} <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="text-center py-8">
              <p className="text-foreground/80">No cultural items found for the selected region.</p>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Culture;
