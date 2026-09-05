import { Title } from "@/src/shared/ui";

export function ProductDescription({ description }: { description: string }) {
  return (
    <section className="mb-8">
      <Title variant="underlined" text="معرفی کالا" size="3xl" />
      <div
        // className="product-description pt-4 md:pt-[2vw] [&_img]:mx-auto [&_img]:my-4 [&_img]:block [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-lg"
        className="pt-4 md:pt-[2vw] [&_img]:my-4 [&_img]:mr-0 [&_img]:ml-auto [&_img]:block [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-lg"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </section>
  );
}
