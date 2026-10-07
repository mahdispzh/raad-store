import type { SVGProps } from "react";

export function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 11.5C0 5.14873 5.14873 0 11.5 0H23V23H11.5C5.14873 23 0 17.8513 0 11.5Z"
        className="fill-foreground"
      />
      <path
        d="M14 18L11 12L14 6"
        className="stroke-primary"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}