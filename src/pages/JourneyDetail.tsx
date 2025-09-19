import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import JourneyTimeline from '@/components/journey/JourneyTimeline';
import JourneyActivities from '@/components/journey/JourneyActivities';
import CabBooking from '@/components/journey/CabBooking';
import { getJourneyById } from '@/data/journeys';
import { useSupabaseAuthContext } from '@/context/SupabaseAuthContext';
import JourneyViewer from '@/components/journey/JourneyViewer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Map, Navigation, Star, ArrowLeft, Clock, Activity, Route, Edit, Share2, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const JourneyDetail = () => {
  const { journeyId } = useParams<{ journeyId: string }>();
  const [journey, setJourney] = useState<any | null>(null);
  const { user } = useSupabaseAuthContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Load journey from predefined journeys
    if (journeyId) {
      const foundJourney = getJourneyById(parseInt(journeyId) || 0);
      if (foundJourney) {
        setJourney(foundJourney);
      }
    }
  }, [journeyId]);

  if (!journey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-gray-900 dark:to-slate-800">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Journey not found</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">The journey you're looking for doesn't exist.</p>
            <Link to="/">
              <Button className="mt-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBookJourney = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    navigate('/journey-planner', { 
      state: { 
        selectedDestination: journey.destination,
        selectedTitle: journey.title,
        selectedDuration: journey.duration
      } 
    });
  };

  const handleEditJourney = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    // TODO: Check if this is a user's custom journey
    const foundInUserTrips = false;

    if (foundInUserTrips) {
      navigate('/journey-planner', { 
        state: { 
          editMode: true,
          journeyData: journey
        } 
      });
    } else {
      toast({
        title: "Cannot Edit",
        description: "You can only edit your own custom journeys.",
        variant: "destructive"
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: journey.title,
          text: journey.description,
          url: window.location.href
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied",
          description: "Journey link copied to clipboard!",
        });
      } catch (error) {
        console.error('Copy failed:', error);
        toast({
          title: "Share Failed",
          description: "Unable to share or copy link.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-gray-900 dark:to-slate-800">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={journey.imageSrc} 
            alt={journey.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              to="/"
              className="inline-flex items-center text-white hover:text-gray-200 transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Journeys
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {journey.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              {journey.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{journey.destination}</span>
              </div>
              <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="w-5 h-5 mr-2" />
                <span>{journey.duration}</span>
              </div>
              <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="w-5 h-5 mr-2" />
                <span>{journey.rating}/5</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                onClick={handleBookJourney}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3"
              >
                <Navigation className="w-5 h-5 mr-2" />
                {user ? 'Customize This Journey' : 'Sign in to Book'}
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                onClick={handleShare}
                className="border-white text-white hover:bg-white hover:text-gray-800"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share Journey
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Journey Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {journey.timeline && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <JourneyTimeline journey={journey} />
                  </motion.div>
                )}
                
                {journey.activities && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <JourneyActivities journey={journey} />
                  </motion.div>
                )}

                {journey.itinerary && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <JourneyViewer journey={journey} />
                  </motion.div>
                )}
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <CabBooking journey={journey} />
                </motion.div>
                
                {/* Journey Details Card */}
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    Journey Details
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                      <span className="font-medium">{journey.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Destination:</span>
                      <span className="font-medium">{journey.destination}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Rating:</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < journey.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="ml-2 text-sm">({journey.rating}/5)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                    <Button 
                      onClick={handleBookJourney}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Start Planning
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JourneyDetail;