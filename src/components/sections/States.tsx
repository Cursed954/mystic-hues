
import React, { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import ParallaxSection from '../ui/ParallaxSection';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Users, Calendar } from 'lucide-react';

type StateInfo = {
  id: string;
  name: string;
  capital: string;
  population: string;
  language: string;
  description: string;
  famousFor: string[];
  imageUrl: string;
};

const States: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('rajasthan');

  const states: StateInfo[] = [
    {
      id: 'rajasthan',
      name: 'Rajasthan',
      capital: 'Jaipur',
      population: '68 million',
      language: 'Rajasthani, Hindi',
      description: 'Rajasthan, the "Land of Kings," is India\'s largest state by area. Known for its majestic forts, ornate palaces, and vibrant cultural heritage, it offers a glimpse into India\'s royal past. The state\'s colorful festivals, traditional arts, and vast Thar Desert make it a visual feast for travelers.',
      famousFor: ['Jaipur Pink City', 'Udaipur Lake Palace', 'Jaisalmer Fort', 'Pushkar Camel Fair', 'Desert Safaris'],
      imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897d36a68?q=80&w=2070',
    },
    {
      id: 'kerala',
      name: 'Kerala',
      capital: 'Thiruvananthapuram',
      population: '35 million',
      language: 'Malayalam',
      description: 'Kerala, known as "God\'s Own Country," is famous for its serene backwaters, lush green landscapes, and pristine beaches. The state boasts a unique blend of cultural heritage, Ayurvedic traditions, and ecological diversity. With its network of canals, mountain ranges, and wildlife sanctuaries, Kerala offers a refreshing tropical experience.',
      famousFor: ['Alleppey Backwaters', 'Munnar Tea Gardens', 'Kovalam Beach', 'Kathakali Dance', 'Ayurvedic Treatments'],
      imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070',
    },
    {
      id: 'tamil-nadu',
      name: 'Tamil Nadu',
      capital: 'Chennai',
      population: '72 million',
      language: 'Tamil',
      description: 'Tamil Nadu, with its ancient Dravidian culture, is home to magnificent temples, classical music, and traditional dance forms. The state\'s rich history dates back thousands of years, reflected in its UNESCO World Heritage temples and vibrant cultural practices. From coastal towns to hills, Tamil Nadu offers diverse experiences.',
      famousFor: ['Meenakshi Temple', 'Ooty Hill Station', 'Marina Beach', 'Bharatanatyam Dance', 'Chettinad Cuisine'],
      imageUrl: 'https://images.unsplash.com/photo-1616843413587-9e3a37f7bbd8?q=80&w=2070',
    },
    {
      id: 'himachal',
      name: 'Himachal Pradesh',
      capital: 'Shimla',
      population: '7 million',
      language: 'Hindi, Pahari',
      description: 'Himachal Pradesh, nestled in the western Himalayas, is renowned for its breathtaking mountain landscapes, adventure opportunities, and peaceful hill stations. The state offers a perfect blend of natural beauty and cultural heritage, with ancient temples and monasteries dotting its valleys and mountains.',
      famousFor: ['Shimla Hill Station', 'Manali Adventures', 'Dharamshala & McLeod Ganj', 'Apple Orchards', 'Himalayan Treks'],
      imageUrl: 'https://images.unsplash.com/photo-1502310942044-dc746b92eebc?q=80&w=1943',
    },
  ];

  return (
    <section id="states" className="py-24 px-6">
      <div className="container mx-auto">
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

        {/* State Tabs */}
        <ScrollReveal delay={2}>
          <Tabs defaultValue="rajasthan" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full flex mb-8 bg-transparent p-0 space-x-2 overflow-x-auto">
              {states.map((state) => (
                <TabsTrigger 
                  key={state.id} 
                  value={state.id}
                  className="px-6 py-3 data-[state=active]:bg-spice-50 data-[state=active]:text-spice-600 data-[state=active]:border-b-2 data-[state=active]:border-spice-500 data-[state=active]:shadow-none rounded-none"
                >
                  {state.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {states.map((state) => (
              <TabsContent key={state.id} value={state.id} className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  <div className="lg:col-span-3">
                    <ParallaxSection speed={0.05} className="h-full">
                      <div className="rounded-xl overflow-hidden h-full shadow-md">
                        <img 
                          src={state.imageUrl} 
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
                        <div className="flex space-x-4">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users size={16} className="mr-1" />
                            {state.population}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar size={16} className="mr-1" />
                            {state.language}
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
                                className="px-3 py-1 bg-mystic-100 text-foreground/70 rounded-full text-sm"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <a 
                      href="#virtual-tours" 
                      className="btn-primary w-full justify-center inline-flex"
                    >
                      Explore Virtual Tours
                    </a>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default States;
