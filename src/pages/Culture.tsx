
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { stateData } from '@/data/stateData';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Search, Filter, Image, X, Clock, History, Info, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define types for our cultural elements
type ArtForm = {
  name: string;
  stateName: string;
  stateId: string;
  image: string;
  information?: string;
  region?: string;
  history?: {
    started?: string;
    goldenPeriod?: string;
    currentStatus?: string;
  };
  additionalImages?: string[];
};

type Festival = {
  name: string;
  timing: string;
  description: string;
  stateName: string;
  stateId: string;
  image: string;
};

type HeritageSite = {
  name: string;
  location: string;
  description: string;
  stateName: string;
  stateId: string;
  image: string;
};

const Culture = () => {
  const [activeTab, setActiveTab] = useState<string>('artForms');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStateFilter, setActiveStateFilter] = useState('All');
  const [selectedArtForm, setSelectedArtForm] = useState<ArtForm | null>(null);
  
  // Extract all cultural data with enhanced art form information
  const artForms: ArtForm[] = stateData.flatMap(state => 
    state.artForms?.split(', ').map(art => ({
      name: art,
      stateName: state.name,
      stateId: state.id,
      image: "https://images.unsplash.com/photo-1576487236230-eaa4afe68192?q=80&w=1170",
      information: `${art} is a traditional art form from ${state.name}, representing the rich cultural heritage of the region.`,
      region: state.region,
      history: {
        started: "Ancient times",
        goldenPeriod: "17th to 19th century",
        currentStatus: "Practiced by dedicated artists and being preserved through cultural programs"
      },
      additionalImages: [
        "https://images.unsplash.com/photo-1594026112334-d8040bd05749?q=80&w=1170",
        "https://images.unsplash.com/photo-1540122995631-7c74c46c0b8f?q=80&w=1170",
        "https://images.unsplash.com/photo-1584806749948-697891c67821?q=80&w=1170"
      ]
    })) || []
  );
  
  const festivals: Festival[] = stateData.flatMap(state => 
    state.festivals?.list?.map(festival => ({
      ...festival,
      stateName: state.name,
      stateId: state.id,
      image: "https://images.unsplash.com/photo-1594815101424-0c644c8c63c6?q=80&w=1170"
    })) || []
  );
  
  const heritageSites: HeritageSite[] = stateData.flatMap(state => 
    state.heritage?.sites?.map(site => ({
      ...site,
      stateName: state.name,
      stateId: state.id,
      image: site.image || "https://images.unsplash.com/photo-1599661046289-e31897d36a68?q=80&w=1170"
    })) || []
  );

  // Get unique states from the data
  const states = ['All', ...new Set(stateData.map(state => state.name))];

  // Filtered data based on search term and active state filter
  const [filteredArtForms, setFilteredArtForms] = useState(artForms);
  const [filteredFestivals, setFilteredFestivals] = useState(festivals);
  const [filteredHeritageSites, setFilteredHeritageSites] = useState(heritageSites);

  useEffect(() => {
    // Filter art forms
    const filteredArts = artForms.filter(art => {
      const matchesSearch = art.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           art.stateName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesState = activeStateFilter === 'All' || art.stateName === activeStateFilter;
      return matchesSearch && matchesState;
    });
    setFilteredArtForms(filteredArts);

    // Filter festivals
    const filteredFests = festivals.filter(festival => {
      const matchesSearch = festival.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           festival.stateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (festival.description && festival.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesState = activeStateFilter === 'All' || festival.stateName === activeStateFilter;
      return matchesSearch && matchesState;
    });
    setFilteredFestivals(filteredFests);

    // Filter heritage sites
    const filteredSites = heritageSites.filter(site => {
      const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          site.stateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (site.description && site.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesState = activeStateFilter === 'All' || site.stateName === activeStateFilter;
      return matchesSearch && matchesState;
    });
    setFilteredHeritageSites(filteredSites);
  }, [searchTerm, activeStateFilter, activeTab]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative h-[40vh] flex items-center">
          <div 
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1576487236230-eaa4afe68192?q=80&w=2070)' }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Indian Culture</h1>
              <p className="text-white/90 max-w-2xl">
                Explore the rich tapestry of India's diverse cultural heritage, from ancient arts and traditions to modern-day celebrations.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 px-6 bg-secondary dark:bg-secondary/20">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" />
                <input
                  type="text"
                  placeholder="Search cultural elements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-box pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-foreground/70" />
                <span className="text-sm font-medium text-foreground/70">Filter by state:</span>
              </div>
              
              <div className="filter-container">
                {states.map(state => (
                  <button
                    key={state}
                    className={`filter-tag ${activeStateFilter === state ? 'active' : ''}`}
                    onClick={() => setActiveStateFilter(state)}
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Culture Tabs */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <ScrollReveal>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full flex mb-8 bg-transparent p-0 space-x-2 overflow-x-auto">
                  <TabsTrigger 
                    value="artForms"
                    className="px-6 py-3 data-[state=active]:bg-spice-50 dark:data-[state=active]:bg-spice-900/30 data-[state=active]:text-spice-600 dark:data-[state=active]:text-spice-400 data-[state=active]:border-b-2 data-[state=active]:border-spice-500 data-[state=active]:shadow-none rounded-none"
                  >
                    Art Forms
                  </TabsTrigger>
                  <TabsTrigger 
                    value="festivals"
                    className="px-6 py-3 data-[state=active]:bg-spice-50 dark:data-[state=active]:bg-spice-900/30 data-[state=active]:text-spice-600 dark:data-[state=active]:text-spice-400 data-[state=active]:border-b-2 data-[state=active]:border-spice-500 data-[state=active]:shadow-none rounded-none"
                  >
                    Festivals
                  </TabsTrigger>
                  <TabsTrigger 
                    value="heritage"
                    className="px-6 py-3 data-[state=active]:bg-spice-50 dark:data-[state=active]:bg-spice-900/30 data-[state=active]:text-spice-600 dark:data-[state=active]:text-spice-400 data-[state=active]:border-b-2 data-[state=active]:border-spice-500 data-[state=active]:shadow-none rounded-none"
                  >
                    Heritage Sites
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="artForms" className="mt-0">
                  {filteredArtForms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {filteredArtForms.map((art, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Card 
                            className="overflow-hidden hover:shadow-lg transition-shadow h-full cursor-pointer"
                            onClick={() => setSelectedArtForm(art)}
                          >
                            <div className="h-48 overflow-hidden">
                              <img 
                                src={art.image} 
                                alt={art.name}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <CardContent className="p-6">
                              <h3 className="text-xl font-medium mb-3">{art.name}</h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin size={16} className="mr-1" />
                                <span>{art.stateName}</span>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Image className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                      <h3 className="text-xl font-medium mb-2">No art forms found</h3>
                      <p className="text-muted-foreground">Try adjusting your search or filter</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="festivals" className="mt-0">
                  {filteredFestivals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredFestivals.map((festival, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                            <div className="h-48 overflow-hidden">
                              <img 
                                src={festival.image} 
                                alt={festival.name}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <CardContent className="p-6">
                              <h3 className="text-xl font-medium mb-2">{festival.name}</h3>
                              <div className="flex items-center text-sm text-muted-foreground mb-3">
                                <MapPin size={16} className="mr-1" />
                                <span>{festival.stateName}</span>
                              </div>
                              <p className="text-sm font-medium text-foreground/70 mb-3">{festival.timing}</p>
                              <p className="text-foreground/80">{festival.description}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Image className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                      <h3 className="text-xl font-medium mb-2">No festivals found</h3>
                      <p className="text-muted-foreground">Try adjusting your search or filter</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="heritage" className="mt-0">
                  {filteredHeritageSites.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredHeritageSites.map((site, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                            <div className="h-48 overflow-hidden">
                              <img 
                                src={site.image} 
                                alt={site.name}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <CardContent className="p-6">
                              <h3 className="text-xl font-medium mb-2">{site.name}</h3>
                              <div className="flex items-center text-sm text-muted-foreground mb-3">
                                <MapPin size={16} className="mr-1" />
                                <span>{site.location}, {site.stateName}</span>
                              </div>
                              <p className="text-foreground/80">{site.description}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Image className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                      <h3 className="text-xl font-medium mb-2">No heritage sites found</h3>
                      <p className="text-muted-foreground">Try adjusting your search or filter</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* Art Form Detail Modal */}
      <AnimatePresence>
        {selectedArtForm && (
          <motion.div 
            className="fixed inset-0 bg-black/70 dark:bg-black/80 z-50 flex items-center justify-center p-4 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArtForm(null)}
          >
            <motion.div 
              className="bg-background rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden">
                <img 
                  src={selectedArtForm.image || "https://images.unsplash.com/photo-1576487236230-eaa4afe68192?q=80&w=1170"}
                  alt={selectedArtForm.name}
                  className="w-full h-full object-cover"
                />
                <button 
                  className="absolute top-4 right-4 bg-black/50 rounded-full p-2 text-white"
                  onClick={() => setSelectedArtForm(null)}
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="text-3xl font-serif text-white">{selectedArtForm.name}</h2>
                  <p className="text-white/80 flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {selectedArtForm.stateName}
                  </p>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-secondary/50 p-4 rounded-lg flex flex-col items-center justify-center">
                    <Globe className="text-spice-500 mb-2" size={24} />
                    <h3 className="text-lg font-medium">Region</h3>
                    <p className="text-center">{selectedArtForm.region}</p>
                  </div>
                  
                  <div className="bg-secondary/50 p-4 rounded-lg flex flex-col items-center justify-center">
                    <Clock className="text-spice-500 mb-2" size={24} />
                    <h3 className="text-lg font-medium">Started</h3>
                    <p className="text-center">{selectedArtForm.history?.started || "Ancient times"}</p>
                  </div>
                  
                  <div className="bg-secondary/50 p-4 rounded-lg flex flex-col items-center justify-center">
                    <History className="text-spice-500 mb-2" size={24} />
                    <h3 className="text-lg font-medium">Golden Period</h3>
                    <p className="text-center">{selectedArtForm.history?.goldenPeriod || "17th-19th century"}</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    <Info className="mr-2 text-spice-500" size={20} />
                    Information
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    {selectedArtForm.information || `${selectedArtForm.name} is a traditional art form from ${selectedArtForm.stateName}, representing the rich cultural heritage of the region.`}
                  </p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-4">Current Status</h3>
                  <p className="text-foreground/80 leading-relaxed bg-secondary/30 p-4 rounded-lg">
                    {selectedArtForm.history?.currentStatus || "Being preserved through cultural programs and practiced by dedicated artists."}
                  </p>
                </div>
                
                {selectedArtForm.additionalImages && selectedArtForm.additionalImages.length > 0 && (
                  <div>
                    <h3 className="text-xl font-medium mb-4">Gallery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedArtForm.additionalImages.map((img, idx) => (
                        <div key={idx} className="rounded-lg overflow-hidden h-48">
                          <img 
                            src={img} 
                            alt={`${selectedArtForm.name} - image ${idx + 1}`} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Culture;
