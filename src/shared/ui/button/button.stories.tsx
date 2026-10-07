import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { ArrowLeftIcon } from "@/src/shared/ui/icons/arrow-left-icon";

const meta = {
  title: "Shared/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "dark", "outline"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: "درخواست مشاوره" },
};

export const Dark: Story = {
  args: { children: "مشاهده بیشتر", variant: "dark", size: "sm" },
};

export const Outline: Story = {
  args: { children: "مشاهده محصولات", variant: "outline" },
};

export const WithIcon: Story = {
  args: { children: "دکمه با آیکون", size: "lg", icon: <ArrowLeftIcon /> },
};

export const Disabled: Story = {
  args: { children: "دکمه غیرفعال", disabled: true },
};