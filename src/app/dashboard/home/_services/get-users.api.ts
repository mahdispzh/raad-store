// api/dashboard-home.api.ts
import { apiClient } from "@/src/shared/api/client";
import { fetcher } from "@/src/shared/api/fetcher";

// User data type definition
export type User = {
  id: number;
  phone: string | null;
  name: string | null;
  role: number;
  created_at: string | null;
};

// API response type
export type GetUsersResponse = {
  currentUser: number;
  users: User[];
};

// Fetch all users
export async function getUsers() {
  return fetcher<GetUsersResponse>(() => apiClient.get("protected/users"));
}
