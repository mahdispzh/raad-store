import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function DashboardMain({ children }: Props) {
  return (
    <div className={"gap-layout flex  w-[90%] min-w-0 flex-1 flex-col"}>
      {children}
    </div>
  );
}