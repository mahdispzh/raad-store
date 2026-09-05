import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductCard } from "../shared/ui";

const meta: Meta<typeof ProductCard> = {
  title: "UI/Cards/CommentProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",

    // 👇 Docs config
    docs: {
      description: {
        component:
          "CommentProductCard component for e-commerce products with 3 variants: simple, wishlist, and likeable (toggle heart state).",
      },
    },
  },

  // 👇 Enable auto-generated docs page
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ProductCard>;

/* -----------------------------------
   1. SIMPLE
------------------------------------*/
export const Simple: Story = {
  args: {
    variant: "simple",
    badge: "30%",
    isLiked: false,
  },
};

/* -----------------------------------
   2. WISHLIST
------------------------------------*/
export const Wishlist: Story = {
  args: {
    variant: "wishlist",
    badge: "30%",
    isLiked: false,
  },
};

/* -----------------------------------
   3. LIKEABLE (inactive)
------------------------------------*/
export const Likeable: Story = {
  args: {
    variant: "likeable",
    badge: "30%",
    isLiked: false,
  },
};

/* -----------------------------------
   4. LIKEABLE (active)
------------------------------------*/
export const Liked: Story = {
  args: {
    variant: "likeable",
    badge: "30%",
    isLiked: true,
  },
};
