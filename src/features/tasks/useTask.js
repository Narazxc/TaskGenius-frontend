import { useQuery } from "@tanstack/react-query";
import { getTask } from "../../services/apiTasks";
import { useParams } from "react-router-dom";

export function useTask() {
  const { taskId } = useParams();

  const {
    isLoading,
    data: task,
    error,
  } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTask(taskId),
    retry: false,
  });

  // console.log("useTask", tasks, count);

  return { isLoading, task, error };
}
