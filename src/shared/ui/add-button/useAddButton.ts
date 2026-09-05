import { useState } from "react";
import { UseAddButtonReturn } from "./add-button.types";

export const useAddButton = (
  action?: () => void | Promise<void>,
): UseAddButtonReturn => {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    if (!action) return;

    try {
      setIsPending(true);
      await action();
    } catch (error) {
      console.error("Error in add button action:", error);
    } finally {
      setIsPending(false);
    }
  };

  return {
    handleClick,
    isPending,
  };
};