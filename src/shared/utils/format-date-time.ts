import { toPersianDigits } from "@/src/shared/utils/digits";
import dayjs from "dayjs";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);

export const formatDateTime = (date: Date | string): string => {
  const formatted = dayjs(date)
    .calendar("jalali")
    .locale("fa")
    .format("YYYY/MM/DD HH:mm");

  return toPersianDigits(formatted);
};
