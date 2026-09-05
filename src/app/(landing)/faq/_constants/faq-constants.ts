// _constants/faq-_constants.ts
import { AdminIcon } from "@/src/shared/constants/icons/admin-icon";
import { BagIcon } from "@/src/shared/constants/icons/bag-icon";
import { DeliveryIcon } from "@/src/shared/constants/icons/delivery-icon";
import { LockIcon } from "@/src/shared/constants/icons/lock-icon";
import { MoreHorizontalIcon } from "@/src/shared/constants/icons/more-horizontal-icon";
import { OfficerIcon } from "@/src/shared/constants/icons/officer-icon";
import { PackageIcon } from "@/src/shared/constants/icons/packageicon";
import { PayIcon } from "@/src/shared/constants/icons/pay-icon";
import { QuestionIcon } from "@/src/shared/constants/icons/question-icon";
import { ReturnedIcon } from "@/src/shared/constants/icons/returned-icon";
import { SupportIcon } from "@/src/shared/constants/icons/support-icon";
import { TagIcon } from "@/src/shared/constants/icons/tag-icon";
import { IconProps } from "@/src/shared/types/IconTypes";

// icons
export const faqIconMap: Record<string, React.ComponentType<IconProps>> = {
  user: AdminIcon,
  support: SupportIcon,
  cart: BagIcon,
  truck: DeliveryIcon,
  help: QuestionIcon,
  officer: OfficerIcon,
  returned: ReturnedIcon,
  tag: TagIcon,
  morehorizontal: MoreHorizontalIcon,
  package: PackageIcon,
  pay:PayIcon,
  lock:LockIcon
};

// default
export const DefaultIcon = QuestionIcon;
