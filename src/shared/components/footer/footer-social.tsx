import { InstagramIcon } from "@/src/shared/ui/icons/instagram-icon";
import { TelegramIcon } from "@/src/shared/ui/icons/telegram-icon";
import { WhatsappIcon } from "@/src/shared/ui/icons/whatsapp-icon";

export default function FooterSocial() {
  return (
    <div className="flex items-center justify-between gap-3 md:justify-start">
      <span className="text-sm text-primary">همراه ما باشید!</span>
      <div className="flex items-center gap-3 text-xl text-primary">
        <a href="#" aria-label="اینستاگرام">
          <InstagramIcon />
        </a>
        <a href="#" aria-label="تلگرام">
          <TelegramIcon />
        </a>
        <a href="#" aria-label="واتساپ">
          <WhatsappIcon />
        </a>
      </div>
    </div>
  );
}