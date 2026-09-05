/**
 * ساخت کلاس border بر اساس props
 */
export function getBorderClass(showBorder: boolean, borderColor: string) {
  return showBorder ? `border-2 ${borderColor}` : "border-0";
}
