import './index.module.css';

export const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" {...props}>
    <line x1="2" y1="2" x2="30" y2="30" stroke-width="3" />
    <line x1="2" y1="30" x2="30" y2="2" stroke-width="3" />
  </svg>
);

export const LeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="17" height="32" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M 15 2 L 2 16 L 15 30" stroke-width="3" fill="none" />
  </svg>
);

export const DownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M6 9l6 6 6-6" fill="none" stroke-width="2" />
  </svg>
);

export const UpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M6 15l6-6 6 6" fill="none" stroke-width="2" />
  </svg>
);

export const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg height="100" width="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <polygon
      fill="currentColor"
      points="12,17.27 18.18,21 16.54,13.97 22,9.24 14.81,8.63 12,2 9.19,8.63 2,9.24 7.46,13.97 5.82,21 12,17.27"
    />
  </svg>
);
