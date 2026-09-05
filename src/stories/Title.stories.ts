import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Title } from "../shared/ui";

const meta: Meta<typeof Title> = {
  title: "UI/Title",
  component: Title,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },

    size: {
      control: "select",
      options: ["2xl", "3xl", "4xl"],
      description: "سایز متن",
    },

    variant: {
      control: "select",
      options: ["default", "underlined", "featured", "underlined-secondary"],
      description: "نوع نمایش عنوان",
    },

    as: {
      control: "select",
      options: ["h2", "h3", "h4"],
      description: "تگ HTML عنوان",
    },
  },

  args: {
    text: "عنوان نمونه",
    size: "3xl",
    variant: "default",
    as: "h2",
  },
};

export default meta;

type Story = StoryObj<typeof Title>;

// --------------------
// Default
// --------------------
export const Default: Story = {};

// --------------------
// Sizes
// --------------------
export const Size2XL: Story = {
  args: {
    size: "2xl",
    text: "عنوان با سایز 2xl",
  },
};

export const Size3XL: Story = {
  args: {
    size: "3xl",
    text: "عنوان با سایز 3xl",
  },
};

export const Size4XL: Story = {
  args: {
    size: "4xl",
    text: "عنوان با سایز 4xl",
  },
};

// --------------------
// Underlined (danger)
// --------------------
export const Underlined3XL: Story = {
  args: {
    variant: "underlined",
    size: "3xl",
    text: "عنوان با خط قرمز (3xl)",
  },
};

export const Underlined4XL: Story = {
  args: {
    variant: "underlined",
    size: "4xl",
    text: "عنوان با خط قرمز (4xl)",
  },
};

// --------------------
// Underlined Secondary
// --------------------
export const UnderlinedSecondary3XL: Story = {
  args: {
    variant: "underlined-secondary",
    size: "3xl",
    text: "عنوان با خط ثانویه (3xl)",
  },
};

export const UnderlinedSecondary4XL: Story = {
  args: {
    variant: "underlined-secondary",
    size: "4xl",
    text: "عنوان با خط ثانویه (4xl)",
  },
};

// --------------------
// Featured
// --------------------
export const Featured2XL: Story = {
  args: {
    variant: "featured",
    size: "2xl",
    text: "عنوان ویژه (2xl)",
  },
};

export const Featured3XL: Story = {
  args: {
    variant: "featured",
    size: "3xl",
    text: "عنوان ویژه (3xl)",
  },
};

export const Featured4XL: Story = {
  args: {
    variant: "featured",
    size: "4xl",
    text: "عنوان ویژه (4xl)",
  },
};

// --------------------
// HTML Tags
// --------------------
export const AsH3: Story = {
  args: {
    as: "h3",
    text: "عنوان با تگ h3",
  },
};

export const AsH4: Story = {
  args: {
    as: "h4",
    text: "عنوان با تگ h4",
  },
};
