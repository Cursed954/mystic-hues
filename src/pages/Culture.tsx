
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { stateData } from '@/data/stateData';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const Culture = () => {
  const [activeTab, setActiveTab] = useState<string>('artForms');
  
  // Extract all cultural data
  const artForms = stateData.flatMap(state => 
    state.artForms?.split(', ').map(art => ({
      name: art,
      stateName: state.name,
      stateId: state.id
    })) || []
  );
  
  const festivals = stateData.flatMap(state => 
    state.festivals?.list?.map(festival => ({
      ...festival,
      stateName: state.name,
      stateId: state.id
    })) || []
  );
  
  const heritageSites = stateData.flatMap(state => 
    state.heritage?.sites?.map(site => ({
      ...site,
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

        {/* Culture Tabs */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <ScrollReveal>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full flex mb-8 bg-transparent p-0 space-x-2 overflow-x-auto">
                  <TabsTrigger 
                    value="artForms"
                    className="px-6 py-3 data-[state=active]:bg-spice-50 data-[state=active]:text-spice-600 data-[state=active]:border-b-2 data-[state=active]:border-spice-500 data-[state=active]:shadow-none rounded-none"
                  >
                    Art Forms
                  </TabsTrigger>
                  <TabsTrigger 
                    value="festivals"
                    className="px-6 py-3 data-[state=active]:bg-spice-50 data-[state=active]:text-spice-600 data-[state=active]:border-b-2 data-[state=active]:border-spice-500 data-[state=active]:shadow-none rounded-none"
                  >
                    Festivals
                  </TabsTrigger>
                  <TabsTrigger 
                    value="heritage"
                    className="px-6 py-3 data-[state=active]:bg-spice-50 data-[state=active]:text-spice-600 data-[state=active]:border-b-2 data-[state=active]:border-spice-500 data-[state=active]:shadow-none rounded-none"
                  >
                    Heritage Sites
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="artForms" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {artForms.map((art, index) => (
                      <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-medium mb-3">{art.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin size={16} className="mr-1" />
                            <span>{art.stateName}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="festivals" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {festivals.map((festival, index) => (
                      <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="heritage" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {heritageSites.map((site, index) => (
                      <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-48">
                          <img 
                            src={site.image || "https://images.unsplash.com/photo-1599661046289-e31897d36a68"} 
                            alt={site.name}
                            className="w-full h-full object-cover"
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
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Culture;
