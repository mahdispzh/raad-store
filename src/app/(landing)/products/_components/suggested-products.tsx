// // نمایش لیست محصولات پیشنهادی با استفاده از کامپوننت ProductCardPost (نسخه پیشرفته‌تر).

// import { Title } from "@/src/shared/ui";
// import { SuggestedProductsProps } from "../_types/landing-product.types";

// export function SuggestedProducts({ products }: SuggestedProductsProps) {
//   return (
//     <section className="mb-8">
//       <Title variant="underlined" text="کالاهای پیشنهادی" size="3xl" />
//       <div className="grid w-full grid-cols-4 gap-[3vw] pt-[2vw]">
//         {products.map((product) => (
//           <ProductCardPost
//             key={product.id}
//             src={product.imageSrc}
//             title={product.productName}
//             size="M"
//             colorName="مشکی"
//             colorCode="#000000"
//             count={1}
//             onIncrease={() => console.log("increase", product.id)}
//             onDecrease={() => console.log("decrease", product.id)}
//             onRemove={() => console.log("remove", product.id)}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }
