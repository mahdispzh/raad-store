"use client";

import { useAuthStore } from "@/src/shared/store/store";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { Caption, DefaultButton, Text } from "../../ui";
import { formatCartCount } from "../../utils/formatCartCount";

import { ArrowIcon } from "../../constants/icons/arrow-icon";
import { BagIcon } from "../../constants/icons/bag-icon";
import { CloseModalIcon } from "../../constants/icons/close-modal-icon";
import { LoginIcon } from "../../constants/icons/login-icon";
import { MenuIcon } from "../../constants/icons/menu-icon";
import { NotificationIcon } from "../../constants/icons/notification-icon";
import { UserIcon } from "../../constants/icons/user-icon";
import { CartModal } from "../cart-modal/cart-modal";
import { CategoriesModal } from "../categories-modal/categories.ui";
import { VerticalSeparator } from "../footer/footer.constants";
import { LogoutModal } from "../logout/logout-modal.ui";
import { NotificationsDrawer } from "../notifications-modal/notifications-modal";
import { ProfileModal } from "../profile-modal/profile-modal.ui";
import { SearchInput } from "../search/search-input";
import { navLinks } from "./navbar-landing.constants";
import { useNavbarLogic } from "./useNavbarLogic";

export function NavbarLanding() {
  const {
    isLoggedIn,
    isLoading,
    activeLink,
    isSearchOpen,
    handleActiveLink,
    openSearch,
    closeSearch,
    cart,
    notifications,
    profile,
  } = useNavbarLogic();

  const userButtonRef = useRef<HTMLButtonElement>(null);
  const categoriesButtonRef = useRef<HTMLAnchorElement>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const user = useAuthStore((state) => state.user);

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 w-full bg-white">
        <div className="max-w-screen-4xl relative mx-auto flex w-full items-center gap-6 overflow-visible px-4 py-3 sm:px-6 sm:py-4">
          <div className="shrink-0">
            <Image
              src="/images/logo.svg"
              width={141}
              height={51}
              alt="logo"
              className="h-8 w-auto sm:h-10 lg:h-auto lg:w-[141px]"
            />
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white">
        {/* TOP BAR */}
        <div className="max-w-screen-4xl relative mx-auto flex w-full items-center gap-3 overflow-visible px-4 py-3 sm:gap-6 sm:px-6 sm:py-4">
          {/* منوی همبرگری: فقط موبایل/تبلت */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="shrink-0 cursor-pointer rounded-xs p-1.5 transition-all duration-200 hover:bg-accent lg:hidden"
            aria-label="باز کردن منو"
          >
            <MenuIcon size="md" color="text-primary" />
          </button>

          <Link href="/" className="shrink-0 cursor-pointer">
            <Image
              src="/images/logo.svg"
              width={141}
              height={51}
              alt="logo"
              className="h-8 w-auto sm:h-10 lg:h-auto lg:w-[141px]"
            />
          </Link>

          {/* سرچ باکس: فقط دسکتاپ در همین ردیف */}
          <div className="relative z-100 hidden max-w-xl min-w-0 flex-1 lg:block">
            <SearchInput
              open={isSearchOpen}
              onOpen={openSearch}
              onClose={closeSearch}
            />
          </div>

          <div className="relative z-110 mr-auto shrink-0">
            {isLoggedIn ? (
              <div className="flex items-center gap-1 sm:gap-2">
                {/* دکمه نوتیفیکیشن */}
                <button
                  onClick={notifications.open}
                  className="group relative cursor-pointer rounded-xs p-1.5 transition-all duration-200 hover:bg-accent"
                >
                  <NotificationIcon
                    size="sm"
                    color="text-primary transition-colors duration-200"
                  />
                  {notifications.unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-danger">
                      <Caption
                        text={formatCartCount(notifications.unreadCount)}
                        size="xs"
                        color="white"
                        weight="regular"
                      />
                    </span>
                  )}
                </button>

                <button
                  ref={userButtonRef}
                  onClick={profile.openProfileMenu}
                  className="group flex cursor-pointer items-center gap-1 rounded-xs p-1.5 transition-all duration-200 hover:bg-accent"
                >
                  <UserIcon
                    size="sm"
                    color="text-primary transition-colors duration-200"
                  />
                  <div className="hidden sm:block">
                    <div
                      className={`transition-transform duration-300 ${
                        profile.isProfileMenuOpen ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <ArrowIcon size="2xs" />
                    </div>
                  </div>
                </button>

                <div className="hidden sm:block">
                  <VerticalSeparator />
                </div>

                <button
                  onClick={cart.handleBagIconClick}
                  className="group relative cursor-pointer rounded-xs p-1.5 transition-all duration-200 hover:bg-accent"
                >
                  <BagIcon
                    size="sm"
                    color="text-primary transition-colors duration-200"
                  />
                  {cart.itemsCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-danger">
                      <Caption
                        text={formatCartCount(cart.itemsCount)}
                        size="xs"
                        color="white"
                        weight="regular"
                      />
                    </span>
                  )}
                </button>
              </div>
            ) : (
              <DefaultButton
                type="primary"
                style="outline"
                label="ورود | ثبت نام"
                icon={<LoginIcon size="md" color="text-current" />}
                iconPosition="left"
                action={() => (window.location.href = "/send-otp")}
              />
            )}
          </div>
        </div>

        {/* ردیف دوم: سرچ باکس، فقط موبایل/تبلت */}
        <div className="flex w-full justify-center px-4 pb-3 lg:hidden">
          <div className="relative z-100 w-full max-w-xl">
            <SearchInput
              open={isSearchOpen}
              onOpen={openSearch}
              onClose={closeSearch}
            />
          </div>
        </div>

        {/* BOTTOM NAVIGATION: فقط دسکتاپ */}
        <div className="max-w-screen-4xl relative z-10 mx-auto hidden h-11 w-full items-center px-6 lg:flex">
          <nav className="flex w-full items-center gap-8 text-sm">
            {navLinks.map((link) => {
              const handleClick = (e: React.MouseEvent) => {
                if (link.key === "categories") {
                  e.preventDefault();
                  profile.openCategories();
                } else {
                  handleActiveLink(link.key);
                }
              };

              return (
                <a
                  key={link.key}
                  ref={
                    link.key === "categories" ? categoriesButtonRef : undefined
                  }
                  href={link.key === "categories" ? "#" : link.href}
                  onClick={handleClick}
                  className="group relative flex cursor-pointer items-center gap-2 py-1 transition-all duration-200"
                >
                  {link.icon}
                  <Text
                    text={link.label}
                    color="primary"
                    size="md"
                    weight={activeLink === link.key ? "bold" : "regular"}
                  />
                  <span className="absolute right-0 bottom-0 h-[0.5px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      {/* منوی همبرگری موبایل/تبلت (Drawer) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-200 flex justify-start bg-primary/10 lg:hidden"
          onClick={closeMobileMenu}
        >
          <div
            className="flex h-full w-72 max-w-[80vw] flex-col bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-row items-center justify-between border-b border-gray px-4 py-4">
              <Text text="منو" size="lg" weight="bold" />
              <button
                onClick={closeMobileMenu}
                className="cursor-pointer"
                aria-label="بستن منو"
              >
                <CloseModalIcon size="sm" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 overflow-y-auto px-2 py-4">
              {navLinks.map((link) => {
                const handleClick = (e: React.MouseEvent) => {
                  if (link.key === "categories") {
                    e.preventDefault();
                    closeMobileMenu();
                    profile.openCategories();
                  } else {
                    handleActiveLink(link.key);
                    closeMobileMenu();
                  }
                };

                return (
                  <a
                    key={link.key}
                    href={link.key === "categories" ? "#" : link.href}
                    onClick={handleClick}
                    className="flex cursor-pointer flex-row items-center gap-3 rounded-sm px-3 py-3 transition-all duration-200 hover:bg-accent"
                  >
                    {link.icon}
                    <Text
                      text={link.label}
                      color="primary"
                      size="md"
                      weight={activeLink === link.key ? "bold" : "regular"}
                    />
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* مودال‌ها */}
      <CartModal
        isOpen={cart.isOpen}
        onClose={cart.close}
        items={cart.items}
        onIncrease={cart.handleIncrease}
        onDecrease={cart.handleDecrease}
        onRemove={cart.handleRemove}
        onCheckout={cart.handleCheckout}
      />

      <CategoriesModal
        isOpen={profile.isCategoriesOpen}
        onClose={profile.closeCategories}
        onConfirm={profile.closeCategories}
        anchorRef={categoriesButtonRef}
      />

      <ProfileModal
        isOpen={profile.isProfileMenuOpen}
        onClose={profile.closeProfileMenu}
        anchorRef={userButtonRef}
        userName={user?.name || ""}
        onLogout={profile.handleLogoutClick}
      />

      <LogoutModal
        isOpen={profile.isLogoutModalOpen}
        onClose={profile.closeLogoutModal}
        onConfirm={profile.handleLogoutConfirm}
      />

      <NotificationsDrawer
        isOpen={notifications.isOpen}
        onClose={notifications.close}
        notifications={notifications.notifications}
        onRemove={notifications.onRemove}
        onViewAll={notifications.onViewAll}
      />
    </>
  );
}
