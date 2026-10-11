import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { ArrowLeftIcon } from "@/src/shared/ui/icons/arrow-left-icon";

const meta = {
  title: "Shared/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "درخواست مشاوره",
    variant: "primary",
    size: "md",
    disabled: false,
  },
  argTypes: {
    children: { control: "text", description: "متن دکمه" },
    variant: {
      control: "select",
      options: ["primary", "dark", "outline"],
      description: "مدل دکمه",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "اندازه دکمه",
    },
    disabled: { control: "boolean", description: "غیرفعال کردن دکمه" },
    icon: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Primary: Story = {
  args: { variant: "primary" },
};

export const Dark: Story = {
  args: { children: "مشاهده بیشتر", variant: "dark", size: "sm" },
};

export const Outline: Story = {
  args: { children: "مشاهده محصولات", variant: "outline" },
};

export const WithIcon: Story = {
  args: { children: "دکمه با آیکون", icon: <ArrowLeftIcon /> },
};

export const Disabled: Story = {
  args: { children: "دکمه غیرفعال", disabled: true },
};