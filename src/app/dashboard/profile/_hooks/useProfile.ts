"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getProfile, updateProfile } from "../_services/profile.api";
import { ProfileData, UpdateProfilePayload } from "../_types/profile.types";

export function useProfile() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const mutation = useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  // state های موقت برای ویرایش
  const [personalDraft, setPersonalDraft] = useState<
    Pick<ProfileData, "name" | "phone" | "mail">
  >({ name: "", phone: "", mail: "" });
  const [financialDraft, setFinancialDraft] = useState<
    Pick<
      ProfileData,
      "card_number" | "account_number" | "sheba_number" | "bank_id"
    >
  >({ card_number: "", account_number: "", sheba_number: "", bank_id: null });

  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingFinancial, setIsEditingFinancial] = useState(false);

  const startEditPersonal = () => {
    if (!data) return;
    setPersonalDraft({ name: data.name, phone: data.phone, mail: data.mail });
    setIsEditingPersonal(true);
  };

  const savePersonal = async () => {
    await mutation.mutateAsync({
      name: personalDraft.name ?? undefined,
      phone: personalDraft.phone ?? undefined,
      mail: personalDraft.mail ?? undefined,
    });
    setIsEditingPersonal(false);
  };

  const cancelPersonal = () => setIsEditingPersonal(false);

  const startEditFinancial = () => {
    if (!data) return;
    setFinancialDraft({
      card_number: data.card_number,
      account_number: data.account_number,
      sheba_number: data.sheba_number,
      bank_id: data.bank_id,
    });
    setIsEditingFinancial(true);
  };

  const saveFinancial = async () => {
    await mutation.mutateAsync({
      card_number: financialDraft.card_number ?? undefined,
      account_number: financialDraft.account_number ?? undefined,
      sheba_number: financialDraft.sheba_number ?? undefined,
      bank_id: financialDraft.bank_id ?? undefined,
    });
    setIsEditingFinancial(false);
  };

  const cancelFinancial = () => setIsEditingFinancial(false);

  const updateAvatar = async (imageId: number) => {
    await mutation.mutateAsync({ image_id: imageId });
  };

  return {
    data,
    loading: isLoading,
    error: error ? "خطا در دریافت اطلاعات" : null,
    personalDraft,
    financialDraft,
    isEditingPersonal,
    isEditingFinancial,
    startEditPersonal,
    savePersonal,
    cancelPersonal,
    startEditFinancial,
    saveFinancial,
    cancelFinancial,
    setPersonalDraft,
    setFinancialDraft,
    updateAvatar,
    isSavingAvatar: mutation.isPending,
  };
}
