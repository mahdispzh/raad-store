import { ColorsResponse } from "@/lib/react-query";
import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export const getColors = async () => {
  return fetcher<ColorsResponse>(() =>
    apiClient.get("public/colors?page=1&limit=1000"),
  );
};
