import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatusInfoProducts } from "../shared/ui";

const meta: Meta<typeof StatusInfoProducts> = {
  title: "UI/StatusInfoProducts",
  component: StatusInfoProducts,

  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "کامپوننت نمایش وضعیت محصولات با آیکون، عدد و متن پیش‌فرض یا سفارشی.",
      },
    },
  },

  tags: ["autodocs"],

  argTypes: {
    variant: {
      control: "select",
      options: ["success", "warning", "danger", "refresh"],
    },
    value: {
      control: "text",
    },
    label: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof StatusInfoProducts>;

export const SuccessDefault: Story = {
  args: {
    variant: "refresh",
  },
};

export const WarningDefault: Story = {
  args: {
    variant: "warning",
  },
};

export const DangerDefault: Story = {
  args: {
    variant: "danger",
  },
};

export const RefreshDefault: Story = {
  args: {
    variant: "refresh",
  },
};
