export interface Portal {
  id: string;
  path: string;
  label: string;
  kicker: string;
  line: string;
  summary: string;
  cta: string;
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
  title: string;
  intro: string;
  who: string;
  includes: { label: string; note: string }[];
  steps: { label: string; note: string }[];
  ask: string;
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
    kicker: 'Residences',
    line: 'Private homes, presented in full.',
    summary: 'Detached houses, duplexes and villas, each shown with its plan, finishes and setting.',
    cta: 'View residences',
    intro: 'Private homes presented in full: the plan, the finishes and the setting, so a house can be judged before it is visited.',
    detail: 'Each home is described the way you would walk it: the approach, the plan, the materials and how the rooms meet the garden.',
    points: [
      { label: 'Homes for sale', note: 'Detached houses, duplexes and villas ready to view.' },
      { label: 'Plans and finishes', note: 'Floor plans and the materials used, room by room.' },
      { label: 'Built by Hills', note: 'Construction and finishing taken from plan to handover.' },
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
    summary: 'Flats and serviced apartments, listed by building and floor so they are easy to compare.',
    cta: 'View apartments',
    intro: 'Apartments of every size, shown floor by floor, with the layout, the building and the neighbourhood described plainly.',
    detail: 'Apartments are listed by building and by floor, so like can be compared with like before anyone visits.',
    points: [
      { label: 'Apartments for sale', note: 'Layouts drawn to scale, floor by floor.' },
      { label: 'Apartments to let', note: 'Homes to rent, with the neighbourhood described.' },
      { label: 'Building and facilities', note: 'Lifts, parking, security, power and shared spaces.' },
    ],
    image: '/pictures/apartments.webp',
    tone: '#7d611d',
  },
  {
    id: 'land',
    path: '/land',
    label: 'Land and Plots',
    kicker: 'Land & Plots',
    line: 'Ground to build on, measured.',
    summary: 'Plots to build on, with the size, access and title status of each one explained.',
    cta: 'View plots',
    intro: 'Plots and parcels described by size, location and title status, so the ground is understood before anything is built on it.',
    detail: 'Land is described by what can be verified: size, boundaries, access and title status, with a map reference once supplied.',
    points: [
      { label: 'Plots for sale', note: 'Area, shape and boundaries set out plainly.' },
      { label: 'Title and documents', note: 'The paperwork explained in everyday words.' },
      { label: 'Roads and infrastructure', note: 'Access roads, drainage, power and water on site.' },
    ],
    image: '/pictures/land.webp',
    tone: '#000515',
  },
  {
    id: 'developments',
    path: '/developments',
    label: 'Estate Developments',
    kicker: 'Estates',
    line: 'Projects in planning and progress.',
    summary: 'Hills estates and off-plan homes, followed phase by phase from planning to handover.',
    cta: 'View estates',
    intro: 'Estate projects followed from planning to handover, with their phases, shared facilities and the homes that belong to each.',
    detail: 'Developments are followed from planning to handover, so buyers and investors can see what is built and what comes next.',
    points: [
      { label: 'Off-plan homes', note: 'Reserve a home while the estate is being built.' },
      { label: 'Estate facilities', note: 'Roads, green space, security and shared buildings.' },
      { label: 'Construction progress', note: 'What is complete, underway and planned, phase by phase.' },
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
    summary: 'Offices, shops and mixed-use space, with floor area, parking and terms set out.',
    cta: 'View commercial space',
    intro: 'Offices, retail and mixed space for business, set out with area, access and the terms on which each is offered.',
    detail: 'Commercial space is described for the work it must do: floor area, frontage, access, parking and the terms of the offer.',
    points: [
      { label: 'Offices and shops', note: 'Floor area, frontage, access and parking.' },
      { label: 'Lease or purchase', note: 'The terms of each offer, stated clearly.' },
      { label: 'Fit-out and building works', note: 'Space prepared for the work it must do.' },
    ],
    image: '/pictures/commercial.webp',
    tone: '#0e1c40',
  },
];

export const services: Service[] = [
  {
    path: '/property-management',
    label: 'Property Management',
    description: 'We let, maintain and report on your property, so owning it stays simple.',
    image: '/pictures/interior.webp',
    title: 'Your property, looked after.',
    intro: 'Hills manages homes, apartments and estates on behalf of their owners: finding and settling tenants, collecting rent, keeping the building in good repair and reporting back in plain terms.',
    who: 'For landlords, owners living away from their property, and estates that need day-to-day care.',
    includes: [
      { label: 'Tenant sourcing and screening', note: 'Advertising the property, showing it and checking each applicant before a lease is signed.' },
      { label: 'Rent collection and remittance', note: 'Rent and service charges collected on time and passed on with a clear statement.' },
      { label: 'Maintenance and repairs', note: 'Routine upkeep and urgent repairs arranged with trusted tradespeople.' },
      { label: 'Inspections and reporting', note: 'Regular visits, with a written note on the condition of the property.' },
      { label: 'Estate and facility management', note: 'Care of shared spaces, security, power and water after a development is handed over.' },
    ],
    steps: [
      { label: 'Tell us about the property', note: 'Where it is, what state it is in and what you want from it.' },
      { label: 'We inspect and agree the scope', note: 'An adviser visits, then sets out exactly what Hills will handle.' },
      { label: 'We manage, you stay informed', note: 'Tenants, rent and repairs are handled, with regular reports to you.' },
    ],
    ask: 'Ask about managing your property',
  },
  {
    path: '/investment',
    label: 'Investment Opportunities',
    description: 'Ways to put money into property, each set out with its terms and risks.',
    image: '/pictures/tropical.webp',
    title: 'Property that works for you.',
    intro: 'Hills opens its developments and selected sites to investors. Every opportunity is presented with its terms, its timeline and its risks, so the decision is made with the full picture.',
    who: 'For first-time investors, buyers living abroad, landowners and anyone building a property portfolio.',
    includes: [
      { label: 'Off-plan homes', note: 'Buy into a Hills development early and follow it through each phase to handover.' },
      { label: 'Land banking', note: 'Plots held for the long term, with the title status explained before you commit.' },
      { label: 'Buy to let', note: 'Completed homes and apartments bought for rental income, with management available.' },
      { label: 'Joint ventures', note: 'For landowners who want to develop their land together with Hills.' },
      { label: 'Buying from abroad', note: 'Video viewings and documents shared remotely, so distance is not a barrier.' },
    ],
    steps: [
      { label: 'Share your goals', note: 'Your budget, your timeline and how involved you want to be.' },
      { label: 'Review the opportunities', note: 'An adviser walks you through what is open, with terms and risks in writing.' },
      { label: 'Commit with clear paperwork', note: 'Agreements are explained before signing, and progress is reported afterwards.' },
    ],
    ask: 'Ask about current opportunities',
  },
  {
    path: '/advisory',
    label: 'Real Estate Advisory',
    description: 'Straight guidance before you buy, sell, build or hold property.',
    image: '/pictures/entrance.webp',
    title: 'Advice before you decide.',
    intro: 'Property decisions are large and hard to undo. Hills advisers help you weigh them properly: what a property is worth, what its documents really say, and whether it suits what you want it for.',
    who: 'For buyers, sellers, families building a first home and businesses looking for space.',
    includes: [
      { label: 'Buying guidance', note: 'Shortlisting, viewing and negotiating, with someone on your side throughout.' },
      { label: 'Title and document checks', note: 'Certificates, surveys and deeds explained in everyday words before any payment.' },
      { label: 'Valuation and pricing', note: 'A grounded view of what a property is worth today.' },
      { label: 'Selling and letting strategy', note: 'How to present, price and time a sale or a let.' },
      { label: 'Development feasibility', note: 'What a site can carry, what it may cost and whether the numbers hold.' },
    ],
    steps: [
      { label: 'Book a consultation', note: 'Tell us the decision in front of you.' },
      { label: 'We look into it', note: 'An adviser reviews the property, the documents and the market around it.' },
      { label: 'You get a clear answer', note: 'A plain recommendation, with the reasons behind it.' },
    ],
    ask: 'Book a consultation',
  },
];

export const hero = {
  eyebrow: 'Homes, apartments and land in Abuja',
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
  { path: '/properties', label: 'All listings' },
  { path: '/land', label: 'Land and plots' },
  { path: '/developments', label: 'Estate developments' },
  { path: '/property-management', label: 'Property management' },
  { path: '/investment', label: 'Investment' },
  { path: '/advisory', label: 'Advisory' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/about', label: 'About Hills' },
  { path: '/contact', label: 'Contact' },
] as const;

const known: Record<string, { label: string; image?: string; hero?: boolean }> = {
  '/': { label: brand.short, image: hero.image },
  '/properties': { label: 'Properties', image: '/pictures/apartments.webp' },
  '/about': { label: 'About Hills', image: '/pictures/house.webp', hero: true },
  '/contact': { label: 'Contact', image: '/pictures/entrance.webp' },
  '/gallery': { label: 'Gallery', image: '/pictures/villa.webp' },
  ...Object.fromEntries(portals.map((p) => [p.path, { label: p.label, image: p.image, hero: true }])),
  ...Object.fromEntries(services.map((s) => [s.path, { label: s.label, image: s.image, hero: true }])),
};

export const pageFor = (path: string) => known[path.replace(/\/+$/, '') || '/'];

export interface MenuItem {
  path: string;
  label: string;
  description: string;
  image: string;
}

export const portalItem = (id: string): MenuItem => {
  const p = portals.find((x) => x.id === id) ?? portals[0]!;
  return { path: p.path, label: p.label, description: p.summary, image: p.image };
};
const serviceItems: MenuItem[] = services.map((s) => ({ path: s.path, label: s.label, description: s.description, image: s.image }));

export const allListings: MenuItem = {
  path: '/properties',
  label: 'All listings',
  description: 'Browse every home, apartment, plot and commercial space in one place.',
  image: '/pictures/house.webp',
};

export const menuGroups: { label: string; hint: string; items: MenuItem[] }[] = [
  {
    label: 'Find a property',
    hint: 'Homes, apartments and business space',
    items: [allListings, portalItem('residences'), portalItem('apartments'), portalItem('commercial')],
  },
  { label: 'Land and estates', hint: 'Plots to build on and Hills developments', items: [portalItem('land'), portalItem('developments')] },
  { label: 'Our services', hint: 'Management, investment and advice', items: serviceItems },
  {
    label: 'The company',
    hint: 'Who we are and how to reach us',
    items: [
      { path: '/about', label: 'About Hills', description: 'Who we are, what we do and the values we work by.', image: '/pictures/house.webp' },
      { path: '/gallery', label: 'Gallery', description: 'Pictures of homes, interiors, courtyards and gardens.', image: '/pictures/bedroom.webp' },
      { path: '/contact', label: 'Contact', description: 'Book a viewing, ask a question or speak to an adviser.', image: '/pictures/entrance.webp' },
    ],
  },
];

export const routes: MenuItem[] = [allListings, portalItem('land'), portalItem('developments'), ...serviceItems];

export const preloaderImages = ['/pictures/house.webp', '/pictures/villa.webp', hero.poster] as const;

export const HERO_VEIL = 'bg-gradient-to-t from-night/60 via-night/5 to-night/20';

export const whatsappLink = (text: string) => `${company.whatsapp}?text=${encodeURIComponent(text)}`;
