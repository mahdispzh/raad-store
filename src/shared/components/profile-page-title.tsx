import { TextRedLine } from "../ui";

interface Props {
  title: string;
}

export function ProfilePageTitle({ title }: Props) {
  return (
    <div className={"menu-item-padding flex border-b-2 border-gray"}>
      <TextRedLine text={title} size={"md"} weight={"bold"} isUnderline />
    </div>
  );
}
