// hooks/useLogoutModal.ts
import { useCallback, useState } from "react";
import { logoutService } from "./logout.api";

export const useLogoutModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    setIsLoading(true);

    try {
      await logoutService.fullLogout();

      closeModal();

      window.location.href = "/";
    } catch (error) {
      // handle error if needed
    } finally {
      setIsLoading(false);
    }
  }, [closeModal]);

  return {
    isModalOpen,
    isLoading,
    openModal,
    closeModal,
    handleConfirm,
  };
};