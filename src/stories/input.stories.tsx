import { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../shared/ui";

type FormValues = {
  value: string;
};

type InputWrapperProps = React.ComponentProps<typeof Input<FormValues>>;

function InputWrapper(props: InputWrapperProps) {
  const { control } = useForm<FormValues>();

  return (
    <div className="w-[400px]">
      <Input<FormValues> {...props} control={control} />
    </div>
  );
}

const meta: Meta<typeof InputWrapper> = {
  title: "UI/Input",

  component: InputWrapper,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",

    docs: {
      description: {
        component:
          "Reusable controlled select component built with Next.js, TailwindCSS and react-hook-form.",
      },
    },
  },

  argTypes: {
    name: {
      control: "text",
    },

    label: {
      control: "text",
    },

    placeholder: {
      control: "text",
    },

    helperText: {
      control: "text",
    },

    type: {
      control: "select",

      options: ["text", "number"],
    },

    required: {
      control: "boolean",
    },

    disabled: {
      control: "boolean",
    },

    status: {
      control: "select",

      options: ["default", "error", "success"],
    },

    size: {
      control: "select",

      options: ["sm", "md"],
    },
  },

  args: {
    name: "value",

    label: "Input Label",

    placeholder: "Type here...",

    helperText: "Helper text",

    type: "text",

    required: false,

    disabled: false,

    status: "default",

    size: "md",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <InputWrapper {...args} size="md" label="Medium Input" />

      <InputWrapper {...args} size="sm" label="Small Input" />
    </div>
  ),
};

export const Statuses: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <InputWrapper
        {...args}
        status="default"
        label="Default State"
        helperText="Primary style"
      />

      <InputWrapper
        {...args}
        status="success"
        label="Success State"
        helperText="Everything is fine"
      />

      <InputWrapper
        {...args}
        status="error"
        label="Error State"
        helperText="Something went wrong"
      />
    </div>
  ),
};
