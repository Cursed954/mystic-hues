
import { stateData } from '../stateData';

// Create a more structured format for art forms
export type ArtForm = {
  id: string;
  name: string;
  stateId: string;
  stateName: string;
  regionId: string;
  regionName: string;
  image: string;
  description: string;
  history: {
    started?: string;
    goldenPeriod?: string;
    currentStatus?: string;
  };
  additionalImages?: string[];
};

// Type definitions for festivals and heritage sites
export type Festival = {
  name: string;
  timing: string;
  description: string;
  stateName: string;
  stateId: string;
  image: string;
};

export type HeritageSite = {
  name: string;
  location: string;
  description: string;
  stateName: string;
  stateId: string;
  image: string;
};

// Map of region IDs to names
const regionMap: Record<string, string> = {
  "Northern India": "north-india",
  "South India": "south-india",
  "East India": "east-india",
  "West India": "west-india",
  "Central India": "central-india",
  "Northeast India": "northeast-india"
};

// Default image in case none is provided
const defaultArtFormImage = "https://images.unsplash.com/photo-1576487236230-eaa4afe68192?q=80&w=1170";

// Extract all cultural data with enhanced art form information
export const artForms: ArtForm[] = stateData.flatMap(state => 
  state.artForms?.split(', ').map((art, index) => {
    // Extract region info from state data
    const regionText = state.region || "";
    const regionId = regionMap[regionText] || "other";
    
    // Create slug for the ID
    const artId = art.toLowerCase().replace(/\s+/g, '-');
    
    return {
      id: `${state.id}-${artId}`,
      name: art,
      stateId: state.id,
      stateName: state.name,
      regionId: regionId,
      regionName: regionText,
      image: defaultArtFormImage,
      description: `${art} is a traditional art form from ${state.name}, representing the rich cultural heritage of the region.`,
      history: {
        started: "Ancient times",
        goldenPeriod: "17th to 19th century",
        currentStatus: "Practiced by dedicated artists and being preserved through cultural programs"
      },
      additionalImages: [
        "https://images.unsplash.com/photo-1594026112334-d8040bd05749?q=80&w=1170",
        "https://images.unsplash.com/photo-1540122995631-7c74c46c0b8f?q=80&w=1170",
        "https://images.unsplash.com/photo-1584806749948-697891c67821?q=80&w=1170"
      ]
    };
  }) || []
);

// Function to get artforms by region
export const getArtFormsByRegion = (regionId: string): ArtForm[] => {
  if (regionId === 'all') return artForms;
  return artForms.filter(art => art.regionId === regionId);
};

// Function to get artforms by state
export const getArtFormsByState = (stateId: string): ArtForm[] => {
  return artForms.filter(art => art.stateId === stateId);
};

// Function to get a specific artform by ID
export const getArtFormById = (id: string): ArtForm | undefined => {
  return artForms.find(art => art.id === id);
};
