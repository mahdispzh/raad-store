import { CommentsMain } from "@/src/app/profile/comments/components/comments-main";
import { ProfilePageTitle } from "@/src/shared/components/profile-page-title";

export default function page() {
  return (
    <div className={"flex flex-col"}>
      <ProfilePageTitle title={"دیدگاه های من"} />
      <CommentsMain />
    </div>
  );
}
