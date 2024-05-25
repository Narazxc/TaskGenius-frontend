import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

// the purpose of using react query is because we want to cache user, if the condition checks out dont fetch because we have user in cache
export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { isLoading, user };
}
