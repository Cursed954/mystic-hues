import React, { memo, useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, MapPin, Calendar, Users, Navigation, ArrowLeft, ArrowRight } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../ui/SectionHeader';
import { Button } from '../ui/button';
import { journeys } from '@/data/journeys';
import HorizontalScroll from '../ui/horizontal-scroll';
import useMobile from '@/hooks/use-mobile';
import { useSupabaseAuthContext } from '@/context/SupabaseAuthContext';
import { useChatbot } from '@/components/chatbot/ChatbotProvider';

const JourneyCard = memo(({ journey, theme, starColor, textAccentColor }: { 
  journey: any; 
  theme: string; 
  starColor: string; 
  textAccentColor: string; 
}) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/journey/${journey.id}`);
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/journey-planner', { 
      state: { 
        selectedDestination: journey.destination,
        selectedTitle: journey.title 
      } 
    });
  };

  return (
    <motion.div
      className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-200 dark:border-gray-700 flex-shrink-0 w-80"
      whileHover={{ 
        scale: 1.02,
        boxShadow: theme === 'dark' 
          ? "0 25px 50px -12px rgba(138, 43, 226, 0.25)" 
          : "0 25px 50px -12px rgba(75, 0, 130, 0.25)"
      }}
      onClick={handleCardClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={journey.imageSrc}
          alt={journey.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="absolute top-4 left-4">
          <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
            {journey.duration}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
          {journey.title}
        </h3>
        
        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
          <MapPin className="w-4 h-4 mr-2" style={{ color: textAccentColor }} />
          <span className="text-sm">{journey.destination}</span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {journey.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-4 h-4 mr-1" 
                  fill={i < journey.rating ? starColor : "transparent"} 
                  style={{ color: starColor }} 
                />
              ))}
            </div>
          </div>
          
          <Button 
            onClick={handleBookClick}
            size="sm" 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0"
          >
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
});

JourneyCard.displayName = 'JourneyCard';

const Experience: React.FC = () => {
  const { theme } = useTheme();
  const isMobile = useMobile();
  const { user } = useSupabaseAuthContext();
  const navigate = useNavigate();
  const [allJourneys, setAllJourneys] = useState<any[]>([]);
  const { openChatbot } = useChatbot();
  
  const starColor = theme === 'dark' ? "#e94cff" : "#ff7e11";
  const textAccentColor = theme === 'dark' ? "#53a6ff" : "#ff7e11";
  
  useEffect(() => {
    // Load default journeys for now
    setAllJourneys(journeys.slice(0, 6));
  }, [user]);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handlePlanCustomJourney = () => {
    if (user) {
      navigate('/journey-planner');
    } else {
      navigate('/login');
    }
  };

  const handleAIAssistance = () => {
    openChatbot();
  };

  return (
    <section 
      id="experiences" 
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionHeader 
            title="Curated Experiences"
            subtitle="Discover handpicked journeys through India's most enchanting destinations"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16"
        >
          <HorizontalScroll>
            {allJourneys.map((journey, index) => (
              <motion.div
                key={journey.id}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <JourneyCard 
                  journey={journey} 
                  theme={theme} 
                  starColor={starColor}
                  textAccentColor={textAccentColor}
                />
              </motion.div>
            ))}
          </HorizontalScroll>
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handlePlanCustomJourney}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Navigation className="w-5 h-5" />
              {user ? 'Plan Your Journey' : 'Sign in to Plan Journey'}
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleAIAssistance}
              className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
            >
              <Users className="w-5 h-5" />
              Get AI Assistance
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;