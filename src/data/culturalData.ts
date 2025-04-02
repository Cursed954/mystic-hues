
import { stateData } from './stateData';

// Create a set of cultural data entries from all state data
// This creates a flattened view of all the cultural entities in the dataset
export const culturalData = stateData.map(state => ({
  id: state.id,
  name: state.name,
  bannerImage: state.images?.banner || "https://images.unsplash.com/photo-1597040663342-45b6af3d9a65?q=80&w=2070",
  region: state.region,
  famousFor: state.famousFor?.split(', ') || [],
  description: state.description || `${state.name} offers a unique cultural experience with its distinctive traditions and heritage.`,
  language: state.languages?.primary || "Local languages",
  population: state.population || "N/A"
}));
