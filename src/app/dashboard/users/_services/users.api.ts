import { apiClient } from "@/src/shared/api/client";
import { fetcher } from "@/src/shared/api/fetcher";
import { UsersListResponse } from "../_types/user.type";

export const usersApi = {
  getAll: (page: number, limit: number, sort?: string) =>
    fetcher<UsersListResponse>(() =>
      apiClient.get("protected/users", { params: { page, limit, sort } }),
    ),

  remove: (id: number) =>
    fetcher<{ success: boolean }>(() =>
      apiClient.delete(`protected/users/${id}`),
    ),
};
