import { ErrorIcon } from "@/src/shared/constants/icons/dashboard-error-icon";
import { SuccessOutlineIcon } from "@/src/shared/constants/icons/dashboard-success-outline-icon";

export function CommentsCardAction() {
  return (
    <div className={"flex gap-1"}>
      <SuccessOutlineIcon color={"text-success"} size={"lg"} />

      <ErrorIcon color={"text-danger"} size={"lg"} />
    </div>
  );
}
