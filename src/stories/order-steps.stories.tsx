import { OrderSteps } from "@/src/shared/ui/order-steps/order-step-ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof OrderSteps> = {
  title: "UI/OrderSteps",

  component: OrderSteps,

  tags: ["autodocs"],

  argTypes: {
    currentStep: {
      control: {
        type: "number",
        min: 0,
        max: 4,
      },
    },
  },

  args: {
    currentStep: 1,
  },
};

export default meta;

type Story = StoryObj<typeof OrderSteps>;

export const Default: Story = {};

export const StepOne: Story = {
  args: {
    currentStep: 0,
  },
};

export const StepTwo: Story = {
  args: {
    currentStep: 1,
  },
};

export const StepThree: Story = {
  args: {
    currentStep: 2,
  },
};

export const Completed: Story = {
  args: {
    currentStep: 4,
  },
};

export const CustomSteps: Story = {
  args: {
    currentStep: 2,

    steps: ["سبد خرید", "اطلاعات", "پرداخت", "اتمام"],
  },
};
