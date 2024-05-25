import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCollabTask as createCollabTaskApi } from "../../services/apiTasks";

export function useCreateCollabTask() {
  const queryClient = useQueryClient();

  const { mutate: createCollabTask, isLoading: isCreating } = useMutation({
    mutationFn: createCollabTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collabTask"] });
      toast.success("New collaboration task created successfully");
    },

    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCollabTask };
}
