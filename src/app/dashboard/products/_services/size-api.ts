import { SizesResponse } from "@/lib/react-query";
import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export const getSizes = async () => {
  return fetcher<SizesResponse>(() =>
    apiClient.get("public/sizes?page=1&limit=1000"),
  );
};
