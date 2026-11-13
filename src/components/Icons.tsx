import type { SVGProps } from 'react';

const base = { viewBox: '0 0 20 20', width: 18, height: 18, fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, 'aria-hidden': true } as const;

export const ArrowIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M3 10h13M11 5l5 5-5 5" />
  </svg>
);

export const CloseIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M4.5 4.5l11 11M15.5 4.5l-11 11" />
  </svg>
);

export const ArrowDownIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M10 3v13M5 11l5 5 5-5" />
  </svg>
);

export const HeartIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M10 16.5S3.8 12.8 3.8 8.2A3.4 3.4 0 0 1 10 6.3a3.4 3.4 0 0 1 6.2 1.9c0 4.6-6.2 8.3-6.2 8.3Z" />
  </svg>
);

export const CheckIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M4 10.5l4 4 8-9" />
  </svg>
);
