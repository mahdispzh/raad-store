import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Price } from "../shared/ui";

const meta: Meta<typeof Price> = {
  title: "UI/Price",
  component: Price,
  tags: ["autodocs"],
  argTypes: {
    price: { control: "number" },
    discount: { control: "number" },
    size: {
      control: "select",
      options: ["xs", "md", "lg", "xl", "2xl"],
      description: "سایز متن و آیکون",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Price>;

// حالت بدون تخفیف، سایز پیش‌فرض (md)
export const Default: Story = {
  args: {
    price: 250000,
  },
};

// حالت بدون تخفیف با سایز‌های مختلف
export const SizeXS: Story = {
  args: {
    price: 250000,
    size: "xs",
  },
};

export const SizeMD: Story = {
  args: {
    price: 250000,
    size: "md",
  },
};

export const SizeLG: Story = {
  args: {
    price: 250000,
    size: "lg",
  },
};

export const SizeXL: Story = {
  args: {
    price: 250000,
    size: "xl",
  },
};

export const Size2XL: Story = {
  args: {
    price: 250000,
    size: "2xl",
  },
};

// حالت تخفیف‌دار
export const Discount10Percent: Story = {
  args: {
    price: 250000,
    discount: 10,
    size: "md",
  },
};

export const Discount25Percent: Story = {
  args: {
    price: 250000,
    discount: 25,
    size: "lg", // سایز بزرگتر برای نمایش بهتر
  },
};

export const NoPrice: Story = {
  args: {
    size: "md",
  },
};

export const NoPriceLarge: Story = {
  args: {
    size: "xl",
  },
};
