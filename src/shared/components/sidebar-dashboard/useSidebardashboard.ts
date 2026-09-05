import { useRouter } from "next/navigation";
import { useState } from "react";

import { useLogoutModal } from "@/src/shared/components/logout/useLogoutModal";

import type { SidebarItem } from "./sidebar-dashboard.type";

export function useSidebarDashboard(pathname: string = "") {
  const router = useRouter();

  // مسیر آیتم‌های بازشده به ترتیب عمق، مثلا ["shop", "products"]
  const [openedPath, setOpenedPath] = useState<string[]>(["shop"]);
  const [selected, setSelected] = useState(pathname);

  const { isModalOpen, isLoading, openModal, closeModal, handleConfirm } =
    useLogoutModal();

  const handleItemClick = (item: SidebarItem, depth: number) => {
    const hasChildren = !!item.items?.length;

    if (hasChildren) {
      setOpenedPath((prev) => {
        const isCurrentlyOpen = prev[depth] === item.id;

        // اگه خودش باز بود، ببندش (و هر چیزی که عمیق‌تره رو هم ببند)
        if (isCurrentlyOpen) {
          return prev.slice(0, depth);
        }

        // در همین عمق جایگزینش کن و بازشده‌های عمیق‌تر رو پاک کن
        return [...prev.slice(0, depth), item.id];
      });
    }

    if (item.href) {
      setSelected(item.href);
      router.push(item.href);
    }
  };

  const isOpen = (id: string, depth: number) => openedPath[depth] === id;

  return {
    isOpen,
    selected,
    handleItemClick,
    logout: {
      isModalOpen,
      isLoading,
      openModal,
      closeModal,
      handleConfirm,
    },
  };
}
