import { Caption } from "@/src/shared/ui";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Caption> = {
  title: "Typography/Caption",
  component: Caption,
  tags: ["autodocs"],

  argTypes: {
    size: {
      control: "select",
      options: ["2xs", "xs"],
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

type Story = StoryObj<typeof Caption>;

export const Default: Story = {
  args: {
    text: "کپشن نمونه",
    size: "xs",
    weight: "regular",
    color: "primary",
  },
};

export const Small: Story = {
  args: {
    text: "کپشن کوچک",
    size: "2xs",
  },
};

export const Danger: Story = {
  args: {
    text: "هشدار",
    color: "danger",
  },
};
