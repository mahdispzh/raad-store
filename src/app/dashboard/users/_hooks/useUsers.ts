import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userKeys } from "../_lib/user-keys";
import { usersApi } from "../_services/users.api";

export function useUsersList(page = 1, limit = 10, sort?: string) {
  return useQuery({
    queryKey: userKeys.list(page, limit, sort),
    queryFn: () => usersApi.getAll(page, limit, sort),
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => usersApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
}
