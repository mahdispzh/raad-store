import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Switch } from "../shared/ui";

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["large", "small"],
    },
    disabled: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    size: "large",
    disabled: false,
    label: "سوئیچ تست",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-10">
      <Switch size="large" label="Large Switch" />
      <Switch size="small" label="Small Switch" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    size: "large",
    disabled: true,
    label: "Disabled Switch",
  },
};
