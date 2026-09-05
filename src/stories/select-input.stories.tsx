import { SelectInput } from "@/src/shared/ui";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof SelectInput> = {
  title: "UI/SelectInput",
  component: SelectInput,

  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    value: {
      control: {
        type: "number",
      },
    },

    unit: {
      control: "radio",
      options: ["toman", "percent"],
    },

    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof SelectInput>;

export const Default: Story = {
  args: {
    label: "مقدار تخفیف",
    placeholder: "عدد را وارد کنید",
    value: 1000,
    unit: "toman",
  },
};

export const Percent: Story = {
  args: {
    label: "درصد تخفیف",
    placeholder: "مثلاً 10",
    value: 10,
    unit: "percent",
  },
};

export const Disabled: Story = {
  args: {
    label: "غیرفعال",
    value: 500,
    unit: "toman",
    disabled: true,
  },
};
