import { BadgeNumber } from "@/src/shared/ui/badge-number/badge-number.ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BadgeNumber> = {
  title: "UI/BadgeNumber",

  component: BadgeNumber,

  tags: ["autodocs"],

  argTypes: {
    size: {
      control: "select",

      options: ["xs", "sm", "md", "lg"],
    },

    variant: {
      control: "radio",

      options: ["circle", "square"],
    },
  },

  args: {
    value: 3,
    size: "sm",
    variant: "circle",
  },
};

export default meta;

type Story = StoryObj<typeof BadgeNumber>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: "xs",
    value: 1,
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    value: 12,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    value: 99,
  },
};

export const Square: Story = {
  args: {
    variant: "square",
    value: 8,
  },
};
