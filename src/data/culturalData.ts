
import { artForms } from './cultural/artForms';
import { festivals } from './cultural/festivals';
import { heritageSites } from './cultural/heritageSites';

// Combine cultural data for the Culture component
export const culturalData = [
  ...artForms.slice(0, 10),
  ...festivals.slice(0, 10),
  ...heritageSites.slice(0, 10)
].map(item => ({
  id: 'id' in item ? item.id : `${item.name.toLowerCase().replace(/\s+/g, '-')}-${item.stateId || ''}`,
  name: item.name,
  description: 'description' in item ? item.description : '',
  image: 'image' in item ? item.image : '',
  bannerImage: 'image' in item ? item.image : '',
  population: 'population' in item ? item.population : ('stateName' in item ? item.stateName : ''),
  language: 'language' in item ? item.language : ('timing' in item ? item.timing : ''),
  famousFor: ['Art', 'Culture', 'Heritage']
}));
