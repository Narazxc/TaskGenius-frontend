import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createTask as createTaskApi } from "../../services/apiTasks";

export function useCreateTask() {
  const queryClient = useQueryClient();

  const { mutate: createTask, isLoading: isCreating } = useMutation({
    mutationFn: createTaskApi,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("New task created successfully");
    },

    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createTask };
}
