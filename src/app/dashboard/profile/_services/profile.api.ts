import { apiClient, fetcher } from "@/src/shared/api/fetcher";
import { ProfileData, UpdateProfilePayload } from "../_types/profile.types";

export const getProfile = (): Promise<ProfileData> => {
  return fetcher(() => apiClient.get("/protected/profile"));
};

export const updateProfile = (
  data: UpdateProfilePayload,
): Promise<ProfileData> => {
  return fetcher(() => apiClient.put("/protected/profile", data));
};
