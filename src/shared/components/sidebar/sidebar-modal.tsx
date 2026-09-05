// src/shared/components/sidebar/sidebar-modal.tsx
"use client";

import { useEffect, useState } from "react";
import { DefaultButton, Modal, Text } from "../../ui";
import { CustomInput } from "../../ui/custom-input/custom-input-ui";

export interface SidebarModalUIProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { name: string; phone: string }) => void;
  title?: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  initialName?: string;
  initialPhone?: string;
}

export const SidebarModalUI = ({
  isOpen,
  onClose,
  onConfirm,
  title = "ویرایش اطلاعات حساب کاربری",
  description = "لطفا اطلاعات شناسایی خود را با دقت وارد کنید.",
  cancelLabel = "انصراف",
  confirmLabel = "تایید",
  initialName = "",
  initialPhone = "",
}: SidebarModalUIProps) => {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  // چون این کامپوننت همیشه mount شده و فقط با isOpen نمایش داده می‌شه،
  // useState بالا فقط یک‌بار مقداردهی می‌شه. اطلاعات کاربر (user) در سایدبار
  // به‌صورت async لود می‌شه، پس هر بار که مودال باز می‌شه باید state رو
  // دوباره از initialName/initialPhone بگیریم تا مقادیر واقعی نمایش داده بشه.
  useEffect(() => {
    if (isOpen) {
      setName(initialName);
      setPhone(initialPhone);
      setErrors({});
    }
  }, [isOpen, initialName, initialPhone]);

  const handleSubmit = () => {
    const newErrors: { name?: string; phone?: string } = {};

    if (!name.trim()) {
      newErrors.name = "نام و نام خانوادگی الزامی است";
    }

    if (!phone.trim()) {
      newErrors.phone = "شماره موبایل الزامی است";
    } else if (!/^9[0-9]{9}$/.test(phone.trim())) {
      newErrors.phone = "شماره موبایل معتبر نیست";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onConfirm({ name: name.trim(), phone: phone.trim() });
    onClose();
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (errors.name) {
      const newErrors = { ...errors };
      delete newErrors.name;
      setErrors(newErrors);
    }
  };

  const handlePhoneChange = (val: string) => {
    setPhone(val);
    if (errors.phone) {
      const newErrors = { ...errors };
      delete newErrors.phone;
      setErrors(newErrors);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        style={{
          width: "586px",
          maxWidth: "586px",
          minWidth: "586px",
          minHeight: "400px",
        }}
        className="flex flex-col overflow-hidden rounded-xs bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray p-5">
          <Text text={title} size="md" weight="medium" color="primary" />
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 p-5">
          <Text
            text={description}
            size="sm"
            weight="regular"
            color="secondary"
          />

          <CustomInput
            name="name"
            label="نام و نام خانوادگی"
            placeholder="مثال: علی محمدی"
            value={name}
            onChange={handleNameChange}
            error={errors.name!} // استفاده از !
          />

          <CustomInput
            name="phone"
            label="شماره موبایل"
            placeholder="مثال: 09123456789"
            value={phone}
            onChange={handlePhoneChange}
            error={errors.phone!} // استفاده از !
          />
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-start justify-end gap-2 border-t border-gray p-5">
          <DefaultButton
            type="primary"
            style="outline"
            label={cancelLabel}
            action={onClose}
          />
          <DefaultButton
            type="primary"
            style="fill"
            label={confirmLabel}
            action={handleSubmit}
          />
        </div>
      </div>
    </Modal>
  );
};
