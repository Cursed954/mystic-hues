// Our Signature Journeys

import React from 'react';
import { Calendar, Map, Star, ArrowRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import FeatureCard from '../ui/FeatureCard';
import ScrollReveal from '../ui/ScrollReveal';
import { motion } from 'framer-motion';
import { useTheme } from '../theme/ThemeProvider';

type ExperienceType = {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  duration: string;
  location: string;
  rating: number;
};

const Experience: React.FC = () => {
  const { theme } = useTheme();
  
  const experiences: ExperienceType[] = [
    {
      id: 1,
      title: "Rajasthan Heritage Tour",
      description: "Explore royal palaces, majestic forts, and vibrant markets in the land of kings.",
      imageSrc: "https://s7ap1.scene7.com/is/image/incredibleindia/2-mehrangarh-fort-jodhpur-rajasthan-city-hero?qlt=82&ts=1726660925514",
      duration: "9 Days",
      location: "Jaipur, Udaipur, Jodhpur",
      rating: 4.9,
    },
    {
      id: 2,
      title: "Kerala Backwater Expedition",
      description: "Glide through serene backwaters and experience the tranquil village life of God's Own Country.",
      imageSrc: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070",
      duration: "7 Days",
      location: "Kochi, Alleppey, Kumarakom",
      rating: 4.8,
    },
    {
      id: 3,
      title: "Himalayan Adventure",
      description: "Trek through breathtaking mountain trails and discover remote villages in the mighty Himalayas.",
      imageSrc: "https://plus.unsplash.com/premium_photo-1661963739151-41947d4d04e6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fEhpbWFsYXlhbiUyMEFkdmVudHVyZXxlbnwwfHwwfHx8MQ%3D%3D",
      duration: "12 Days",
      location: "Rishikesh, Manali, Dharamshala",
      rating: 4.7,
    },
  ];

  const starColor = theme === 'dark' ? "#e94cff" : "#ff7e11";
  const textAccentColor = theme === 'dark' ? "#53a6ff" : "#ff7e11";

  return (
    <section id="experience" className={`relative py-24 px-6 section-experience`}>
      <div className="absolute inset-12 rounded-3xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/50 dark:border-white/30 z-0"></div>
      <div className="container mx-auto">
        {/* Section Header */}
        <SectionHeader
          subtitle="Curated Experiences"
          title="Our Signature Journeys"
          description="Immerse yourself in handcrafted experiences that blend cultural immersion, natural wonders, and authentic encounters with local communities."
        />

        {/* Experiences Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.id} delay={index * 0.1}>
              <motion.div 
                className={`rounded-xl overflow-hidden shadow-lg ${theme === 'dark' ? 'experience-card' : 'bg-white'} h-full flex flex-col card-hover`}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={exp.imageSrc} 
                    alt={exp.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/80 dark:bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star size={14} className={`mr-1`} fill={starColor} stroke={starColor} />
                      {exp.rating}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-serif font-semibold mb-3">{exp.title}</h3>
                  
                  <p className="text-foreground/80 mb-4">{exp.description}</p>
                  
                  <div className="flex flex-wrap gap-4 mb-4 text-sm mt-auto">
                    <div className="flex items-center text-foreground/70">
                      <Calendar size={16} className="mr-1" />
                      {exp.duration}
                    </div>
                    <div className="flex items-center text-foreground/70">
                      <Map size={16} className="mr-1" />
                      {exp.location}
                    </div>
                  </div>
                  
                  <motion.a 
                    href="#" 
                    className={`inline-flex items-center font-medium transition-colors mt-2`}
                    style={{ color: textAccentColor }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    View Details <ArrowRight size={16} className="ml-1" />
                  </motion.a>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal className="mt-16">
          <div className="text-center">
            <motion.a 
              href="#contact" 
              className="btn-primary inline-flex items-center px-6 py-3 rounded-md font-medium"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              whileTap={{ y: 0 }}
            >
              Plan Your Journey 
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight size={16} className="ml-2" />
              </motion.span>
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Experience;
