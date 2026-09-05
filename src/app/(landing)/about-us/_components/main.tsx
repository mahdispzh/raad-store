"use client";

import {
  BaleIcon,
  EitaIcon,
  InboxIcon,
  InstagramIcon,
  LocationIcon,
  PhoneCallIcon,
  RubikaIcon,
  TelegramIcon,
  WhatsappIcon,
} from "@/src/shared/constants/icons";
import { Text } from "@/src/shared/ui";
import Image from "next/image";
import Link from "next/link";
import { Title } from "../../../../shared/ui/title/title.ui";
import { useAboutData } from "../_hooks/useAboutData";
import type { AboutData } from "../_types/about.types";

interface AboutUsMainProps {
  initialData: AboutData;
}

export function AboutUsMain({ initialData }: AboutUsMainProps) {
  const { contactUs, aboutUs, socialMedia } = useAboutData(initialData);

  // اگر map وجود داشته باشد، کل ردیف آدرس لینک می‌شود
  const hasMapLink = contactUs.map && contactUs.map !== "";

  return (
    <div className="flex flex-col">
      {/* بخش اول - درباره ما */}
      <div className="order-1 h-auto w-full bg-white py-6 lg:order-2 lg:h-[18vw] lg:py-2">
        <div className="px-4 md:px-6 lg:px-12">
          <div className="flex flex-col py-2">
            <div className="inline-block">
              <Title
                size="2xl"
                text={aboutUs.title}
                variant="underlined-secondary"
              />
            </div>
            <div className="py-3">
              <div className="flex flex-col items-center gap-3 py-3">
                <div className="pb-3 md:pb-5">
                  <Text size="md" text={aboutUs.description1} />
                </div>
                <Text size="md" text={aboutUs.description2} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* بخش دوم - اطلاعات تماس و لوگو */}
      <div className="order-2 h-auto w-full bg-accent pt-4 lg:order-1 lg:h-[14vw]">
        <div className="flex flex-col px-4 md:flex-row md:justify-between md:px-6 lg:px-12">
          {/* اطلاعات تماس */}
          <div className="flex w-full flex-col py-2 lg:w-auto">
            <div className="inline-block">
              <Title
                size="2xl"
                text={contactUs.title}
                variant="underlined-secondary"
              />
            </div>
            <div className="py-3">
              {/* ردیف آدرس - کل ردیف لینک می‌شود */}
              <div className="flex flex-row items-center gap-3 py-2 md:py-3">
                {hasMapLink ? (
                  <Link
                    className="transition-opacity hover:opacity-70"
                    href={contactUs.map}
                    target="_blank"
                  >
                    <LocationIcon color="text-secondary" size="md" />
                  </Link>
                ) : (
                  <LocationIcon color="text-secondary" size="md" />
                )}
                {hasMapLink ? (
                  <Link
                    className="transition-opacity hover:opacity-70"
                    href={contactUs.map}
                    target="_blank"
                  >
                    <Text size="md" text={contactUs.address} />
                  </Link>
                ) : (
                  <Text size="md" text={contactUs.address} />
                )}
              </div>

              {/* ردیف تلفن */}
              <div className="flex flex-row items-center gap-3 py-2 md:py-3">
                <PhoneCallIcon color="text-secondary" size="md" />
                <Text size="md" text={contactUs.phoneNumbers} />
              </div>

              {/* ردیف ایمیل */}
              <div className="flex flex-row items-center gap-3 py-2 md:py-3">
                <InboxIcon color="text-secondary" size="md" />
                <span className="font-times text-md break-all text-primary">
                  {contactUs.email}
                </span>
              </div>
            </div>

            {/* شبکه‌های اجتماعی - موبایل و تبلت */}
            <div className="item mt-4 flex flex-row gap-4 md:mt-8 lg:hidden">
              <Link
                className="transition-opacity hover:opacity-70"
                href={socialMedia.instagram}
                target="_blank"
              >
                <InstagramIcon color="text-secondary" size="md" />
              </Link>
              <Link
                className="transition-opacity hover:opacity-70"
                href={socialMedia.telegram}
                target="_blank"
              >
                <TelegramIcon color="text-secondary" size="md" />
              </Link>
              <Link
                className="transition-opacity hover:opacity-70"
                href={socialMedia.whatsapp}
                target="_blank"
              >
                <WhatsappIcon color="text-secondary" size="md" />
              </Link>
              <Link
                className="transition-opacity hover:opacity-70"
                href={socialMedia.bale}
                target="_blank"
              >
                <BaleIcon color="text-secondary" size="md" />
              </Link>
              <Link
                className="transition-opacity hover:opacity-70"
                href={socialMedia.rubika}
                target="_blank"
              >
                <RubikaIcon color="text-secondary" size="md" />
              </Link>
              <Link
                className="transition-opacity hover:opacity-70"
                href={socialMedia.eita}
                target="_blank"
              >
                <EitaIcon color="text-secondary" size="md" />
              </Link>
            </div>
          </div>

          {/* لوگو و شبکه‌های اجتماعی - دسکتاپ */}
          <div className="hidden flex-col items-center py-4 lg:flex lg:py-2">
            <div className="flex justify-center lg:justify-end">
              <Image
                alt="logo"
                className="h-auto w-40 md:w-60 lg:h-[106px] lg:w-[307px]"
                height={80}
                src="/images/logo.svg"
                width={200}
              />
            </div>
            <div className="item mt-4 flex flex-row gap-4 md:mt-8 md:gap-5">
              <Link
                className="transition-opacity hover:opacity-70"
                href={socialMedia.eita}
                target="_blank"
              >
                <EitaIcon color="text-secondary" size="md" />
              </Link>
              <Link
                className="transition-opacity hover:opacity-70"
                href={socialMedia.rubika}
                target="_blank"
              >
                <RubikaIcon color="text-secondary" size="md" />
              </Link>
              <Link
                className="transition-opacity hover:opacity-70"
                href={socialMedia.bale}
                target="_blank"
              >
                <BaleIcon color="text-secondary" size="md" />
              </Link>
              <Link
                className="transition-opacity hover:opacity-70"
                href={socialMedia.instagram}
                target="_blank"
              >
                <InstagramIcon color="text-secondary" size="md" />
              </Link>
              <Link
                className="transition-opacity hover:opacity-70"
                href={socialMedia.telegram}
                target="_blank"
              >
                <TelegramIcon color="text-secondary" size="md" />
              </Link>
              <Link
                className="transition-opacity hover:opacity-70"
                href={socialMedia.whatsapp}
                target="_blank"
              >
                <WhatsappIcon color="text-secondary" size="md" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
