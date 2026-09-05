import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ImageUploader from "../shared/ui/image-uploader/image-uploader.ui";

const meta: Meta<typeof ImageUploader> = {
  title: "Ui/ImageUploader",
  component: ImageUploader,
  tags: ["autodocs"],
  argTypes: {
    initialState: {
      control: "select",
      options: ["default", "loading", "success", "error"],
    },
    size: {
      control: "select",
      options: ["small", "large"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ImageUploader>;

export const Small: Story = {
  args: {
    initialState: "default",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    initialState: "default",
    size: "large",
  },
};

export const Loading: Story = {
  args: {
    initialState: "loading",
    size: "small",
  },
};

export const Success: Story = {
  args: {
    initialState: "success",
    size: "small",
  },
};

export const Error: Story = {
  args: {
    initialState: "error",
    size: "small",
  },
};
