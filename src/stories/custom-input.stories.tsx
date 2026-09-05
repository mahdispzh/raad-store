import { CustomInput } from "@/src/shared/ui/custom-input/custom-input-ui";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof CustomInput> = {
  title: "UI/CustomInput",
  component: CustomInput,

  parameters: {
    layout: "centered",

    docs: {
      description: {
        component: `
کامپوننت ورودی عمومی پروژه.

### قابلیت‌ها

- پشتیبانی از text
- پشتیبانی از email
- پشتیبانی از password
- پشتیبانی از phone
- پشتیبانی از number
- نمایش خطا
- نمایش فیلد اجباری
- پشتیبانی از آیکون
- سه سایز مختلف

### React Hook Form

این کامپوننت برای استفاده همراه React Hook Form طراحی شده است.

\`\`\`tsx
<Controller
  control={control}
  name="email"
  render={({ field }) => (
    <CustomInput
      {...field}
      value={field.value ?? ""}
      label="ایمیل"
      error={errors.email?.message}
    />
  )}
/>
\`\`\`
        `,
      },
    },
  },

  tags: ["autodocs"],

  argTypes: {
    value: {
      description: "مقدار ورودی",
      control: false,
    },

    onChange: {
      description: "تابع تغییر مقدار",
      action: "changed",
    },

    label: {
      description: "عنوان فیلد",
      control: "text",
    },

    placeholder: {
      description: "متن راهنما",
      control: "text",
    },

    required: {
      description: "نمایش ستاره فیلد اجباری",
      control: "boolean",
    },

    disabled: {
      description: "غیرفعال کردن فیلد",
      control: "boolean",
    },

    error: {
      description: "پیام خطا",
      control: "text",
    },

    type: {
      description: "نوع ورودی",
      control: "select",

      options: ["text", "email", "password", "number", "phone"],
    },

    size: {
      description: "اندازه کامپوننت",
      control: "radio",

      options: ["sm", "md", "lg"],
    },

    iconPosition: {
      description: "محل نمایش آیکون",
      control: "radio",

      options: ["left", "right"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof CustomInput>;

function ControlledInput(props: React.ComponentProps<typeof CustomInput>) {
  const [value, setValue] = useState("");

  return (
    <div className="w-[350px]">
      <CustomInput {...props} value={value} onChange={setValue} />
    </div>
  );
}

export const Default: Story = {
  render: (args) => <ControlledInput {...args} />,

  args: {
    label: "نام و نام خانوادگی",
    placeholder: "نام خود را وارد کنید",
  },
};

export const Error: Story = {
  render: (args) => <ControlledInput {...args} />,

  args: {
    label: "ایمیل",
    error: "ایمیل معتبر نیست",
  },
};

export const Password: Story = {
  render: (args) => <ControlledInput {...args} />,

  args: {
    type: "password",
    label: "رمز عبور",
  },
};

export const Phone: Story = {
  render: (args) => <ControlledInput {...args} />,

  args: {
    type: "phone",
    label: "شماره موبایل",
  },
};

export const Number: Story = {
  render: (args) => <ControlledInput {...args} />,

  args: {
    type: "number",
    label: "سن",
  },
};

export const Disabled: Story = {
  render: (args) => <ControlledInput {...args} />,

  args: {
    label: "غیرفعال",
    disabled: true,
  },
};
