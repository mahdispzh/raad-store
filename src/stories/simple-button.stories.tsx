// simple-button.stories.tsx

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SimpleButton } from "../shared/ui/simple-button/simple-button.ui";

const meta = {
  title: "Components/SimpleButton",
  component: SimpleButton,
  parameters: {
    docs: {
      description: {
        component: `
یک دکمه ساده و ریسپانسیو با قابلیت نمایش آیکون.

        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "متن دکمه",
    },
    icon: {
      control: false,
      description: "آیکون دکمه",
    },
    iconPosition: {
      control: "radio",
      options: ["left", "right"],
      description: "موقعیت آیکون",
    },
    disabled: {
      control: "boolean",
      description: "غیرفعال کردن دکمه",
    },
    action: {
      action: "clicked",
      description: "رویداد کلیک",
    },
  },
} satisfies Meta<typeof SimpleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// استوری‌ها
export const Default: Story = {
  args: {
    label: "دکمه",
    action: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "دکمه ساده بدون آیکون",
      },
    },
  },
};
