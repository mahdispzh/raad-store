"use client";

import type { ReactNode } from "react";
import { DropleftArrowIcon } from "../../constants/icons";
import { Text } from "../../ui";
import { DefaultButton } from "../../ui/default-button/default-button.ui";
import { SimpleButton } from "../../ui/simple-button/simple-button.ui";
import { TableColumn, TableProps } from "./table.types";

function PlusIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 1V13M1 7H13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ALIGN_CLASS: Record<"right" | "left" | "center", string> = {
  right: "text-right",
  left: "text-left",
  center: "text-center",
};

function getCellValue<T>(
  column: TableColumn<T>,
  row: T,
  index: number,
): ReactNode {
  if (column.render) return column.render(row, index);
  return (row as Record<string, ReactNode>)[column.key] ?? null;
}

export function Table<T>({
  title,
  titleIcon,
  columns,
  rows,
  getRowKey,
  viewAllLabel = "مشاهده همه",
  onViewAll,
  showViewAll = true,
  emptyText = "داده‌ای برای نمایش وجود ندارد",
  showAddButton = false,
  addButtonLabel = "افزودن محصول",
  addButtonIcon = <PlusIcon />,
  onAddClick,
}: TableProps<T>) {
  return (
    <div className="relative w-full">
      <div className="relative aspect-[505/280] w-full">
        <svg
          className="h-full w-full"
          viewBox="0 0 505 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M16 0H489C493.243 0 497.313 1.68571 500.314 4.68629C503.314 7.68687 505 11.7565 505 16V264C505 268.243 503.314 272.313 500.314 275.314C497.313 278.314 493.243 280 489 280H16C11.7565 280 7.68687 278.314 4.68629 275.314C1.68571 272.313 0 268.243 0 264V90C0 82.0435 3.16071 74.4129 8.7868 68.7868C14.4129 63.1607 22.0435 60 30 60H80C87.9565 60 95.5871 56.8393 101.213 51.2132C106.839 45.5871 110 37.9565 110 30C110 22.0435 113.161 14.4129 118.787 8.7868C124.413 3.16071 132.044 0 140 0"
            fill="#E8E5E5"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {titleIcon ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20">
                  {titleIcon}
                </div>
              ) : null}

              {title ? (
                <Text
                  text={title}
                  color="secondary"
                  size="lg"
                  weight="regular"
                />
              ) : null}
            </div>

            {showAddButton ? (
              <div className="h-9 w-fit absolute top-4 left-[160]">
                <DefaultButton
                  type="primary"
                  style="fill"
                  label={addButtonLabel}
                  icon={addButtonIcon}
                  iconPosition="left"
                  rounded
                  action={onAddClick ?? (() => {})}
                />
              </div>
            ) : null}

            {showViewAll ? (
              <div className="absolute top-4 left-[-10]">
                <SimpleButton
                  variant="secondary"
                  label={viewAllLabel}
                  icon={<DropleftArrowIcon size="xs" />}
                  iconPosition="right"
                  action={onViewAll ?? (() => {})}
                />
              </div>
            ) : null}
          </div>

          <div className="flex-1 overflow-hidden pt-10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={`px-2 py-3 ${ALIGN_CLASS[column.align ?? "center"]}`}
                    >
                      <Text
                        text={column.header}
                        size="md"
                        color="secondary"
                        weight="medium"
                        align={column.align ?? "center"}
                      />
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-2 py-6 text-center"
                    >
                      <Text
                        text={emptyText}
                        size="sm"
                        color="secondary"
                        align="center"
                      />
                    </td>
                  </tr>
                ) : (
                  rows.map((row, index) => (
                    <tr
                      key={getRowKey ? getRowKey(row, index) : index}
                      className="border-b border-gray/50 last:border-b-0"
                    >
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className={`px-2 py-3 text-sm text-medium text-secondary ${ALIGN_CLASS[column.align ?? "center"]}`}
                        >
                          {getCellValue(column, row, index)}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}