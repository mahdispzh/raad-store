import { Dot } from "@/src/shared/ui/dot/dot.ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Dot> = {
  title: "UI/Dot",

  component: Dot,

  tags: ["autodocs"],

  argTypes: {
    size: {
      control: "select",

      options: ["sm", "md", "lg"],
    },

    color: {
      control: "select",

      options: ["primary", "secondary", "danger", "success", "gray", "white"],
    },
  },

  args: {
    size: "md",
    color: "primary",
  },
};

export default meta;

type Story = StoryObj<typeof Dot>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Danger: Story = {
  args: {
    color: "danger",
  },
};

export const Success: Story = {
  args: {
    color: "success",
  },
};
