
// Art forms detailed information with descriptions, history and images
import { stateData } from '../stateData';

// Map of state IDs to specific art form details
export type ArtFormDetails = {
  id: string;
  name: string;
  description: string;
  history: {
    started: string;
    goldenPeriod: string;
    currentStatus: string;
  };
  image: string;
  additionalImages: string[];
};

// Mapping art forms to specific information
export const artFormDetailsMap: Record<string, ArtFormDetails> = {
  "kathakali": {
    id: "kathakali",
    name: "Kathakali",
    description: "Kathakali is a classical dance form from Kerala, featuring elaborate costumes, makeup, and stylized gestures to portray stories from Hindu epics. Performers train rigorously to master the precise facial expressions and body movements essential to this art form.",
    history: {
      started: "17th century",
      goldenPeriod: "18th to 19th century",
      currentStatus: "Actively preserved through dedicated schools and cultural institutions"
    },
    image: "https://images.unsplash.com/photo-1576487236230-eaa4afe68192?q=80&w=1170",
    additionalImages: [
      "https://images.unsplash.com/photo-1594026112334-d8040bd05749?q=80&w=1170",
      "https://images.unsplash.com/photo-1584806749948-697891c67821?q=80&w=1170",
      "https://images.unsplash.com/photo-1631360698182-98ca63d6a404?q=80&w=1170"
    ]
  },
  "bharatanatyam": {
    id: "bharatanatyam",
    name: "Bharatanatyam",
    description: "Bharatanatyam is one of India's oldest classical dance forms, originating from Tamil Nadu. It features precise footwork, hand gestures (mudras), and facial expressions (abhinaya) to convey stories often related to Hindu deities.",
    history: {
      started: "2000 BCE",
      goldenPeriod: "Chola Dynasty (9th-13th century)",
      currentStatus: "Widely practiced across India and internationally"
    },
    image: "https://images.unsplash.com/photo-1608319917470-9296f5192f07?q=80&w=1170",
    additionalImages: [
      "https://images.unsplash.com/photo-1643699542927-ba56100aca14?q=80&w=1170",
      "https://images.unsplash.com/photo-1621346653381-9ba9f71b81ff?q=80&w=1170",
      "https://images.unsplash.com/photo-1584677440413-583ecb519962?q=80&w=1170"
    ]
  },
  "madhubani": {
    id: "madhubani",
    name: "Madhubani",
    description: "Madhubani (or Mithila painting) is a traditional folk art form from Bihar featuring geometric patterns, mythological motifs, and nature scenes. Originally painted by women on house walls, it has evolved to include canvas and paper mediums.",
    history: {
      started: "7th century BCE",
      goldenPeriod: "14th-16th century",
      currentStatus: "Growing commercial recognition with government support for artisans"
    },
    image: "https://images.unsplash.com/photo-1639486969588-2755d305d2c5?q=80&w=1170",
    additionalImages: [
      "https://images.unsplash.com/photo-1602930631193-c8bef2738cfe?q=80&w=1170",
      "https://images.unsplash.com/photo-1625731595423-d26d88897786?q=80&w=1170",
      "https://images.unsplash.com/photo-1604673769964-1cd5681fd46d?q=80&w=1170"
    ]
  },
  "warli": {
    id: "warli",
    name: "Warli",
    description: "Warli art is a tribal art form originating from Maharashtra featuring simple stick-like human figures and geometric shapes. These paintings traditionally use only white pigment on mud walls, depicting daily life, rituals, and harmony with nature.",
    history: {
      started: "10th century CE",
      goldenPeriod: "20th century",
      currentStatus: "Growing popularity in contemporary decor and fashion"
    },
    image: "https://images.unsplash.com/photo-1613896643334-96f35b313cbb?q=80&w=1170",
    additionalImages: [
      "https://images.unsplash.com/photo-1622964221733-58659c9d3248?q=80&w=1170",
      "https://images.unsplash.com/photo-1618093387918-4ecd788e3043?q=80&w=1170",
      "https://images.unsplash.com/photo-1604673769964-1cd5681fd46d?q=80&w=1170"
    ]
  },
  "miniature-painting": {
    id: "miniature-painting",
    name: "Miniature Painting",
    description: "Miniature painting is a delicate art form featuring intricate details on small surfaces, often depicting royal courts, hunting scenes, and tales of love. Different schools developed unique styles, including Mughal, Rajput, Pahari, and Deccan.",
    history: {
      started: "16th century",
      goldenPeriod: "17th-18th century during Mughal rule",
      currentStatus: "Preserved in museums with some contemporary practitioners"
    },
    image: "https://images.unsplash.com/photo-1574246604907-db69e30ddb97?q=80&w=1170",
    additionalImages: [
      "https://images.unsplash.com/photo-1569091791842-7cfb64e04797?q=80&w=1170",
      "https://images.unsplash.com/photo-1580136579312-94651dfd596d?q=80&w=1170",
      "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?q=80&w=1170"
    ]
  },
  "kuchipudi": {
    id: "kuchipudi",
    name: "Kuchipudi",
    description: "Kuchipudi is a classical dance-drama originating from Andhra Pradesh. Known for its graceful movements, rhythmic footwork, and expressive storytelling, it blends dance with theatrical elements to depict mythological stories.",
    history: {
      started: "3rd century BCE",
      goldenPeriod: "15th-17th century",
      currentStatus: "Recognized nationally with dedicated academies"
    },
    image: "https://images.unsplash.com/photo-1590152925677-23d2a288d375?q=80&w=1170",
    additionalImages: [
      "https://images.unsplash.com/photo-1632062549850-39a4bc794db1?q=80&w=1170",
      "https://images.unsplash.com/photo-1587855052605-56f8e822c0c0?q=80&w=1170",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343c?q=80&w=1170"
    ]
  },
  "puppet-theatre": {
    id: "puppet-theatre",
    name: "Puppet Theatre",
    description: "Puppet Theatre in Rajasthan, particularly the Kathputli tradition, features colorful wooden puppets manipulated with strings to tell folk tales, myths, and social stories, accompanied by music and narration.",
    history: {
      started: "Ancient times (specific date unknown)",
      goldenPeriod: "16th-19th century during Rajput kingdoms",
      currentStatus: "Facing challenges but preserved through cultural troupes"
    },
    image: "https://images.unsplash.com/photo-1608319917470-9296f5192f07?q=80&w=1170",
    additionalImages: [
      "https://images.unsplash.com/photo-1592197140857-7d6bf6fa0de9?q=80&w=1170",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1170",
      "https://images.unsplash.com/photo-1515963665762-77c77532e446?q=80&w=1170"
    ]
  },
  "phad-painting": {
    id: "phad-painting",
    name: "Phad Painting",
    description: "Phad painting is a traditional scroll painting from Rajasthan depicting folk tales, especially the adventures of local heroes. These colorful scrolls serve as portable temples, with performances by traveling bards who sing the illustrated stories.",
    history: {
      started: "13th century",
      goldenPeriod: "15th-17th century",
      currentStatus: "Rare but preserved by traditional artist families"
    },
    image: "https://images.unsplash.com/photo-1602930631193-c8bef2738cfe?q=80&w=1170",
    additionalImages: [
      "https://images.unsplash.com/photo-1604673769964-1cd5681fd46d?q=80&w=1170",
      "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?q=80&w=1170",
      "https://images.unsplash.com/photo-1586181129413-ee4b8e0448d1?q=80&w=1170"
    ]
  },
  "odissi": {
    id: "odissi",
    name: "Odissi",
    description: "Odissi is a classical dance form from Odisha characterized by fluid torso movements, distinctive 'tribhangi' posture (three body bends), and intricate footwork. Its graceful movements often depict Hindu mythology, especially stories of Lord Jagannath.",
    history: {
      started: "2nd century BCE (temple sculptures)",
      goldenPeriod: "10th-14th century",
      currentStatus: "Thriving with renewed interest after near extinction"
    },
    image: "https://images.unsplash.com/photo-1635111228347-ec9fb84a4a36?q=80&w=1170",
    additionalImages: [
      "https://images.unsplash.com/photo-1631360698216-79d9f4e41e5e?q=80&w=1170",
      "https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?q=80&w=1170",
      "https://images.unsplash.com/photo-1654512799227-94e56fbc0361?q=80&w=1170"
    ]
  }
};

// Default art form details when specific information is not available
export const defaultArtFormDetails: ArtFormDetails = {
  id: "default",
  name: "Traditional Art Form",
  description: "This traditional art form represents the rich cultural heritage of its region, with distinctive elements that have been preserved through generations.",
  history: {
    started: "Ancient times",
    goldenPeriod: "17th to 19th century",
    currentStatus: "Practiced by dedicated artists and being preserved through cultural programs"
  },
  image: "https://images.unsplash.com/photo-1576487236230-eaa4afe68192?q=80&w=1170",
  additionalImages: [
    "https://images.unsplash.com/photo-1594026112334-d8040bd05749?q=80&w=1170",
    "https://images.unsplash.com/photo-1540122995631-7c74c46c0b8f?q=80&w=1170",
    "https://images.unsplash.com/photo-1584806749948-697891c67821?q=80&w=1170"
  ]
};

// Get details for a specific art form, falling back to default if not found
export const getArtFormDetails = (artFormName: string): ArtFormDetails => {
  const key = artFormName.toLowerCase().replace(/\s+/g, '-');
  return artFormDetailsMap[key] || {
    ...defaultArtFormDetails,
    id: key,
    name: artFormName
  };
};
