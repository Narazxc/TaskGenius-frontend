import { useQuery } from "@tanstack/react-query";
import { getMyTasks } from "../../services/apiTasks";

export function useMyTaskReactQuery() {
  const {
    isLoading,
    data: task,
    error,
  } = useQuery({
    queryKey: ["collabTasks"],
    queryFn: getMyTasks,
  });

  return { isLoading, task, error };
}
