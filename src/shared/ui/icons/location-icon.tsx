import type { SVGProps } from "react";

export function LocationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 15 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.5 18.5C11 14.9 14.5 11.6764 14.5 7.7C14.5 3.72355 11.366 0.5 7.5 0.5C3.63401 0.5 0.5 3.72355 0.5 7.7C0.5 11.6764 4 14.9 7.5 18.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 10.5C9.1569 10.5 10.5 9.1569 10.5 7.5C10.5 5.84315 9.1569 4.5 7.5 4.5C5.8431 4.5 4.5 5.84315 4.5 7.5C4.5 9.1569 5.8431 10.5 7.5 10.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}