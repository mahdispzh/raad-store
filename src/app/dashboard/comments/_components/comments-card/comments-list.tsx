import { CommentsCard } from "@/src/app/dashboard/comments/_components/comments-card/comments-card";
import { CommentsItem } from "@/src/app/dashboard/comments/_types/comments.types";

interface Props {
  comments: CommentsItem[];
}

export function CommentsList({ comments }: Props) {
  return (
    <div className={"flex h-full flex-col overflow-x-auto px-6"} dir={"ltr"}>
      {comments.map((comment, index) => (
        <CommentsCard
          key={comment.id}
          comment={comment}
          isLast={index === comments.length - 1}
        />
      ))}
    </div>
  );
}
