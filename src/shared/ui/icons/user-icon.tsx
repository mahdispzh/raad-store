import type { SVGProps } from "react";

export function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="45"
      height="35"
      viewBox="0 0 45 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="45" height="35" rx="17.5" className="fill-primary" />
      <path
        d="M25.6429 13.1111C25.6429 14.8293 24.2358 16.2222 22.5001 16.2222C20.7643 16.2222 19.3572 14.8293 19.3572 13.1111C19.3572 11.3929 20.7643 10 22.5001 10C24.2358 10 25.6429 11.3929 25.6429 13.1111Z"
        className="stroke-foreground"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.5 18.5555C19.4624 18.5555 17 20.9931 17 24H28C28 20.9931 25.5376 18.5555 22.5 18.5555Z"
        className="stroke-foreground"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}