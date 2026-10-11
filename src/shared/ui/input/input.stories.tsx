import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./input";
import { SearchIcon } from "@/src/shared/ui/icons/search-icon";

const meta = {
  title: "Shared/Input",
  component: Input,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="bg-foreground p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    placeholder: "جستجو",
    size: "md",
    disabled: false,
  },
  argTypes: {
    placeholder: { control: "text", description: "متن راهنما" },
    size: {
      control: "select",
      options: ["md", "lg"],
      description: "اندازه فیلد",
    },
    disabled: { control: "boolean", description: "غیرفعال کردن فیلد" },
    icon: { control: false },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { icon: <SearchIcon /> },
};

export const Search: Story = {
  args: { icon: <SearchIcon /> },
};

export const Large: Story = {
  args: { size: "lg", icon: <SearchIcon /> },
};

export const WithoutIcon: Story = {
  args: { placeholder: "نام خود را وارد کنید" },
};

export const Disabled: Story = {
  args: { icon: <SearchIcon />, disabled: true },
};