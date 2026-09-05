"use client";

import Image from "next/image";
import Link from "next/link";

import { LogoutModal } from "@/src/shared/components/logout/logout-modal.ui";

import { DropdownArrowIcon } from "../../constants/icons";
import { Badge, Subtitle, Text } from "../../ui";

import {
  SIDEBAR_BOTTOM_ACTIONS,
  SidebarDashboard,
} from "./sidebar-dashboard.constants";
import type { SidebarItem, SidebarProps } from "./sidebar-dashboard.type";
import { useSidebarDashboard } from "./useSidebardashboard";

interface SidebarMenuItemProps {
  item: SidebarItem;
  depth: number;
  selected: string;
  isOpen: (id: string, depth: number) => boolean;
  onItemClick: (item: SidebarItem, depth: number) => void;
}

function SidebarMenuItem({
  item,
  depth,
  selected,
  isOpen,
  onItemClick,
}: SidebarMenuItemProps) {
  const Icon = item.icon;
  const hasChildren = !!item.items?.length;
  const opened = hasChildren && isOpen(item.id, depth);
  const isSelected = selected === item.href || (hasChildren && opened);
  const isTopLevel = depth === 0;

  const rowClassName = `flex ${
    isTopLevel ? "h-[3.5vw]" : "h-[2.75vw]"
  } w-full cursor-pointer items-center justify-between rounded-[0.4vw] px-[1vw] transition-all duration-200 ${
    isSelected ? "bg-accent/50" : "hover:bg-accent/20"
  }`;

  const arrowColor = isTopLevel
    ? isSelected
      ? "text-secondary"
      : "text-primary"
    : "text-gray-400";

  const content = (
    <>
      <div className="flex items-center gap-[0.75vw]">
        {Icon && isTopLevel && (
          <Icon
            size="sm"
            color={isSelected ? "text-secondary" : "text-primary"}
          />
        )}

        <Text
          text={item.title}
          color={isSelected ? "secondary" : "primary"}
          weight={isSelected ? "regular" : "light"}
        />
      </div>

      <div className="flex items-center gap-[0.5vw]">
        {item.badge !== undefined && (
          <Badge type="counter" number={item.badge} />
        )}

        {hasChildren && (
          <div
            className={
              isTopLevel
                ? "transition-transform duration-300"
                : "opacity-70 transition-transform duration-300"
            }
            style={{
              transform: isTopLevel
                ? `rotate(${opened ? 180 : 0}deg)`
                : `scale(0.8) rotate(${opened ? 180 : 0}deg)`,
            }}
          >
            <DropdownArrowIcon size="xs" color={arrowColor} />
          </div>
        )}
      </div>
    </>
  );

  return (
    <div>
      {hasChildren ? (
        <button
          onClick={() => onItemClick(item, depth)}
          className={rowClassName}
        >
          {content}
        </button>
      ) : (
        <Link
          href={item.href!}
          onClick={() => onItemClick(item, depth)}
          className={`${rowClassName} rounded-l-[0.4vw] ${
            isSelected
              ? "rounded-r-none border-r-[0.15vw] border-secondary"
              : ""
          }`}
        >
          {content}
        </Link>
      )}

      {opened &&
        item.items &&
        (isTopLevel ? (
          // زیرمجموعه‌ی سطح اول: تو یه باکس ملایم جمع میشه که از آیتم بعدی جداست
          <div className="mt-[0.5vw] mr-[0.75vw] space-y-[0.25vw] rounded-[0.4vw] bg-gray-50 p-[0.5vw]">
            {item.items.map((child) => (
              <SidebarMenuItem
                key={child.id}
                item={child}
                depth={depth + 1}
                selected={selected}
                isOpen={isOpen}
                onItemClick={onItemClick}
              />
            ))}
          </div>
        ) : (
          // زیرمجموعه‌های عمیق‌تر: با خط راهنمای عمودی به‌جای باکس تودرتو
          <div className="mt-[0.25vw] mr-[0.75vw] space-y-[0.25vw] border-r-[0.1vw] border-gray-200 pr-[0.75vw]">
            {item.items.map((child) => (
              <SidebarMenuItem
                key={child.id}
                item={child}
                depth={depth + 1}
                selected={selected}
                isOpen={isOpen}
                onItemClick={onItemClick}
              />
            ))}
          </div>
        ))}
    </div>
  );
}

export function Sidebar({ pathname = "" }: SidebarProps) {
  const { selected, isOpen, handleItemClick, logout } =
    useSidebarDashboard(pathname);

  return (
    <aside className="flex h-screen w-[20vw] flex-col bg-white">
      {/* Logo */}
      <div className="flex items-center gap-[0.5vw] px-[1.5vw] pt-[0.5vw]">
        <Image
          src="/images/circular-icon.svg"
          alt="logo"
          width={0}
          height={0}
          className="aspect-square w-[1.8vw] lg:w-[2.6vw]"
        />
        <Subtitle text="فروشگاه بونامی" color="secondary" size="2xl" />
      </div>

      {/* Menu */}
      <div className="flex-1 px-[1vw] py-[1.5vw]">
        <nav className="space-y-[0.5vw]">
          {SidebarDashboard.map((item) => (
            <SidebarMenuItem
              key={item.id}
              item={item}
              depth={0}
              selected={selected}
              isOpen={isOpen}
              onItemClick={handleItemClick}
            />
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="space-y-[0.5vw] border-t-[0.1vw] border-gray-200 px-[1vw] py-[1.25vw]">
        {SIDEBAR_BOTTOM_ACTIONS.map((item) => {
          const Icon = item.icon;

          if (item.id === "logout") {
            return (
              <button
                key={item.id}
                onClick={logout.openModal}
                className="flex h-[3vw] w-full cursor-pointer items-center gap-[0.75vw] rounded-[0.4vw] px-[1vw] transition-all duration-200 hover:bg-accent/20"
              >
                {Icon && <Icon size="sm" color="text-primary" />}
                <Text text={item.title} color="primary" weight="light" />
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href!}
              className="flex h-[3vw] cursor-pointer items-center gap-[0.75vw] rounded-[0.4vw] px-[1vw] transition-all duration-200 hover:bg-accent/20"
            >
              {Icon && <Icon size="sm" color="text-primary" />}
              <Text text={item.title} color="primary" weight="light" />
            </Link>
          );
        })}
      </div>

      <LogoutModal
        isOpen={logout.isModalOpen}
        onClose={logout.closeModal}
        onConfirm={logout.handleConfirm}
      />
    </aside>
  );
}
