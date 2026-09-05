import { BlogActions } from "./blog-actions";
import { BlogImage } from "./blog-image";

type BlogDetailsProps = {
  image: string;
  title: string;
  views: number;
  createdAt: string;
};

export function BlogDetails({
  image,
  title,
  views,
  createdAt,
}: BlogDetailsProps) {
  return (
    <div className="gap-layout flex w-full flex-col md:w-[539px]">
      <BlogImage image={image} title={title} />

      <BlogActions views={views} createdAt={createdAt} />
    </div>
  );
}
