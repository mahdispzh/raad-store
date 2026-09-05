// Badge.stories.tsx
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "../shared/ui";

const meta: Meta<typeof Badge> = {
  title: "Ui/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["new", "discount", "number", "messages", "rating"],
      description: "نوع نشان",
    },
    label: {
      control: "text",
      description: "متن داخل نشان (فقط برای نوع discount)",
    },
    number: {
      control: "number",
      description: "عدد داخل نشان (فقط برای نوع number و messages)",
    },
    rating: {
      control: "number",
      description: "امتیاز (فقط برای نوع rating)",
    },
    iconSize: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "اندازه آیکون (فقط برای نوع new)",
    },
    iconColor: {
      control: "text",
      description: "کلاس رنگ آیکون (مثل text-danger)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// نوع New
export const NewBadge: Story = {
  args: {
    type: "new",
    iconSize: "sm",
    iconColor: "text-danger",
  },
};

// نوع Discount
export const DiscountBadgeDefaultLabel: Story = {
  args: {
    type: "discount",
  },
};

export const DiscountBadgeWithCustomLabel: Story = {
  args: {
    type: "discount",
    label: "۵۰",
  },
};

// نوع Number
export const NumberBadge: Story = {
  args: {
    type: "number",
    number: 3,
  },
};

export const NumberBadgeWithLargeNumber: Story = {
  args: {
    type: "number",
    number: 99,
  },
};

// نوع Messages
export const MessagesBadge: Story = {
  args: {
    type: "messages",
    number: 5,
  },
};

export const MessagesBadgeWithLargeNumber: Story = {
  args: {
    type: "messages",
    number: 99,
  },
};

// نوع Rating
export const RatingBadge: Story = {
  args: {
    type: "rating",
    rating: 4,
  },
};

export const RatingBadgeWithDecimal: Story = {
  args: {
    type: "rating",
    rating: 4.5,
  },
};

export const RatingBadgeWithHighRating: Story = {
  args: {
    type: "rating",
    rating: 4.8,
  },
};

// نمایش همه نوع بج با هم
export const AllBadgesTogether: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center gap-4">
        <div className="w-24">نوع new:</div>
        <Badge type="new" iconSize="sm" iconColor="text-danger" />
      </div>

      <div className="flex items-center gap-4">
        <div className="w-24">نوع discount:</div>
        <Badge type="discount" label="۲۰" />
      </div>

      <div className="flex items-center gap-4">
        <div className="w-24">نوع number:</div>
        <Badge type="number" number={3} />
      </div>

      <div className="flex items-center gap-4">
        <div className="w-24">نوع messages:</div>
        <Badge type="messages" number={5} />
      </div>

      <div className="flex items-center gap-4">
        <div className="w-24">نوع rating:</div>
        <Badge type="rating" rating={4.5} />
      </div>
    </div>
  ),
};

// نمایش واریانت‌های مختلف rating
export const RatingVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex items-center gap-4">
        <span className="w-24">امتیاز ۴:</span>
        <Badge type="rating" rating={4} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24">امتیاز ۴.۵:</span>
        <Badge type="rating" rating={4.5} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24">امتیاز ۳.۲:</span>
        <Badge type="rating" rating={3.2} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24">امتیاز ۵:</span>
        <Badge type="rating" rating={5} />
      </div>
    </div>
  ),
};

// نمایش واریانت‌های مختلف discount
export const DiscountVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-8">
      <Badge type="discount" label="۱۰" />
      <Badge type="discount" label="۲۰" />
      <Badge type="discount" label="۳۰" />
      <Badge type="discount" label="۵۰" />
      <Badge type="discount" label="۷۰" />
    </div>
  ),
};

// نمایش واریانت‌های مختلف new با سایزهای مختلف
export const NewBadgeSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-8">
      <Badge type="new" iconSize="xs" iconColor="text-danger" />
      <Badge type="new" iconSize="sm" iconColor="text-danger" />
      <Badge type="new" iconSize="md" iconColor="text-danger" />
      <Badge type="new" iconSize="lg" iconColor="text-danger" />
    </div>
  ),
};

// نمونه استفاده در کارت محصول
export const ProductCardExample: Story = {
  render: () => (
    <div className="relative w-80 overflow-hidden rounded-lg bg-white shadow-lg">
      {/* تصویر محصول */}
      <div className="relative h-48 bg-gray-200">
        <div className="absolute top-2 right-2">
          <Badge type="new" iconSize="sm" iconColor="text-danger" />
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge type="discount" label="۲۰" />
        </div>
      </div>

      {/* اطلاعات محصول */}
      <div className="p-4">
        <h3 className="mb-2 font-bold text-lg">کیف زنانه</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 line-through">۲۵۰,۰۰۰</span>
            <span className="font-bold text-danger">۲۰۰,۰۰۰ تومان</span>
          </div>
          <Badge type="rating" rating={4.5} />
        </div>
      </div>
    </div>
  ),
};
