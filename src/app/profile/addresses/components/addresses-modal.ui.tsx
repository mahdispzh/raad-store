// AddressesModal.tsx - بدون چک‌باکس
"use client";

import { CloseIcon } from "@/src/shared/constants/icons/close-icon";
import {
  Caption,
  CustomSelect,
  DefaultButton,
  Modal,
  Text,
} from "@/src/shared/ui";
import { CustomInput } from "@/src/shared/ui/custom-input/custom-input-ui";
import { StyledButton } from "@/src/shared/ui/styled-button/styled-button.ui";
import { Rules } from "@/src/shared/validations/rules";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import provincesData from "../constants/iran-locations.json";

// تعریف Schema با zod
const addressSchema = z.object({
  province: Rules.province,
  city: Rules.city,
  addressname: Rules.addressname,
  address: Rules.address,
  pelak: Rules.pelak,
  unit: z.string().optional(),
  postalCode: Rules.postalCode,
});

type AddressFormData = z.infer<typeof addressSchema>;

type AddressFormValues = {
  province: string;
  city: string;
  addressname: string;
  address: string;
  pelak: string;
  unit: string;
  postalCode: string;
};

const EMPTY_FORM: AddressFormValues = {
  province: "",
  city: "",
  addressname: "",
  address: "",
  pelak: "",
  unit: "",
  postalCode: "",
};

interface AddressesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: AddressFormData) => void;
  editData?: any;
}

interface ProvinceData {
  id: number;
  name: string;
  cities: Array<{ id: number; name: string } | string>;
}

export const AddressesModal = ({
  isOpen,
  onClose,
  onConfirm,
  editData,
}: AddressesModalProps) => {
  const [formValues, setFormValues] = useState<AddressFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof AddressFormValues, string>>
  >({});
  const [cityOptions, setCityOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const provinceOptions = useMemo(() => {
    return ((provincesData?.provinces as ProvinceData[]) || []).map(
      (province) => ({
        value: province.name,
        label: province.name,
        id: province.id,
        cities: province.cities,
      }),
    );
  }, []);

  // آپدیت یک فیلد از فرم + پاک کردن خطای همون فیلد
  const updateField = (field: keyof AddressFormValues) => (value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  // وقتی استان عوض می‌شه، لیست شهرها آپدیت و در صورت نیاز شهر انتخابی ریست می‌شه
  useEffect(() => {
    if (formValues.province) {
      const selectedProvinceData = provinceOptions.find(
        (p) => p.value === formValues.province,
      );

      if (
        selectedProvinceData?.cities &&
        selectedProvinceData.cities.length > 0
      ) {
        const cities = selectedProvinceData.cities.map((city) => ({
          value: typeof city === "string" ? city : city.name,
          label: typeof city === "string" ? city : city.name,
        }));
        setCityOptions(cities);

        if (
          formValues.city &&
          !cities.find((c) => c.value === formValues.city)
        ) {
          setFormValues((prev) => ({ ...prev, city: "" }));
        }
      } else {
        setCityOptions([]);
        setFormValues((prev) => ({ ...prev, city: "" }));
      }
    } else {
      setCityOptions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues.province, provinceOptions]);

  // پر کردن فرم موقع باز شدن مودال (حالت ویرایش یا افزودن)
  useEffect(() => {
    if (isOpen && editData) {
      const addressParts = editData.address?.split("، پلاک ") || [];
      const mainAddress = addressParts[0] || "";
      const pelakParts = addressParts[1]?.split("، واحد ") || [];
      const pelak = pelakParts[0] || "";
      const unit = pelakParts[1] || "";

      setFormValues({
        province: editData.province || "",
        city: editData.city || "",
        addressname: editData.title || "",
        address: mainAddress,
        pelak,
        unit,
        postalCode: editData.postal_code || "",
      });
      setErrors({});

      if (editData.province) {
        const selectedProvinceData = provinceOptions.find(
          (p) => p.value === editData.province,
        );
        if (selectedProvinceData?.cities) {
          const cities = selectedProvinceData.cities.map((city) => ({
            value: typeof city === "string" ? city : city.name,
            label: typeof city === "string" ? city : city.name,
          }));
          setCityOptions(cities);
        }
      }
    } else if (isOpen && !editData) {
      setFormValues(EMPTY_FORM);
      setErrors({});
      setCityOptions([]);
    }
  }, [isOpen, editData, provinceOptions]);

  const onSubmit = async () => {
    const result = addressSchema.safeParse(formValues);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof AddressFormValues, string>> = {};
      const flatErrors = result.error.flatten().fieldErrors;
      (Object.keys(flatErrors) as Array<keyof AddressFormValues>).forEach(
        (key) => {
          const message = flatErrors[key]?.[0];
          if (message) fieldErrors[key] = message;
        },
      );
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onConfirm(result.data);
      setFormValues(EMPTY_FORM);
      setErrors({});
      onClose();
    } catch (error) {
      console.error("خطا در ثبت آدرس:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormValues(EMPTY_FORM);
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div
          style={{ width: "30vw", maxWidth: "90vw" }}
          className="flex flex-col overflow-hidden rounded-xs bg-white shadow-2xl"
        >
          {/* هدر */}
          <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-2">
            <Text
              text={editData ? "ویرایش آدرس" : "افزودن آدرس جدید"}
              size="lg"
              weight="bold"
              color="primary"
            />
            <StyledButton
              variant="icon"
              icon={<CloseIcon size="sm" color="text-primary" />}
              action={handleClose}
              size="md"
              type="primary"
              style="fill"
            />
          </div>

          {/* فرم */}
          <div className="flex max-h-[60vh] flex-col gap-5 overflow-y-auto p-5">
            {/* استان و شهر - دو ستونه */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-medium text-sm text-primary">
                  استان<span className="mr-1 text-red-500">*</span>
                </label>
                <CustomSelect
                  options={provinceOptions}
                  value={formValues.province}
                  onChange={updateField("province")}
                  placeholder="انتخاب استان"
                  searchable
                />
                {errors.province && (
                  <Caption size="xs" text={errors.province} color="danger" />
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-medium text-sm text-primary">
                  شهر<span className="mr-1 text-red-500">*</span>
                </label>
                <CustomSelect
                  key={formValues.province || "no-province"}
                  options={cityOptions}
                  value={formValues.city}
                  onChange={updateField("city")}
                  placeholder={
                    formValues.province
                      ? "انتخاب شهر"
                      : "ابتدا استان را انتخاب کنید"
                  }
                  disabled={!formValues.province || cityOptions.length === 0}
                  searchable
                />
                {errors.city && (
                  <Caption size="xs" text={errors.city} color="danger" />
                )}
              </div>
            </div>

            {/* نام آدرس */}
            <CustomInput
              name="addressname"
              label="نام آدرس"
              placeholder="مثال: خانه، محل کار و ..."
              type="text"
              size="md"
              required
              value={formValues.addressname}
              onChange={updateField("addressname")}
              error={errors.addressname ?? ""}
            />

            {/* آدرس */}
            <CustomInput
              name="address"
              label="آدرس"
              placeholder="مثال: خیابان، کوچه و جریانات آدرس"
              type="text"
              size="md"
              required
              value={formValues.address}
              onChange={updateField("address")}
              error={errors.address ?? ""}
            />

            {/* پلاک و واحد - دو ستونه */}
            <div className="grid grid-cols-2 gap-4">
              <CustomInput
                name="pelak"
                label="پلاک"
                placeholder="پلاک"
                type="text"
                size="md"
                required
                value={formValues.pelak}
                onChange={updateField("pelak")}
                error={errors.pelak ?? ""}
              />

              <CustomInput
                name="unit"
                label="واحد"
                placeholder="واحد"
                type="text"
                size="md"
                value={formValues.unit}
                onChange={updateField("unit")}
                error={errors.unit ?? ""}
              />
            </div>

            {/* کد پستی */}
            <CustomInput
              name="postalCode"
              label="کد پستی"
              placeholder="کد پستی ۱۰ رقمی"
              type="text"
              size="md"
              required
              value={formValues.postalCode}
              onChange={updateField("postalCode")}
              error={errors.postalCode ?? ""}
            />
          </div>

          {/* فوتر با دکمه‌ها */}
          <div className="flex shrink-0 gap-3 border-gray-200 p-5">
            <DefaultButton
              type="secondary"
              style="fill"
              label={
                isSubmitting
                  ? "در حال ثبت..."
                  : editData
                    ? "ویرایش آدرس"
                    : "تایید آدرس و ادامه"
              }
              action={onSubmit}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};
