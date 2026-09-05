"use client";

import { DefaultButton, Modal, Text } from "@/src/shared/ui";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  title = "تایید حذف",
  message,
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="w-[380px] max-w-full rounded-sm bg-white p-6">
        <Text text={title} size="lg" weight="bold" />
        <div className="mt-3">
          <Text text={message} size="md" weight="regular" color="secondary" />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <DefaultButton
            type="secondary"
            style="outline"
            label="انصراف"
            action={onCancel}
            disabled={isLoading}
          />
          <DefaultButton
            type="primary"
            style="fill"
            label={isLoading ? "در حال حذف..." : "حذف"}
            action={onConfirm}
            disabled={isLoading}
          />
        </div>
      </div>
    </Modal>
  );
}
