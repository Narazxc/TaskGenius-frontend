import { useQuery } from "@tanstack/react-query";
import { getUsersToAddToTask } from "../../services/apiUsers";

export function useUsersToAddToTask() {
  const { isLoading, data } = useQuery({
    queryKey: ["usersToAddToTask"],
    queryFn: getUsersToAddToTask,
  });

  return { isLoading, data };
}
