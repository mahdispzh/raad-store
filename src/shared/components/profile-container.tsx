import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function ProfileContainer({ children }: Props) {
  return (
    <div className={"flex w-full items-center justify-center"}>
      <div className={"w-[95%] pt-4 xl:pt-[1vw]"}>
        <div className={"gap-layout flex flex-col xl:flex-row"}>{children}</div>
      </div>
    </div>
  );
}
