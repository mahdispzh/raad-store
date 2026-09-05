"use client";

import {
  LocationIcon,
  PhoneIcon,
  StoreIcon,
} from "@/src/shared/constants/icons";
import { Field, SectionHeader, StoreLogoUpload } from "../_components";
import { useStoreInfo } from "../_hooks/useStoreInfo";

export default function StoreInfoPage() {
  const {
    data,
    loading,
    error,
    generalDraft,
    addressDraft,
    contactDraft,
    socialDraft,
    isEditingGeneral,
    isEditingAddress,
    isEditingContact,
    isEditingSocial,
    startEdit,
    saveGeneral,
    cancelGeneral,
    saveAddress,
    cancelAddress,
    saveContact,
    cancelContact,
    saveSocial,
    cancelSocial,
    updateLogo,
    updateGeneralField,
    updateAddressField,
    updateContactField,
    updateSocialField,
    setGeneralDraft, // ⬅️ اضافه شد
    setAddressDraft, // ⬅️ اضافه شد
    setContactDraft, // ⬅️ اضافه شد
    setSocialDraft, // ⬅️ اضافه شد
    setIsEditingGeneral, // ⬅️ اضافه شد
    setIsEditingAddress, // ⬅️ اضافه شد
    setIsEditingContact, // ⬅️ اضافه شد
    setIsEditingSocial,
  } = useStoreInfo();

  if (loading) {
    return <div className="p-8 text-center">در حال بارگذاری...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-danger">{error}</div>;
  }

  if (!data) {
    return <div className="p-8 text-center">اطلاعاتی یافت نشد</div>;
  }

  return (
    <div className="flex flex-col gap-7">
      {/* بخش لوگو */}
      <StoreLogoUpload
        logo={data.logo}
        onLogoChange={(rect, circle) =>
          updateLogo({ ...data.logo, rectLogoUrl: rect, circleLogoUrl: circle })
        }
      />

      <div className="flex flex-row gap-10">
        {/* اطلاعات کلی فروشگاه */}
        <div className="w-full flex-2 rounded-md bg-accent/50 p-[1.5vw]">
          <SectionHeader
            title="اطلاعات کلی فروشگاه"
            icon={<StoreIcon size="xs" color="text-secondary" />}
            editing={isEditingGeneral}
            onEditToggle={() =>
              startEdit(setGeneralDraft, data.general, setIsEditingGeneral)
            }
            onSave={saveGeneral}
            onCancel={cancelGeneral}
          />
          <div className="grid grid-cols-1 gap-x-[1.5vw] gap-y-[1.25vw]">
            <Field
              label="نام فروشگاه"
              value={
                isEditingGeneral
                  ? generalDraft?.storeName || ""
                  : data.general.storeName
              }
              editing={isEditingGeneral}
              onChange={(v) => updateGeneralField("storeName", v)}
            />
            <Field
              label="توضیحات فروشگاه"
              value={
                isEditingGeneral
                  ? generalDraft?.description || ""
                  : data.general.description
              }
              editing={isEditingGeneral}
              isTextarea
              onChange={(v) => updateGeneralField("description", v)}
            />
          </div>
        </div>

        {/* اطلاعات تماس */}
        <div className="w-full flex-1 rounded-md bg-accent/50 p-[1.5vw]">
          <SectionHeader
            title="اطلاعات تماس"
            icon={<PhoneIcon size="xs" color="text-secondary" />}
            editing={isEditingContact}
            onEditToggle={() =>
              startEdit(setContactDraft, data.contact, setIsEditingContact)
            }
            onSave={saveContact}
            onCancel={cancelContact}
          />
          <div className="grid grid-cols-1 gap-x-[1.5vw] gap-y-[1.25vw]">
            <Field
              label="شماره تلفن همراه"
              value={
                isEditingContact
                  ? contactDraft?.mobile || ""
                  : data.contact.mobile
              }
              editing={isEditingContact}
              onChange={(v) => updateContactField("mobile", v)}
            />
            <Field
              label="شماره تلفن ثابت"
              value={
                isEditingContact
                  ? contactDraft?.phone || ""
                  : data.contact.phone
              }
              editing={isEditingContact}
              onChange={(v) => updateContactField("phone", v)}
            />
            <Field
              label="ایمیل"
              value={
                isEditingContact
                  ? contactDraft?.email || ""
                  : data.contact.email
              }
              editing={isEditingContact}
              onChange={(v) => updateContactField("email", v)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-7">
        {/* آدرس */}
        <div className="w-full rounded-md bg-accent/50 p-[1.5vw]">
          <SectionHeader
            title="آدرس"
            icon={<LocationIcon size="xs" color="text-secondary" />}
            editing={isEditingAddress}
            onEditToggle={() =>
              startEdit(setAddressDraft, data.address, setIsEditingAddress)
            }
            onSave={saveAddress}
            onCancel={cancelAddress}
          />
          <div className="grid grid-cols-1 gap-x-[1.5vw] gap-y-[1.25vw]">
            <Field
              label="آدرس فروشگاه"
              value={
                isEditingAddress
                  ? addressDraft?.address || ""
                  : data.address.address
              }
              editing={isEditingAddress}
              onChange={(v) => updateAddressField("address", v)}
            />
            <Field
              label="لینک آدرس شرکت"
              value={
                isEditingAddress
                  ? addressDraft?.companyAddressUrl || ""
                  : data.address.companyAddressUrl
              }
              editing={isEditingAddress}
              onChange={(v) => updateAddressField("companyAddressUrl", v)}
            />
          </div>
        </div>

        {/* شبکه‌های اجتماعی */}
        <div className="w-full rounded-md bg-accent/50 p-[1.5vw]">
          <SectionHeader
            title="شبکه‌های اجتماعی و پیام‌رسان‌ها"
            icon={<LocationIcon size="xs" color="text-secondary" />}
            editing={isEditingSocial}
            onEditToggle={() =>
              startEdit(setSocialDraft, data.social, setIsEditingSocial)
            }
            onSave={saveSocial}
            onCancel={cancelSocial}
          />
          <div className="grid grid-cols-2 gap-x-[1.5vw] gap-y-[1.25vw]">
            <Field
              label="بله"
              value={
                isEditingSocial ? socialDraft?.bale || "" : data.social.bale
              }
              editing={isEditingSocial}
              onChange={(v) => updateSocialField("bale", v)}
            />
            <Field
              label="ایتا"
              value={
                isEditingSocial ? socialDraft?.eitaa || "" : data.social.eitaa
              }
              editing={isEditingSocial}
              onChange={(v) => updateSocialField("eitaa", v)}
            />
            <Field
              label="روبیکا"
              value={
                isEditingSocial ? socialDraft?.rubika || "" : data.social.rubika
              }
              editing={isEditingSocial}
              onChange={(v) => updateSocialField("rubika", v)}
            />
            <Field
              label="واتس‌اپ"
              value={
                isEditingSocial
                  ? socialDraft?.whatsapp || ""
                  : data.social.whatsapp
              }
              editing={isEditingSocial}
              onChange={(v) => updateSocialField("whatsapp", v)}
            />
            <Field
              label="تلگرام"
              value={
                isEditingSocial
                  ? socialDraft?.telegram || ""
                  : data.social.telegram
              }
              editing={isEditingSocial}
              onChange={(v) => updateSocialField("telegram", v)}
            />
            <Field
              label="اینستاگرام"
              value={
                isEditingSocial
                  ? socialDraft?.instagram || ""
                  : data.social.instagram
              }
              editing={isEditingSocial}
              onChange={(v) => updateSocialField("instagram", v)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
