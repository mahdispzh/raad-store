// modal._types.ts
import { ReactNode } from "react";

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};
