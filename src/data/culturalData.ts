
// Define a type for culturalData entries
export type CulturalDataEntry = {
  id: string;
  name: string;
  bannerImage: string;
  region: string;
  famousFor: string[];
  description: string;
  language: string;
  population: string;
};

// Create culturalData with explicit values, not dependent on stateData
export const culturalData: CulturalDataEntry[] = [
  {
    id: "rajasthan",
    name: "Rajasthan",
    bannerImage: "https://images.unsplash.com/photo-1599661046827-9dfe8a320389?q=80&w=2070",
    region: "Northern India",
    famousFor: ["Palaces", "Desert", "Folk Music", "Traditional Art"],
    description: "Rajasthan offers a unique cultural experience with its royal heritage, desert landscapes, and vibrant traditions.",
    language: "Rajasthani, Hindi",
    population: "68 million"
  },
  {
    id: "kerala",
    name: "Kerala",
    bannerImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070",
    region: "South India",
    famousFor: ["Backwaters", "Kathakali", "Ayurveda", "Spice Plantations"],
    description: "Kerala, known as God's Own Country, is famous for its serene backwaters, traditional art forms, and rich cultural heritage.",
    language: "Malayalam",
    population: "35 million"
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    bannerImage: "https://images.unsplash.com/photo-1584964955170-7cc962e0c8dd?q=80&w=2070",
    region: "South India",
    famousFor: ["Classical Dance", "Temples", "Cuisine", "Literature"],
    description: "Tamil Nadu boasts a rich cultural tapestry with ancient temples, classical performing arts, and a literary tradition spanning thousands of years.",
    language: "Tamil",
    population: "72 million"
  },
  {
    id: "west-bengal",
    name: "West Bengal",
    bannerImage: "https://images.unsplash.com/photo-1585118108616-35a427a16b43?q=80&w=2070",
    region: "East India",
    famousFor: ["Durga Puja", "Literature", "Sweets", "Music"],
    description: "West Bengal is known for its intellectual and cultural richness, with traditions in literature, art, music and religious festivals.",
    language: "Bengali",
    population: "91 million"
  },
  {
    id: "gujarat",
    name: "Gujarat",
    bannerImage: "https://images.unsplash.com/photo-1584732200355-486c8fbd91a8?q=80&w=2070",
    region: "West India",
    famousFor: ["Garba Dance", "Textiles", "Food", "Heritage Sites"],
    description: "Gujarat offers vibrant cultural experiences with its distinctive dance forms, handicrafts, and historical monuments.",
    language: "Gujarati",
    population: "60 million"
  }
];
