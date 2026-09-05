import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Checkbox } from "../shared/ui/check-box/checkbox.ui";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger"],
    },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

/* ------------------ Default ------------------ */
export const Default: Story = {
  args: {
    label: "Checkbox label",
    variant: "primary",
  },
};

/* ------------------ Checked ------------------ */
export const Checked: Story = {
  args: {
    label: "Checked checkbox",
    defaultChecked: true,
  },
};

/* ------------------ Disabled ------------------ */
export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    defaultChecked: true,
    disabled: true,
  },
};

/* ------------------ Variants ------------------ */
export const Primary: Story = {
  args: {
    label: "Primary",
    variant: "primary",
    defaultChecked: true,
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary",
    variant: "secondary",
    defaultChecked: true,
  },
};

export const Danger: Story = {
  args: {
    label: "Danger",
    variant: "danger",
    defaultChecked: true,
  },
};

/* ------------------ Controlled Example ------------------ */
export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={setChecked}
        label={`Controlled: ${checked ? "true" : "false"}`}
      />
    );
  },
};
