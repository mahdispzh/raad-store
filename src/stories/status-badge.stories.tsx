// src/shared/ui/StatusBadge.stories.tsx
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatusBadge } from "../shared/ui";

const meta: Meta<typeof StatusBadge> = {
  title: "UI/StatusBadge",
  component: StatusBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: { type: "select" },
      options: ["approved", "pending", "rejected"],
      description: "وضعیت تایید",
    },
    className: {
      control: "text",
      description: "کلاس‌های اضافی Tailwind",
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Approved: Story = {
  args: {
    status: "approved",
  },
};

export const Pending: Story = {
  args: {
    status: "pending",
  },
};

export const Rejected: Story = {
  args: {
    status: "rejected",
  },
};

export const WithCustomClass: Story = {
  args: {
    status: "pending",
    className: "shadow-lg scale-110",
  },
};
