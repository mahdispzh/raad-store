import { useEffect, useState } from "react";

export function useModalAnimation(isOpen: boolean) {
  const [showModal, setShowModal] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
        });
      });
    } else {
      setAnimate(false);
      const t = setTimeout(() => {
        setShowModal(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  return { showModal, animate };
}
