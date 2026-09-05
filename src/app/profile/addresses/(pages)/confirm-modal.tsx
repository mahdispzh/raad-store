// src/shared/components/confirm-modal/confirm-modal.ui.tsx
"use client";

import { DefaultButton, Modal, Text } from "@/src/shared/ui";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "حذف آدرس",
  message = "آیا از حذف این آدرس از لیست آدرس‌ها اطمینان دارید؟",
  confirmText = "حذف آدرس",
  cancelText = "انصراف",
  isLoading = false,
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        style={{
          width: "450px",
          maxWidth: "450px",
          minWidth: "450px",
          height: "200px",
        }}
        className="flex flex-col overflow-hidden rounded-xs bg-white shadow-xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray p-5">
          <Text text={title} size="md" weight="medium" color="primary" />
        </div>

        <div className="flex overflow-y-auto p-4">
          <Text text={message} size="sm" weight="regular" color="primary" />
        </div>

        <div className="flex shrink-0 items-start justify-end gap-2 border-gray p-3">
          <DefaultButton
            type="secondary"
            style="outline"
            label={cancelText}
            action={onClose}
            disabled={isLoading}
          />
          <DefaultButton
            type="secondary"
            style="fill"
            label={isLoading ? "در حال حذف..." : confirmText}
            action={onConfirm}
            disabled={isLoading}
          />
        </div>
      </div>
    </Modal>
  );
};
