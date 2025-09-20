import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Calendar, Star, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getJourneyById } from '@/data/journeys';
import { useAuth } from '@/auth';
import { useToast } from '@/hooks/use-toast';
import { stateData } from '@/data/stateData';

const JourneyDetail = () => {
  const { journeyId } = useParams();
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [journey, setJourney] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (journeyId) {
      const foundJourney = getJourneyById(parseInt(journeyId));
      if (foundJourney) {
        setJourney(foundJourney);
      } else {
        // Try to find in user's trips (when backend is connected)
        // For now, show default journey or redirect
        const defaultJourney = getJourneyById(1);
        setJourney(defaultJourney);
      }
      setLoading(false);
    }
  }, [journeyId]);

  const handleShareJourney = () => {
    if (navigator.share) {
      navigator.share({
        title: `Journey to ${journey?.title}`,
        text: `Check out this amazing journey to ${journey?.title}!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Journey link copied to clipboard",
      });
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading journey details...</p>
          </div>
        </div>
      </>
    );
  }

  if (!journey) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Journey Not Found</h2>
            <p className="text-gray-400 mb-6">The journey you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/')} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={journey.image || 'https://images.unsplash.com/photo-1524230507669-5ff97982bb5e'}
            alt={journey.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => navigate(-1)}
                  className="mb-4 text-white hover:bg-white/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="secondary" className="bg-violet-600/80">
                    {journey.duration || '7 Days'}
                  </Badge>
                  <Badge variant="secondary" className="bg-indigo-600/80">
                    <Star className="w-3 h-3 mr-1" />
                    {journey.rating || '4.8'}
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {journey.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-gray-300">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    {journey.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    {journey.duration || '7 Days'}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Best Time: {journey.bestTime || 'Oct - Mar'}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-white/5 backdrop-blur-md border border-white/10">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">About This Journey</h2>
                    <p className="text-gray-300 leading-relaxed">
                      {journey.description || `Discover the magnificent beauty and rich cultural heritage of ${journey.location}. This carefully curated journey takes you through the most iconic destinations, hidden gems, and authentic experiences that define this incredible region.`}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="bg-white/5 backdrop-blur-md border border-white/10">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Journey Highlights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {journey.highlights?.map((highlight: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-gray-300">{highlight}</p>
                        </div>
                      )) || (
                        <>
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-gray-300">Explore iconic landmarks and monuments</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-gray-300">Experience authentic local cuisine</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-gray-300">Immerse in rich cultural traditions</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-gray-300">Discover hidden local gems</p>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="bg-white/5 backdrop-blur-md border border-white/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button
                        onClick={handleShareJourney}
                        variant="outline"
                        className="w-full border-violet-500/30 hover:bg-violet-500/20"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Journey
                      </Button>
                      
                      <Button
                        onClick={() => {
                          toast({
                            title: "Feature Coming Soon",
                            description: "Journey planning will be available soon"
                          });
                        }}
                        className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                      >
                        Plan This Journey
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="bg-white/5 backdrop-blur-md border border-white/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Journey Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-400">Duration</label>
                        <p className="text-white">{journey.duration || '7 Days'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-400">Best Season</label>
                        <p className="text-white">{journey.bestTime || 'October to March'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-400">Type</label>
                        <p className="text-white">{journey.type || 'Cultural & Heritage'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-400">Difficulty</label>
                        <p className="text-white">{journey.difficulty || 'Easy'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JourneyDetail;