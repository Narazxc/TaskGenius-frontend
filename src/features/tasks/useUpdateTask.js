import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateTask as updateTaskApi } from "../../services/apiTasks";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  const { mutate: updateTask, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newTaskData, id }) => updateTaskApi(newTaskData, id),
    onSuccess: (newTaskData) => {
      // check if update collab task
      if (newTaskData.taskMembers && newTaskData.taskMembers.length > 0) {
        queryClient.invalidateQueries({ queryKey: ["collabTask"] });
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        queryClient.invalidateQueries({ queryKey: ["task"] });
        toast.success("Task successfully updated");
      } else {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        queryClient.invalidateQueries({ queryKey: ["task"] });
        toast.success("Task successfully updated");
      }
    },

    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateTask };
}
