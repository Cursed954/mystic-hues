
import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import { Calendar, Map, Star, ArrowRight } from 'lucide-react';

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
      imageSrc: "https://images.unsplash.com/photo-1466442929976-97f336a657be",
      duration: "9 Days",
      location: "Jaipur, Udaipur, Jodhpur",
      rating: 4.9,
    },
    {
      id: 2,
      title: "Kerala Backwater Expedition",
      description: "Glide through serene backwaters and experience the tranquil village life of God's Own Country.",
      imageSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      duration: "7 Days",
      location: "Kochi, Alleppey, Kumarakom",
      rating: 4.8,
    },
    {
      id: 3,
      title: "Himalayan Adventure",
      description: "Trek through breathtaking mountain trails and discover remote villages in the mighty Himalayas.",
      imageSrc: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      duration: "12 Days",
      location: "Rishikesh, Manali, Dharamshala",
      rating: 4.7,
    },
  ];

  return (
    <section id="experience" className="py-24 px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="subtitle mb-3">Curated Experiences</p>
            <h2 className="section-title after:left-1/2 after:-translate-x-1/2">
              Our Signature Journeys
            </h2>
            <p className="mt-8 max-w-2xl mx-auto text-foreground/70">
              Immerse yourself in handcrafted experiences that blend cultural immersion, 
              natural wonders, and authentic encounters with local communities.
            </p>
          </div>
        </ScrollReveal>

        {/* Experiences Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.id} delay={index * 100}>
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-mystic-100">
                <div className="h-56 relative overflow-hidden">
                  <img 
                    src={exp.imageSrc} 
                    alt={exp.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star size={14} className="text-spice-500 mr-1" fill="#ff7e11" />
                    {exp.rating}
                  </div>
                </div>
                
                <div className="p-6">
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
                  
                  <h3 className="text-xl font-serif font-medium mb-2">{exp.title}</h3>
                  <p className="text-foreground/70 mb-6">{exp.description}</p>
                  
                  <a 
                    href="#" 
                    className="inline-flex items-center text-spice-500 font-medium hover:text-spice-600 transition-colors"
                  >
                    View Details <ArrowRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal className="mt-16">
          <div className="text-center">
            <a href="#contact" className="btn-primary inline-flex items-center">
              Plan Your Journey <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Experience;
