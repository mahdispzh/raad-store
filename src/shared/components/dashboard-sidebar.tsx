import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function DashboardSidebar({ children }: Props) {
  return (
    <div className={"gap-layout flex w-[20%] shrink-0 flex-col"}>
      {children}
    </div>
  );
}