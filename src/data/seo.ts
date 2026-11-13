export const SITE_NAME = 'Hills Apartments and Homes';
export const DEFAULT_SITE_URL = 'https://hillsapartmentsandhomes.com';
export const OG_IMAGE = '/og.jpg';

export interface PageMeta {
  path: string;
  title: string;
  description: string;
}

export const pages: PageMeta[] = [
  {
    path: '/',
    title: 'Hills Apartments and Homes | Homes, Apartments and Land in Abuja',
    description: 'Hills Apartments and Homes is an Abuja real estate company offering homes, apartments, land, estate developments, property management, investment and advisory.',
  },
  {
    path: '/properties',
    title: 'Property Listings in Abuja | Hills Apartments and Homes',
    description: 'Browse homes, apartments, plots, estates and commercial space from Hills Apartments and Homes, and request a viewing online.',
  },
  {
    path: '/properties/residences',
    title: 'Luxury Residences in Abuja | Hills Apartments and Homes',
    description: 'Detached houses, duplexes and villas from Hills, each shown with its plan, finishes and setting. Book a viewing in person or by video.',
  },
  {
    path: '/properties/apartments',
    title: 'Apartments in Abuja | Hills Apartments and Homes',
    description: 'Flats and serviced apartments listed by building and floor, with layouts, facilities and neighbourhood notes. Book a viewing with Hills.',
  },
  {
    path: '/properties/commercial',
    title: 'Commercial Property in Abuja | Hills Apartments and Homes',
    description: 'Offices, shops and mixed-use space in Abuja, with floor area, access, parking and the terms of each offer set out clearly.',
  },
  {
    path: '/land',
    title: 'Land and Plots for Sale in Abuja | Hills Apartments and Homes',
    description: 'Plots to build on, described by size, location, access and title status, so the ground is understood before anything is built on it.',
  },
  {
    path: '/developments',
    title: 'Estate Developments in Abuja | Hills Apartments and Homes',
    description: 'Hills estates and off-plan homes, followed phase by phase from planning to handover, with shared facilities and home types.',
  },
  {
    path: '/property-management',
    title: 'Property Management in Abuja | Hills Apartments and Homes',
    description: 'Hills lets, maintains and reports on homes, apartments and estates for their owners: tenants, rent collection, repairs and inspections.',
  },
  {
    path: '/investment',
    title: 'Real Estate Investment in Nigeria | Hills Apartments and Homes',
    description: 'Off-plan homes, land banking, buy to let and joint ventures with Hills, each presented with its terms, timeline and risks.',
  },
  {
    path: '/advisory',
    title: 'Real Estate Advisory in Abuja | Hills Apartments and Homes',
    description: 'Guidance on buying, selling, valuing and developing property, with title and document checks explained in everyday words.',
  },
  {
    path: '/about',
    title: 'About Hills Apartments and Homes | Real Estate Company in Abuja',
    description: 'Founded in Abuja in 2021, Hills Apartments and Homes creates lifestyles, not just homes, guided by excellence, comfort and class.',
  },
  {
    path: '/gallery',
    title: 'Gallery | Hills Apartments and Homes',
    description: 'Pictures of homes, interiors, courtyards and gardens from Hills Apartments and Homes.',
  },
  {
    path: '/contact',
    title: 'Contact Hills Apartments and Homes | Wuse II, Abuja',
    description: 'Visit Hills at 10 Agadez Crescent, Wuse II, Abuja, call +234 915 555 5977, or send an enquiry on WhatsApp or by email.',
  },
];

const clean = (path: string) => path.replace(/\/+$/, '') || '/';
export const metaFor = (path: string) => pages.find((p) => p.path === clean(path));

export const NOT_FOUND: PageMeta = { path: '', title: `Page not found | ${SITE_NAME}`, description: 'This page does not exist.' };
