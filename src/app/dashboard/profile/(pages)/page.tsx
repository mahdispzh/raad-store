"use client";

import { Field } from "../_components/field";
import { ProfileAvatar } from "../_components/profile-avatar";
import { ProfileSection } from "../_components/profile-section";
import { IRANIAN_BANKS } from "../_constants/banks";
import { useProfile } from "../_hooks/useProfile";

export default function ProfilePage() {
  const {
    data,
    loading,
    error,
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
    updateAvatar, // ⬅️ جدید
    isSavingAvatar,
  } = useProfile();

  if (loading) return <div className="p-8 text-center">در حال بارگذاری...</div>;
  if (error) return <div className="p-8 text-center text-danger">{error}</div>;
  if (!data) return <div className="p-8 text-center">اطلاعاتی یافت نشد</div>;

  const bankName =
    IRANIAN_BANKS.find((b) => b.id === data.bank_id)?.name || "تعیین نشده";
  const handleAvatarChange = async (id: number) => {
    try {
      await updateAvatar(id); // آپدیت عکس
      window.location.reload(); // رفرش کامل صفحه بعد از موفقیت
    } catch (error) {
      console.error("خطا در آپدیت آواتار:", error);
      // در صورت نیاز می‌توانید یک پیام خطا به کاربر نمایش دهید
    }
  };
  return (
    <div className="flex flex-col gap-10">
      <div className="flex w-full flex-row gap-10">
        <ProfileAvatar
          name={data.name || "بدون نام"}
          imageId={data.image_id}
          onAvatarChange={handleAvatarChange}
          isSaving={isSavingAvatar}
        />

        <ProfileSection
          title="اطلاعات فردی"
          editing={isEditingPersonal}
          onEditToggle={startEditPersonal}
          onSave={savePersonal}
          onCancel={cancelPersonal}
          className="flex-2"
        >
          <div className="grid grid-cols-2 gap-x-[1.5vw] gap-y-[1.25vw]">
            <Field
              label="نام و نام خانوادگی"
              value={
                isEditingPersonal ? personalDraft.name || "" : data.name || ""
              }
              editing={isEditingPersonal}
              onChange={(v) =>
                setPersonalDraft((prev) => ({ ...prev, name: v }))
              }
            />
            <Field
              label="شماره موبایل"
              value={
                isEditingPersonal ? personalDraft.phone || "" : data.phone || ""
              }
              editing={isEditingPersonal}
              onChange={(v) =>
                setPersonalDraft((prev) => ({ ...prev, phone: v }))
              }
            />
            <Field
              label="ایمیل"
              value={
                isEditingPersonal ? personalDraft.mail || "" : data.mail || ""
              }
              editing={isEditingPersonal}
              type="email"
              onChange={(v) =>
                setPersonalDraft((prev) => ({ ...prev, mail: v }))
              }
            />
            <Field
              label="تاریخ ثبت نام"
              value={
                data.created_at
                  ? new Date(data.created_at).toLocaleDateString("fa-IR")
                  : "تعیین نشده"
              }
              editing={false}
              onChange={() => {}}
            />
          </div>
        </ProfileSection>
      </div>

      <ProfileSection
        title="اطلاعات مالی"
        editing={isEditingFinancial}
        onEditToggle={startEditFinancial}
        onSave={saveFinancial}
        onCancel={cancelFinancial}
      >
        <div className="grid grid-cols-2 gap-x-[1.5vw] gap-y-[1.25vw] lg:grid-cols-4">
          {isEditingFinancial ? (
            <div className="flex flex-col gap-[0.4vw]">
              <label className="font-medium text-sm">نام بانک</label>
              <select
                value={financialDraft.bank_id ?? ""}
                onChange={(e) =>
                  setFinancialDraft((prev) => ({
                    ...prev,
                    bank_id: Number(e.target.value),
                  }))
                }
                className="h-[2.6vw] rounded-[0.4vw] border border-gray-300 px-[0.75vw] text-sm outline-none focus:border-secondary"
              >
                <option value="">انتخاب کنید</option>
                {IRANIAN_BANKS.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <Field
              label="نام بانک"
              value={bankName}
              editing={false}
              onChange={() => {}}
            />
          )}

          <Field
            label="شماره حساب"
            value={
              isEditingFinancial
                ? financialDraft.account_number || ""
                : data.account_number || ""
            }
            editing={isEditingFinancial}
            onChange={(v) =>
              setFinancialDraft((prev) => ({ ...prev, account_number: v }))
            }
          />
          <Field
            label="شماره کارت"
            value={
              isEditingFinancial
                ? financialDraft.card_number || ""
                : data.card_number || ""
            }
            editing={isEditingFinancial}
            onChange={(v) =>
              setFinancialDraft((prev) => ({ ...prev, card_number: v }))
            }
          />
          <Field
            label="شماره شبا"
            value={
              isEditingFinancial
                ? financialDraft.sheba_number || ""
                : data.sheba_number || ""
            }
            editing={isEditingFinancial}
            onChange={(v) =>
              setFinancialDraft((prev) => ({ ...prev, sheba_number: v }))
            }
          />
        </div>
      </ProfileSection>
    </div>
  );
}
