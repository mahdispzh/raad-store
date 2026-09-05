import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function ProfileSidebar({ children }: Props) {
  return (
    <div className={"gap-layout flex w-full flex-col xl:w-[25%]"}>
      {children}
    </div>
  );
}
