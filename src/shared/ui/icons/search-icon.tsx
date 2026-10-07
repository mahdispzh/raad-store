import type { SVGProps } from "react";

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M6.72222 2.83333C8.86998 2.83333 10.6111 4.57445 10.6111 6.72222M11.1235 11.1205L14.5 14.5M12.9444 6.72222C12.9444 10.1587 10.1587 12.9444 6.72222 12.9444C3.28578 12.9444 0.5 10.1587 0.5 6.72222C0.5 3.28578 3.28578 0.5 6.72222 0.5C10.1587 0.5 12.9444 3.28578 12.9444 6.72222Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
