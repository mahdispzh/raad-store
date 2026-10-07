import type { SVGProps } from "react";

export function BlogsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.5 5L6.91667 8.5L14.5 4L8.08333 0.5L0.5 5Z"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.5 5V8L6.91667 11.5L14.5 7C13.8 6.4 13.625 5.5 14.0917 4.75L14.5 4"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.5 8V11L6.91667 14.5L14.5 10C13.8 9.4 13.625 8.5 14.0917 7.75L14.5 7"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}