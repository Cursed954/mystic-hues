
import { stateData } from '../stateData';
import { getArtFormDetails } from './artformdata';

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

// Map of region IDs to names
const regionMap: Record<string, string> = {
  "Northern India": "north-india",
  "South India": "south-india",
  "East India": "east-india",
  "West India": "west-india",
  "Central India": "central-india",
  "Northeast India": "northeast-india"
};

// Extract all cultural data with enhanced art form information
export const artForms: ArtForm[] = stateData.flatMap(state => 
  state.artForms?.split(', ').map((art) => {
    // Extract region info from state data
    const regionText = state.region || "";
    const regionId = regionMap[regionText] || "other";
    
    // Create slug for the ID
    const artId = art.toLowerCase().replace(/\s+/g, '-');
    
    // Get art form details from the new detailed data source
    const artDetails = getArtFormDetails(art);
    
    return {
      id: `${state.id}-${artId}`,
      name: art,
      stateId: state.id,
      stateName: state.name,
      regionId: regionId,
      regionName: regionText,
      image: artDetails.image,
      description: artDetails.description,
      history: artDetails.history,
      additionalImages: artDetails.additionalImages
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
