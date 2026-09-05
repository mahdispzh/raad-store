import {
  AddLocationIcon,
  AdminIcon,
  AlarmMessageIcon,
  AnalyticsIcon,
  ApprovalCircleIcon,
  ArrowDownwardIcon,
  ArrowIcon,
  ArrowUpwardIcon,
  BagIcon,
  BaleIcon,
  BookIcon,
  BoxIcon,
  BrandCartIcon,
  BrandIcon,
  CalendarIcon,
  CameraIcon,
  CartIcon,
  CategoryIcon,
  ChartIcon,
  CheckBoldIcon,
  CheckIcon,
  CircularCommentIcon,
  ClockIcon,
  CloseIcon,
  CloseModalIcon,
  ColorIcon,
  CommentIcon,
  ComposeIcon,
  ContentIcon,
  CurrentIcon,
  DashboardMinusIcon,
  DashboardPlusIcon,
  DashboardRefreshIcon,
  DashboardSuccessIcon,
  DashboardUserIcon,
  DateIcon,
  DeliveredIcon,
  DeliveryIcon,
  DiscountBoxIcon,
  DiscountIcon,
  DislikedButtonIcon,
  DismissIcon,
  DocumentIcon,
  DoubleArrowIcon,
  DropdownArrowFilledIcon,
  DropdownArrowIcon,
  DropleftArrowIcon,
  DualSquareEmpty,
  DualSquareFilled,
  DualSquareOutline,
  EditPanelIcon,
  EducationIcon,
  EitaIcon,
  ErrorIcon,
  ExclamationMarkIcon,
  ExitIcon,
  ExportIcon,
  EyeIcon,
  FactorBookIcon,
  FactorIcon,
  FileIcon,
  FilterHamburgerIcon,
  FilterIcon,
  FlagIcon,
  GiftIcon,
  HistoryIcon,
  HomeIcon,
  ImageOffIcon,
  InboxIcon,
  InstagramIcon,
  InventoryIcon,
  LeftArrowCircledIcon,
  LeftArrowIcon,
  LikeFilledIcon,
  LikeIcon,
  LikedButtonIcon,
  LocationIcon,
  LocationPinIcon,
  LockIcon,
  LoginIcon,
  LogoutIcon,
  MenuIcon,
  MinusIcon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  NewIcon,
  NotFoundIcon,
  NotificationIcon,
  OfficerIcon,
  OrderIcon,
  OutlineStarIcon,
  PackageIcon,
  PayIcon,
  PencilIcon,
  PercentIcon,
  PhoneCallIcon,
  PhoneIcon,
  PlusCircleIcon,
  PlusEmptyIcon,
  PlusIcon,
  PriceIcon,
  ProductIcon,
  PublishIcon,
  QuestionIcon,
  RecycleBinIcon,
  RefreshIcon,
  ReplyIcon,
  ReportIcon,
  ReturnIcon,
  ReturnedIcon,
  RightArrowCircledIcon,
  RightArrowIcon,
  RubikaIcon,
  RulerIcon,
  SadIcon,
  SaveEmptyIcon,
  SaveFilledIcon,
  SearchIcon,
  SettingIcon,
  ShareIcon,
  ShopIcon,
  SolidStarIcon,
  SpinnerIcon,
  StoreIcon,
  SuccessIcon,
  SuccessOutlineIcon,
  SuccessRoundedIcon,
  SupportIcon,
  TagIcon,
  TelegramIcon,
  TicketIcon,
  TimelineIcon,
  TomanIcon,
  TrashIcon,
  TruckIcon,
  UnpublishIcon,
  UserAddIcon,
  UserIcon,
  UserProfileIcon,
  UsersIcon,
  VerifiedIcon,
  WaitingIcon,
  WalletIcon,
  WhatsappIcon,
} from "@/src/shared/constants/icons";
import { ChatIcon } from "@/src/shared/constants/icons/chat-icon";
import { CurrencyIcon } from "@/src/shared/constants/icons/currency-icon";

export default function Page() {
  const IconBlock = ({
    name,
    children,
  }: {
    name: string;
    children: React.ReactNode;
  }) => {
    return (
      <div className="mx-[2vw] flex flex-col items-center gap-[0.5vw]">
        <span className="text-[0.8vw] text-gray-500">{name}</span>

        <div className="flex flex-col items-center gap-[0.5vw]">{children}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-wrap gap-[4vw] p-[3vw]">
      {/* DashboardMinus */}
      <IconBlock name="DashboardMinusIcon">
        <DashboardMinusIcon size="xs" />
        <DashboardMinusIcon size="sm" />
        <DashboardMinusIcon size="md" />
        <DashboardMinusIcon size="lg" />
      </IconBlock>

      {/* ADMIN */}
      <IconBlock name="AdminIcon">
        <AdminIcon size="xs" />
        <AdminIcon size="sm" />
        <AdminIcon size="md" />
        <AdminIcon size="lg" />
      </IconBlock>

      {/* CALENDAR */}
      <IconBlock name="CalendarIcon">
        <CalendarIcon size="xs" />
        <CalendarIcon size="sm" />
        <CalendarIcon size="md" />
        <CalendarIcon size="lg" />
      </IconBlock>

      {/* CAMERA */}
      <IconBlock name="CameraIcon">
        <CameraIcon size="xs" />
        <CameraIcon size="sm" />
        <CameraIcon size="md" />
        <CameraIcon size="lg" />
      </IconBlock>

      {/* CHECK */}
      <IconBlock name="CheckIcon">
        <CheckIcon size="xs" />
        <CheckIcon size="sm" />
        <CheckIcon size="md" />
        <CheckIcon size="lg" />
      </IconBlock>

      {/* COMMENT */}
      <IconBlock name="CommentIcon">
        <CommentIcon size="xs" />
        <CommentIcon size="sm" />
        <CommentIcon size="md" />
        <CommentIcon size="lg" />
      </IconBlock>

      {/* CLOSE */}
      <IconBlock name="CloseIcon">
        <CloseIcon size="xs" />
        <CloseIcon size="sm" />
        <CloseIcon size="md" />
        <CloseIcon size="lg" />
      </IconBlock>

      {/* COMPOSE */}
      <IconBlock name="ComposeIcon">
        <ComposeIcon size="xs" />
        <ComposeIcon size="sm" />
        <ComposeIcon size="md" />
        <ComposeIcon size="lg" />
      </IconBlock>

      {/* CURRENT */}
      <IconBlock name="CurrentIcon">
        <CurrentIcon size="xs" />
        <CurrentIcon size="sm" />
        <CurrentIcon size="md" />
        <CurrentIcon size="lg" />
      </IconBlock>

      {/* ERROR */}
      <IconBlock name="ErrorIcon">
        <ErrorIcon size="xs" />
        <ErrorIcon size="sm" />
        <ErrorIcon size="md" />
        <ErrorIcon size="lg" />
      </IconBlock>

      {/* MINUS */}
      <IconBlock name="MinusIcon">
        <MinusIcon size="xs" />
        <MinusIcon size="sm" />
        <MinusIcon size="md" />
        <MinusIcon size="lg" />
      </IconBlock>

      {/* PLUS */}
      <IconBlock name="PlusIcon">
        <PlusIcon size="xs" />
        <PlusIcon size="sm" />
        <PlusIcon size="md" />
        <PlusIcon size="lg" />
      </IconBlock>

      {/* REFRESH */}
      <IconBlock name="RefreshIcon">
        <RefreshIcon size="xs" />
        <RefreshIcon size="sm" />
        <RefreshIcon size="md" />
        <RefreshIcon size="lg" />
      </IconBlock>

      {/* SUCCESS */}
      <IconBlock name="SuccessIcon">
        <SuccessIcon size="xs" />
        <SuccessIcon size="sm" />
        <SuccessIcon size="md" />
        <SuccessIcon size="lg" />
      </IconBlock>

      {/* SUCCESS OUTLINE */}
      <IconBlock name="SuccessOutlineIcon">
        <SuccessOutlineIcon size="xs" color="text-success" />
        <SuccessOutlineIcon size="sm" color="text-success" />
        <SuccessOutlineIcon size="md" color="text-success" />
        <SuccessOutlineIcon size="lg" color="text-success" />
      </IconBlock>

      {/* USER */}
      <IconBlock name="UserIcon">
        <UserIcon size="xs" />
        <UserIcon size="sm" />
        <UserIcon size="md" />
        <UserIcon size="lg" />
      </IconBlock>

      {/* DELIVERED */}
      <IconBlock name="DeliveredIcon">
        <DeliveredIcon size="xs" />
        <DeliveredIcon size="sm" />
        <DeliveredIcon size="md" />
        <DeliveredIcon size="lg" />
      </IconBlock>

      {/* DELIVERY */}
      <IconBlock name="DeliveryIcon">
        <DeliveryIcon size="xs" />
        <DeliveryIcon size="sm" />
        <DeliveryIcon size="md" />
        <DeliveryIcon size="lg" />
      </IconBlock>

      {/* DROPDOWN */}
      <IconBlock name="DropdownArrowIcon">
        <DropdownArrowIcon size="xs" />
        <DropdownArrowIcon size="sm" />
        <DropdownArrowIcon size="md" />
        <DropdownArrowIcon size="lg" />
      </IconBlock>

      {/* EDUCATION */}
      <IconBlock name="EducationIcon">
        <EducationIcon size="xs" />
        <EducationIcon size="sm" />
        <EducationIcon size="md" />
        <EducationIcon size="lg" />
      </IconBlock>

      {/* EXCLAMATION */}
      <IconBlock name="ExclamationMarkIcon">
        <ExclamationMarkIcon size="xs" />
        <ExclamationMarkIcon size="sm" />
        <ExclamationMarkIcon size="md" />
        <ExclamationMarkIcon size="lg" />
      </IconBlock>

      {/* EXIT */}
      <IconBlock name="ExitIcon">
        <ExitIcon size="xs" />
        <ExitIcon size="sm" />
        <ExitIcon size="md" />
        <ExitIcon size="lg" />
      </IconBlock>

      {/* HISTORY */}
      <IconBlock name="HistoryIcon">
        <HistoryIcon size="xs" />
        <HistoryIcon size="sm" />
        <HistoryIcon size="md" />
        <HistoryIcon size="lg" />
      </IconBlock>

      {/* LEFT ARROW */}
      <IconBlock name="LeftArrowIcon">
        <LeftArrowIcon size="xs" />
        <LeftArrowIcon size="sm" />
        <LeftArrowIcon size="md" />
        <LeftArrowIcon size="lg" />
      </IconBlock>

      {/* RIGHT ARROW */}
      <IconBlock name="RightArrowIcon">
        <RightArrowIcon size="xs" />
        <RightArrowIcon size="sm" />
        <RightArrowIcon size="md" />
        <RightArrowIcon size="lg" />
      </IconBlock>

      {/* SEARCH */}
      <IconBlock name="SearchIcon">
        <SearchIcon size="xs" />
        <SearchIcon size="sm" />
        <SearchIcon size="md" />
        <SearchIcon size="lg" />
      </IconBlock>

      {/* SPINNER */}
      <IconBlock name="SpinnerIcon">
        <SpinnerIcon size="xs" />
        <SpinnerIcon size="sm" />
        <SpinnerIcon size="md" />
        <SpinnerIcon size="lg" />
      </IconBlock>

      {/* STORE */}
      <IconBlock name="StoreIcon">
        <StoreIcon size="xs" />
        <StoreIcon size="sm" />
        <StoreIcon size="md" />
        <StoreIcon size="lg" />
      </IconBlock>

      {/* SUPPORT */}
      <IconBlock name="SupportIcon">
        <SupportIcon size="xs" />
        <SupportIcon size="sm" />
        <SupportIcon size="md" />
        <SupportIcon size="lg" />
      </IconBlock>

      {/* TRASH */}
      <IconBlock name="TrashIcon">
        <TrashIcon size="xs" />
        <TrashIcon size="sm" />
        <TrashIcon size="md" />
        <TrashIcon size="lg" />
      </IconBlock>

      {/* TRUCK */}
      <IconBlock name="TruckIcon">
        <TruckIcon size="xs" />
        <TruckIcon size="sm" />
        <TruckIcon size="md" />
        <TruckIcon size="lg" />
      </IconBlock>

      {/* WALLET */}
      <IconBlock name="WalletIcon">
        <WalletIcon size="xs" />
        <WalletIcon size="sm" />
        <WalletIcon size="md" />
        <WalletIcon size="lg" />
      </IconBlock>

      {/* CIRCULAR COMMENT */}
      <IconBlock name="CircularCommentIcon">
        <CircularCommentIcon size="xs" />
        <CircularCommentIcon size="sm" />
        <CircularCommentIcon size="md" />
        <CircularCommentIcon size="lg" />
      </IconBlock>

      {/* LEFT ARROW CIRCLED */}
      <IconBlock name="LeftArrowCircledIcon">
        <LeftArrowCircledIcon size="xs" />
        <LeftArrowCircledIcon size="sm" />
        <LeftArrowCircledIcon size="md" />
        <LeftArrowCircledIcon size="lg" />
      </IconBlock>

      {/* LIKE */}
      <IconBlock name="LikeIcon">
        <LikeIcon size="xs" />
        <LikeIcon size="sm" />
        <LikeIcon size="md" />
        <LikeIcon size="lg" />
      </IconBlock>

      {/* LOCATION PIN */}
      <IconBlock name="LocationPinIcon">
        <LocationPinIcon size="xs" />
        <LocationPinIcon size="sm" />
        <LocationPinIcon size="md" />
        <LocationPinIcon size="lg" />
      </IconBlock>

      {/* LOGIN */}
      <IconBlock name="LoginIcon">
        <LoginIcon size="xs" />
        <LoginIcon size="sm" />
        <LoginIcon size="md" />
        <LoginIcon size="lg" />
      </IconBlock>

      {/* LOGOUT */}
      <IconBlock name="LogoutIcon">
        <LogoutIcon size="xs" />
        <LogoutIcon size="sm" />
        <LogoutIcon size="md" />
        <LogoutIcon size="lg" />
      </IconBlock>

      {/* MORE VERTICAL */}
      <IconBlock name="MoreVerticalIcon">
        <MoreVerticalIcon size="xs" />
        <MoreVerticalIcon size="sm" />
        <MoreVerticalIcon size="md" />
        <MoreVerticalIcon size="lg" />
      </IconBlock>

      {/* NEW */}
      <IconBlock name="NewIcon">
        <NewIcon size="xs" />
        <NewIcon size="sm" />
        <NewIcon size="md" />
        <NewIcon size="lg" />
      </IconBlock>

      {/* OFFICER */}
      <IconBlock name="OfficerIcon">
        <OfficerIcon size="xs" />
        <OfficerIcon size="sm" />
        <OfficerIcon size="md" />
        <OfficerIcon size="lg" />
      </IconBlock>

      {/* OUTLINE STAR */}
      <IconBlock name="OutlineStarIcon">
        <OutlineStarIcon size="xs" />
        <OutlineStarIcon size="sm" />
        <OutlineStarIcon size="md" />
        <OutlineStarIcon size="lg" />
      </IconBlock>

      {/* PHONE */}
      <IconBlock name="PhoneIcon">
        <PhoneIcon size="xs" />
        <PhoneIcon size="sm" />
        <PhoneIcon size="md" />
        <PhoneIcon size="lg" />
      </IconBlock>

      {/* PLUS CIRCLE */}
      <IconBlock name="PlusCircleIcon">
        <PlusCircleIcon size="xs" />
        <PlusCircleIcon size="sm" />
        <PlusCircleIcon size="md" />
        <PlusCircleIcon size="lg" />
      </IconBlock>

      {/* QUESTION */}
      <IconBlock name="QuestionIcon">
        <QuestionIcon size="xs" />
        <QuestionIcon size="sm" />
        <QuestionIcon size="md" />
        <QuestionIcon size="lg" />
      </IconBlock>

      {/* RETURNED */}
      <IconBlock name="ReturnedIcon">
        <ReturnedIcon size="xs" />
        <ReturnedIcon size="sm" />
        <ReturnedIcon size="md" />
        <ReturnedIcon size="lg" />
      </IconBlock>

      {/* RIGHT ARROW CIRCLED */}
      <IconBlock name="RightArrowCircledIcon">
        <RightArrowCircledIcon size="xs" />
        <RightArrowCircledIcon size="sm" />
        <RightArrowCircledIcon size="md" />
        <RightArrowCircledIcon size="lg" />
      </IconBlock>

      {/* SOLID STAR */}
      <IconBlock name="SolidStarIcon">
        <SolidStarIcon size="xs" />
        <SolidStarIcon size="sm" />
        <SolidStarIcon size="md" />
        <SolidStarIcon size="lg" />
      </IconBlock>

      {/* TAG */}
      <IconBlock name="TagIcon">
        <TagIcon size="xs" />
        <TagIcon size="sm" />
        <TagIcon size="md" />
        <TagIcon size="lg" />
      </IconBlock>

      {/* TOMAN */}
      <IconBlock name="TomanIcon">
        <TomanIcon size="xs" />
        <TomanIcon size="sm" />
        <TomanIcon size="md" />
        <TomanIcon size="lg" />
      </IconBlock>

      {/* USER ADD */}
      <IconBlock name="UserAddIcon">
        <UserAddIcon size="xs" />
        <UserAddIcon size="sm" />
        <UserAddIcon size="md" />
        <UserAddIcon size="lg" />
      </IconBlock>

      {/* USER PROFILE */}
      <IconBlock name="UserProfileIcon">
        <UserProfileIcon size="xs" />
        <UserProfileIcon size="sm" />
        <UserProfileIcon size="md" />
        <UserProfileIcon size="lg" />
      </IconBlock>

      {/* VERIFIED */}
      <IconBlock name="VerifiedIcon">
        <VerifiedIcon size="xs" />
        <VerifiedIcon size="sm" />
        <VerifiedIcon size="md" />
        <VerifiedIcon size="lg" />
      </IconBlock>

      {/* DashboardPlusIcon */}
      <IconBlock name="DashboardPlusIcon">
        <DashboardPlusIcon size="xs" />
        <DashboardPlusIcon size="sm" />
        <DashboardPlusIcon size="md" />
        <DashboardPlusIcon size="lg" />
      </IconBlock>

      {/* DashboardRefreshIcon */}
      <IconBlock name="DashboardRefreshIcon">
        <DashboardRefreshIcon size="xs" />
        <DashboardRefreshIcon size="sm" />
        <DashboardRefreshIcon size="md" />
        <DashboardRefreshIcon size="lg" />
      </IconBlock>

      {/* DashboardSuccessIcon */}
      <IconBlock name="DashboardSuccessIcon">
        <DashboardSuccessIcon size="xs" />
        <DashboardSuccessIcon size="sm" />
        <DashboardSuccessIcon size="md" />
        <DashboardSuccessIcon size="lg" />
      </IconBlock>

      {/* GIFT */}
      <IconBlock name="GiftIcon">
        <GiftIcon size="xs" />
        <GiftIcon size="sm" />
        <GiftIcon size="md" />
        <GiftIcon size="lg" />
      </IconBlock>

      {/* DISCOUNT */}
      <IconBlock name="DiscountIcon">
        <DiscountIcon size="xs" />
        <DiscountIcon size="sm" />
        <DiscountIcon size="md" />
        <DiscountIcon size="lg" />
      </IconBlock>

      {/* INSTAGRAM */}
      <IconBlock name="InstagramIcon">
        <InstagramIcon size="xs" />
        <InstagramIcon size="sm" />
        <InstagramIcon size="md" />
        <InstagramIcon size="lg" />
      </IconBlock>

      {/* TELEGRAM */}
      <IconBlock name="TelegramIcon">
        <TelegramIcon size="xs" />
        <TelegramIcon size="sm" />
        <TelegramIcon size="md" />
        <TelegramIcon size="lg" />
      </IconBlock>

      {/* WHATSAPP */}
      <IconBlock name="WhatsappIcon">
        <WhatsappIcon size="xs" />
        <WhatsappIcon size="sm" />
        <WhatsappIcon size="md" />
        <WhatsappIcon size="lg" />
      </IconBlock>

      {/* DashboardSuccessIcon */}
      <IconBlock name="DashboardSuccessIcon">
        <DashboardSuccessIcon size="xs" />
        <DashboardSuccessIcon size="sm" />
        <DashboardSuccessIcon size="md" />
        <DashboardSuccessIcon size="lg" />
      </IconBlock>

      {/*new*/}

      {/*  DropleftArrowIcon*/}
      <IconBlock name="DropleftArrowIcon">
        <DropleftArrowIcon size="xs" />
        <DropleftArrowIcon size="sm" />
        <DropleftArrowIcon size="md" />
        <DropleftArrowIcon size="lg" />
      </IconBlock>

      {/*DualSquareEmpty*/}
      <IconBlock name="DualSquareEmpty">
        <DualSquareEmpty size="xs" />
        <DualSquareEmpty size="sm" />
        <DualSquareEmpty size="md" />
        <DualSquareEmpty size="lg" />
      </IconBlock>

      {/*DualSquareFilled*/}
      <IconBlock name="DualSquareFilled">
        <DualSquareFilled size="xs" />
        <DualSquareFilled size="sm" />
        <DualSquareFilled size="md" />
        <DualSquareFilled size="lg" />
      </IconBlock>

      {/*EditPanelIcon*/}
      <IconBlock name="EditPanelIcon">
        <EditPanelIcon size="xs" />
        <EditPanelIcon size="sm" />
        <EditPanelIcon size="md" />
        <EditPanelIcon size="lg" />
      </IconBlock>

      {/*FilterHamburgerIcon*/}
      <IconBlock name="FilterHamburgerIcon">
        <FilterHamburgerIcon size="xs" />
        <FilterHamburgerIcon size="sm" />
        <FilterHamburgerIcon size="md" />
        <FilterHamburgerIcon size="lg" />
      </IconBlock>

      {/*PlusEmptyIcon*/}
      <IconBlock name="PlusEmptyIcon">
        <PlusEmptyIcon size="xs" />
        <PlusEmptyIcon size="sm" />
        <PlusEmptyIcon size="md" />
        <PlusEmptyIcon size="lg" />
      </IconBlock>

      {/*RecycleBinIcon*/}
      <IconBlock name="RecycleBinIcon">
        <RecycleBinIcon size="xs" />
        <RecycleBinIcon size="sm" />
        <RecycleBinIcon size="md" />
        <RecycleBinIcon size="lg" />
      </IconBlock>

      {/*HomeIcon*/}
      <IconBlock name="HomeIcon">
        <HomeIcon size="xs" />
        <HomeIcon size="sm" />
        <HomeIcon size="md" />
        <HomeIcon size="lg" />
      </IconBlock>

      {/*OrderIcon*/}
      <IconBlock name="OrderIcon">
        <OrderIcon size="xs" />
        <OrderIcon size="sm" />
        <OrderIcon size="md" />
        <OrderIcon size="lg" />
      </IconBlock>

      {/*AlarmMessageIcon*/}
      <IconBlock name="AlarmMessageIcon">
        <AlarmMessageIcon size="xs" />
        <AlarmMessageIcon size="sm" />
        <AlarmMessageIcon size="md" />
        <AlarmMessageIcon size="lg" />
      </IconBlock>

      {/*PencilIcon*/}
      <IconBlock name="PencilIcon">
        <PencilIcon size="xs" />
        <PencilIcon size="sm" />
        <PencilIcon size="md" />
        <PencilIcon size="lg" />
      </IconBlock>

      {/*SaveFilledIcon*/}
      <IconBlock name="SaveFilledIcon">
        <SaveFilledIcon size="xs" />
        <SaveFilledIcon size="sm" />
        <SaveFilledIcon size="md" />
        <SaveFilledIcon size="lg" />
      </IconBlock>

      {/*SaveEmptyIcon*/}
      <IconBlock name="SaveEmptyIcon">
        <SaveEmptyIcon size="xs" />
        <SaveEmptyIcon size="sm" />
        <SaveEmptyIcon size="md" />
        <SaveEmptyIcon size="lg" />
      </IconBlock>

      {/*ShareIcon*/}
      <IconBlock name="ShareIcon">
        <ShareIcon size="xs" />
        <ShareIcon size="sm" />
        <ShareIcon size="md" />
        <ShareIcon size="lg" />
      </IconBlock>

      {/*BookIcon*/}
      <IconBlock name="BookIcon">
        <BookIcon size="xs" />
        <BookIcon size="sm" />
        <BookIcon size="md" />
        <BookIcon size="lg" />
      </IconBlock>

      {/*LocationIcon*/}
      <IconBlock name="LocationIcon">
        <LocationIcon size="xs" />
        <LocationIcon size="sm" />
        <LocationIcon size="md" />
        <LocationIcon size="lg" />
      </IconBlock>

      {/*InboxIcon*/}
      <IconBlock name="InboxIcon">
        <InboxIcon size="xs" />
        <InboxIcon size="sm" />
        <InboxIcon size="md" />
        <InboxIcon size="lg" />
      </IconBlock>

      {/*PhoneCallIcon*/}
      <IconBlock name="PhoneCallIcon">
        <PhoneCallIcon size="xs" />
        <PhoneCallIcon size="sm" />
        <PhoneCallIcon size="md" />
        <PhoneCallIcon size="lg" />
      </IconBlock>

      {/*WaitingIcon*/}
      <IconBlock name="WaitingIcon">
        <WaitingIcon size="xs" />
        <WaitingIcon size="sm" />
        <WaitingIcon size="md" />
        <WaitingIcon size="lg" />
      </IconBlock>

      {/*ArrowIcon*/}
      <IconBlock name="ArrowIcon">
        <ArrowIcon size="xs" />
        <ArrowIcon size="sm" />
        <ArrowIcon size="md" />
        <ArrowIcon size="lg" />
      </IconBlock>

      {/*RulerIcon*/}
      <IconBlock name="RulerIcon">
        <RulerIcon size="xs" />
        <RulerIcon size="sm" />
        <RulerIcon size="md" />
        <RulerIcon size="lg" />
      </IconBlock>

      {/*TicketIcon*/}
      <IconBlock name="TicketIcon">
        <TicketIcon size="xs" />
        <TicketIcon size="sm" />
        <TicketIcon size="md" />
        <TicketIcon size="lg" />
      </IconBlock>

      {/*DiscountBoxIcon*/}
      <IconBlock name="DiscountBoxIcon">
        <DiscountBoxIcon size="xs" />
        <DiscountBoxIcon size="sm" />
        <DiscountBoxIcon size="md" />
        <DiscountBoxIcon size="lg" />
      </IconBlock>

      {/*ReturnIcon*/}
      <IconBlock name="ReturnIcon">
        <ReturnIcon size="xs" />
        <ReturnIcon size="sm" />
        <ReturnIcon size="md" />
        <ReturnIcon size="lg" />
      </IconBlock>

      {/*FactorBookIcon*/}
      <IconBlock name="FactorBookIcon">
        <FactorBookIcon size="xs" />
        <FactorBookIcon size="sm" />
        <FactorBookIcon size="md" />
        <FactorBookIcon size="lg" />
      </IconBlock>

      {/*ClockIcon*/}
      <IconBlock name="ClockIcon">
        <ClockIcon size="xs" />
        <ClockIcon size="sm" />
        <ClockIcon size="md" />
        <ClockIcon size="lg" />
      </IconBlock>

      {/*DateIcon*/}
      <IconBlock name="DateIcon">
        <DateIcon size="xs" />
        <DateIcon size="sm" />
        <DateIcon size="md" />
        <DateIcon size="lg" />
      </IconBlock>

      {/*LikedButtonIcon*/}
      <IconBlock name="LikedButtonIcon">
        <LikedButtonIcon size="xs" />
        <LikedButtonIcon size="sm" />
        <LikedButtonIcon size="md" />
        <LikedButtonIcon size="lg" />
      </IconBlock>

      {/*DislikedButtonIcon*/}
      <IconBlock name="DislikedButtonIcon">
        <DislikedButtonIcon size="xs" />
        <DislikedButtonIcon size="sm" />
        <DislikedButtonIcon size="md" />
        <DislikedButtonIcon size="lg" />
      </IconBlock>

      {/*ChartIcon*/}
      <IconBlock name="ChartIcon">
        <ChartIcon size="xs" />
        <ChartIcon size="sm" />
        <ChartIcon size="md" />
        <ChartIcon size="lg" />
      </IconBlock>

      {/* PayIcon */}
      <IconBlock name="PayIcon">
        <PayIcon size="xs" />
        <PayIcon size="sm" />
        <PayIcon size="md" />
        <PayIcon size="lg" />
      </IconBlock>

      {/* SuccessRoundedIcon */}
      <IconBlock name="SuccessRoundedIcon">
        <SuccessRoundedIcon size="xs" />
        <SuccessRoundedIcon size="sm" />
        <SuccessRoundedIcon size="md" />
        <SuccessRoundedIcon size="lg" />
      </IconBlock>

      {/* LockIcon */}
      <IconBlock name="LockIcon">
        <LockIcon size="xs" />
        <LockIcon size="sm" />
        <LockIcon size="md" />
        <LockIcon size="lg" />
      </IconBlock>

      {/* ApprovalCircleIcon */}
      <IconBlock name="ApprovalCircleIcon">
        <ApprovalCircleIcon size="xs" />
        <ApprovalCircleIcon size="sm" />
        <ApprovalCircleIcon size="md" />
        <ApprovalCircleIcon size="lg" />
      </IconBlock>
      {/* AddLocationIcon */}

      <IconBlock name="AddLocationIcon">
        <AddLocationIcon size="xs" />
        <AddLocationIcon size="sm" />
        <AddLocationIcon size="md" />
        <AddLocationIcon size="lg" />
      </IconBlock>
      {/* ProductIcon */}

      <IconBlock name="ProductIcon">
        <ProductIcon size="xs" />
        <ProductIcon size="sm" />
        <ProductIcon size="md" />
        <ProductIcon size="lg" />
      </IconBlock>
      {/* FactorIcon */}

      <IconBlock name="FactorIcon">
        <FactorIcon size="xs" />
        <FactorIcon size="sm" />
        <FactorIcon size="md" />
        <FactorIcon size="lg" />
      </IconBlock>
      <IconBlock name="HomeIcon">
        <HomeIcon size="xs" />
        <HomeIcon size="sm" />
        <HomeIcon size="md" />
        <HomeIcon size="lg" />
      </IconBlock>

      <IconBlock name="ProductIcon">
        <ProductIcon size="xs" />
        <ProductIcon size="sm" />
        <ProductIcon size="md" />
        <ProductIcon size="lg" />
      </IconBlock>

      <IconBlock name="FactorIcon">
        <FactorIcon size="xs" />
        <FactorIcon size="sm" />
        <FactorIcon size="md" />
        <FactorIcon size="lg" />
      </IconBlock>

      <IconBlock name="WalletIcon">
        <WalletIcon size="xs" />
        <WalletIcon size="sm" />
        <WalletIcon size="md" />
        <WalletIcon size="lg" />
      </IconBlock>

      <IconBlock name="MoreVerticalIcon">
        <MoreVerticalIcon size="xs" />
        <MoreVerticalIcon size="sm" />
        <MoreVerticalIcon size="md" />
        <MoreVerticalIcon size="lg" />
      </IconBlock>

      <IconBlock name="CategoryIcon">
        <CategoryIcon size="xs" />
        <CategoryIcon size="sm" />
        <CategoryIcon size="md" />
        <CategoryIcon size="lg" />
      </IconBlock>

      <IconBlock name="PercentIcon">
        <PercentIcon size="xs" />
        <PercentIcon size="sm" />
        <PercentIcon size="md" />
        <PercentIcon size="lg" />
      </IconBlock>

      <IconBlock name="UserIcon">
        <UsersIcon size="xs" />
        <UsersIcon size="sm" />
        <UsersIcon size="md" />
        <UsersIcon size="lg" />
      </IconBlock>

      <IconBlock name="BrandIcon">
        <BrandIcon size="xs" />
        <BrandIcon size="sm" />
        <BrandIcon size="md" />
        <BrandIcon size="lg" />
      </IconBlock>

      <IconBlock name="FlagIcon">
        <FlagIcon size="xs" />
        <FlagIcon size="sm" />
        <FlagIcon size="md" />
        <FlagIcon size="lg" />
      </IconBlock>

      {/* BagIcon */}
      <IconBlock name="BagIcon">
        <BagIcon size="xs" />
        <BagIcon size="sm" />
        <BagIcon size="md" />
        <BagIcon size="lg" />
      </IconBlock>

      {/* BaleIcon */}
      <IconBlock name="BaleIcon">
        <BaleIcon size="xs" />
        <BaleIcon size="sm" />
        <BaleIcon size="md" />
        <BaleIcon size="lg" />
      </IconBlock>

      {/* BoxIcon */}
      <IconBlock name="BoxIcon">
        <BoxIcon size="xs" />
        <BoxIcon size="sm" />
        <BoxIcon size="md" />
        <BoxIcon size="lg" />
      </IconBlock>

      {/* BrandCartIcon */}
      <IconBlock name="BrandCartIcon">
        <BrandCartIcon size="xs" />
        <BrandCartIcon size="sm" />
        <BrandCartIcon size="md" />
        <BrandCartIcon size="lg" />
      </IconBlock>

      {/* CheckBoldIcon */}
      <IconBlock name="CheckBoldIcon">
        <CheckBoldIcon size="xs" />
        <CheckBoldIcon size="sm" />
        <CheckBoldIcon size="md" />
        <CheckBoldIcon size="lg" />
      </IconBlock>

      {/* CloseModalIcon */}
      <IconBlock name="CloseModalIcon">
        <CloseModalIcon size="xs" />
        <CloseModalIcon size="sm" />
        <CloseModalIcon size="md" />
        <CloseModalIcon size="lg" />
      </IconBlock>

      {/* ColorIcon */}
      <IconBlock name="ColorIcon">
        <ColorIcon size="xs" />
        <ColorIcon size="sm" />
        <ColorIcon size="md" />
        <ColorIcon size="lg" />
      </IconBlock>

      {/* DropdownArrowFilledIcon */}
      <IconBlock name="DropdownArrowFilledIcon">
        <DropdownArrowFilledIcon size="xs" />
        <DropdownArrowFilledIcon size="sm" />
        <DropdownArrowFilledIcon size="md" />
        <DropdownArrowFilledIcon size="lg" />
      </IconBlock>

      {/* DualSquareOutline */}
      <IconBlock name="DualSquareOutline">
        <DualSquareOutline size="xs" />
        <DualSquareOutline size="sm" />
        <DualSquareOutline size="md" />
        <DualSquareOutline size="lg" />
      </IconBlock>

      {/* EitaIcon */}
      <IconBlock name="EitaIcon">
        <EitaIcon size="xs" />
        <EitaIcon size="sm" />
        <EitaIcon size="md" />
        <EitaIcon size="lg" />
      </IconBlock>

      {/* EyeIcon */}
      <IconBlock name="EyeIcon">
        <EyeIcon size="xs" />
        <EyeIcon size="sm" />
        <EyeIcon size="md" />
        <EyeIcon size="lg" />
      </IconBlock>

      {/* FilterIcon */}
      <IconBlock name="FilterIcon">
        <FilterIcon size="xs" />
        <FilterIcon size="sm" />
        <FilterIcon size="md" />
        <FilterIcon size="lg" />
      </IconBlock>

      {/* ImageOffIcon */}
      <IconBlock name="ImageOffIcon">
        <ImageOffIcon size="xs" />
        <ImageOffIcon size="sm" />
        <ImageOffIcon size="md" />
        <ImageOffIcon size="lg" />
      </IconBlock>

      {/* MenuIcon */}
      <IconBlock name="MenuIcon">
        <MenuIcon size="xs" />
        <MenuIcon size="sm" />
        <MenuIcon size="md" />
        <MenuIcon size="lg" />
      </IconBlock>

      {/* MoreHorizontalIcon */}
      <IconBlock name="MoreHorizontalIcon">
        <MoreHorizontalIcon size="xs" />
        <MoreHorizontalIcon size="sm" />
        <MoreHorizontalIcon size="md" />
        <MoreHorizontalIcon size="lg" />
      </IconBlock>

      {/* NotFoundIcon */}
      <IconBlock name="NotFoundIcon">
        <NotFoundIcon size="xs" />
        <NotFoundIcon size="sm" />
        <NotFoundIcon size="md" />
        <NotFoundIcon size="lg" />
      </IconBlock>

      {/* NotificationIcon */}
      <IconBlock name="NotificationIcon">
        <NotificationIcon size="xs" />
        <NotificationIcon size="sm" />
        <NotificationIcon size="md" />
        <NotificationIcon size="lg" />
      </IconBlock>

      {/* PackageIcon */}
      <IconBlock name="PackageIcon">
        <PackageIcon size="xs" />
        <PackageIcon size="sm" />
        <PackageIcon size="md" />
        <PackageIcon size="lg" />
      </IconBlock>

      {/* ReplyIcon */}
      <IconBlock name="ReplyIcon">
        <ReplyIcon size="xs" />
        <ReplyIcon size="sm" />
        <ReplyIcon size="md" />
        <ReplyIcon size="lg" />
      </IconBlock>

      {/* RubikaIcon */}
      <IconBlock name="RubikaIcon">
        <RubikaIcon size="xs" />
        <RubikaIcon size="sm" />
        <RubikaIcon size="md" />
        <RubikaIcon size="lg" />
      </IconBlock>

      {/* SadIcon */}
      <IconBlock name="SadIcon">
        <SadIcon size="xs" />
        <SadIcon size="sm" />
        <SadIcon size="md" />
        <SadIcon size="lg" />
      </IconBlock>
      {/* DashboardUser */}
      <IconBlock name="DashboardUserIcon">
        <DashboardUserIcon size="xs" />
        <DashboardUserIcon size="sm" />
        <DashboardUserIcon size="md" />
        <DashboardUserIcon size="lg" />
      </IconBlock>

      {/* Export */}
      <IconBlock name="ExportIcon">
        <ExportIcon size="xs" />
        <ExportIcon size="sm" />
        <ExportIcon size="md" />
        <ExportIcon size="lg" />
      </IconBlock>
      {/* Chat */}
      <IconBlock name="ChatIcon">
        <ChatIcon size="xs" />
        <ChatIcon size="sm" />
        <ChatIcon size="md" />
        <ChatIcon size="lg" />
      </IconBlock>
      {/* Currency */}
      <IconBlock name="CurrencyIcon">
        <CurrencyIcon size="xs" />
        <CurrencyIcon size="sm" />
        <CurrencyIcon size="md" />
        <CurrencyIcon size="lg" />
      </IconBlock>
      {/* LikeFilledIcon */}
      <IconBlock name="LikeFilledIcon">
        <LikeFilledIcon size="xs" />
        <LikeFilledIcon size="sm" />
        <LikeFilledIcon size="md" />
        <LikeFilledIcon size="lg" />
      </IconBlock>
      {/* CartIcon */}
      <IconBlock name="CartIcon">
        <CartIcon size="xs" />
        <CartIcon size="sm" />
        <CartIcon size="md" />
        <CartIcon size="lg" />
      </IconBlock>
      {/* ContentIcon */}
      <IconBlock name="ContentIcon">
        <ContentIcon size="xs" />
        <ContentIcon size="sm" />
        <ContentIcon size="md" />
        <ContentIcon size="lg" />
      </IconBlock>
      {/* SettingIcon */}
      <IconBlock name="SettingIcon">
        <SettingIcon size="xs" />
        <SettingIcon size="sm" />
        <SettingIcon size="md" />
        <SettingIcon size="lg" />
      </IconBlock>
      {/* ShopIcon */}
      <IconBlock name="ShopIcon">
        <ShopIcon size="xs" />
        <ShopIcon size="sm" />
        <ShopIcon size="md" />
        <ShopIcon size="lg" />
      </IconBlock>
      {/* ArrowDownwardIcon */}
      <IconBlock name="ArrowDownwardIcon">
        <ArrowDownwardIcon size="xs" />
        <ArrowDownwardIcon size="sm" />
        <ArrowDownwardIcon size="md" />
        <ArrowDownwardIcon size="lg" />
        {/* ArrowUpwardIcon */}
      </IconBlock>
      <IconBlock name="ArrowUpwardIcon">
        <ArrowUpwardIcon size="xs" />
        <ArrowUpwardIcon size="sm" />
        <ArrowUpwardIcon size="md" />
        <ArrowUpwardIcon size="lg" />
      </IconBlock>
      {/* ReportIcon */}
      <IconBlock name="ReportIcon">
        <ReportIcon size="xs" />
        <ReportIcon size="sm" />
        <ReportIcon size="md" />
        <ReportIcon size="lg" />
      </IconBlock>
      {/* FileIcon */}
      <IconBlock name="FileIcon">
        <FileIcon size="xs" />
        <FileIcon size="sm" />
        <FileIcon size="md" />
        <FileIcon size="lg" />
      </IconBlock>
      {/* AnalyticsIcon */}
      <IconBlock name="AnalyticsIcon">
        <AnalyticsIcon size="xs" />
        <AnalyticsIcon size="sm" />
        <AnalyticsIcon size="md" />
        <AnalyticsIcon size="lg" />
      </IconBlock>
      {/* TimelineIcon */}
      <IconBlock name="TimelineIcon">
        <TimelineIcon size="xs" />
        <TimelineIcon size="sm" />
        <TimelineIcon size="md" />
        <TimelineIcon size="lg" />
      </IconBlock>
      {/* PriceIcon */}
      <IconBlock name="PriceIcon">
        <PriceIcon size="xs" />
        <PriceIcon size="sm" />
        <PriceIcon size="md" />
        <PriceIcon size="lg" />
      </IconBlock>
      {/* InventoryIcon */}
      <IconBlock name="InventoryIcon">
        <InventoryIcon size="xs" />
        <InventoryIcon size="sm" />
        <InventoryIcon size="md" />
        <InventoryIcon size="lg" />
      </IconBlock>
         {/* DocumentIcon */}
      <IconBlock name="DocumentIcon">
        <DocumentIcon size="xs" />
        <DocumentIcon size="sm" />
        <DocumentIcon size="md" />
        <DocumentIcon size="lg" />
      </IconBlock>
            {/* DismissIcon */}
      <IconBlock name="DismissIcon">
        <DismissIcon size="xs" />
        <DismissIcon size="sm" />
        <DismissIcon size="md" />
        <DismissIcon size="lg" />
      </IconBlock>
            {/* DoubleArrowIcon */}
      <IconBlock name="DoubleArrowIcon">
        <DoubleArrowIcon size="xs" />
        <DoubleArrowIcon size="sm" />
        <DoubleArrowIcon size="md" />
        <DoubleArrowIcon size="lg" />
      </IconBlock>
       {/* PublishIcon */}
      <IconBlock name="PublishIcon">
        <PublishIcon size="xs" />
        <PublishIcon size="sm" />
        <PublishIcon size="md" />
        <PublishIcon size="lg" />
      </IconBlock> {/* UnpublishIcon */}
      <IconBlock name="UnpublishIcon">
        <UnpublishIcon size="xs" />
        <UnpublishIcon size="sm" />
        <UnpublishIcon size="md" />
        <UnpublishIcon size="lg" />
      </IconBlock>
    </div>
  );
}
