"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { DropdownArrowIcon } from "../../constants/icons";
import { BaleIcon } from "../../constants/icons/bale-icon";
import { EitaIcon } from "../../constants/icons/eita-icon";
import { InstagramIcon } from "../../constants/icons/instagram-icon";
import { RubikaIcon } from "../../constants/icons/rubika-icon";
import { TelegramIcon } from "../../constants/icons/telegram-icon";
import { WhatsappIcon } from "../../constants/icons/whatsapp-icon";
import { DefaultButton, Text } from "../../ui";
import {
  brandItems,
  customerItems,
  features,
  shopItems,
} from "./footer.constants";
import { FooterKeys, useFooter } from "./useFooter";

type LinksSectionKey = "shop" | "customer" | "brand";

export default function Footer() {
  const { getText } = useFooter();
  const [openSection, setOpenSection] = useState<LinksSectionKey | null>(null);

  const toggleSection = (key: LinksSectionKey) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const linksSections: {
    key: LinksSectionKey;
    title: string;
    items: typeof shopItems;
  }[] = [
    {
      key: "shop",
      title: getText("shopTitle" as FooterKeys),
      items: shopItems,
    },
    {
      key: "customer",
      title: getText("customerTitle" as FooterKeys),
      items: customerItems,
    },
    {
      key: "brand",
      title: getText("brandTitle" as FooterKeys),
      items: brandItems,
    },
  ];

  return (
    <footer className="mt-20 bg-white">
      {/* Features Row - Full Width - مشترک: موبایل ۲ ردیف، تبلت/دسکتاپ ۱ ردیف */}
      <div className="w-full bg-accent">
        <div className="grid grid-cols-2 gap-3 px-4 text-center sm:grid-cols-4 sm:gap-8 md:px-10">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-0 py-3 sm:gap-3 sm:py-2"
            >
              <div className="text-4xl">{item.icon}</div>
              <Text
                text={getText(item.key as FooterKeys)}
                size="lg"
                color="secondary"
                weight="regular"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ==================== موبایل و تبلت ==================== */}
      <div className="px-4 pt-8 lg:hidden">
        {/* Links Columns → آکاردئون سه‌ردیفه */}
        <div className="flex flex-col divide-y divide-gray border-b border-gray">
          {linksSections.map((section) => {
            const isOpen = openSection === section.key;
            return (
              <div key={section.key} className="py-4">
                <button
                  onClick={() => toggleSection(section.key)}
                  className="flex w-full cursor-pointer items-center justify-between"
                >
                  <Text
                    text={section.title}
                    size="lg"
                    weight="medium"
                    color="primary"
                  />
                  <div
                    className={`transition-transform duration-200 ${
                      isOpen ? "-rotate-180" : ""
                    }`}
                  >
                    <DropdownArrowIcon size="sm" color="text-secondary" />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 flex flex-col gap-3 pr-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.key}
                        href={item.href}
                        className="group relative w-fit cursor-pointer py-1 transition-opacity"
                      >
                        <Text
                          text={getText(item.key as FooterKeys)}
                          size="md"
                          weight="regular"
                          color="secondary"
                        />
                        <span className="absolute right-0 bottom-0 h-[0.5px] w-0 bg-secondary transition-all duration-300 group-hover:w-full" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* About Us + Newsletter: موبایل ستونی، تبلت کنار هم */}
        <div className="flex flex-col gap-8 pt-8 sm:flex-row sm:items-end sm:gap-10">
          <div className="flex flex-col gap-4 sm:flex-1">
            {/* لوگو */}
            <div className="flex justify-start pt-8">
              <Image
                src="/images/logo.svg"
                width={220}
                height={76}
                alt="logo"
                className="h-auto w-40 sm:w-52"
              />
            </div>
            {/* About Us */}

            <div className="leading-7">
              <Text
                text={getText("aboutText" as FooterKeys)}
                weight="light"
                size="lg"
                color="secondary"
              />
            </div>
          </div>

          {/* Newsletter & Enamad */}
          <div className="sm:flex-1">
            <div className="flex flex-col items-center gap-4">
              <Image
                src="/images/enamad.svg"
                width={140}
                height={140}
                alt="enamad"
                className="h-auto w-28 sm:w-36"
              />
              <div className="w-full max-w-xs pt-4 sm:max-w-none">
                <Text
                  text={getText("newsletterText" as FooterKeys)}
                  size="md"
                  weight="regular"
                  color="primary"
                />
                <div className="flex items-center gap-2 pt-4 text-sm text-secondary">
                  <input
                    type="email"
                    placeholder={getText(
                      "newsletterEmailPlaceholder" as FooterKeys,
                    )}
                    className="text-regular h-10 flex-1 rounded-sm bg-accent px-3 py-3 text-right text-sm text-secondary transition-colors focus:border-secondary focus:outline-none"
                    dir="rtl"
                  />
                  <div className="w-13 shrink-0">
                    <DefaultButton
                      type="primary"
                      style="outline"
                      label={getText("newsletterButton" as FooterKeys)}
                      action={() => {}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== دسکتاپ (بدون تغییر نسبت به قبل) ==================== */}
      <div className="hidden px-4 pt-10 md:px-10 lg:block">
        {/* Logo */}
        <div className="flex justify-start">
          <Image src="/images/logo.svg" width={307} height={106} alt="logo" />
        </div>

        {/* Content Grid */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* About Us */}
          <div className="md:col-span-3">
            <div className="flex flex-col">
              <div className="leading-7">
                <Text
                  text={getText("aboutText" as FooterKeys)}
                  weight="light"
                  size="lg"
                  color="secondary"
                />
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-6">
            <div className="mr-20 grid grid-cols-1 gap-10 text-right sm:grid-cols-3">
              {/* Shop Column */}
              <div>
                <Text
                  text={getText("shopTitle" as FooterKeys)}
                  size="lg"
                  weight="medium"
                  color="primary"
                />
                <div className="mt-4 flex flex-col gap-3">
                  {shopItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="group relative w-fit cursor-pointer py-1 transition-opacity"
                    >
                      <Text
                        text={getText(item.key as FooterKeys)}
                        size="md"
                        weight="regular"
                        color="secondary"
                      />
                      <span className="absolute right-0 bottom-0 h-[0.5px] w-0 bg-secondary transition-all duration-300 group-hover:w-full" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Customer Service Column */}
              <div>
                <Text
                  text={getText("customerTitle" as FooterKeys)}
                  size="lg"
                  weight="medium"
                  color="primary"
                />
                <div className="mt-4 flex flex-col gap-3">
                  {customerItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="group relative w-fit cursor-pointer py-1 transition-opacity"
                    >
                      <Text
                        text={getText(item.key as FooterKeys)}
                        size="md"
                        weight="regular"
                        color="secondary"
                      />
                      <span className="absolute right-0 bottom-0 h-[0.5px] w-0 bg-secondary transition-all duration-300 group-hover:w-full" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Brand Column */}
              <div>
                <Text
                  text={getText("brandTitle" as FooterKeys)}
                  size="lg"
                  weight="medium"
                  color="primary"
                />
                <div className="mt-4 flex flex-col gap-3">
                  {brandItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="group relative w-fit cursor-pointer py-1 transition-opacity"
                    >
                      <Text
                        text={getText(item.key as FooterKeys)}
                        size="md"
                        weight="regular"
                        color="secondary"
                      />
                      <span className="absolute right-0 bottom-0 h-[0.5px] w-0 bg-secondary transition-all duration-300 group-hover:w-full" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter & Enamad */}
          <div className="md:col-span-3">
            <div className="flex flex-col items-center gap-4">
              <Image
                src="/images/enamad.svg"
                width={160}
                height={160}
                alt="enamad"
              />
              <div className="w-65 pt-4">
                <Text
                  text={getText("newsletterText" as FooterKeys)}
                  size="md"
                  weight="regular"
                  color="primary"
                />
                <div className="flex items-center gap-2 pt-4 text-sm text-secondary">
                  <input
                    type="email"
                    placeholder={getText(
                      "newsletterEmailPlaceholder" as FooterKeys,
                    )}
                    className="text-regular h-10 flex-1 rounded-sm bg-accent px-3 py-3 text-right text-sm text-secondary transition-colors focus:border-secondary focus:outline-none"
                    dir="rtl"
                  />
                  <div className="w-13 shrink-0">
                    <DefaultButton
                      type="primary"
                      style="outline"
                      label={getText("newsletterButton" as FooterKeys)}
                      action={() => {}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links - مشترک، همیشه انتهای فوتر */}
      <div className="px-4 pt-8 pb-5 md:px-10 lg:pt-0">
        <div className="hidden h-[0.5px] bg-gray lg:mt-5 lg:mr-82 lg:block" />
        <div className="flex flex-wrap items-center justify-center gap-5 border-t border-gray pt-6 sm:gap-7 lg:justify-end lg:border-t-0 lg:pt-5">
          <Text
            text={getText("socialFollow" as FooterKeys)}
            size="lg"
            weight="regular"
            color="secondary"
          />

          <Link
            href="https://whatsapp.com"
            className="group relative cursor-pointer transition-opacity hover:opacity-70"
          >
            <EitaIcon size="md" color="text-secondary" />
          </Link>
          <Link
            href="https://whatsapp.com"
            className="group relative cursor-pointer transition-opacity hover:opacity-70"
          >
            <RubikaIcon size="md" color="text-secondary" />
          </Link>
          <Link
            href="https://whatsapp.com"
            className="group relative cursor-pointer transition-opacity hover:opacity-70"
          >
            <BaleIcon size="md" color="text-secondary" />
          </Link>

          <Link
            href="https://instagram.com"
            className="group relative cursor-pointer transition-opacity hover:opacity-70"
          >
            <InstagramIcon size="md" color="text-secondary" />
          </Link>
          <Link
            href="https://telegram.org"
            className="group relative cursor-pointer transition-opacity hover:opacity-70"
          >
            <TelegramIcon size="md" color="text-secondary" />
          </Link>
          <Link
            href="https://whatsapp.com"
            className="group relative cursor-pointer transition-opacity hover:opacity-70"
          >
            <WhatsappIcon size="md" color="text-secondary" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
