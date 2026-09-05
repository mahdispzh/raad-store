"use client";

import { EmptyState } from "@/src/shared/components/empty-states/profile-empty-states";
import { ProfilePageTitle } from "@/src/shared/components/profile-page-title";
import { AddLocationIcon } from "@/src/shared/constants/icons/add-location-icon";
import { EditPanelIcon } from "@/src/shared/constants/icons/edit-panel-icon";
import { LocationIcon } from "@/src/shared/constants/icons/location-icon";
import { RecycleBinIcon } from "@/src/shared/constants/icons/recycle-bin-icon";
import { useAuthStore } from "@/src/shared/store/store";
import { Caption, Text } from "@/src/shared/ui";
import { StyledButton } from "@/src/shared/ui/styled-button/styled-button.ui";
import { useEffect, useState } from "react";
import { AddressesModal } from "../components/addresses-modal.ui";
import { useAddresses } from "../hooks/useAddresses";
import { ConfirmModal } from "./confirm-modal";

export default function AddressesPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const authState = useAuthStore();

  const {
    addresses,
    addAddress,
    deleteAddress,
    updateAddress,
    selectAddress,
    isLoading,
    isLoadingUser,
    error,
    userInfo,
    fetchAddresses,
  } = useAddresses();

  // وقتی آدرس‌ها لود شدن، آدرس پیش‌فرض رو انتخاب کن
  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddress = addresses.find((addr) => addr.default === true);
      if (defaultAddress) {
        setSelectedId(defaultAddress.id);
      } else {
      }
    }
  }, [addresses]);

  const handleAddAddress = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEditAddress = (address: any) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const handleConfirm = async (data: any) => {
    try {
      let result;

      if (editingAddress) {
        result = await updateAddress(editingAddress.id, {
          province: data.province,
          city: data.city,
          title: data.addressname,
          address: `${data.address}، پلاک ${data.pelak}${data.unit ? `، واحد ${data.unit}` : ""}`,
          postalCode: data.postalCode,
        });
      } else {
        result = await addAddress({
          province: data.province,
          city: data.city,
          title: data.addressname,
          address: `${data.address}، پلاک ${data.pelak}${data.unit ? `، واحد ${data.unit}` : ""}`,
          postalCode: data.postalCode,
        });
      }

      if (result.success) {
        setIsModalOpen(false);
        setEditingAddress(null);
        await fetchAddresses();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddressClick = async (id: number) => {
    setSelectedId(id);
    await selectAddress(id);
    await fetchAddresses();
  };

  // نمایش مودال تایید حذف
  const handleDeleteClick = (id: number) => {
    setAddressToDelete(id);
    setIsConfirmModalOpen(true);
  };

  // تایید حذف
  const handleConfirmDelete = async () => {
    if (!addressToDelete) return;

    setIsDeleting(true);
    try {
      const result = await deleteAddress(addressToDelete);
      if (result.success) {
        if (selectedId === addressToDelete) {
          setSelectedId(null);
        }
        setIsConfirmModalOpen(false);
        setAddressToDelete(null);
        await fetchAddresses();
      }
    } catch (error) {
      console.error("خطا در حذف آدرس:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // بستن مودال تایید
  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setAddressToDelete(null);
  };

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">در حال دریافت اطلاعات کاربر...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProfilePageTitle title="آدرس‌ها" />

      <div
        className="flex cursor-pointer items-center gap-2 rounded-xs p-3"
        style={{ border: "2px dashed #d9d9d9" }}
        onClick={handleAddAddress}
      >
        <AddLocationIcon size="md" color="text-primary" />
        <Text
          text="افزودن آدرس جدید"
          size="md"
          color="primary"
          weight="regular"
        />
      </div>

      <Text text="آدرس‌های من" size="md" color="primary" weight="medium" />

      <div className="flex flex-col gap-3">
        {isLoading ? (
          <div className="py-4 text-center text-gray-500">
            در حال بارگذاری...
          </div>
        ) : addresses.length === 0 ? (
          <EmptyState
            label="هنوز آدرسی ثبت نکرده‌اید."
            text="برای ثبت سفارش سریع‌تر، آدرس‌های خود را در این بخش ذخیره کنید."
          />
        ) : (
          addresses.map((address) => {
            const isSelected = selectedId === address.id;
            const isDefault = address.default;

            return (
              <div
                key={address.id}
                onClick={() => handleAddressClick(address.id)}
                className={`flex cursor-pointer flex-col gap-2 rounded-xs border p-3 transition-colors ${
                  isSelected ? "border-danger" : "border-gray"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LocationIcon
                      size="md"
                      color={isSelected ? "text-danger" : "text-gray"}
                    />
                    <Text
                      text={address.title || "آدرس"}
                      size="md"
                      color={isSelected ? "danger" : "gray"}
                      weight={isSelected ? "bold" : "regular"}
                    />
                    {isDefault && (
                      <div className="flex h-5 w-15 items-center justify-center rounded-full bg-gray">
                        <Caption text=" پیش‌فرض" size="xs" color="primary" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <StyledButton
                      variant="icon"
                      icon={
                        <RecycleBinIcon
                          size="md"
                          color={isSelected ? "text-primary" : "text-gray"}
                        />
                      }
                      action={() => handleDeleteClick(address.id)}
                    />

                    <span
                      className={`select-none ${isSelected ? "text-primary" : "text-gray"}`}
                    >
                      |
                    </span>

                    <StyledButton
                      variant="icon"
                      icon={
                        <EditPanelIcon
                          size="md"
                          color={isSelected ? "text-primary" : "text-gray"}
                        />
                      }
                      action={() => handleEditAddress(address)}
                    />
                  </div>
                </div>

                <div className="px-3">
                  <Text
                    text={`${address.province} ${address.city} - ${address.address}`}
                    size="md"
                    color={isSelected ? "primary" : "gray"}
                    weight="regular"
                  />
                </div>

                <div className="flex flex-wrap gap-4 px-3">
                  <div className="flex items-center gap-1">
                    <Text
                      text="گیرنده:"
                      size="sm"
                      color={isSelected ? "primary" : "gray"}
                      weight="regular"
                    />
                    <Text
                      text={address.receiver_name || "نامشخص"}
                      size="sm"
                      color={isSelected ? "primary" : "gray"}
                      weight="regular"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <Text
                      text="شماره تماس:"
                      size="sm"
                      color={isSelected ? "primary" : "gray"}
                      weight="regular"
                    />
                    <Text
                      text={address.receiver_phone || "نامشخص"}
                      size="sm"
                      color={isSelected ? "primary" : "gray"}
                      weight="regular"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <Text
                      text="کد پستی:"
                      size="sm"
                      color={isSelected ? "primary" : "gray"}
                      weight="regular"
                    />
                    <Text
                      text={address.postal_code}
                      size="sm"
                      color={isSelected ? "primary" : "gray"}
                      weight="regular"
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* مودال افزودن/ویرایش آدرس */}
      <AddressesModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        editData={editingAddress}
      />

      {/* مودال تایید حذف */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirmDelete}
        title="حذف آدرس"
        message="آیا از حذف این آدرس از لیست آدرس‌ها اطمینان دارید؟"
        confirmText="حذف آدرس"
        cancelText="انصراف"
        isLoading={isDeleting}
      />
    </>
  );
}
