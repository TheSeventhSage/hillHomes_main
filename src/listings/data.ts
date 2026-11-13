import { portals } from '@/data/site';

export interface Listing {
  id: string;
  portal: string;
  name: string;
  line: string;
  about: string;
  pictures: string[];
  plan: 'signature' | 'residence' | 'apartment' | 'plot';
  plot?: number;
  facts: [string, string][];
  features: string[];
}

const pic = (name: string) => `/pictures/${name}.webp`;

/** Sample listings until Hills supplies its real inventory. */
export const listings: Listing[] = [
  {
    id: 'ridge-house',
    portal: 'residences',
    name: 'The Ridge House',
    line: 'A long, low house facing the view.',
    about: 'A five-bedroom home laid out along the ridge, so the living hall, the terrace and the main bedroom all share the same open outlook.',
    pictures: [pic('villa'), pic('interior'), pic('bedroom'), pic('bath')],
    plan: 'signature',
    facts: [['Bedrooms', '5'], ['Bathrooms', '5'], ['Interior', 'about 480 m²'], ['Plot', 'about 1,200 m²']],
    features: ['Double-height living hall', 'Pool terrace', 'Staff wing', 'Solar-ready roof'],
  },
  {
    id: 'courtyard-house',
    portal: 'residences',
    name: 'Courtyard House',
    line: 'Rooms arranged round a shaded court.',
    about: 'Four bedrooms wrapped around a planted courtyard that keeps the house cool, private and bright through the day.',
    pictures: [pic('entrance'), pic('interior'), pic('bedroom'), pic('tropical')],
    plan: 'residence',
    facts: [['Bedrooms', '4'], ['Bathrooms', '4'], ['Interior', 'about 360 m²'], ['Plot', 'about 800 m²']],
    features: ['Central courtyard', 'Timber screens', 'Covered parking for three'],
  },
  {
    id: 'garden-pavilion',
    portal: 'residences',
    name: 'Garden Pavilion',
    line: 'Glass, stone and planting.',
    about: 'A three-bedroom pavilion that opens fully to its garden, with stone walls for shade and glass where the view is best.',
    pictures: [pic('tropical'), pic('house'), pic('bath'), pic('interior')],
    plan: 'signature',
    facts: [['Bedrooms', '3'], ['Bathrooms', '3'], ['Interior', 'about 290 m²'], ['Plot', 'about 950 m²']],
    features: ['Stone feature wall', 'Plunge pool', 'Outdoor kitchen'],
  },
  {
    id: 'level-nine',
    portal: 'apartments',
    name: 'Level Nine Residence',
    line: 'A high floor with long city views.',
    about: 'A three-bedroom apartment on the ninth floor with a terrace running the full width of the living room.',
    pictures: [pic('apartments'), pic('interior'), pic('bedroom'), pic('bath')],
    plan: 'apartment',
    facts: [['Bedrooms', '3'], ['Bathrooms', '3'], ['Interior', 'about 210 m²'], ['Floor', '9']],
    features: ['Full-width terrace', 'Two parking bays', 'Concierge', 'Back-up power'],
  },
  {
    id: 'terrace-apartment',
    portal: 'apartments',
    name: 'Terrace Apartment',
    line: 'Bright rooms and a generous balcony.',
    about: 'Two bedrooms on the fourth floor, with a corner balcony that takes the morning light and a fitted kitchen ready to use.',
    pictures: [pic('interior'), pic('bedroom'), pic('bath'), pic('apartments')],
    plan: 'apartment',
    facts: [['Bedrooms', '2'], ['Bathrooms', '2'], ['Interior', 'about 140 m²'], ['Floor', '4']],
    features: ['Corner balcony', 'Fitted kitchen', 'Shared gym'],
  },
  {
    id: 'corner-residence',
    portal: 'apartments',
    name: 'Corner Residence',
    line: 'Quiet rooms behind tall windows.',
    about: 'A two-bedroom corner apartment with windows on two sides, set back from the street for a quieter home.',
    pictures: [pic('bedroom'), pic('interior'), pic('bath'), pic('apartments')],
    plan: 'apartment',
    facts: [['Bedrooms', '2'], ['Bathrooms', '2'], ['Interior', 'about 120 m²'], ['Floor', '6']],
    features: ['Dual aspect', 'Walk-in wardrobe', 'Secure lobby'],
  },
  {
    id: 'plot-hillside',
    portal: 'land',
    name: 'Plot A, Hillside',
    line: 'Gentle slope with road frontage.',
    about: 'A rectangular plot on a gentle slope with a paved road along its front and a level area ready to build on.',
    pictures: [pic('land'), pic('tropical')],
    plan: 'plot',
    plot: 1,
    facts: [['Area', 'about 600 m²'], ['Shape', 'Rectangular'], ['Access', 'Paved road'], ['Title', 'Confirmed by Hills on enquiry']],
    features: ['Mains water nearby', 'Power at the boundary', 'Level building area'],
  },
  {
    id: 'plot-crest',
    portal: 'land',
    name: 'Plot B, Crest',
    line: 'A corner plot with two frontages.',
    about: 'A corner plot open to the east, reached from two roads, with mature trees and room for a garden.',
    pictures: [pic('entrance'), pic('land')],
    plan: 'plot',
    plot: 3,
    facts: [['Area', 'about 750 m²'], ['Shape', 'Corner'], ['Access', 'Two roads'], ['Title', 'Confirmed by Hills on enquiry']],
    features: ['Mature trees', 'Open to the east', 'Room for a garden'],
  },
  {
    id: 'plot-valley',
    portal: 'land',
    name: 'Plot C, Valley',
    line: 'Sheltered ground near the stream.',
    about: 'The largest of the three plots, sheltered and quiet, reached by a gravel track. A drainage survey is advised before building.',
    pictures: [pic('tropical'), pic('land')],
    plan: 'plot',
    plot: 5,
    facts: [['Area', 'about 900 m²'], ['Shape', 'Irregular'], ['Access', 'Gravel track'], ['Title', 'Confirmed by Hills on enquiry']],
    features: ['Natural shade', 'Drainage survey advised', 'Quiet setting'],
  },
  {
    id: 'hill-gardens',
    portal: 'developments',
    name: 'Hill Gardens, Phase 1',
    line: 'A first phase of homes around shared gardens.',
    about: 'Twenty-four homes of two to four bedrooms, planned around shared gardens, walking paths and a play area behind a gated entrance.',
    pictures: [pic('tropical'), pic('house'), pic('entrance'), pic('interior')],
    plan: 'residence',
    facts: [['Homes', '24 planned'], ['Phase', 'Planning'], ['Home types', '2 to 4 bedrooms'], ['Facilities', 'Gardens, play area']],
    features: ['Shared gardens', 'Gated entrance', 'Walking paths'],
  },
  {
    id: 'ridge-terraces',
    portal: 'developments',
    name: 'Ridge Terraces',
    line: 'Stepped homes following the slope.',
    about: 'Sixteen three-bedroom homes stepping down the slope in stone and timber, each with its own roof terrace and parking.',
    pictures: [pic('house'), pic('villa'), pic('interior'), pic('bedroom')],
    plan: 'signature',
    facts: [['Homes', '16 planned'], ['Phase', 'Design'], ['Home types', '3 bedrooms'], ['Facilities', 'Roof terraces']],
    features: ['Stepped terraces', 'Stone and timber', 'Private parking'],
  },
  {
    id: 'court-row',
    portal: 'developments',
    name: 'Court Row',
    line: 'A quiet row of townhouses.',
    about: 'Six four-bedroom townhouses in a gated row, each with a rear garden and a roof terrace.',
    pictures: [pic('entrance'), pic('interior'), pic('bedroom'), pic('bath')],
    plan: 'residence',
    facts: [['Homes', '6 planned'], ['Phase', 'Planning'], ['Home types', '4 bedrooms'], ['Facilities', 'Private gardens']],
    features: ['Rear gardens', 'Roof terrace', 'Gated row'],
  },
  {
    id: 'frontage-suite',
    portal: 'commercial',
    name: 'Frontage Suite',
    line: 'Street-facing space with glass frontage.',
    about: 'A street-level suite with a full glass front, suited to an office or a shop, with loading access and six parking bays.',
    pictures: [pic('commercial'), pic('interior')],
    plan: 'apartment',
    facts: [['Area', 'about 180 m²'], ['Use', 'Office or retail'], ['Parking', '6 bays'], ['Offer', 'Lease or sale']],
    features: ['Glass frontage', 'Loading access', 'Meeting room'],
  },
  {
    id: 'studio-floor',
    portal: 'commercial',
    name: 'Studio Floor',
    line: 'An open floor with tall windows.',
    about: 'A whole open-plan floor with tall windows and lift access, ready to be fitted out as a studio or an office.',
    pictures: [pic('interior'), pic('commercial')],
    plan: 'apartment',
    facts: [['Area', 'about 320 m²'], ['Use', 'Studio or office'], ['Parking', '10 bays'], ['Offer', 'Lease']],
    features: ['Open plan', 'Natural light', 'Lift access'],
  },
  {
    id: 'retail-corner',
    portal: 'commercial',
    name: 'Retail Corner',
    line: 'A corner unit on a busy junction.',
    about: 'A corner shop unit with two shopfronts on a busy junction, with its own storage room and street signage.',
    pictures: [pic('commercial'), pic('apartments')],
    plan: 'apartment',
    facts: [['Area', 'about 95 m²'], ['Use', 'Retail'], ['Parking', '4 bays'], ['Offer', 'Lease']],
    features: ['Two shopfronts', 'Storage room', 'Street signage'],
  },
];

export const listingsFor = (portal: string) => listings.filter((l) => l.portal === portal);
export const listingById = (id: string | null) => listings.find((l) => l.id === id) ?? null;
export const kindOf = (l: Listing) => portals.find((p) => p.id === l.portal)?.kicker ?? 'Property';
export const SAMPLE_NOTE = 'These are sample listings, shown so you can try the search and the viewing request. Speak to an adviser for what is available today.';
