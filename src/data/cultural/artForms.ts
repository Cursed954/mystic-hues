
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

// Map of region names to region IDs
const getRegionId = (regionName: string): string => {
  const regionMap: Record<string, string> = {
    "Northern India": "north-india",
    "South India": "south-india",
    "East India": "east-india",
    "West India": "west-india",
    "Central India": "central-india",
    "Northeast India": "northeast-india"
  };
  return regionMap[regionName] || "other";
};

// Map of state IDs to state names
const stateNames: Record<string, string> = {
  "rajasthan": "Rajasthan",
  "kerala": "Kerala",
  "tamil-nadu": "Tamil Nadu",
  "himachal-pradesh": "Himachal Pradesh",
  "goa": "Goa",
  "karnataka": "Karnataka",
  "andhra-pradesh": "Andhra Pradesh",
  "gujarat": "Gujarat",
  "uttar-pradesh": "Uttar Pradesh",
  "west-bengal": "West Bengal",
  "sikkim": "Sikkim",
  "arunachal-pradesh": "Arunachal Pradesh"
};

// Map of state IDs to region names
const stateRegions: Record<string, string> = {
  "rajasthan": "Northern India",
  "kerala": "South India",
  "tamil-nadu": "South India",
  "himachal-pradesh": "Northern India",
  "goa": "West India",
  "karnataka": "South India",
  "andhra-pradesh": "South India",
  "gujarat": "West India",
  "uttar-pradesh": "Northern India",
  "west-bengal": "East India",
  "sikkim": "Northeast India",
  "arunachal-pradesh": "Northeast India"
};

// List of art forms with their respective state IDs
const artFormsList = [
  { name: "Kathputli", stateIds: ["rajasthan"] },
  { name: "Ghoomar", stateIds: ["rajasthan"] },
  { name: "Kalbeliya", stateIds: ["rajasthan"] },
  { name: "Kathakali", stateIds: ["kerala"] },
  { name: "Mohiniyattam", stateIds: ["kerala"] },
  { name: "Kalaripayattu", stateIds: ["kerala"] },
  { name: "Bharatanatyam", stateIds: ["tamil-nadu"] },
  { name: "Carnatic Music", stateIds: ["tamil-nadu", "kerala", "karnataka", "andhra-pradesh"] },
  { name: "Tanjore Paintings", stateIds: ["tamil-nadu"] },
  { name: "Nati Dance", stateIds: ["himachal-pradesh"] },
  { name: "Thangka Paintings", stateIds: ["himachal-pradesh", "sikkim", "arunachal-pradesh"] },
  { name: "Chamba Rumal", stateIds: ["himachal-pradesh"] },
  { name: "Fado Music", stateIds: ["goa"] },
  { name: "Goan Carnival", stateIds: ["goa"] },
  { name: "Traditional Pottery", stateIds: ["gujarat", "rajasthan", "tamil-nadu", "uttar-pradesh", "west-bengal"] }
];

// Create art form objects for each art form in each state
export const artForms: ArtForm[] = artFormsList.flatMap(artForm => 
  artForm.stateIds.map(stateId => {
    const stateName = stateNames[stateId] || stateId;
    const regionName = stateRegions[stateId] || "Other Region";
    const regionId = getRegionId(regionName);
    
    // Create slug for the ID
    const artId = artForm.name.toLowerCase().replace(/\s+/g, '-');
    
    // Get art form details from the detailed data source
    const artDetails = getArtFormDetails(artForm.name);
    
    return {
      id: `${stateId}-${artId}`,
      name: artForm.name,
      stateId: stateId,
      stateName: stateName,
      regionId: regionId,
      regionName: regionName,
      image: artDetails.image,
      description: artDetails.description,
      history: artDetails.history,
      additionalImages: artDetails.additionalImages
    };
  })
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
