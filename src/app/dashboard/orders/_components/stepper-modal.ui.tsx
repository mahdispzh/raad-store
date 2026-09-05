// _components/stepper-modal.ui.tsx
"use client";

import { DefaultButton, Modal, Text } from "@/src/shared/ui";
import { getStatusInfo } from "../_constants/status-icons";

interface StepperModalProps {
  isOpen: boolean;
  status: number | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function StepperModal({
  isOpen,
  status,
  onClose,
  onConfirm,
}: StepperModalProps) {
  const label = status !== null ? getStatusInfo(status).label : "";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[586px] rounded-xs bg-white shadow-xl">
        <div className="flex justify-center border-b border-gray p-5">
          <Text text="تغییر وضعیت" size="lg" weight="bold" color="primary" />
        </div>

        <div className="px-20 py-10 text-center">
          <Text text={`تغییر وضعیت به "${label}"`} size="md" color="primary" />
        </div>

        <div className="flex justify-center gap-4 px-20 pb-6">
          <DefaultButton
            type="secondary"
            style="outline"
            label="انصراف"
            action={onClose}
          />
          <DefaultButton
            type="secondary"
            style="fill"
            label="تایید"
            action={onConfirm}
          />
        </div>
      </div>
    </Modal>
  );
}
