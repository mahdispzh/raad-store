// _components/status-icons.tsx
import React from "react"; // ✅ اضافه کردن import React
import {
  AdminIcon,
  CheckIcon,
  ClockIcon,
  CloseIcon,
  ProductIcon,
  ReturnIcon,
  TruckIcon,
  WaitingIcon,
} from "@/src/shared/constants/icons";

type IconColor = "primary" | "secondary" | "white";

interface StatusInfo {
  label: string;
  icon: React.JSX.Element; // ✅ استفاده از React.JSX
  color: string;
}

export function getStatusInfo(
  status: number,
  iconColor: IconColor = "primary"
): StatusInfo {
  const statusMap: Record<number, StatusInfo> = {
    1: {
      label: "منتظر تایید",
      icon: <ClockIcon size="sm" color={`text-${iconColor}`} />,
      color: "text-warning",
    },
    2: {
      label: "تایید اولیه",
      icon: <CheckIcon size="sm" color={`text-${iconColor}`} />,
      color: "text-info",
    },
    3: {
      label: "در حال آماده سازی",
      icon: <WaitingIcon size="sm" color={`text-${iconColor}`} />,
      color: "text-primary",
    },
    4: {
      label: "آماده ارسال",
      icon: <ProductIcon size="sm" color={`text-${iconColor}`} />,
      color: "text-secondary",
    },
    5: {
      label: "تحویل به پست",
      icon: <TruckIcon size="sm" color={`text-${iconColor}`} />,
      color: "text-purple",
    },
    6: {
      label: "تحویل به مشتری",
      icon: <AdminIcon size="sm" color={`text-${iconColor}`} />,
      color: "text-success",
    },
    7: {
      label: " مرجوع شده ",
      icon: <ReturnIcon size="sm" color={`text-${iconColor}`} />,
      color: "text-success",
    },
  };

  return (
    statusMap[status] || {
      label: "نامشخص",
      icon: <ClockIcon />,
      color: "text-secondary",
    }
  );
}