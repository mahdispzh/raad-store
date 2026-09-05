import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Factor } from "../_types/factors.types";
import { getStatusInfo } from "../_constants/status-icons";

export const exportSelectedFactors = (  factors: Factor[],
  selectedIds: number[]
) => {
  const rows = factors
    .filter((f) => selectedIds.includes(f.id))
    .map((f) => ({
      "شماره فاکتور": f.factor_number,
      "عنوان": f.title,
      "توضیحات": f.description,
      "مبلغ": f.amount,
      "مبلغ بعد از تخفیف": f.discounted_amount,
      "تاریخ": f.created_at,
      "وضعیت": getStatusInfo(f.status).label,
    }));

  if (!rows.length) {
    alert("هیچ فاکتوری انتخاب نشده است.");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(rows);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Factors");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(blob, "Factors.xlsx");
};