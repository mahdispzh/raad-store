// _hooks/useActionButton.ts
import { useCallback } from "react";

// Hook for action button logic
export function useActionButton(onAction?: () => void) {
  const handleAction = useCallback(() => {
    if (onAction) {
      onAction();
    }
  }, [onAction]);

  return { handleAction };
}
