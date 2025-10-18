import type { SVGProps } from 'react';

export const TtIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15.5 8.5 19 5" />
    <path d="m14 10 3.5 3.5" />
    <circle cx="12" cy="12" r="10" />
    <path d="M12 12v3.5a2.5 2.5 0 1 0 5 0V12a5 5 0 1 0-10 0v3.5a2.5 2.5 0 1 0 5 0V12" />
  </svg>
);

export const CtIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9.5 14.5 5-5" />
    <path d="m14.5 14.5-5-5" />
  </svg>
);
