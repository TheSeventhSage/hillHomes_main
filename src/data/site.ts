export interface Portal {
  id: string;
  path: string;
  label: string;
  kicker: string;
  line: string;
  intro: string;
  detail: string;
  points: { label: string; note: string }[];
  image: string;
  tone: string;
}

export interface Service {
  path: string;
  label: string;
  description: string;
  image: string;
}

export const brand = {
  name: 'Hills Apartments and Homes',
  short: 'Hills',
} as const;

export const portals: Portal[] = [
  {
    id: 'residences',
    path: '/properties/residences',
    label: 'Luxury Residences',
    kicker: 'Homes',
    line: 'Private homes, presented in full.',
    intro: 'Private homes presented in full: the plan, the finishes and the setting, so a house can be judged before it is visited.',
    detail: 'Each home is described the way you would walk it: the approach, the plan, the materials and how the rooms meet the garden.',
    points: [
      { label: 'Plans and elevations', note: 'Drawn views of every floor and every face.' },
      { label: 'Finishes and materials', note: 'What is used, where, and why it was chosen.' },
      { label: 'Viewings by arrangement', note: 'Book a time and see it in person.' },
    ],
    image: '/pictures/villa.webp',
    tone: '#07112b',
  },
  {
    id: 'apartments',
    path: '/properties/apartments',
    label: 'Apartments',
    kicker: 'Apartments',
    line: 'City living, floor by floor.',
    intro: 'Apartments of every size, shown floor by floor, with the layout, the building and the neighbourhood described plainly.',
    detail: 'Apartments are listed by building and by floor, so like can be compared with like before anyone visits.',
    points: [
      { label: 'Floor plans', note: 'Layouts drawn to scale, room by room.' },
      { label: 'Building facilities', note: 'Lifts, parking, security and shared spaces.' },
      { label: 'Neighbourhood notes', note: 'Transport, shops, schools and quiet streets.' },
    ],
    image: '/pictures/apartments.webp',
    tone: '#7d611d',
  },
  {
    id: 'land',
    path: '/land',
    label: 'Land and Plots',
    kicker: 'Land',
    line: 'Ground to build on, measured.',
    intro: 'Plots and parcels described by size, location and title status, so the ground is understood before anything is built on it.',
    detail: 'Land is described by what can be verified: size, boundaries, access and title status, with a map reference once supplied.',
    points: [
      { label: 'Plot size and shape', note: 'Area and boundaries set out plainly.' },
      { label: 'Location and access', note: 'Roads, utilities and how to reach it.' },
      { label: 'Title status described', note: 'The paperwork explained in everyday words.' },
    ],
    image: '/pictures/land.webp',
    tone: '#000515',
  },
  {
    id: 'developments',
    path: '/developments',
    label: 'Estate Developments',
    kicker: 'Developments',
    line: 'Projects in planning and progress.',
    intro: 'Estate projects followed from planning to handover, with their phases, shared facilities and the homes that belong to each.',
    detail: 'Developments are followed from planning to handover, so buyers and investors can see what is built and what comes next.',
    points: [
      { label: 'Phases and timelines', note: 'What is complete, underway and planned.' },
      { label: 'Shared facilities', note: 'Roads, green space and common buildings.' },
      { label: 'Homes within each project', note: 'Every unit that belongs to the scheme.' },
    ],
    image: '/pictures/tropical.webp',
    tone: '#8f7023',
  },
  {
    id: 'commercial',
    path: '/properties/commercial',
    label: 'Commercial Properties',
    kicker: 'Commercial',
    line: 'Space for business and trade.',
    intro: 'Offices, retail and mixed space for business, set out with area, access and the terms on which each is offered.',
    detail: 'Commercial space is described for the work it must do: floor area, frontage, access, parking and the terms of the offer.',
    points: [
      { label: 'Area and layout', note: 'Floor area and how the space divides.' },
      { label: 'Access and parking', note: 'Frontage, loading and visitor parking.' },
      { label: 'Terms of offer', note: 'Lease or sale, stated clearly.' },
    ],
    image: '/pictures/commercial.webp',
    tone: '#0e1c40',
  },
];

export const services: Service[] = [
  {
    path: '/property-management',
    label: 'Property Management',
    description: 'Care of let and owned property, for landlords and owners.',
    image: '/pictures/interior.webp',
  },
  {
    path: '/investment',
    label: 'Investment Opportunities',
    description: 'Published opportunities, presented with their terms and risks.',
    image: '/pictures/tropical.webp',
  },
  {
    path: '/advisory',
    label: 'Real Estate Advisory',
    description: 'Guidance on buying, selling, holding and developing property.',
    image: '/pictures/entrance.webp',
  },
];

export const hero = {
  eyebrow: 'Apartments, homes and land',
  lines: ['Homes that', 'hold their', 'ground.'],
  statement:
    'Hills Apartments and Homes brings residences, land and development together with the management and advice that follow a property through its life.',
  image: '/pictures/house.webp',
  video: '/video/hero.mp4',
  poster: '/video/hero-poster.jpg',
} as const;

export const offerings = [
  { title: 'Smart properties', body: 'Homes and apartments planned for how people live today.' },
  { title: 'Investment', body: 'Opportunities in property, set out with their terms.' },
  { title: 'Building and construction', body: 'Projects taken from plan to handover.' },
  { title: 'Estate management', body: 'Care of estates and shared spaces after completion.' },
  { title: 'Infrastructure', body: 'The roads, drainage and utilities a site needs to be lived in.' },
  { title: 'General construction', body: 'Building work for homes and for commercial space.' },
] as const;

export const identity = {
  vision: 'To lead in real estate development globally, starting from Nigeria.',
  mission: 'To create lifestyles, not just homes.',
  motto: 'Excellence, Comfort and Class.',
  values: ['Excellence', 'Comfort', 'Class'],
  line: 'We add value to your very existence.',
  legalName: 'Hills Apartments & Homes Limited',
  founded: '2021',
  place: 'Wuse II, Abuja',
} as const;

export const company = {
  address: '10 Agadez Crescent, Wuse II, FCT 900288, Abuja, Nigeria',
  phone: '+234 915 555 5977',
  whatsapp: 'https://wa.me/2349155555977',
  email: 'hello@hillsapartmentsandhomes.com',
  hours: 'Monday to Saturday, 8am to 6pm',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/hills.apartments.and.homes/' },
    { label: 'LinkedIn', href: 'https://ng.linkedin.com/company/hillsapartmentsandhomes' },
    { label: 'Facebook', href: 'https://www.facebook.com/hillsapartmentsandhomes/' },
  ],
} as const;

export const gallery = [
  { src: '/pictures/interior.webp', caption: 'Interiors' },
  { src: '/pictures/bedroom.webp', caption: 'Bedrooms' },
  { src: '/pictures/entrance.webp', caption: 'Courtyards and entrances' },
  { src: '/pictures/bath.webp', caption: 'Bathrooms' },
] as const;

export const plates = [
  { src: '/pictures/villa.webp', caption: 'The residence' },
  { src: '/pictures/interior.webp', caption: 'Living room' },
  { src: '/pictures/entrance.webp', caption: 'Entrance court' },
  { src: '/pictures/bedroom.webp', caption: 'Bedroom' },
  { src: '/pictures/house.webp', caption: 'Garden side' },
  { src: '/pictures/bath.webp', caption: 'Bathroom' },
  { src: '/pictures/apartments.webp', caption: 'Apartments' },
  { src: '/pictures/tropical.webp', caption: 'Courtyard' },
  { src: '/pictures/land.webp', caption: 'Open land' },
  { src: '/pictures/commercial.webp', caption: 'Commercial' },
] as const;

export const menu = [
  { path: '/properties', label: 'Properties' },
  { path: '/land', label: 'Land' },
  { path: '/developments', label: 'Developments' },
  { path: '/property-management', label: 'Property Management' },
  { path: '/investment', label: 'Investment' },
  { path: '/advisory', label: 'Advisory' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/about', label: 'About Hills' },
  { path: '/contact', label: 'Contact' },
] as const;

const known: Record<string, { label: string; image?: string }> = {
  '/': { label: brand.short, image: hero.image },
  '/properties': { label: 'Properties', image: '/pictures/apartments.webp' },
  '/about': { label: 'About Hills', image: '/pictures/house.webp' },
  '/contact': { label: 'Contact', image: '/pictures/entrance.webp' },
  '/gallery': { label: 'Gallery', image: '/pictures/villa.webp' },
  ...Object.fromEntries(portals.map((p) => [p.path, { label: p.label, image: p.image }])),
  ...Object.fromEntries(services.map((s) => [s.path, { label: s.label, image: s.image }])),
};

export const pageFor = (path: string) => known[path.replace(/\/+$/, '') || '/'];

export interface MenuItem {
  path: string;
  label: string;
  description: string;
  image: string;
}

const portalItem = (id: string): MenuItem => {
  const p = portals.find((x) => x.id === id) ?? portals[0]!;
  return { path: p.path, label: p.label, description: p.line, image: p.image };
};
const serviceItems: MenuItem[] = services.map((s) => ({ path: s.path, label: s.label, description: s.description, image: s.image }));

export const menuGroups: { label: string; items: MenuItem[] }[] = [
  {
    label: 'Properties',
    items: [
      { path: '/properties', label: 'All properties', description: 'All five kinds of property, side by side.', image: '/pictures/house.webp' },
      portalItem('residences'),
      portalItem('apartments'),
      portalItem('commercial'),
    ],
  },
  { label: 'Land and Estates', items: [portalItem('land'), portalItem('developments')] },
  { label: 'Services', items: serviceItems },
  {
    label: 'Hills',
    items: [
      { path: '/about', label: 'About Hills', description: 'Who we are and how we approach real estate.', image: '/pictures/interior.webp' },
      { path: '/gallery', label: 'Gallery', description: 'Ten representative pictures, one plate at a time.', image: '/pictures/bedroom.webp' },
      { path: '/contact', label: 'Contact', description: 'Arrange a viewing, ask a question or request a consultation.', image: '/pictures/entrance.webp' },
    ],
  },
];

export const routes: MenuItem[] = [menuGroups[0]!.items[0]!, portalItem('land'), portalItem('developments'), ...serviceItems];

export const preloaderImages = ['/pictures/house.webp', '/pictures/entrance.webp', hero.poster] as const;
