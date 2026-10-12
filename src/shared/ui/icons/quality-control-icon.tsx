import type { SVGProps } from "react";

export function QualityControlIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12.5" cy="12.5" r="11.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M7.5 12.8L11 16.3L17.5 9.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}