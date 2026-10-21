import { ContactUsIcon } from "@/src/shared/ui/icons/contact-us-icon";
import { LocationIcon } from "@/src/shared/ui/icons/location-icon";
import FooterLinkGroup from "./footer-link-group";
import FooterLogoList from "./footer-logo-list";
import FooterSocial from "./footer-social";
import {
  FooterPhones,
  ProductLinks,
  QuickLinks,
  ServiceLinks,
} from "./footer-constants";

export default function Footer() {
  return (
    <footer className="overflow-hidden rounded-t-[48px] bg-foreground text-background">
      {/* top */}
      <div className="page-px flex flex-col gap-2 rounded-t-4xl bg-primary py-6 text-foreground md:w-1/2 md:gap-3 md:py-8">
        <h2 className="text-lg font-bold md:text-2xl">
          الکتریکی راد (راهکارهای الکتریکی و دیجیتال)
        </h2>
        <p className="text-sm">
          طراحی، تأمین و مونتاژ تابلو برق با رویکردی دقیق، استاندارد و
          مهندسی‌شده.
        </p>
      </div>

      {/* body */}
      <div className="page-px flex flex-col gap-6 py-8 md:flex-row md:gap-12 md:py-12">
        {/* about */}
        <div className="flex flex-col gap-6 md:w-1/4 md:shrink-0">
          <div className="md:hidden">
            <FooterSocial />
          </div>
          <p className="text-sm leading-7">
            برق و صنعت راد (راهکارهای الکتریکی و دیجیتال) با سال‌ها تجربه در
            مشاوره، طراحی و ساخت تابلوهای برق صنعتی فشار ضعیف و متوسط، مطابق با
            استانداردهای بین‌المللی به عنوان یکی از پیشگامان این صنعت شناخته
            می‌شود. این شرکت همچنین مجری پروژه‌های هوشمندسازی و اتوماسیون صنعتی
            و تأمین‌کننده انواع تجهیزات برق صنعتی و ساختمانی از برندهای معتبر
            داخلی و خارجی است.
          </p>
          <div className="hidden md:block">
            <FooterLogoList />
          </div>
        </div>

        {/* links */}
        <div className="flex flex-col border-t border-background/20 md:flex-1 md:flex-row md:gap-8 md:border-0">
          <FooterLinkGroup title="دسترسی سریع" links={QuickLinks} />
          <FooterLinkGroup title="محصولات" links={ProductLinks} />
          <FooterLinkGroup title="خدمات" links={ServiceLinks} />
        </div>

        {/* contact */}
        <div className="flex flex-col gap-6 text-sm md:w-1/5 md:shrink-0">
          <div className="flex items-start gap-2">
            <LocationIcon className="mt-1 shrink-0 text-base text-primary" />
            <p>
              آدرس: شیراز، شهرک آیین، پارک علم و فناوری، برق و صنعت راد
            </p>
          </div>

          <div className="flex items-start gap-2">
            <ContactUsIcon className="mt-1 shrink-0 text-base text-primary" />
            <div className="flex flex-col gap-4">
              {FooterPhones.map((phone) => (
                <div key={phone.id} className="flex flex-col gap-1">
                  <span>{phone.label}</span>
                  <span>{phone.number}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <FooterSocial />
          </div>
        </div>

        {/* logos: mobile */}
        <div className="md:hidden mt-5">
          <FooterLogoList />
        </div>
      </div>

      {/* copyright */}
      <div className="border-t border-background/20 py-4 text-center text-xs text-grey">
        تمام حقوق این سرویس محفوظ و متعلق به شرکت نوا می‌باشد.
      </div>
    </footer>
  );
}