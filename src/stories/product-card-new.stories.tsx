import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductCardNew } from "../shared/ui";

const meta: Meta<typeof ProductCardNew> = {
  title: "UI/Cards/ProductCardNew",
  component: ProductCardNew,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "ProductCardNew is a simple product card displaying image, title, rating and price with optional 'new' badge.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ProductCardNew>;

/* -----------------------------------
   DEFAULT
------------------------------------*/
export const Default: Story = {
  args: {
    badge: true,
  },
};

/* -----------------------------------
   NO BADGE
------------------------------------*/
export const NoBadge: Story = {
  args: {
    badge: false,
  },
};

/* -----------------------------------
   CUSTOM PRODUCT
------------------------------------*/
export const CustomProduct: Story = {
  args: {
    badge: true,
    title: "کت زمستانی",
    price: 89000,
    rating: 4.6,
    src: "./images/image20.svg",
  },
};
