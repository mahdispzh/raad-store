import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tab } from "./tab";
import { EngineeringIcon } from "@/src/shared/ui/icons/engineering-icon";
import { ExecutionSupportIcon } from "@/src/shared/ui/icons/execution-support-icon";

const meta = {
  title: "Shared/Tab",
  component: Tab,
  tags: ["autodocs"],
  args: {
    children: "مهندسی و ساخت",
    active: true,
  },
  argTypes: {
    children: { control: "text", description: "متن تب" },
    active: { control: "boolean", description: "تب فعال" },
    icon: { control: false },
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

function TabsDemo() {
  const [current, setCurrent] = useState("engineering");

  return (
    <div role="tablist" className="flex gap-3">
      <Tab
        active={current === "engineering"}
        icon={<EngineeringIcon />}
        onClick={() => setCurrent("engineering")}
      >
        مهندسی و ساخت
      </Tab>
      <Tab
        active={current === "support"}
        icon={<ExecutionSupportIcon />}
        onClick={() => setCurrent("support")}
      >
        اجرا و پشتیبانی
      </Tab>
    </div>
  );
}

export const Playground: Story = {
  args: { icon: <EngineeringIcon /> },
};

export const Active: Story = {
  args: { active: true, icon: <EngineeringIcon /> },
};

export const Inactive: Story = {
  args: {
    children: "اجرا و پشتیبانی",
    active: false,
    icon: <ExecutionSupportIcon />,
  },
};

export const Group: Story = {
  render: () => <TabsDemo />,
};