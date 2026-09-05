import { useState, useEffect, useRef } from "react";
import { profileApi } from "./profile.api";
import { ProfileModalProps, User } from "./profile-modal.types";

export const useProfileModal = ({
  isOpen,
  onClose,
  anchorRef,
}: ProfileModalProps) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isOpen) return;
      
      setLoading(true);
      
      try {
        const userData = await profileApi.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
        // استفاده از store
        const { useAuthStore } = await import("@/src/shared/store/store");
        const localUser = useAuthStore.getState().user;
        if (localUser) {
          setUser({
            id: localUser.id,
            name: localUser.name || null,
            mail: localUser.mail || null,
            phone: localUser.phone || null,
            role: localUser.role, // اضافه شد
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && anchorRef?.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        left: rect.left,
      });
    }
  }, [isOpen, anchorRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        anchorRef?.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  return {
    position,
    modalRef,
    user,
    loading,
  };
};