export type MonthDropdownProps = {
  months: readonly string[];
  selectedMonth: string;
  onSelectMonth: (month: string) => void;
};