// src/stories/quick-card.stories.tsx
import QuickCard from "@/src/app/dashboard/home/_components/quick-card.ui";
import type { Meta, StoryObj } from "@storybook/react";

// آیکون‌های نمونه (می‌تونی آیکون‌های واقعی خودت رو جایگزین کنی)
const SampleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      fill="white"
    />
  </svg>
);

const EditIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
      fill="white"
    />
  </svg>
);

const meta: Meta<typeof QuickCard> = {
  title: "UI/QuickCard",
  component: QuickCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
### کامپوننت QuickCard

یک کامپوننت منعطف برای نمایش کارت‌های سریع با قابلیت نمایش:
- **متن اصلی** (لیبل)
- **مقدار** (اختیاری)
- **آیکون** (اختیاری)
- **دکمه** (اختیاری)

این کامپوننت به صورت fully responsive طراحی شده و در صفحات مختلف به خوبی نمایش داده می‌شود.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "کلاس‌های CSS اضافی",
    },
  },
};

export default meta;
type Story = StoryObj<typeof QuickCard>;

// استوری ۱: حالت پایه (فقط متن)
export const Default: Story = {
  args: {
    items: [
      {
        id: 1,
        label: "تعداد سفارشات",
        value: "۱۵۶",
      },
      {
        id: 2,
        label: "مبلغ کل",
        value: "۱۲,۵۰۰,۰۰۰ تومان",
      },
      {
        id: 3,
        label: "مشتریان جدید",
        value: "+۲۴",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "حالت ساده: فقط نمایش لیبل و مقدار بدون آیکون و دکمه",
      },
    },
  },
};

// استوری ۲: با آیکون
export const WithIcon: Story = {
  args: {
    items: [
      {
        id: 1,
        label: "محصولات",
        value: "۴۸ عدد",
        icon: <SampleIcon />,
      },
      {
        id: 2,
        label: "دسته‌بندی‌ها",
        value: "۱۲ دسته",
        icon: <SampleIcon />,
      },
      {
        id: 3,
        label: "برندها",
        value: "۲۸ برند",
        icon: <SampleIcon />,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "نمایش آیکون در کنار مقدار - آیکون در پس‌زمینه سبز (bg-success) قرار می‌گیرد",
      },
    },
  },
};

// استوری ۳: با دکمه
export const WithButton: Story = {
  args: {
    items: [
      {
        id: 1,
        label: "ویرایش پروفایل",
        buttonIcon: <EditIcon />,
        onClick: () => alert("ویرایش پروفایل"),
      },
      {
        id: 2,
        label: "تنظیمات",
        buttonIcon: <EditIcon />,
        onClick: () => alert("تنظیمات"),
      },
      {
        id: 3,
        label: "گزارش‌گیری",
        buttonIcon: <EditIcon />,
        onClick: () => alert("گزارش‌گیری"),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "نمایش دکمه در سمت راست کارت - دکمه با رنگ primary و افکت‌های هاور و کلیک",
      },
    },
  },
};

// استوری ۴: ترکیبی (متن + مقدار + آیکون + دکمه)
export const Complete: Story = {
  args: {
    items: [
      {
        id: 1,
        label: "سفارشات امروز",
        value: "۳۲ سفارش",
        icon: <SampleIcon />,
        buttonIcon: <EditIcon />,
        onClick: () => alert("مشاهده جزئیات سفارشات"),
      },
      {
        id: 2,
        label: "فروش امروز",
        value: "۸,۵۰۰,۰۰۰ تومان",
        icon: <SampleIcon />,
        buttonIcon: <EditIcon />,
        onClick: () => alert("مشاهده جزئیات فروش"),
      },
      {
        id: 3,
        label: "بازدیدکنندگان",
        value: "۱,۲۸۴ نفر",
        icon: <SampleIcon />,
        buttonIcon: <EditIcon />,
        onClick: () => alert("مشاهده آمار بازدیدکنندگان"),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "حالت کامل: نمایش همزمان لیبل، مقدار، آیکون و دکمه با قابلیت کلیک",
      },
    },
  },
};

// استوری ۵: داینامیک (تعاملی)
export const Interactive: Story = {
  args: {
    items: [
      {
        id: 1,
        label: "کلیک کنید",
        value: "تعداد کلیک: ۰",
        buttonIcon: <EditIcon />,
        onClick: () => {
          // اینجا می‌تونی logic تعاملی بنویسی
          console.log("دکمه کلیک شد!");
        },
      },
      {
        id: 2,
        label: "متن قابل تغییر",
        value: "مقدار نمونه",
        icon: <SampleIcon />,
      },
      {
        id: 3,
        label: "کاربر ویژه",
        value: "فعال",
        buttonIcon: <EditIcon />,
        onClick: () => alert("کاربر ویژه!"),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "حالت تعاملی - دکمه‌ها رویدادهای جاوااسکریپتی دارند",
      },
    },
  },
};

// استوری ۶: سفارشی با کلاس اضافی
export const CustomClassName: Story = {
  args: {
    items: [
      {
        id: 1,
        label: "ویژه",
        value: "پریمیوم",
        icon: <SampleIcon />,
      },
      {
        id: 2,
        label: "طلایی",
        value: "VIP",
        icon: <SampleIcon />,
      },
      {
        id: 3,
        label: "الماس",
        value: "پلاتینیوم",
        icon: <SampleIcon />,
      },
    ],
    className: "max-w-4xl mx-auto",
  },
  parameters: {
    docs: {
      description: {
        story: "استفاده از className اضافی برای محدود کردن عرض و وسط‌چین کردن",
      },
    },
  },
};

// استوری ۷: responsive test
export const ResponsiveTest: Story = {
  args: {
    items: [
      { id: 1, label: "موبایل", value: "responsive" },
      { id: 2, label: "تبلت", value: "responsive" },
      { id: 3, label: "دسکتاپ", value: "responsive" },
      { id: 4, label: "۴K", value: "responsive" },
      { id: 5, label: "سریع", value: "responsive" },
      { id: 6, label: "بهینه", value: "responsive" },
    ],
  },
  parameters: {
    viewport: {
      defaultViewport: "responsive",
    },
    docs: {
      description: {
        story: "تست ریسپانسیو: در موبایل ۱ ستون، تبلت ۲ ستون، دسکتاپ ۳ ستون",
      },
    },
  },
};
