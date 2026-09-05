import { DashboardContainer } from "@/src/shared/components/dashboard-container";
import { DashboardMain } from "@/src/shared/components/dashboard-main";

import { CommentsList } from "@/src/app/dashboard/comments/_components/comments-card/comments-list";
import { CommentsHeader } from "@/src/app/dashboard/comments/_components/comments-header";
import { useComments } from "@/src/app/dashboard/comments/_hooks/use-comments";

export default function Page() {
  const { comments } = useComments();

  return (
    // <DashboardContainer>
    //   <DashboardProfileSidebar />

    //   <DashboardMain>
    //     <CommentsHeader />

    //     <CommentsList comments={comments} />
    //   </DashboardMain>
    // </DashboardContainer>
    <>
    </>
  );
}
