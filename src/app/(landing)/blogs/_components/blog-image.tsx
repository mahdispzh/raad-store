import Image from "next/image";

type BlogImageProps = {
  image: string;
  title: string;
};

export function BlogImage({ image, title }: BlogImageProps) {
  return (
    <Image
      src={image}
      alt={title}
      width={539}
      height={523}
      className="overflow-hidden rounded-lg shadow-xl"
    />
  );
}
