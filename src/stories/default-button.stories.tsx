import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DefaultButton } from "../shared/ui";
import { BagIcon } from "../shared/constants/icons/bag-icon";

const meta: Meta<typeof DefaultButton> = {
  title: "Ui/DefaultButton",
  component: DefaultButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## دکمه استاندارد

یک دکمه کاملاً ریسپانسیو با دو حالت primary و secondary و دو استایل fill و outline.

### ویژگی‌ها:
- **ریسپانسیو**: سایز دکمه و فونت بر اساس viewport تغییر می‌کند
- **فونت**: فقط وزن medium با سایز ثابت ریسپانسیو
- **حالت‌ها**: hover, active, loading, disabled
- **آیکون**: قابلیت اضافه کردن آیکون در دو سمت چپ و راست
- **گرد**: امکان گرد کردن کامل دکمه

### نحوه استفاده:
\`\`\`tsx
import { DefaultButton } from "@/shared/ui";

<DefaultButton
  type="primary"
  style="fill"
  label="ورود"
  action={() => console.log("clicked")}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["primary", "secondary"],
      description: "نوع دکمه",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    style: {
      control: "select",
      options: ["fill", "outline"],
      description: "استایل دکمه",
      table: {
        defaultValue: { summary: "fill" },
      },
    },
    label: {
      control: "text",
      description: "متن دکمه",
    },
    icon: {
      control: "text",
      description: "آیکون دکمه (JSX)",
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
      description: "موقعیت آیکون نسبت به متن",
      table: {
        defaultValue: { summary: "left" },
      },
    },
    isLoading: {
      control: "boolean",
      description: "حالت بارگذاری",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "غیرفعال بودن دکمه",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    rounded: {
      control: "boolean",
      description: "گرد بودن کامل دکمه (دایره‌ای)",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    action: {
      action: "clicked",
      description: "تابع کلیک",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DefaultButton>;

// ============================================
// Primary - Fill
// ============================================

export const PrimaryFill: Story = {
  args: {
    type: "primary",
    style: "fill",
    label: "دکمه اصلی",
        icon: <BagIcon/>,

    action: () => alert("کلیک شد"),
  },
};

