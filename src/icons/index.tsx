import './index.module.css';

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" {...props}>
      <line x1="2" y1="2" x2="30" y2="30" stroke-width="3" />
      <line x1="2" y1="30" x2="30" y2="2" stroke-width="3" />
    </svg>
  );
}

function LeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="17" height="32" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M 15 2 L 2 16 L 15 30" stroke-width="3" fill="none" />
    </svg>
  );
}

function DownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path d="M6 9l6 6 6-6" fill="none" stroke-width="2" />
    </svg>
  );
}

function UpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path d="M6 15l6-6 6 6" fill="none" stroke-width="2" />
    </svg>
  );
}
export { CloseIcon, LeftIcon, UpIcon, DownIcon };
