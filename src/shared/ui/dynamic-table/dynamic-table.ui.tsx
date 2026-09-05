"use client";

import { CustomSelect, EmptyImage } from "@/src/shared/ui";
import { Text } from "@/src/shared/ui/text/text.ui";
import { StyledButton } from "@/src/shared/ui/styled-button/styled-button.ui";
import { CustomCheckbox } from "@/src/shared/ui/custom-checkbox.ui.tsx/custom-checkbox.ui";
import { ComponentProps, ComponentType, ReactNode, useState } from "react";
import { TomanIcon } from "../../constants/icons";
import Image from "next/image";
import Link from "next/link";

export type TableColumn<T> = {
  key: string;
  header: string;
  widthPercent?: string;
  render: (row: T) => ReactNode;
};

export type TableAction = {
  icon: ReactNode;
  onClick: () => void;
};
type FilterOption = { label: string; value: string };
type RowWithId = { id: number | string };
// ============================================================
// ✅ جدید — متن پیش‌فرض سلول‌های جدول (همون استایل sm/secondary/center)
// دیگه لازم نیست هر بار size/weight/color/align رو تکرار کنی
// ============================================================
type TableTextProps = { text: string } & Partial<Omit<ComponentProps<typeof Text>, "text">>;

export function TableText({
  text,
  size = "sm",
  weight = "regular",
  color = "secondary",
  align = "center",
  ...rest
}: TableTextProps) {
  return <Text text={text} size={size} weight={weight} color={color} align={align} {...rest} />;
}


// ============================================================
// ✅ جدید — قیمت با آیکون تومان کنارش (همون TableText + TomanIcon)
// ============================================================
type TablePriceProps = { price: string | number } & Partial<Omit<ComponentProps<typeof Text>, "text">>;

export function TablePrice({ price, ...rest }: TablePriceProps) {
  return (
    <div className="flex items-center justify-center gap-1">
      <TableText text={String(price)} {...rest} />
      <TomanIcon size="xs" color="text-secondary" />
    </div>
  );
}
// ============================================================
// ✅ جدید — عکس محصول با سایز ثابت؛ با کلیک به صفحه‌ی محصول (بر اساس اسلاگ) می‌ره
// ============================================================
type TableImageProps = {
  src?: string | null;
  alt: string;
  slug?: string;
  href?: string;
};

function isValidImageSrc(src?: string | null): src is string {
  if (!src || !src.trim()) return false;
  return src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://");
}


export function TableImage({ src, alt, slug, href }: TableImageProps) {
  const link = href ?? (slug ? `/products/${slug}` : undefined);
  const hasValidSrc = isValidImageSrc(src);

  const image = (
    <div className="relative mx-auto h-22 w-19 overflow-hidden rounded-sm">
      {hasValidSrc ? (
        <Image src={src} alt={alt} fill sizes="72px" className="object-cover" />
      ) : (
        <EmptyImage />
      )}
    </div>
  );

    if (!link) return image;

  return (
    <Link href={link} onClick={(e) => e.stopPropagation()} className="block">
      {image}
    </Link>
  );
}
// ============================================================
// ✅ جدید — ظرف ثابت دکمه‌های عملیات (ویرایش/دلیت و امثالش)
// همه‌جا یک‌شکل و با فاصله‌ی یکسان
// ============================================================
type TableActionsProps = {
  actions: { icon: ReactNode; onClick: () => void }[];
};
type IconComponent = ComponentType<{ size?: any; color?: any }>;
type TableActionItem = {
  icon: IconComponent;
  onClick: () => void;
};
export function TableActions({ actions }: { actions: TableActionItem[] }) {
  return (
    <div className="flex items-center justify-center gap-1">
      {actions.map((action, i) => {
        const Icon = action.icon;
        return (
          <TableIconButton
            key={i}
            icon={<Icon size="xs" color="text-secondary" />}
            onClick={action.onClick}
          />
        );
      })}
    </div>
  );
}
// ============================================================
// ✅ جدید — دکمه‌ی آیکنی پیش‌فرض سلول‌های عملیات (همون StyledButton variant="icon")
// ============================================================
type TableIconButtonProps = { icon: ReactNode; onClick: () => void };

export function TableIconButton({ icon, onClick }: TableIconButtonProps) {
  return <StyledButton variant="icon" icon={icon} action={onClick} />;
}

type DynamicTableProps<T extends RowWithId> = {
  columns: TableColumn<T>[];
  rows: T[];

  selectable?: boolean;
  onSelectionChange?: (selected: Set<T["id"]>) => void;
  selectAllLabel?: string;

  onRowClick?: (row: T) => void;

  actions?: TableAction[];

  filterOptions?: FilterOption[];
  filterPlaceholder?: string;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
};

export function DynamicTable<T extends RowWithId>({
  columns,
  rows,
  selectable = true,
  onSelectionChange,
  selectAllLabel = "انتخاب همه",
  onRowClick,
  actions = [],
  filterOptions,
  filterPlaceholder = "فیلترها",
  filterValue,
  onFilterChange,
}: DynamicTableProps<T>) {
  const [selected, setSelected] = useState<Set<T["id"]>>(new Set());
  const [internalFilter, setInternalFilter] = useState<string>(
    filterValue ?? filterOptions?.[0]?.value ?? "all",
  );

  const currentFilter = filterValue ?? internalFilter;
  const allSelected = rows.length > 0 && selected.size === rows.length;

  function toggleAll() {
    const next = allSelected ? new Set<T["id"]>() : new Set(rows.map((r) => r.id));
    setSelected(next);
    onSelectionChange?.(next);
  }

  function toggleRow(id: T["id"]) {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
    onSelectionChange?.(next);
  }

  function handleFilterChange(value: string) {
    setInternalFilter(value);
    onFilterChange?.(value);
  }

  const defaultWidth = `${Math.floor(90 / (columns.length || 1))}%`;
  const colWidths = [
    ...(selectable ? ["4%"] : []),
    ...columns.map((c) => c.widthPercent ?? defaultWidth),
  ];

  const ColGroup = () => (
    <colgroup>
      {colWidths.map((w, i) => (
        <col key={i} style={{ width: w }} />
      ))}
    </colgroup>
  );

  return (
    <div dir="rtl" className="w-full font-primary">
      <div className="rounded-sm bg-accent/50">
        <div className="flex items-center justify-between px-4 py-3">
          {selectable ? (
            <label className="flex items-center gap-2 pr-1">
              <CustomCheckbox checked={allSelected} onChange={toggleAll} ariaLabel={selectAllLabel} />
              <Text text={selectAllLabel} size="md" weight="regular" color="secondary" align="right" />
            </label>
          ) : (
            <div />
          )}

          {(actions.length > 0 || filterOptions) && (
            <div className="flex items-center gap-2">
              {actions.map((action, i) => (
                <div key={i} className="flex h-10 w-10 items-center justify-center rounded-xs border border-secondary">
                  <StyledButton variant="icon" color="secondary" icon={action.icon} action={action.onClick} />
                </div>
              ))}

              {filterOptions && (
                <CustomSelect
                  options={filterOptions}
                  transparent
                  value={currentFilter}
                  onChange={handleFilterChange}
                  placeholder={filterPlaceholder}
                  className="rounded-xs border-secondary"
                  optionClassName="text-right"
                />
              )}
            </div>
          )}
        </div>

        <div className="px-4 pb-4">
          <div className="overflow-hidden rounded-xs">
            <table className="w-full table-fixed border-separate border-spacing-0">
              <ColGroup />
              <thead>
                <tr>
                  {selectable && <th className="bg-secondary py-7" />}
                  {columns.map((col) => (
                    <th key={col.key} className="bg-secondary px-3 py-3 text-center">
                      <Text text={col.header} size="md" weight="regular" color="accent" align="center" />
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>

          <div className="h-4" />

          <table className="w-full table-fixed border-separate border-spacing-0">
            <ColGroup />
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={`
                    border-b border-gray
                    transition-colors duration-200
                    hover:bg-accent/40
                    ${onRowClick ? "cursor-pointer" : ""}
                  `}
                >
                  {selectable && (
                    <td className="px-3 py-4" onClick={(e) => e.stopPropagation()}>
                      <CustomCheckbox
                        checked={selected.has(row.id)}
                        onChange={() => toggleRow(row.id)}
                        ariaLabel={`انتخاب ردیف ${row.id}`}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className="px-3 py-4">
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}