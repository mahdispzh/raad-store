"use client";

import type { CustomTableProps } from "./custom-table.types";
import { Table } from "./table.ui";

export function CustomTable<T>({
  title,
  titleIcon,
  columns,
  rows,
  getRowKey,
  viewAllLabel,
  onViewAll,
  showViewAll,
  emptyText,
  showAddButton,
  addButtonLabel,
  addButtonIcon,
  onAddClick,
}: CustomTableProps<T>) {
  return (
    <Table
      title={title}
      titleIcon={titleIcon}
      columns={columns}
      rows={rows}
      getRowKey={getRowKey}
      viewAllLabel={viewAllLabel}
      onViewAll={onViewAll}
      showViewAll={showViewAll}
      emptyText={emptyText}
      showAddButton={showAddButton}
      addButtonLabel={addButtonLabel}
      addButtonIcon={addButtonIcon}
      onAddClick={onAddClick}
    />
  );
}