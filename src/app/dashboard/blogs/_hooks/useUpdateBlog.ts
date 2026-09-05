import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBlog } from "../_services/blog.api";

export function useUpdateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, formData }: { slug: string; formData: FormData }) =>
      updateBlog(slug, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });
}
