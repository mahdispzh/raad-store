import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Subtitle } from "../shared/ui";

const meta: Meta<typeof Subtitle> = {
  title: "Typography/Subtitle",
  component: Subtitle,
  tags: ["autodocs"],

  argTypes: {
    size: {
      control: "select",
      options: ["xl", "2xl", "3xl", "4xl"],
    },
    weight: {
      control: "select",
      options: ["light", "regular", "medium", "bold"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "white", "danger", "success"],
    },
    text: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Subtitle>;

export const Default: Story = {
  args: {
    text: "زیرعنوان نمونه",
    size: "xl",
    weight: "medium",
    color: "primary",
  },
};

export const Large: Story = {
  args: {
    text: "Subtitle بزرگ",
    size: "4xl",
  },
};

export const Colors: Story = {
  args: {
    text: "Subtitle رنگی",
    color: "danger",
  },
};
