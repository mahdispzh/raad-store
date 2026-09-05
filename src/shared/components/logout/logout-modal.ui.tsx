"use client";

import texts from "@/src/shared/constants/texts/texts.json";
import { DefaultButton, Modal, Text } from "@/src/shared/ui";
import { CloseModalIcon } from "../../constants/icons";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutModal = ({
  isOpen,
  onClose,
  onConfirm,
}: LogoutModalProps) => {
  console.log("LogoutModal رندر شد، isOpen:", isOpen);

  const handleConfirm = () => {
    console.log("✅ دکمه خروج کلیک شد!");
    onConfirm();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-auto w-[92vw] max-w-[586px] flex-col overflow-hidden rounded-xs bg-white shadow-xl sm:w-[586px]">
        <div className="flex shrink-0 items-center justify-between border-b border-gray p-4 sm:p-5">
          <Text
            text={texts.logout.title}
            size="md"
            weight="medium"
            color="primary"
          />
          <div className="cursor-pointer" onClick={onClose}>
            <CloseModalIcon size="xs" />
          </div>
        </div>

        <div className="flex overflow-y-auto p-4">
          <Text
            text={texts.logout.description}
            size="sm"
            weight="regular"
            color="primary"
          />
        </div>

        <div className="flex shrink-0 flex-col items-stretch justify-end gap-2 border-gray p-3 sm:flex-row sm:items-start">
          <DefaultButton
            type="primary"
            style="outline"
            label={texts.logout.cancelLabel}
            action={onClose}
          />
          <DefaultButton
            type="primary"
            style="fill"
            label={texts.logout.confirmLabel}
            action={handleConfirm}
          />
        </div>
      </div>
    </Modal>
  );
};
