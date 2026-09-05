// src/stories/styled-button.stories.tsx
import { PlusIcon } from "@/src/shared/constants/icons/plus-icon";
import { StyledButton } from "@/src/shared/ui/styled-button/styled-button.ui";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof StyledButton> = {
  title: "Ui/StyledButton",
  component: StyledButton,
  argTypes: {
    variant: {
      control: "select",
      options: ["size", "color", "icon", "rating", "favorite"],
    },
    select: { control: "boolean" },
    label: { control: "text" },
    color: { control: "color" },
    type: {
      control: "select",
      options: ["primary", "secondary", "quaternary"],
    },
    style: {
      control: "select",
      options: ["fill", "outline"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof StyledButton>; // ✅ تغییر: styledButton -> StyledButton

// ====================== Size Button ======================
export const SizeButton: Story = {
  args: {
    variant: "size",
    label: "M",
    select: true,
    action: () => alert("Size button clicked"),
  },
};

// ====================== Color Button ======================
export const ColorButton: Story = {
  args: {
    variant: "color",
    color: "secondary",
    select: false,
    action: () => alert("Color button clicked"),
  },
};

export const ColorButtonSelected: Story = {
  args: {
    variant: "color",
    color: "secondary",
    select: true,
    action: () => alert("Color selected"),
  },
};

// ====================== Icon Button ======================
export const IconButtonPrimary: Story = {
  args: {
    variant: "icon",
    type: "primary",
    icon: <PlusIcon size="lg" color="text-white" />,
    action: () => alert("Icon button clicked"),
  },
};

export const IconButtonSecondary: Story = {
  args: {
    variant: "icon",
    type: "secondary",
    icon: <PlusIcon size="md" color="text-black" />,
    action: () => alert("Secondary icon clicked"),
  },
};

// ====================== Rating Stars ======================
export const Rating: Story = {
  args: {
    variant: "rating",
    ratingAction: (value: number) => console.log("Rated:", value),
  },
};

export const RatingWithAction: Story = {
  args: {
    variant: "rating",
    ratingAction: (value: number) => alert(`You rated: ${value} stars`),
  },
};

// ====================== FAVORITE BUTTON ======================
export const FavoriteCircular: Story = {
  args: {
    variant: "favorite",
    type: "primary",
    select: false,
    action: () => alert("Added to favorites"),
  },
};
