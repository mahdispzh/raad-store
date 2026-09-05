import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useEffect, useState } from "react";
import { SliderButton } from "../shared/ui";

const meta: Meta<typeof SliderButton> = {
  title: "Ui/SliderButton",
  component: SliderButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    count: {
      control: { type: "number" },
    },
    activeIndex: {
      control: { type: "number" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SliderButton>;

export const Default: Story = {
  args: {
    count: 5,
    activeIndex: 0,
  },
  render: (args) => {
    const [active, setActive] = useState(args.activeIndex);

    useEffect(() => {
      setActive(args.activeIndex);
    }, [args.activeIndex]);

    return <SliderButton {...args} activeIndex={active} onChange={setActive} />;
  },
};
