import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductCardPost } from "../shared/ui/product-card-post/product-card-post";

const meta: Meta<typeof ProductCardPost> = {
  title: "UI/Cards/ProductCardPost",
  component: ProductCardPost,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "ProductCardPost is a cart-style product row showing product image, title, size, color, and a remove action.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ProductCardPost>;

/* -----------------------------------
   DEFAULT
------------------------------------*/
export const Default: Story = {
  args: {
    title: "کت چرم زنانه",
    size: "S",
    colorName: "مشکی",
    colorCode: "#000000",
  },
};

/* -----------------------------------
   CUSTOM PRODUCT
------------------------------------*/
export const CustomProduct: Story = {
  args: {
    title: "کت زمستانی ضخیم",
    size: "L",
    colorName: "قرمز",
    colorCode: "#ff0000",
    src: "./images/image32.svg",
  },
};

/* -----------------------------------
   LONG TITLE (edge case)
------------------------------------*/
export const LongTitle: Story = {
  args: {
    title: "کت چرم زنانه اورجینال برند premium با کیفیت صادراتی",
    size: "XL",
    colorName: "آبی نفتی",
    colorCode: "#1e3a8a",
  },
};
