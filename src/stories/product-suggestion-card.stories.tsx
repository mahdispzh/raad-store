import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductSuggestionCard } from "../shared/ui";

const meta: Meta<typeof ProductSuggestionCard> = {
  title: "UI/Cards/ProductSuggestionCard",
  component: ProductSuggestionCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof ProductSuggestionCard>;

/* -----------------------------------
   1. DEFAULT
------------------------------------*/
export const Default: Story = {
  args: {
    isLiked: false,
  },
};

/* -----------------------------------
   2. LIKED STATE
------------------------------------*/
export const Liked: Story = {
  args: {
    isLiked: true,
  },
};
