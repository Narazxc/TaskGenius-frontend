import { useQuery } from "@tanstack/react-query";
import { getMyNotifications } from "../../services/apiNotifications";

export function useNotifications() {
  const {
    isLoading,
    data: notifications = {},
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getMyNotifications(),
  });

  return { isLoading, notifications, error };
}
