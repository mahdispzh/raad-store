// useProfileMenuLogic.ts
"use client";

import { useState } from "react";
import { useLogoutModal } from "../logout/useLogoutModal";

/**
 * مدیریت state و رفتارهای منوی پروفایل، دسته‌بندی‌ها و خروج از حساب
 */
export function useProfileMenuLogic() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const {
    isModalOpen: isLogoutModalOpen,
    openModal: openLogoutModal,
    closeModal: closeLogoutModal,
    handleConfirm: handleLogoutConfirm,
  } = useLogoutModal();

  const openCategories = () => setIsCategoriesOpen(true);
  const closeCategories = () => setIsCategoriesOpen(false);

  const openProfileMenu = () => setIsProfileMenuOpen(true);
  const closeProfileMenu = () => setIsProfileMenuOpen(false);

  const handleLogoutClick = () => {
    closeProfileMenu();
    openLogoutModal();
  };

  return {
    isCategoriesOpen,
    isProfileMenuOpen,
    isLogoutModalOpen,
    openCategories,
    closeCategories,
    openProfileMenu,
    closeProfileMenu,
    openLogoutModal,
    closeLogoutModal,
    handleLogoutConfirm,
    handleLogoutClick,
  };
}
