// useNavbarLogic.ts
"use client";

import { useAuthStatus } from "./navbar.api";
import { useNavbarLanding } from "./useNavbarLanding";
import { useCartLogic } from "./useCartLogic";
import { useNotificationsLogic } from "./useNotificationsLogic";
import { useProfileMenuLogic } from "./useProfileMenuLogic";
import { UseNavbarLogicReturn } from "./navbar-landing.types";


export function useNavbarLogic(): UseNavbarLogicReturn {
  const { isLoggedIn, isLoading } = useAuthStatus();

  const {
    activeLink,
    isSearchOpen,
    handleActiveLink,
    openSearch,
    closeSearch,
  } = useNavbarLanding();

  const cart = useCartLogic(isLoggedIn);
  const notifications = useNotificationsLogic();
  const profile = useProfileMenuLogic();

  return {
    isLoggedIn,
    isLoading,
    activeLink,
    isSearchOpen,
    handleActiveLink,
    openSearch,
    closeSearch,
    cart,
    notifications,
    profile,
  };
}
