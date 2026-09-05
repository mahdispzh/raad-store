// _components/otp-select/OtpInput.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { OtpInput } from "../shared/ui";

const meta: Meta<typeof OtpInput> = {
  title: "UI/OtpInput",
  component: OtpInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    length: { control: { type: "number", min: 4, max: 8, step: 1 } },
    status: {
      control: "radio",
      options: ["default", "success", "error"],
    },
    value: { control: "text" },
    disabled: { control: "boolean" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof OtpInput>;

export const Default: Story = {
  args: {
    length: 4,
    status: "default",
    value: "",
  },
};

export const Success: Story = {
  args: {
    length: 4,
    status: "success",
    value: "1234",
  },
};

export const Error: Story = {
  args: {
    length: 4,
    status: "error",
    value: "5678",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-12">
      <div>
        <p className="mb-3 font-bold text-[var(--color-primary)]">
          پیش‌فرض (Default)
        </p>
        <OtpInput length={4} status="default" />
      </div>

      <div>
        <p className="mb-3 font-bold text-[var(--color-success)]">
          موفقیت (Success)
        </p>
        <OtpInput length={4} status="success" value="1234" />
      </div>

      <div>
        <p className="mb-3 font-bold text-[var(--color-danger)]">
          خطا (Error) + لرزش
        </p>
        <OtpInput length={4} status="error" value="5678" />
      </div>

      <div>
        <p className="mb-3 font-bold text-[var(--color-primary)]">۴ رقمی</p>
        <OtpInput length={4} status="default" />
      </div>

      <div>
        <p className="mb-3 font-bold text-[var(--color-primary)]">۶ رقمی</p>
        <OtpInput length={6} status="default" />
      </div>

      <div>
        <p className="mb-3 font-bold text-[var(--color-secondary)]">
          غیرفعال (Disabled)
        </p>
        <OtpInput length={4} status="default" value="1234" disabled />
      </div>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: () => {
    const [otpValue, setOtpValue] = useState("");
    const [status, setStatus] = useState<"default" | "success" | "error">(
      "default",
    );

    const handleVerify = () => {
      if (otpValue === "1234") {
        setStatus("success");
      } else if (otpValue.length === 4) {
        setStatus("error");
      }
    };

    const handleReset = () => {
      setOtpValue("");
      setStatus("default");
    };

    return (
      <div className="flex flex-col items-center gap-6 rounded-lg bg-[var(--color-white)] p-8 shadow-md">
        <h3 className="font-bold text-xl text-[var(--color-primary)]">
          دموی تعاملی OTP
        </h3>

        <OtpInput
          length={4}
          value={otpValue}
          onChange={setOtpValue}
          status={status}
        />

        <div className="flex gap-3">
          <button
            onClick={handleVerify}
            className="rounded-md bg-[var(--color-secondary)] px-6 py-2 text-white transition-all hover:opacity-80"
          >
            تأیید کد
          </button>
          <button
            onClick={handleReset}
            className="rounded-md bg-[var(--color-accent)] px-6 py-2 text-[var(--color-primary)] transition-all hover:opacity-80"
          >
            ریست
          </button>
        </div>

        <p className="text-sm text-[var(--color-secondary)]">
          کد صحیح: 1234 | مقدار فعلی: {otpValue || "---"}
        </p>
      </div>
    );
  },
};
