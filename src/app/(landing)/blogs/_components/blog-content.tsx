type BlogContentProps = {
  content: string;
};

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div
      className="text-lg leading-10 font-normal [&_h2]:mt-6 [&_h2]:mb-4 [&_h2]:font-bold [&_h2]:text-2xl [&_li]:mb-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
