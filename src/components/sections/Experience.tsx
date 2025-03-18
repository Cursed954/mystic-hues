
import React from 'react';
import { Calendar, Map, Star, ArrowRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import FeatureCard from '../ui/FeatureCard';
import ScrollReveal from '../ui/ScrollReveal';
import { motion } from 'framer-motion';

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
  const experiences: ExperienceType[] = [
    {
      id: 1,
      title: "Rajasthan Heritage Tour",
      description: "Explore royal palaces, majestic forts, and vibrant markets in the land of kings.",
      imageSrc: "https://images.unsplash.com/photo-1599661046289-e31897d36a68?q=80&w=2070",
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
      imageSrc: "https://images.unsplash.com/photo-1502310942044-dc746b92eebc?q=80&w=1943",
      duration: "12 Days",
      location: "Rishikesh, Manali, Dharamshala",
      rating: 4.7,
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 bg-gradient-to-b from-white via-white to-mystic-50">
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
            <FeatureCard
              key={exp.id}
              title={exp.title}
              description={exp.description}
              imageSrc={exp.imageSrc}
              imageAlt={exp.title}
              delay={index * 2}
              icon={<div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Star size={14} className="text-spice-500 mr-1" fill="#ff7e11" />
                {exp.rating}
              </div>}
            >
              <div className="flex flex-wrap gap-4 mb-4 text-sm">
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
                className="inline-flex items-center text-spice-500 font-medium hover:text-spice-600 transition-colors"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                View Details <ArrowRight size={16} className="ml-1" />
              </motion.a>
            </FeatureCard>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal className="mt-16">
          <div className="text-center">
            <motion.a 
              href="#contact" 
              className="btn-primary inline-flex items-center"
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
