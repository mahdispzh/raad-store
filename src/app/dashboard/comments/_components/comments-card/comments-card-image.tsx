import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

export function CommentsCardImage({ src, alt }: Props) {
  return <Image src={src} alt={alt} width={114} height={143} />;
}
