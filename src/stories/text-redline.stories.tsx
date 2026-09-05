import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TextRedLine } from "../shared/ui";

const meta: Meta<typeof TextRedLine> = {
  title: "Components/UI/TextRedLine",
  component: TextRedLine,
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: "text",
      description: "متن مورد نظر برای نمایش",
      table: {
        type: { summary: "string" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "سایز متن",
      table: {
        type: { summary: "TextSize" },
        defaultValue: { summary: "md" },
      },
    },
    weight: {
      control: "select",
      options: ["light", "regular", "medium", "bold"],
      description: "وزن (ضخامت) متن",
      table: {
        type: { summary: "TextWeight" },
        defaultValue: { summary: "regular" },
      },
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "white", "danger", "success"],
      description: "رنگ متن",
      table: {
        type: { summary: "TextColor" },
        defaultValue: { summary: "primary" },
      },
    },
    isUnderline: {
      control: "boolean",
      description: "نمایش خط زیرین قرمز زیر متن",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    as: {
      control: "select",
      options: ["p", "span", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
      description: "تگ HTML مورد استفاده",
      table: {
        type: { summary: "keyof JSX.IntrinsicElements" },
        defaultValue: { summary: "p" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextRedLine>;
