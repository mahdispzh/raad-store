"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { v4 as uuid } from "uuid";
import { lockBodyScroll, unlockBodyScroll } from "./modal-scroll-lock";
import type { ModalProps } from "./modal.types";
import { useModalAnimation } from "./useModalAnimation";

export function Modal({
  children,
  isOpen,
  onClose,
  zIndex = 100,
}: ModalProps & { zIndex?: number }) {
  const idRef = useRef(uuid());
  const { showModal, animate } = useModalAnimation(isOpen);

  useEffect(() => {
    const id = idRef.current;
    if (isOpen) {
      lockBodyScroll(id);
    } else {
      unlockBodyScroll(id);
    }
    return () => {
      unlockBodyScroll(id);
    };
  }, [isOpen]);

  if (!showModal && !isOpen) return null;
  return createPortal(
    <div
      className={`fixed inset-0 flex h-screen w-full items-center justify-center bg-black/30 backdrop-blur-[3px] transition-all duration-300 ${
        animate ? "opacity-100" : "opacity-0"
      }`}
      style={{ zIndex }}
      onClick={onClose}
    >
      <div
        className={`transition-all duration-300 ${
          animate ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
