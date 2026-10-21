import Link from "next/link";
import { CartIcon } from "@/src/shared/ui/icons/cart-icon";
import { SearchIcon } from "@/src/shared/ui/icons/search-icon";
import { UserIcon } from "@/src/shared/ui/icons/user-icon";
import { HeaderLinks } from "./header-constants";

export default function Header() {
  return (
    <header className="page-px absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-6 py-6">
      {/* search: mobile */}
      <button
        type="button"
        className="flex h-[35px] w-[45px] cursor-pointer items-center justify-center rounded-full bg-primary text-foreground md:hidden"
      >
        <SearchIcon className="text-base" />
      </button>

      {/* links: desktop */}
      <nav className="hidden items-center gap-6 md:flex">
        {HeaderLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="flex items-center gap-2 text-sm text-primary"
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>

      {/* actions */}
      <div className="flex items-center gap-3">
        {/* search: desktop */}
        <label className="hidden h-[35px] w-64 items-center gap-2 rounded-full border border-primary px-4 text-primary md:flex">
          <SearchIcon className="text-sm" />
          <input
            type="text"
            placeholder="جستجو"
            className="w-full bg-transparent text-sm outline-none placeholder:text-primary"
          />
        </label>

        <button type="button" className="cursor-pointer">
          <UserIcon />
        </button>
        <button type="button" className="cursor-pointer">
          <CartIcon />
        </button>
      </div>
    </header>
  );
}