import type { InputStatus } from "./input.types";

export function useInputStatus(
  status: InputStatus,
  hasError: boolean,
): InputStatus {
  return hasError ? "error" : status;
}
