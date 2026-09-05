import type { Metadata } from "next";
import { AboutUsMain } from "../_components/main";
import about from "../_constants/about-us.json";
import { getStoreInformation } from "../_services/about-us.api";
import { aboutMetadata, getAboutJsonLd } from "@/src/shared/lib/seo/metadata";

// 👇 همون خطی که توی هوم هم کم بود
export const metadata: Metadata = aboutMetadata;

// Server Component - دریافت دیتا از API در سرور
export default async function AboutUs() {
  // دریافت دیتای تماس از API
  const response = await getStoreInformation();
  const storeInfo = response.data;

  // جمع‌آوری شماره تلفن‌ها (هرچقدر که باشه)
  const phoneNumbersList = [
    storeInfo?.phone_primary,
    storeInfo?.phone_secondary,
    storeInfo?.office_phone,
  ].filter(Boolean); // حذف خالی‌ها

  // تبدیل به رشته با جداکننده " - "
  const phoneNumbersString = phoneNumbersList.join(" - ");

  // دیتای تماس
  const contactData = {
    title: "تماس با ما",
    phoneNumbers: phoneNumbersString,
    address: storeInfo?.address || "",
    email: storeInfo?.mail || "",
    map: storeInfo?.map || "",
  };

  // دیتای درباره ما از JSON
  const aboutData = {
    title: about.aboutUs.title,
    description1: about.aboutUs.description1,
    description2: about.aboutUs.description2,
  };

  // Base URL از JSON ثابت
  const baseUrls = about.baseUrls;

  // دریافت آیدی‌ها از دیتابیس
  const socialMedia = {
    telegram: baseUrls.telegram + (storeInfo?.telegram || ""),
    whatsapp: baseUrls.whatsapp + (storeInfo?.whatsapp || ""),
    instagram: baseUrls.instagram + (storeInfo?.instagram || ""),
    eita: baseUrls.eita + (storeInfo?.eita || ""),
    bale: baseUrls.bale + (storeInfo?.bale || ""),
    rubika: baseUrls.rubika + (storeInfo?.rubika || ""),
  };

  const initialData = {
    contactUs: contactData,
    aboutUs: aboutData,
    socialMedia: socialMedia,
  };

  // JSON-LD نیاز به description تک‌رشته‌ای داره، پس دو تا description رو ترکیب می‌کنیم
  const jsonLd = getAboutJsonLd({
    description: `${aboutData.description1} ${aboutData.description2}`,
    email: contactData.email,
    phoneNumbers: contactData.phoneNumbers,
    address: contactData.address,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutUsMain initialData={initialData} />
    </>
  );
}