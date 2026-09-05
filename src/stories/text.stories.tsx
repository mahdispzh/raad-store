import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Text } from "../shared/ui";

const meta: Meta<typeof Text> = {
  title: "Typography/Text",
  component: Text,
  tags: ["autodocs"],

  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
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

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    text: "متن نمونه",
    size: "md",
    weight: "regular",
    color: "primary",
  },
};

export const Large: Story = {
  args: {
    text: "متن بزرگ",
    size: "lg",
  },
};

export const MediumBold: Story = {
  args: {
    text: "متن مهم",
    size: "md",
    weight: "bold",
  },
};

export const Success: Story = {
  args: {
    text: "موفقیت آمیز",
    color: "success",
  },
};
