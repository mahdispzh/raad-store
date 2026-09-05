import { apiClient } from "../api/client";
import { fetcher } from "../api/fetcher";

export async function getMe() {
  return fetcher(() => apiClient.get("auth/me"), {
    ignore401: true,
  });
}
